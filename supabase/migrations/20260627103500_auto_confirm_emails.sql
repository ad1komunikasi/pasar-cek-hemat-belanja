-- 1. Bersihkan trigger/fungsi BEFORE INSERT jika sempat terbuat sebelumnya
DROP TRIGGER IF EXISTS on_auth_user_created_before ON auth.users;
DROP FUNCTION IF EXISTS public.auto_confirm_user_email();

-- 2. Perbarui fungsi handle_new_user() untuk menyertakan update auto-confirm
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- A. Masukkan data ke profile
  INSERT INTO public.profiles (id, full_name, email, username)
  VALUES (NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email,'@',1) || '_' || substr(NEW.id::text,1,4))
  ) ON CONFLICT (id) DO NOTHING;
  
  -- B. Setel role default sebagai customer
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer') ON CONFLICT DO NOTHING;
  
  -- C. Konfirmasi email secara otomatis dengan memperbarui data di auth.users
  UPDATE auth.users
  SET email_confirmed_at = COALESCE(email_confirmed_at, now()),
      confirmed_at = COALESCE(confirmed_at, now())
  WHERE id = NEW.id;
  
  RETURN NEW;
END $$;

-- 3. Perbarui seluruh user lama yang email_confirmed_at-nya masih kosong agar bisa langsung login
UPDATE auth.users
SET 
    email_confirmed_at = COALESCE(email_confirmed_at, created_at, now()),
    confirmed_at = COALESCE(confirmed_at, created_at, now())
WHERE email_confirmed_at IS NULL OR confirmed_at IS NULL;

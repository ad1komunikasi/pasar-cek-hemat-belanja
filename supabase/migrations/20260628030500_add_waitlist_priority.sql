-- 1. Tambahkan kolom waitlist_priority ke tabel public.profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS waitlist_priority boolean NOT NULL DEFAULT false;

-- 2. Perbarui fungsi handle_new_user() untuk menyertakan waitlist_priority dari raw_user_meta_data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- A. Masukkan data ke profile
  INSERT INTO public.profiles (id, full_name, email, username, waitlist_priority)
  VALUES (NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email,'@',1) || '_' || substr(NEW.id::text,1,4)),
    COALESCE((NEW.raw_user_meta_data->>'waitlist_priority')::boolean, false)
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

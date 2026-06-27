-- 1. Perbarui fungsi handle_new_user() untuk menyertakan hak akses developer sebagai super_admin
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
  
  -- B. Setel role default: jika email berakhiran @pasarcek.com atau developer@gmail.com, jadikan super_admin + admin. Jika tidak, jadikan customer.
  IF NEW.email LIKE '%@pasarcek.com' OR NEW.email = 'developer@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'super_admin') ON CONFLICT DO NOTHING;
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer') ON CONFLICT DO NOTHING;
  END IF;
  
  -- C. Konfirmasi email secara otomatis dengan memperbarui data di auth.users
  UPDATE auth.users
  SET email_confirmed_at = COALESCE(email_confirmed_at, now()),
      confirmed_at = COALESCE(confirmed_at, now())
  WHERE id = NEW.id;
  
  RETURN NEW;
END $$;

-- 2. Tingkatkan status pengguna pengembang yang sudah terdaftar sebelumnya menjadi super_admin & admin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'super_admin'::app_role FROM auth.users 
WHERE email LIKE '%@pasarcek.com' OR email = 'developer@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users 
WHERE email LIKE '%@pasarcek.com' OR email = 'developer@gmail.com'
ON CONFLICT DO NOTHING;

-- 1. Create a BEFORE INSERT trigger function to safely auto-confirm email fields
CREATE OR REPLACE FUNCTION public.handle_new_user_before()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  NEW.email_confirmed_at = COALESCE(NEW.email_confirmed_at, now());
  NEW.confirmed_at = COALESCE(NEW.confirmed_at, now());
  RETURN NEW;
END;
$$;

-- 2. Drop the BEFORE INSERT trigger if it exists, then create it
DROP TRIGGER IF EXISTS on_auth_user_created_before ON auth.users;
CREATE TRIGGER on_auth_user_created_before
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_before();

-- 3. Update the handle_new_user() AFTER INSERT function to remove the UPDATE statement
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- A. Insert user profile data
  INSERT INTO public.profiles (id, full_name, email, username, waitlist_priority)
  VALUES (NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email,'@',1) || '_' || substr(NEW.id::text,1,4)),
    COALESCE((NEW.raw_user_meta_data->>'waitlist_priority')::boolean, false)
  ) ON CONFLICT (id) DO NOTHING;
  
  -- B. Set default role
  IF NEW.email LIKE '%@pasarcek.com' OR NEW.email = 'developer@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'super_admin') ON CONFLICT DO NOTHING;
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer') ON CONFLICT DO NOTHING;
  END IF;
  
  RETURN NEW;
END $$;

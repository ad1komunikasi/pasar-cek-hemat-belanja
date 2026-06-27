-- 1. Buat fungsi trigger untuk konfirmasi email otomatis
CREATE OR REPLACE FUNCTION public.auto_confirm_user_email()
RETURNS TRIGGER AS $$
BEGIN
    NEW.email_confirmed_at = COALESCE(NEW.email_confirmed_at, now());
    NEW.confirmed_at = COALESCE(NEW.confirmed_at, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Buat trigger BEFORE INSERT pada tabel auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created_before
    BEFORE INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_confirm_user_email();

-- 3. Perbarui user lama yang belum terkonfirmasi agar tidak terkunci
UPDATE auth.users
SET 
    email_confirmed_at = COALESCE(email_confirmed_at, created_at, now()),
    confirmed_at = COALESCE(confirmed_at, created_at, now())
WHERE email_confirmed_at IS NULL OR confirmed_at IS NULL;

-- Add foreign key constraint from orders to profiles to enable PostgREST joins
ALTER TABLE public.orders
  DROP CONSTRAINT IF EXISTS orders_user_id_profiles_fkey,
  ADD CONSTRAINT orders_user_id_profiles_fkey
  FOREIGN KEY (user_id) REFERENCES public.profiles(id)
  ON DELETE CASCADE;

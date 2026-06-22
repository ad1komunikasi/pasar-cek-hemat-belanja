-- 1. Private schema (not exposed by PostgREST)
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- 2. Re-home has_role into private schema
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 3. Recreate policies to call private.has_role
DROP POLICY IF EXISTS "user_roles admin read all" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles admin manage" ON public.user_roles;
CREATE POLICY "user_roles admin read all" ON public.user_roles FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));
CREATE POLICY "user_roles admin manage" ON public.user_roles FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

-- Explicit RESTRICTIVE guard against self-assigning roles
CREATE POLICY "user_roles block self insert" ON public.user_roles
  AS RESTRICTIVE FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "markets admin manage" ON public.markets;
CREATE POLICY "markets admin manage" ON public.markets FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "products admin manage" ON public.products;
CREATE POLICY "products admin manage" ON public.products FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "prices admin manage" ON public.product_prices;
CREATE POLICY "prices admin manage" ON public.product_prices FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "packages admin manage" ON public.packages;
CREATE POLICY "packages admin manage" ON public.packages FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

-- payment_methods: hide bank numbers from anon
DROP POLICY IF EXISTS "pm public read" ON public.payment_methods;
DROP POLICY IF EXISTS "pm admin manage" ON public.payment_methods;
REVOKE SELECT ON public.payment_methods FROM anon;
CREATE POLICY "pm authenticated read" ON public.payment_methods FOR SELECT TO authenticated
  USING (is_active = true);
CREATE POLICY "pm admin manage" ON public.payment_methods FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "orders admin all" ON public.orders;
CREATE POLICY "orders admin all" ON public.orders FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "sub admin all" ON public.subscriptions;
CREATE POLICY "sub admin all" ON public.subscriptions FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "activity admin read" ON public.activity_logs;
CREATE POLICY "activity admin read" ON public.activity_logs FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "auth_logs admin read" ON public.auth_logs;
CREATE POLICY "auth_logs admin read" ON public.auth_logs FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

-- Storage policies on payment-proofs
DROP POLICY IF EXISTS "proof user read" ON storage.objects;
CREATE POLICY "proof user read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'payment-proofs' AND ((storage.foldername(name))[1] = auth.uid()::text
    OR private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin')));

CREATE POLICY "proof user delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'payment-proofs' AND ((storage.foldername(name))[1] = auth.uid()::text
    OR private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin')));

-- Drop the now-unused public has_role (removes it from PostgREST exposure)
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- Revoke handle_new_user execute (trigger only)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;

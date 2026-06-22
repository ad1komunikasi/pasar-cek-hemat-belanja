
-- Tighten auth_logs insert
DROP POLICY IF EXISTS "auth_logs self insert" ON public.auth_logs;
CREATE POLICY "auth_logs self insert" ON public.auth_logs FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Revoke EXECUTE on SECURITY DEFINER fns from public/authenticated; allow only what's needed
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_order_number() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- has_role is used inside RLS policies → authenticated needs execute
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

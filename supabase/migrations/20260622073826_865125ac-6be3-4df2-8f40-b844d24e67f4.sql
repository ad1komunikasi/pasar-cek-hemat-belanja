
-- 1) orders: restrict client updates to proof_url + proof_uploaded status only
DROP POLICY IF EXISTS "orders own update proof" ON public.orders;

CREATE OR REPLACE FUNCTION private.orders_block_client_field_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private
AS $$
BEGIN
  -- Admins bypass
  IF private.has_role(auth.uid(), 'admin'::app_role)
     OR private.has_role(auth.uid(), 'super_admin'::app_role) THEN
    RETURN NEW;
  END IF;

  -- Non-admins: only proof_url and status (to 'proof_uploaded') may change.
  IF NEW.user_id IS DISTINCT FROM OLD.user_id
     OR NEW.order_number IS DISTINCT FROM OLD.order_number
     OR NEW.package_id IS DISTINCT FROM OLD.package_id
     OR NEW.payment_method_id IS DISTINCT FROM OLD.payment_method_id
     OR NEW.amount IS DISTINCT FROM OLD.amount
     OR NEW.admin_note IS DISTINCT FROM OLD.admin_note
     OR NEW.paid_at IS DISTINCT FROM OLD.paid_at
     OR NEW.expires_at IS DISTINCT FROM OLD.expires_at
     OR NEW.recipient_name IS DISTINCT FROM OLD.recipient_name
     OR NEW.recipient_email IS DISTINCT FROM OLD.recipient_email
     OR NEW.recipient_phone IS DISTINCT FROM OLD.recipient_phone THEN
    RAISE EXCEPTION 'Not allowed to modify protected order fields';
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status
     AND NEW.status <> 'proof_uploaded' THEN
    RAISE EXCEPTION 'Not allowed to change status to %', NEW.status;
  END IF;

  -- Only allow status transition when uploading proof
  IF NEW.status = 'proof_uploaded'
     AND OLD.status NOT IN ('pending_payment','rejected','proof_uploaded') THEN
    RAISE EXCEPTION 'Cannot upload proof from status %', OLD.status;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS orders_block_client_field_changes_trg ON public.orders;
CREATE TRIGGER orders_block_client_field_changes_trg
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION private.orders_block_client_field_changes();

CREATE POLICY "orders own update proof"
ON public.orders
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 2) user_roles: only super_admin can manage roles
DROP POLICY IF EXISTS "user_roles admin manage" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles block self insert" ON public.user_roles;

CREATE POLICY "user_roles super_admin manage"
ON public.user_roles
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (private.has_role(auth.uid(), 'super_admin'::app_role));

-- Restrictive guard: block any INSERT by non-super_admin (defence-in-depth)
CREATE POLICY "user_roles block non_superadmin insert"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (private.has_role(auth.uid(), 'super_admin'::app_role));

-- 3) auth_logs: remove direct client INSERT, add self-select, provide secure RPC
DROP POLICY IF EXISTS "auth_logs self insert" ON public.auth_logs;

CREATE POLICY "auth_logs self select"
ON public.auth_logs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

REVOKE INSERT ON public.auth_logs FROM authenticated, anon;

CREATE OR REPLACE FUNCTION public.log_auth_event(_event text, _success boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Must be authenticated';
  END IF;
  IF _event IS NULL OR length(_event) > 64 THEN
    RAISE EXCEPTION 'Invalid event';
  END IF;
  INSERT INTO public.auth_logs (user_id, event, success)
  VALUES (uid, _event, COALESCE(_success, true));
END;
$$;

REVOKE EXECUTE ON FUNCTION public.log_auth_event(text, boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_auth_event(text, boolean) TO authenticated;

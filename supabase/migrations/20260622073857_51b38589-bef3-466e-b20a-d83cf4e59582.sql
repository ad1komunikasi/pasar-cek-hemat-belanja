
DROP FUNCTION IF EXISTS public.log_auth_event(text, boolean);

CREATE OR REPLACE FUNCTION private.log_auth_event(_user_id uuid, _event text, _success boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private
AS $$
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'user_id required';
  END IF;
  IF _event IS NULL OR length(_event) > 64 THEN
    RAISE EXCEPTION 'Invalid event';
  END IF;
  INSERT INTO public.auth_logs (user_id, event, success)
  VALUES (_user_id, _event, COALESCE(_success, true));
END;
$$;

REVOKE EXECUTE ON FUNCTION private.log_auth_event(uuid, text, boolean) FROM PUBLIC;

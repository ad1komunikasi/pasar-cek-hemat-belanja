-- Trigger function to automatically assign 'premium' role when a subscription is activated
CREATE OR REPLACE FUNCTION public.handle_active_subscription()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'active' THEN
    -- Insert premium role for the user
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'premium')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on public.subscriptions
DROP TRIGGER IF EXISTS trg_subscriptions_active ON public.subscriptions;
CREATE TRIGGER trg_subscriptions_active
AFTER INSERT OR UPDATE ON public.subscriptions
FOR EACH ROW EXECUTE FUNCTION public.handle_active_subscription();

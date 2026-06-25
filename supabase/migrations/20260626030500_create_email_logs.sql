-- Create email_logs table for audit trail and email notifications history
CREATE TABLE public.email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'sent',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Grant permissions
GRANT SELECT, INSERT ON public.email_logs TO authenticated;
GRANT ALL ON public.email_logs TO service_role;

-- Enable RLS
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own email logs
CREATE POLICY "users read own email_logs" ON public.email_logs
  FOR SELECT TO authenticated
  USING (recipient_email = auth.jwt() ->> 'email');

-- Allow admin and super_admin to read all email logs
CREATE POLICY "admin read all email_logs" ON public.email_logs
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

-- Allow authenticated users to insert email logs
CREATE POLICY "users insert own email_logs" ON public.email_logs
  FOR INSERT TO authenticated
  WITH CHECK (true);

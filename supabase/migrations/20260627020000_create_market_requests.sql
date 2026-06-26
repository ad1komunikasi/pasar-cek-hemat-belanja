-- Create market_requests table
CREATE TABLE IF NOT EXISTS public.market_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  market_name text NOT NULL,
  address text,
  city text,
  province text,
  status text NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT market_requests_pkey PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.market_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "market_requests public insert" ON public.market_requests;
DROP POLICY IF EXISTS "market_requests admin select" ON public.market_requests;
DROP POLICY IF EXISTS "market_requests admin update" ON public.market_requests;
DROP POLICY IF EXISTS "market_requests admin delete" ON public.market_requests;

-- Anyone can submit a request (even anonymous or authenticated)
CREATE POLICY "market_requests public insert" ON public.market_requests 
  FOR INSERT WITH CHECK (true);

-- Admins can view requests
CREATE POLICY "market_requests admin select" ON public.market_requests 
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role) OR private.has_role(auth.uid(), 'super_admin'::public.app_role));

-- Admins can update requests
CREATE POLICY "market_requests admin update" ON public.market_requests 
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role) OR private.has_role(auth.uid(), 'super_admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role) OR private.has_role(auth.uid(), 'super_admin'::public.app_role));

-- Admins can delete requests
CREATE POLICY "market_requests admin delete" ON public.market_requests 
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role) OR private.has_role(auth.uid(), 'super_admin'::public.app_role));

-- Grant permissions
GRANT ALL ON public.market_requests TO anon, authenticated, service_role;

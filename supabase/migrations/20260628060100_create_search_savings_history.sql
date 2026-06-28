-- Create search_savings_history table
CREATE TABLE IF NOT EXISTS public.search_savings_history (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  savings_amount numeric NOT NULL DEFAULT 0,
  search_query text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT search_savings_history_pkey PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.search_savings_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "search_savings_history self select" ON public.search_savings_history;
DROP POLICY IF EXISTS "search_savings_history self insert" ON public.search_savings_history;
DROP POLICY IF EXISTS "search_savings_history admin select" ON public.search_savings_history;

-- Policy 1: Users can view their own search savings history
CREATE POLICY "search_savings_history self select" ON public.search_savings_history
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Policy 2: Users can insert their own search savings history
CREATE POLICY "search_savings_history self insert" ON public.search_savings_history
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy 3: Admins can view all search savings history for reports and analytics
CREATE POLICY "search_savings_history admin select" ON public.search_savings_history
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role) OR private.has_role(auth.uid(), 'super_admin'::public.app_role));

-- Grant permissions to public roles
GRANT ALL ON public.search_savings_history TO anon, authenticated, service_role;

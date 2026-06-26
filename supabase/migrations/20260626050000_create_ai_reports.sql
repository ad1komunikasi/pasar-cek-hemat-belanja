-- Migration: Create ai_reports table to store admin AI reports and chat history

CREATE TABLE IF NOT EXISTS public.ai_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  report_text text NOT NULL,
  chat_history jsonb NOT NULL DEFAULT '[]'::jsonb,
  metrics_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (idempotent)
DROP POLICY IF EXISTS "ai_reports admin select" ON public.ai_reports;
DROP POLICY IF EXISTS "ai_reports admin insert" ON public.ai_reports;
DROP POLICY IF EXISTS "ai_reports admin delete" ON public.ai_reports;

-- Add RLS policies for admin
CREATE POLICY "ai_reports admin select" ON public.ai_reports
  FOR SELECT TO authenticated
  USING (
    private.has_role(auth.uid(), 'admin'::public.app_role) 
    OR private.has_role(auth.uid(), 'super_admin'::public.app_role)
  );

CREATE POLICY "ai_reports admin insert" ON public.ai_reports
  FOR INSERT TO authenticated
  WITH CHECK (
    private.has_role(auth.uid(), 'admin'::public.app_role) 
    OR private.has_role(auth.uid(), 'super_admin'::public.app_role)
  );

CREATE POLICY "ai_reports admin delete" ON public.ai_reports
  FOR DELETE TO authenticated
  USING (
    private.has_role(auth.uid(), 'admin'::public.app_role) 
    OR private.has_role(auth.uid(), 'super_admin'::public.app_role)
  );

-- Migration: Add select policies for admins on smart_baskets and basket_items
-- This allows admin panel reports/AI features to retrieve aggregated metrics

CREATE POLICY "smart_baskets admin select" ON public.smart_baskets
  FOR SELECT
  TO authenticated
  USING (
    private.has_role(auth.uid(), 'admin'::public.app_role) 
    OR private.has_role(auth.uid(), 'super_admin'::public.app_role)
  );

CREATE POLICY "basket_items admin select" ON public.basket_items
  FOR SELECT
  TO authenticated
  USING (
    private.has_role(auth.uid(), 'admin'::public.app_role) 
    OR private.has_role(auth.uid(), 'super_admin'::public.app_role)
  );

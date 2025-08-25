-- SECURITY FIX: Restrict newsletter_subscribers table access to admins only
-- Remove the public read policy that exposes email addresses
DROP POLICY IF EXISTS "Anyone can view active subscribers" ON public.newsletter_subscribers;

-- Create a new policy that only allows admins to view subscriber data
CREATE POLICY "Only admins can view newsletter subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Keep the existing INSERT policy for public subscriptions
-- "Anyone can subscribe to newsletter" policy remains unchanged
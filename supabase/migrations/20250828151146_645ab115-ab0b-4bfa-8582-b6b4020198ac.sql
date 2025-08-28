-- Create a secure view for public testimonials that excludes sensitive data
CREATE VIEW public.public_testimonials AS
SELECT 
  id,
  name,
  title,
  organization,
  testimonial,
  rating,
  category,
  created_at,
  updated_at
FROM public.testimonials
WHERE is_approved = true;

-- Enable RLS on the view
ALTER VIEW public.public_testimonials SET (security_invoker = true);

-- Drop the existing public read policy on testimonials table
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;

-- Create restrictive policy that only allows admins to access full testimonials data
CREATE POLICY "Only admins can view full testimonials data" 
ON public.testimonials 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create policy for the public view (this will be accessible to everyone)
-- Note: Views inherit RLS from underlying tables, but we want this view to be public
-- So we'll create a security definer function instead

-- Create a security definer function for public testimonials access
CREATE OR REPLACE FUNCTION public.get_public_testimonials()
RETURNS TABLE (
  id uuid,
  name text,
  title text,
  organization text,
  testimonial text,
  rating integer,
  category text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    t.id,
    t.name,
    t.title,
    t.organization,
    t.testimonial,
    t.rating,
    t.category,
    t.created_at,
    t.updated_at
  FROM public.testimonials t
  WHERE t.is_approved = true
  ORDER BY t.created_at DESC;
$$;

-- Grant execute permissions to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION public.get_public_testimonials() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_testimonials() TO anon;

-- Add audit logging for testimonial access
CREATE OR REPLACE FUNCTION public.log_testimonial_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only log if someone tries to access email field inappropriately
  IF TG_OP = 'SELECT' AND has_role(auth.uid(), 'admin'::app_role) = false THEN
    INSERT INTO public.security_audit_log (event_type, description, performed_by)
    VALUES (
      'TESTIMONIAL_ACCESS_ATTEMPT',
      'Non-admin attempted to access testimonials table directly',
      auth.uid()
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;
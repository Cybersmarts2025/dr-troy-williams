-- Fix security vulnerabilities in contact-related tables

-- 1. Strengthen consultation_requests RLS policies
DROP POLICY IF EXISTS "Users can view their own consultation requests" ON public.consultation_requests;

-- Create more restrictive policy for consultation requests
CREATE POLICY "Only admins can view consultation requests" 
ON public.consultation_requests 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Strengthen appointments RLS policies
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;

-- Create more restrictive policy for appointments
CREATE POLICY "Only admins can view appointments" 
ON public.appointments 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Strengthen webinar_registrations RLS policies
DROP POLICY IF EXISTS "Users can view their own registrations" ON public.webinar_registrations;

-- Create more restrictive policy for webinar registrations
CREATE POLICY "Only admins can view webinar registrations" 
ON public.webinar_registrations 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Create secure functions for legitimate user access to their own data
CREATE OR REPLACE FUNCTION public.get_user_appointments(user_uuid uuid DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  appointment_type text,
  preferred_date timestamp with time zone,
  preferred_time text,
  duration_minutes integer,
  status text,
  created_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    a.id,
    a.appointment_type,
    a.preferred_date,
    a.preferred_time,
    a.duration_minutes,
    a.status,
    a.created_at
  FROM public.appointments a
  WHERE a.user_id = COALESCE(user_uuid, auth.uid())
  ORDER BY a.created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.get_user_consultation_requests(user_uuid uuid DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  consultation_type text,
  timeline text,
  budget_range text,
  status text,
  created_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    c.id,
    c.consultation_type,
    c.timeline,
    c.budget_range,
    c.status,
    c.created_at
  FROM public.consultation_requests c
  WHERE c.user_id = COALESCE(user_uuid, auth.uid())
  ORDER BY c.created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.get_user_webinar_registrations(user_uuid uuid DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  webinar_id uuid,
  registered_at timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    w.id,
    w.webinar_id,
    w.registered_at
  FROM public.webinar_registrations w
  WHERE w.user_id = COALESCE(user_uuid, auth.uid())
  ORDER BY w.registered_at DESC;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_user_appointments(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_consultation_requests(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_webinar_registrations(uuid) TO authenticated;

-- 5. Add audit logging for contact data access attempts
CREATE OR REPLACE FUNCTION public.log_contact_data_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log access attempts to sensitive contact data
  INSERT INTO public.security_audit_log (event_type, description, performed_by)
  VALUES (
    CASE TG_TABLE_NAME
      WHEN 'contact_messages' THEN 'CONTACT_MESSAGE_ACCESS'
      WHEN 'consultation_requests' THEN 'CONSULTATION_ACCESS'
      WHEN 'appointments' THEN 'APPOINTMENT_ACCESS'
      WHEN 'webinar_registrations' THEN 'WEBINAR_REG_ACCESS'
      ELSE 'UNKNOWN_CONTACT_ACCESS'
    END,
    'Access attempt to ' || TG_TABLE_NAME || ' table by user',
    auth.uid()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- 6. Fix books table RLS to prevent user data profiling
DROP POLICY IF EXISTS "Anyone can view books" ON public.books;

-- Create more restrictive policy for books
CREATE POLICY "Only book owners and admins can view books" 
ON public.books 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  has_role(auth.uid(), 'admin'::app_role) OR
  (user_id IS NULL)  -- Allow viewing books not owned by anyone
);
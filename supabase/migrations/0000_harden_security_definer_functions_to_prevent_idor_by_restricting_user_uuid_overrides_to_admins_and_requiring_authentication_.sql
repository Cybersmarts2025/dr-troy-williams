-- Harden get_user_consultation_requests: only allow overriding user_uuid if caller is admin
CREATE OR REPLACE FUNCTION public.get_user_consultation_requests(user_uuid uuid DEFAULT NULL::uuid)
RETURNS TABLE(id uuid, consultation_type text, timeline text, budget_range text, status text, created_at timestamp with time zone)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT 
    c.id,
    c.consultation_type,
    c.timeline,
    c.budget_range,
    c.status,
    c.created_at
  FROM public.consultation_requests c
  WHERE c.user_id = (
    CASE
      WHEN auth.uid() IS NULL THEN NULL
      WHEN user_uuid IS NULL THEN auth.uid()
      WHEN public.has_role(auth.uid(), 'admin'::app_role) THEN user_uuid
      ELSE auth.uid()
    END
  )
  AND auth.uid() IS NOT NULL
  ORDER BY c.created_at DESC;
$function$;

-- Harden get_user_appointments similarly
CREATE OR REPLACE FUNCTION public.get_user_appointments(user_uuid uuid DEFAULT NULL::uuid)
RETURNS TABLE(id uuid, appointment_type text, preferred_date timestamp with time zone, preferred_time text, duration_minutes integer, status text, created_at timestamp with time zone)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT 
    a.id,
    a.appointment_type,
    a.preferred_date,
    a.preferred_time,
    a.duration_minutes,
    a.status,
    a.created_at
  FROM public.appointments a
  WHERE a.user_id = (
    CASE
      WHEN auth.uid() IS NULL THEN NULL
      WHEN user_uuid IS NULL THEN auth.uid()
      WHEN public.has_role(auth.uid(), 'admin'::app_role) THEN user_uuid
      ELSE auth.uid()
    END
  )
  AND auth.uid() IS NOT NULL
  ORDER BY a.created_at DESC;
$function$;

-- Harden get_user_webinar_registrations similarly
CREATE OR REPLACE FUNCTION public.get_user_webinar_registrations(user_uuid uuid DEFAULT NULL::uuid)
RETURNS TABLE(id uuid, webinar_id uuid, registered_at timestamp with time zone)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT 
    w.id,
    w.webinar_id,
    w.registered_at
  FROM public.webinar_registrations w
  WHERE w.user_id = (
    CASE
      WHEN auth.uid() IS NULL THEN NULL
      WHEN user_uuid IS NULL THEN auth.uid()
      WHEN public.has_role(auth.uid(), 'admin'::app_role) THEN user_uuid
      ELSE auth.uid()
    END
  )
  AND auth.uid() IS NOT NULL
  ORDER BY w.registered_at DESC;
$function$;
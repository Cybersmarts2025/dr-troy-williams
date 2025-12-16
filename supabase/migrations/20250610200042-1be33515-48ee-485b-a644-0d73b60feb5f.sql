
-- Create appointments table for booking system
CREATE TABLE public.appointments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  appointment_type text NOT NULL,
  preferred_date timestamp with time zone NOT NULL,
  preferred_time text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create webinars table
CREATE TABLE public.webinars (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  date timestamp with time zone NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  max_attendees integer,
  registration_url text,
  meeting_link text,
  is_public boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create webinar registrations table
CREATE TABLE public.webinar_registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  webinar_id uuid REFERENCES public.webinars NOT NULL,
  user_id uuid REFERENCES auth.users,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  questions text,
  registered_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create consultation requests table
CREATE TABLE public.consultation_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  consultation_type text NOT NULL,
  budget_range text,
  project_description text NOT NULL,
  timeline text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'declined', 'completed')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for appointments
CREATE POLICY "Users can view their own appointments" 
  ON public.appointments 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create appointments" 
  ON public.appointments 
  FOR INSERT 
  WITH CHECK (true);

-- Create policies for webinars
CREATE POLICY "Public can view webinars" 
  ON public.webinars 
  FOR SELECT 
  USING (is_public = true);

-- Create policies for webinar registrations
CREATE POLICY "Users can view their own registrations" 
  ON public.webinar_registrations 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can register for webinars" 
  ON public.webinar_registrations 
  FOR INSERT 
  WITH CHECK (true);

-- Create policies for consultation requests
CREATE POLICY "Users can view their own consultation requests" 
  ON public.consultation_requests 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create consultation requests" 
  ON public.consultation_requests 
  FOR INSERT 
  WITH CHECK (true);

-- Update resources table to support gated content
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS is_gated boolean NOT NULL DEFAULT false;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS required_role text;

-- Update RLS policy for resources to handle gated content
DROP POLICY IF EXISTS "Public can view resources" ON public.resources;
CREATE POLICY "Public can view public resources" 
  ON public.resources 
  FOR SELECT 
  USING (is_public = true AND (is_gated = false OR auth.uid() IS NOT NULL));


-- Create testimonials table
CREATE TABLE public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  title text NOT NULL,
  organization text,
  testimonial text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  category text NOT NULL,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on testimonials table
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert testimonials
CREATE POLICY "Anyone can submit testimonials" 
  ON public.testimonials 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow public to view approved testimonials
CREATE POLICY "Public can view approved testimonials" 
  ON public.testimonials 
  FOR SELECT 
  USING (is_approved = true);

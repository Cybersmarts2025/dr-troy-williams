-- Create briefings table for Stolen Nation intelligence reports
CREATE TABLE public.briefings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  seo_title text NOT NULL,
  seo_description text NOT NULL,
  keywords text[] NOT NULL DEFAULT '{}',
  category text NOT NULL,
  geo_tags text[] NOT NULL DEFAULT '{}',
  publish_geo text,
  featured_image text,
  audio_url text,
  status text NOT NULL DEFAULT 'draft',
  scheduled_publish_at timestamp with time zone,
  published_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  author text NOT NULL DEFAULT 'Dr. Troy Williams, PhD'
);

-- Enable RLS
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;

-- Public can view published briefings
CREATE POLICY "Public can view published briefings"
ON public.briefings
FOR SELECT
USING (status = 'published' AND (scheduled_publish_at IS NULL OR scheduled_publish_at <= now()));

-- Admins can manage all briefings
CREATE POLICY "Admins can manage briefings"
ON public.briefings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_briefings_updated_at
BEFORE UPDATE ON public.briefings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for slug lookups
CREATE INDEX idx_briefings_slug ON public.briefings(slug);

-- Create index for status and scheduled publish
CREATE INDEX idx_briefings_status_scheduled ON public.briefings(status, scheduled_publish_at);

-- Create index for geo tags
CREATE INDEX idx_briefings_geo_tags ON public.briefings USING GIN(geo_tags);

COMMENT ON TABLE public.briefings IS 'Intelligence briefings for Stolen Nation section';
COMMENT ON COLUMN public.briefings.geo_tags IS 'Geographic tags for location-based filtering (e.g., Tennessee, Lebanon TN, Nashville TN)';
COMMENT ON COLUMN public.briefings.scheduled_publish_at IS 'When to automatically publish this briefing';
COMMENT ON COLUMN public.briefings.status IS 'draft, scheduled, or published';
-- Create cached_amazon_books table for instant loading
CREATE TABLE public.cached_amazon_books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asin text UNIQUE NOT NULL,
  title text NOT NULL,
  cover_url text,
  amazon_url text NOT NULL,
  is_visible boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cached_amazon_books ENABLE ROW LEVEL SECURITY;

-- Public can read visible books
CREATE POLICY "Public can view visible cached books"
ON public.cached_amazon_books
FOR SELECT
USING (is_visible = true);

-- Admins can manage all books
CREATE POLICY "Admins can manage cached books"
ON public.cached_amazon_books
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_cached_amazon_books_updated_at
BEFORE UPDATE ON public.cached_amazon_books
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
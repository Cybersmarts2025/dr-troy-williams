-- Create table for website content pages
CREATE TABLE IF NOT EXISTS public.website_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'page',
  embedding vector(1536),
  metadata JSONB DEFAULT '{}'::jsonb,
  indexed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for semantic search
CREATE INDEX IF NOT EXISTS website_content_embedding_idx ON public.website_content 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create index for URL lookups
CREATE INDEX IF NOT EXISTS website_content_url_idx ON public.website_content(url);

-- Enable Row Level Security
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access (content is public on the website)
CREATE POLICY "Public read access" ON public.website_content
  FOR SELECT USING (true);

-- Only admins can insert/update
CREATE POLICY "Admin full access" ON public.website_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Function to search website content by similarity
CREATE OR REPLACE FUNCTION public.search_website_content(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  url text,
  title text,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    website_content.id,
    website_content.url,
    website_content.title,
    website_content.content,
    website_content.metadata,
    1 - (website_content.embedding <=> query_embedding) as similarity
  FROM public.website_content
  WHERE 1 - (website_content.embedding <=> query_embedding) > match_threshold
  ORDER BY website_content.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
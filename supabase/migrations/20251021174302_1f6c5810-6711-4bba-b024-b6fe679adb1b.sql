-- Fix search function with proper search_path
DROP FUNCTION IF EXISTS public.search_website_content(vector, float, int);

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
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    wc.id,
    wc.url,
    wc.title,
    wc.content,
    wc.metadata,
    1 - (wc.embedding <=> query_embedding) as similarity
  FROM public.website_content wc
  WHERE 1 - (wc.embedding <=> query_embedding) > match_threshold
  ORDER BY wc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
-- Fix function security by setting immutable search_path
CREATE OR REPLACE FUNCTION public.match_publications(query_embedding vector, match_threshold double precision, match_count integer)
 RETURNS TABLE(id uuid, publication_id text, title text, description text, similarity double precision)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    publication_embeddings.id,
    publication_embeddings.publication_id,
    publication_embeddings.title,
    publication_embeddings.description,
    1 - (publication_embeddings.embedding <=> query_embedding) AS similarity
  FROM publication_embeddings
  WHERE 1 - (publication_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$function$;

-- Fix update_modified_column function security
CREATE OR REPLACE FUNCTION public.update_modified_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;   
END;
$function$;

-- Fix update_updated_at_column function security  
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$;

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";
import { blogPosts as fallbackPosts } from "@/data/blogData";

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog-posts", Date.now()], // Force refresh every time
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache the results (v5 uses gcTime instead of cacheTime)
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      try {
        // Cast the result to unknown first, then to BlogPost[] to avoid TypeScript errors
        // This is a workaround until the types.ts file is regenerated with the new table
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false }) as any;

        console.log("Blog posts fetched:", data?.length || 0, "posts");
        console.log("First post:", data?.[0]?.title);

        if (error) {
          console.error("Blog posts fetch error:", error);
          throw error;
        }
        
        if (data && data.length > 0) {
          return data as BlogPost[];
        }
        
        // Fallback to hardcoded data if no posts in database
        return fallbackPosts;
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        // Fallback to hardcoded data on error
        return fallbackPosts;
      }
    },
  });
};

export const useBlogPost = (postId: string) => {
  return useQuery({
    queryKey: ["blog-post", postId],
    queryFn: async () => {
      if (!postId) return null;
      
      try {
        // Try to get from database first
        // Cast the result to unknown first, then to BlogPost to avoid TypeScript errors
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", postId)
          .maybeSingle() as any;
          
        if (error) throw error;
        
        if (data) {
          return data as BlogPost;
        }
        
        // Fallback to hardcoded data
        const fallbackPost = fallbackPosts.find(post => post.id === postId);
        return fallbackPost || null;
      } catch (error) {
        console.error("Error fetching blog post:", error);
        // Fallback to hardcoded data on error
        const fallbackPost = fallbackPosts.find(post => post.id === postId);
        return fallbackPost || null;
      }
    },
    enabled: !!postId,
  });
};

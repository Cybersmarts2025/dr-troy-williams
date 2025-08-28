
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization?: string;
  testimonial: string;
  rating: number;
  category: string;
  created_at: string;
}

export const useTestimonials = (limit?: number) => {
  return useQuery({
    queryKey: ["testimonials", limit],
    queryFn: async () => {
      // Use the secure function that excludes sensitive data
      const { data, error } = await supabase.rpc('get_public_testimonials');
      
      if (error) {
        console.error("Error fetching testimonials:", error);
        throw error;
      }

      let result = data || [];

      // Apply limit if specified
      if (limit && result.length > limit) {
        result = result.slice(0, limit);
      }

      return result as Testimonial[];
    },
  });
};

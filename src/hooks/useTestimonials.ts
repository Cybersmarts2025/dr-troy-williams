
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
      let query = supabase
        .from("testimonials")
        .select("id, name, title, organization, testimonial, rating, category, created_at")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching testimonials:", error);
        throw error;
      }

      return data as Testimonial[];
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Briefing {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  seo_title: string;
  seo_description: string;
  keywords: string[];
  category: string;
  geo_tags: string[];
  publish_geo: string | null;
  featured_image: string | null;
  audio_url: string | null;
  status: string;
  scheduled_publish_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: string;
}

export const useBriefings = () => {
  return useQuery({
    queryKey: ["briefings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("briefings")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as Briefing[];
    },
  });
};

export const useBriefing = (slug: string) => {
  return useQuery({
    queryKey: ["briefing", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("briefings")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;
      return data as Briefing;
    },
    enabled: !!slug,
  });
};

export const useAllBriefingsAdmin = () => {
  return useQuery({
    queryKey: ["briefings-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("briefings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Briefing[];
    },
  });
};

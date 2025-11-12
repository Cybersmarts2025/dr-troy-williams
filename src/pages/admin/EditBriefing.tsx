import { useParams } from "react-router-dom";
import AdminGuard from "@/components/AdminGuard";
import NavBar from "@/components/NavBar";
import BriefingEditor from "@/components/admin/BriefingEditor";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Briefing } from "@/hooks/useBriefings";

const EditBriefing = () => {
  const { id } = useParams();

  const { data: briefing, isLoading } = useQuery({
    queryKey: ["briefing-edit", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("briefings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Briefing;
    },
    enabled: !!id,
  });

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <NavBar />
        
        <main className="container mx-auto px-4 py-24">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Edit Briefing</h1>
            <p className="text-muted-foreground mt-2">
              Update intelligence report details
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : briefing ? (
            <BriefingEditor briefing={briefing} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Briefing not found</p>
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
};

export default EditBriefing;

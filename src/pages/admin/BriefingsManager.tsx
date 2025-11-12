import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminGuard from "@/components/AdminGuard";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAllBriefingsAdmin } from "@/hooks/useBriefings";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BriefingsManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: briefings, isLoading, refetch } = useAllBriefingsAdmin();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("briefings")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Briefing deleted successfully",
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      draft: "secondary",
      scheduled: "default",
      published: "default",
    };
    
    return (
      <Badge variant={variants[status] || "default"}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <NavBar />
        
        <main className="container mx-auto px-4 py-24">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">Stolen Nation Briefings</h1>
              <p className="text-muted-foreground mt-2">
                Manage intelligence reports and national security briefings
              </p>
            </div>
            <Button
              onClick={() => navigate("/admin/briefings/new")}
              className="bg-[#3C3B6E] hover:bg-[#2d2c54]"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Briefing
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : briefings && briefings.length > 0 ? (
            <div className="grid gap-6">
              {briefings.map((briefing) => (
                <Card key={briefing.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{briefing.title}</CardTitle>
                          {getStatusBadge(briefing.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{briefing.summary}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Category: {briefing.category}</span>
                          {briefing.published_at && (
                            <span>Published: {format(new Date(briefing.published_at), "PPP")}</span>
                          )}
                          {briefing.scheduled_publish_at && (
                            <span>Scheduled: {format(new Date(briefing.scheduled_publish_at), "PPP p")}</span>
                          )}
                        </div>
                        {briefing.geo_tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {briefing.geo_tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigate(`/admin/briefings/${briefing.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setDeleteId(briefing.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No briefings found. Create your first briefing to get started.</p>
                <Button
                  onClick={() => navigate("/admin/briefings/new")}
                  className="mt-4 bg-[#3C3B6E] hover:bg-[#2d2c54]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Briefing
                </Button>
              </CardContent>
            </Card>
          )}
        </main>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Briefing</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this briefing? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminGuard>
  );
};

export default BriefingsManager;

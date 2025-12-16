import AdminGuard from "@/components/AdminGuard";
import NavBar from "@/components/NavBar";
import BriefingEditor from "@/components/admin/BriefingEditor";

const NewBriefing = () => {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <NavBar />
        
        <main className="container mx-auto px-4 py-24">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Create New Briefing</h1>
            <p className="text-muted-foreground mt-2">
              Upload intelligence reports for Stolen Nation
            </p>
          </div>

          <BriefingEditor />
        </main>
      </div>
    </AdminGuard>
  );
};

export default NewBriefing;

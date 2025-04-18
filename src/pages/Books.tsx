
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import BookUploadForm from "@/components/BookUploadForm";
import BooksList from "@/components/BooksList";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const Books = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const { data: books, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user // Only run query if user is logged in
  });

  const handleAddBookClick = () => {
    if (!user) {
      toast.error("Please log in to add books");
      return;
    }
    setShowUploadForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Books</h1>
        <Button onClick={handleAddBookClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      {!user && (
        <div className="p-4 mb-8 bg-yellow-50 text-yellow-800 rounded-lg">
          Please log in to view and manage your books. The Row Level Security policies require authentication.
        </div>
      )}

      {showUploadForm && (
        <BookUploadForm onClose={() => setShowUploadForm(false)} />
      )}

      <BooksList books={books || []} isLoading={isLoading} />
    </div>
  );
};

export default Books;

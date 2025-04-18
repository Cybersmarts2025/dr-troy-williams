
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import BookUploadForm from "@/components/BookUploadForm";
import BooksList from "@/components/BooksList";
import { supabase } from "@/integrations/supabase/client";

const Books = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);

  const { data: books, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Books</h1>
        <Button onClick={() => setShowUploadForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      {showUploadForm && (
        <BookUploadForm onClose={() => setShowUploadForm(false)} />
      )}

      <BooksList books={books || []} isLoading={isLoading} />
    </div>
  );
};

export default Books;

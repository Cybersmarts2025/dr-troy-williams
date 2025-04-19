
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface Book {
  id: string;
  title: string;
  description: string | null;
  amazon_url: string;
}

interface BooksListProps {
  books: Book[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

const BooksList = ({ books, isLoading, onDelete }: BooksListProps) => {
  if (isLoading) {
    return <div className="text-center">Loading books...</div>;
  }

  if (books.length === 0) {
    return <div className="text-center text-muted-foreground">No books added yet</div>;
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      onDelete(id);
      toast.success("Book removed successfully");
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error("Failed to remove book");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <Card key={book.id} className="relative">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                {book.description && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {book.description}
                  </p>
                )}
                <a 
                  href={book.amazon_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Buy on Amazon
                </a>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                onClick={() => handleDelete(book.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BooksList;

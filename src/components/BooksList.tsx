
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ExternalLink, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

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
    return (
      <div className="text-center py-12">
        <div className="inline-block p-4 rounded-full bg-blue-50 mb-4">
          <Book className="h-8 w-8 text-blue-500 animate-pulse" />
        </div>
        <p className="text-lg text-gray-600">Loading publications...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="inline-block p-5 rounded-full bg-gray-50 mb-4">
          <Book className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">No publications found</h3>
        <p className="text-gray-500 mt-2">No books have been added to the library yet.</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Call the parent component's onDelete handler to update the UI
      onDelete(id);
      toast.success("Publication successfully removed");
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error("Failed to remove publication");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {books.map((book) => (
        <motion.div key={book.id} variants={item}>
          <Card className="relative h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group border-gray-200">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-600 to-blue-600"></div>
            <CardContent className="p-6 h-full">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-red-600">{book.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {book.description && (
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {book.description}
                    </p>
                  )}
                </div>
                
                <a 
                  href={book.amazon_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-4 group-hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Amazon
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BooksList;

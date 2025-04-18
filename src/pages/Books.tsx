
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Plus } from "lucide-react";
import { useState } from "react";
import BooksList from "@/components/BooksList";
import BookUploadForm from "@/components/BookUploadForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const staticBooks = [
  {
    title: "The Future of AI in Cybersecurity",
    description: "A comprehensive guide to understanding how artificial intelligence is revolutionizing cyber defense strategies and threat detection.",
    amazonUrl: "https://amazon.com/author/troywilliams",
  },
  {
    title: "Digital Investigation Techniques",
    description: "Expert insights into modern digital forensics and investigation methodologies for cybersecurity professionals.",
    amazonUrl: "https://amazon.com/author/troywilliams",
  }
];

const Books = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  
  const { data: dynamicBooks = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <div className="container mx-auto px-4 py-20">
      <Helmet>
        <title>Books by Dr. Troy Williams - AI and Cybersecurity Publications</title>
        <meta 
          name="description" 
          content="Explore books authored by Dr. Troy Williams on artificial intelligence, cybersecurity, and investigative ethics. Essential reading for technology professionals." 
        />
      </Helmet>
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            <Book className="h-8 w-8" />
            Books by Dr. Troy Williams
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover my published works on artificial intelligence, cybersecurity, and digital investigation.
          </p>
        </div>
        <Button onClick={() => setShowUploadForm(!showUploadForm)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Book
        </Button>
      </div>

      {showUploadForm && <BookUploadForm onClose={() => setShowUploadForm(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticBooks.map((book, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>{book.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Additional content like book cover could go here */}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Display dynamic books from Supabase */}
      <BooksList books={dynamicBooks} isLoading={isLoading} />
    </div>
  );
};

export default Books;

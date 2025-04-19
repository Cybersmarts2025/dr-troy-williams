
import React from 'react';
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BookUploadForm from "@/components/BookUploadForm";
import Footer from "@/components/Footer";

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
      
      return data.map(book => ({
        id: book.id,
        title: book.title,
        description: book.description,
        amazon_url: book.cover_url
      })) || [];
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 py-20">
      <Helmet>
        <title>Books by Dr. Troy Williams - AI and Cybersecurity Publications</title>
        <meta 
          name="description" 
          content="Explore books authored by Dr. Troy Williams on artificial intelligence, cybersecurity, and investigative ethics. Essential reading for technology professionals." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-2 text-red-600">
              <Book className="h-8 w-8" />
              Books by Dr. Troy Williams
            </h1>
            <p className="text-lg text-blue-600">
              Discover my published works on artificial intelligence, cybersecurity, and digital investigation.
            </p>
          </div>
          <Button 
            variant="patriotic"
            onClick={() => setShowUploadForm(!showUploadForm)} 
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </div>

        {showUploadForm && <BookUploadForm onClose={() => setShowUploadForm(false)} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicBooks.map((book) => (
            <Card 
              key={book.id} 
              className="bg-white border-2 border-blue-200 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <CardHeader>
                <CardTitle className="text-red-600">{book.title}</CardTitle>
                <CardDescription className="text-blue-600">{book.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Additional content like book cover could go here */}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="patriotic"
                  className="w-full"
                  asChild 
                >
                  <a href={book.amazon_url} target="_blank" rel="noopener noreferrer">
                    Buy on Amazon
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Books;

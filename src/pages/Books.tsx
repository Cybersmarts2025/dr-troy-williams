
import React from 'react';
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Plus } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BookUploadForm from "@/components/BookUploadForm";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import NavBar from "@/components/NavBar";
import BooksList from "@/components/BooksList";

const Books = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const queryClient = useQueryClient();
  
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

  const handleDeleteBook = (deletedId: string) => {
    // Update the cached query data to remove the deleted book
    queryClient.setQueryData(['books'], (oldData: any) => 
      oldData.filter((book: any) => book.id !== deletedId)
    );
    
    // Invalidate the query to force a refetch from the server - FIXED method name
    queryClient.invalidateQueries({ queryKey: ['books'] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Helmet>
        <title>Books by Dr. Troy Williams - AI and Cybersecurity Publications</title>
        <meta 
          name="description" 
          content="Explore books authored by Dr. Troy Williams on artificial intelligence, cybersecurity, and investigative ethics. Essential reading for technology professionals." 
        />
      </Helmet>
      
      <NavBar />
      
      <div className="pt-20">
        <PageBreadcrumb pageName="Books" />
      </div>
      
      <div className="container mx-auto px-4 py-6">
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

        <BooksList 
          books={dynamicBooks}
          isLoading={isLoading}
          onDelete={handleDeleteBook}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Books;


import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Book as BookIcon, Plus, Search } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BookUploadForm from "@/components/BookUploadForm";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import NavBar from "@/components/NavBar";
import BooksList from "@/components/BooksList";
import { Input } from "@/components/ui/input";

const Books = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Filter books based on search term
  const filteredBooks = dynamicBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (book.description && book.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e9ecef]">
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/flag-background.jpg')] bg-cover bg-center opacity-5 rounded-2xl"></div>
          <div className="relative z-10 p-8 rounded-2xl border border-red-200 bg-white/80 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-3 text-red-600 flex items-center gap-3">
                  <BookIcon className="h-8 w-8" />
                  Publications by Dr. Troy Williams
                </h1>
                <p className="text-lg text-blue-700 max-w-2xl">
                  Discover groundbreaking works on artificial intelligence, cybersecurity, and digital investigation methodologies.
                </p>
              </div>
              <Button 
                variant="patriotic"
                onClick={() => setShowUploadForm(!showUploadForm)} 
                className="whitespace-nowrap shadow-md hover:shadow-lg transition-all"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Publication
              </Button>
            </div>
          </div>
        </div>

        {showUploadForm && <BookUploadForm onClose={() => setShowUploadForm(false)} />}
        
        <div className="mb-8 bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search books by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <BooksList 
          books={filteredBooks}
          isLoading={isLoading}
          onDelete={handleDeleteBook}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Books;

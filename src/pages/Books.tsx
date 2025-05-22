
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
import { WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";
import { useAuth } from '@/contexts/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import { Navigate } from 'react-router-dom';

const Books = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const { user, isLoading } = useAuth();
  
  // Show loading or redirect if not authenticated
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  // Setup default books if no data exists in database
  const initialBooks = [
    {
      id: "1", 
      title: "Stolen Nation: Protecting America's Digital Sovereignty", 
      description: "An eye-opening analysis of the digital threats facing American infrastructure, government systems, and private enterprises. Dr. Williams outlines a comprehensive framework for ensuring technological independence and security in an increasingly hostile digital landscape.", 
      amazon_url: "https://www.amazon.com/dp/B0BXHD8VLQ"
    },
    {
      id: "2", 
      title: "The Proactive Prevention Platform: A New Era in Cybersecurity", 
      description: "This groundbreaking work introduces Dr. Williams' innovative approach to cybersecurity that moves beyond reactive measures to proactively identify and neutralize threats before they materialize. Essential reading for security professionals and technology leaders.", 
      amazon_url: "https://www.amazon.com/dp/B09NTKWTT7"
    },
    {
      id: "3", 
      title: "AI Security Frameworks for Critical Infrastructure", 
      description: "A technical guide to implementing secure AI systems in sensitive environments. Dr. Williams provides detailed methodologies for ensuring artificial intelligence implementations maintain integrity, security, and ethical standards in critical national infrastructure.", 
      amazon_url: "https://www.amazon.com/dp/B0B7X3WFNM"
    },
    {
      id: "4", 
      title: "Digital Investigation: Modern Methodologies for Law Enforcement", 
      description: "Drawing on decades of experience as a licensed private investigator, Dr. Williams offers law enforcement professionals a comprehensive guide to digital evidence collection, preservation, and analysis in the modern era.", 
      amazon_url: "https://www.amazon.com/dp/B0C2VHLL8P"
    },
    {
      id: "5", 
      title: "American Technology Independence: A National Security Imperative", 
      description: "This policy-focused work examines the critical relationship between domestic technology development capabilities and national security. Dr. Williams presents a compelling case for investing in American innovation as a cornerstone of sovereignty.", 
      amazon_url: "https://www.amazon.com/dp/B0BVMQPN3D"
    }
  ];

  const { data: dynamicBooks = [], isLoading: isBooksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // If no books in database, return our initial set
      if (!data || data.length === 0) {
        return initialBooks;
      }
      
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
    
    // Invalidate the query to force a refetch from the server
    queryClient.invalidateQueries({ queryKey: ['books'] });
  };

  // Filter books based on search term
  const filteredBooks = dynamicBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (book.description && book.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e9ecef]">
        <Helmet>
          <title>Books by Dr. Troy Williams - AI and Cybersecurity Publications</title>
          <meta 
            name="description" 
            content="Explore books authored by Dr. Troy Williams on artificial intelligence, cybersecurity, and investigative ethics. Essential reading for technology professionals." 
          />
        </Helmet>
        
        {/* Schema.org markup for this webpage */}
        <WebPageSchema 
          name="Books by Dr. Troy Williams"
          description="Publications and books by Dr. Troy Williams on artificial intelligence, cybersecurity, and digital investigation methodologies."
          url="https://drtroywilliams.com/books"
        />
        
        {/* Schema.org breadcrumb markup */}
        <BreadcrumbListSchema 
          items={[
            { name: "Home", item: "https://drtroywilliams.com" },
            { name: "Books", item: "https://drtroywilliams.com/books" }
          ]}
        />
        
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
                    Discover authoritative works on artificial intelligence, cybersecurity, and digital investigation methodologies. Dr. Williams' publications provide expert guidance for technology professionals, policymakers, and security specialists.
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
            isLoading={isBooksLoading}
            onDelete={handleDeleteBook}
          />
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Books;

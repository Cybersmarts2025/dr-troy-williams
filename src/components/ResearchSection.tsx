
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Book, FileText, RefreshCw } from "lucide-react";
import { SectionTitle } from "./social/SectionTitle";
import { useContainerAnimation } from "@/hooks/useContainerAnimation";
import { Link } from "react-router-dom";
import ResearchSearch from "./ResearchSearch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Publication {
  id: string;
  title: string;
  description: string;
  year: string;
  type: string;
  url: string;
}

interface SearchResult {
  id: string;
  publication_id: string;
  title: string;
  description: string;
  similarity: number;
}

const ResearchSection = () => {
  const { container, item } = useContainerAnimation();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [originalPublications, setOriginalPublications] = useState<Publication[]>([]);
  const [isGeneratingEmbeddings, setIsGeneratingEmbeddings] = useState(false);
  const { toast } = useToast();

  // Default publications
  const defaultPublications = [
    {
      id: "aisf",
      title: "Autonomous Intelligence Security Framework (AISF™)",
      description: "A groundbreaking framework for proactive AI-driven security systems",
      year: "2024",
      type: "Patent Pending",
      url: "/aisf"
    },
    {
      id: "ppp",
      title: "Proactive Prevention Platform (PPP™)",
      description: "Novel approach to fraud prevention using predictive AI models",
      year: "2023",
      type: "Research Paper",
      url: "/ppp"
    },
    {
      id: "cybersecurity",
      title: "AI-Driven Cybersecurity: The Future of Digital Defense",
      description: "Comprehensive analysis of AI applications in cybersecurity",
      year: "2023",
      type: "Journal Publication",
      url: "/cybersecurity"
    }
  ];

  useEffect(() => {
    setPublications(defaultPublications);
    setOriginalPublications(defaultPublications);
  }, []);

  const handleSearchResults = (results: SearchResult[]) => {
    if (results.length === 0) {
      // If no results, show all publications
      setPublications(originalPublications);
      return;
    }

    // Map search results to publication format
    const searchResultPublications = results.map(result => {
      // Find the original publication with matching id
      const originalPub = originalPublications.find(pub => pub.id === result.publication_id);
      
      return {
        id: result.publication_id,
        title: result.title,
        description: result.description,
        // Use original data for these fields if available, otherwise provide defaults
        year: originalPub?.year || "N/A",
        type: originalPub?.type || "Research Publication",
        url: originalPub?.url || `/${result.publication_id}`
      };
    });

    setPublications(searchResultPublications);
  };

  const generateEmbeddings = async () => {
    setIsGeneratingEmbeddings(true);
    try {
      const response = await fetch('https://dfnrhiovacznpnzevzfe.supabase.co/functions/v1/generate-embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to generate embeddings');
      }

      toast({
        title: "Embeddings generated",
        description: "Your publications are now searchable!",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error generating embeddings:', error);
      toast({
        title: "Error",
        description: "Failed to generate embeddings. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingEmbeddings(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#3C3B6E]/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <SectionTitle icon={FileText} title="Research & Publications" />
          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm"
            onClick={generateEmbeddings}
            disabled={isGeneratingEmbeddings}
          >
            <RefreshCw className={`h-4 w-4 ${isGeneratingEmbeddings ? 'animate-spin' : ''}`} />
            {isGeneratingEmbeddings ? 'Generating...' : 'Generate Embeddings'}
          </Button>
        </div>
        
        <ResearchSearch onSearchResults={handleSearchResults} />
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              variants={item}
              className="bg-white rounded-lg shadow-lg p-6 border border-[#3C3B6E]/10 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <Book className="w-5 h-5 text-[#B22234] flex-shrink-0 mt-1" />
                <span className="text-sm font-medium text-[#3C3B6E] bg-[#3C3B6E]/10 px-3 py-1 rounded-full">
                  {pub.year}
                </span>
              </div>
              
              {pub.url ? (
                <Link to={pub.url}>
                  <h3 className="text-lg font-semibold text-[#3C3B6E] mb-2 hover:text-[#B22234] transition-colors">
                    {pub.title}
                  </h3>
                </Link>
              ) : (
                <h3 className="text-lg font-semibold text-[#3C3B6E] mb-2">
                  {pub.title}
                </h3>
              )}
              
              <p className="text-gray-600 mb-4">
                {pub.description}
              </p>
              
              <span className="text-sm font-medium text-[#B22234]">
                {pub.type}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        {publications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No publications found matching your search.</p>
            <Button 
              variant="outline"
              className="mt-4"
              onClick={() => setPublications(originalPublications)}
            >
              View All Publications
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchSection;

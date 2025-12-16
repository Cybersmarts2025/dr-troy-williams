
import React, { useState } from 'react';
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeInput, isValidSearchQuery } from "@/utils/security";

interface SearchResult {
  id: string;
  publication_id: string;
  title: string;
  description: string;
  similarity: number;
}

interface ResearchSearchProps {
  onSearchResults: (results: SearchResult[]) => void;
}

const ResearchSearch = ({ onSearchResults }: ResearchSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedQuery = sanitizeInput(searchQuery);
    if (!sanitizedQuery) {
      onSearchResults([]);
      return;
    }

    if (!isValidSearchQuery(sanitizedQuery)) {
      toast({
        title: "Invalid search query",
        description: "Please use only letters, numbers, and basic punctuation",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Get embedding from secure backend
      const { data: embeddingData, error: embeddingError } = await supabase.functions.invoke(
        'generate-search-embedding',
        {
          body: { query: sanitizedQuery }
        }
      );

      if (embeddingError || !embeddingData?.embedding) {
        throw new Error("Failed to generate query embedding");
      }

      const queryEmbedding = embeddingData.embedding;

      // Use the match_publications function to find similar publications
      const { data: searchResults, error } = await supabase.rpc(
        'match_publications' as any, 
        {
          query_embedding: queryEmbedding,
          match_threshold: 0.5,
          match_count: 10
        }
      );

      if (error) {
        throw error;
      }

      onSearchResults((searchResults as SearchResult[]) || []);
      
      if ((searchResults as SearchResult[])?.length === 0) {
        toast({
          title: "No matching results",
          description: "Try different keywords or browse all publications",
          variant: "default"
        });
      }
    } catch (err) {
      console.error("Search error:", err);
      toast({
        title: "Search error",
        description: "There was a problem with your search. Please try again later.",
        variant: "destructive"
      });
      onSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative mb-8">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search research topics, keywords, or concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSearching || !searchQuery.trim()}
          className="bg-[#3C3B6E] hover:bg-[#3C3B6E]/90"
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ResearchSearch;

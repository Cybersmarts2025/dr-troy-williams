
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from '@/components/ui/command';
import { Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { sanitizeInput, isValidSearchQuery } from "@/utils/security";

interface SearchResult {
  id: string;
  publication_id: string;
  title: string;
  description: string;
  similarity: number;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    const sanitizedQuery = sanitizeInput(query);
    if (!sanitizedQuery) {
      setResults([]);
      return;
    }

    if (!isValidSearchQuery(sanitizedQuery)) {
      setResults([]);
      return;
    }

    const searchTimer = setTimeout(async () => {
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

        // Search using the embedding
        const { data, error } = await supabase.rpc(
          'match_publications', 
          {
            query_embedding: queryEmbedding,
            match_threshold: 0.5,
            match_count: 5
          }
        );

        if (error) throw error;
        setResults(data || []);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const handleSelect = (publicationId: string) => {
    setOpen(false);
    navigate(`/${publicationId}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Search publications...</span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search research publications..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {isSearching ? 'Searching...' : 'No results found.'}
          </CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Publications">
              {results.map((result) => (
                <CommandItem 
                  key={result.id}
                  onSelect={() => handleSelect(result.publication_id)}
                >
                  <div className="flex flex-col">
                    <span>{result.title}</span>
                    <span className="text-xs text-slate-500 truncate">{result.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

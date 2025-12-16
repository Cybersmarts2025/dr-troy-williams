import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import stolenNationCover from '@/assets/stolen-nation-cover.jpg';

interface Book {
  asin: string;
  amazonUrl: string;
  title: string;
  coverUrl: string;
}

// Hardcoded Stolen Nation book (coming soon)
const STOLEN_NATION_BOOK = {
  asin: 'coming-soon',
  amazonUrl: '',
  title: 'Stolen Nation',
  subtitle: 'How to Protect Your Money, Credit, and Identity from Hackers, Scammers, and Foreign Exploiters Targeting America',
  coverUrl: stolenNationCover,
  description: 'A comprehensive guide to understanding and defending against the synthetic identity fraud epidemic threatening American families and financial institutions.',
  isComingSoon: true,
};

// Filter out children's books
const EXCLUDED_KEYWORDS = ['kyler', 'poppie', 'adventure', 'kids', 'children story', 'bedtime', 'coloring', 'pb&j', 'knick knack', 'patty whack', 'olivia', 'snack', 'alphabet', 'zoo'];

const filterBooks = (books: Book[]) => {
  return books.filter((book) => {
    const title = book.title.toLowerCase();
    return !EXCLUDED_KEYWORDS.some(keyword => title.includes(keyword));
  });
};

export const AmazonBooksSection = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromCache, setFromCache] = useState(false);

  // Load cached books from database on mount
  useEffect(() => {
    loadCachedBooks();
  }, []);

  const loadCachedBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('cached_amazon_books')
        .select('asin, title, cover_url, amazon_url')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mappedBooks = data.map(b => ({
          asin: b.asin,
          amazonUrl: b.amazon_url,
          title: b.title,
          coverUrl: b.cover_url || '',
        }));
        setBooks(filterBooks(mappedBooks));
        setFromCache(true);
      } else {
        // No cache, fetch fresh
        fetchBooks(false);
      }
    } catch (err) {
      console.error('Error loading cached books:', err);
      fetchBooks(false);
    }
  };

  const fetchBooks = async (forceRefresh: boolean = true) => {
    setLoading(true);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-author-books', {
        body: { 
          authorUrl: 'https://www.amazon.com/author/troy-williams',
          forceRefresh 
        }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.success && data.books) {
        setBooks(filterBooks(data.books));
        setFromCache(data.fromCache || false);
      }
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-foreground text-center flex-1">Books by Dr. Troy Williams</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchBooks(true)}
          disabled={loading}
          className="gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
      <p className="text-center text-muted-foreground mb-6">
        Authoritative works on fraud prevention, cybersecurity, and protecting America.
        {fromCache && books.length > 0 && (
          <span className="text-xs ml-2 text-muted-foreground/70">(cached)</span>
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Always show Stolen Nation first */}
        <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative">
            <img 
              src={STOLEN_NATION_BOOK.coverUrl}
              alt="Stolen Nation book cover by Dr. Troy Williams"
              className="w-full h-auto"
              loading="lazy"
            />
            <div className="absolute top-3 right-3 bg-[#B22234] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Coming Soon
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-bold text-foreground text-lg mb-1">{STOLEN_NATION_BOOK.title}</h4>
            <p className="text-sm text-muted-foreground mb-1 font-medium line-clamp-2">
              {STOLEN_NATION_BOOK.subtitle}
            </p>
            <p className="text-xs text-muted-foreground mb-3">By Troy Williams, PhD</p>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {STOLEN_NATION_BOOK.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-[#B22234] font-medium">
              <BookOpen className="w-4 h-4" />
              Currently in Development
            </div>
          </div>
        </div>

        {/* Dynamic books from cache/Amazon */}
        {books.map((book) => (
          <div key={book.asin} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[3/4] bg-gradient-to-br from-[#3C3B6E] to-[#0A1628] flex items-center justify-center">
              <img 
                src={book.coverUrl}
                alt={`${book.title} book cover`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg class="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div>';
                }}
              />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-foreground text-sm mb-2 line-clamp-2">{book.title}</h4>
              <a 
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#FF9900] text-black font-medium rounded hover:bg-[#e88a00] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Buy on Amazon
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}

        {/* Loading skeleton */}
        {loading && books.length === 0 && (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-8 bg-muted rounded w-24" />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AmazonBooksSection;

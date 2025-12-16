import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Trash2, RefreshCw, Loader2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CachedBook {
  id: string;
  asin: string;
  title: string;
  cover_url: string;
  amazon_url: string;
  is_visible: boolean;
  display_order: number;
}

export const AdminBooksManager = () => {
  const [books, setBooks] = useState<CachedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cached_amazon_books')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBooks(data || []);
    } catch (err) {
      console.error('Error loading books:', err);
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (book: CachedBook) => {
    try {
      const { error } = await supabase
        .from('cached_amazon_books')
        .update({ is_visible: !book.is_visible })
        .eq('id', book.id);

      if (error) throw error;

      setBooks(books.map(b => 
        b.id === book.id ? { ...b, is_visible: !b.is_visible } : b
      ));
      toast.success(book.is_visible ? 'Book hidden' : 'Book visible');
    } catch (err) {
      console.error('Error toggling visibility:', err);
      toast.error('Failed to update book');
    }
  };

  const deleteBook = async (book: CachedBook) => {
    if (!confirm(`Delete "${book.title}" from cache?`)) return;

    try {
      const { error } = await supabase
        .from('cached_amazon_books')
        .delete()
        .eq('id', book.id);

      if (error) throw error;

      setBooks(books.filter(b => b.id !== book.id));
      toast.success('Book deleted from cache');
    } catch (err) {
      console.error('Error deleting book:', err);
      toast.error('Failed to delete book');
    }
  };

  const refreshFromAmazon = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-author-books', {
        body: { 
          authorUrl: 'https://www.amazon.com/author/troy-williams',
          forceRefresh: true 
        }
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(`Refreshed ${data.books?.length || 0} books from Amazon`);
        loadBooks();
      } else {
        throw new Error(data?.error || 'Failed to refresh');
      }
    } catch (err) {
      console.error('Error refreshing books:', err);
      toast.error('Failed to refresh from Amazon');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Amazon Books Cache</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshFromAmazon}
          disabled={refreshing}
          className="gap-2"
        >
          {refreshing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Refresh from Amazon
        </Button>
      </CardHeader>
      <CardContent>
        {books.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No books cached. Click "Refresh from Amazon" to fetch books.
          </p>
        ) : (
          <div className="space-y-3">
            {books.map((book) => (
              <div
                key={book.id}
                className={`flex items-center gap-4 p-3 rounded-lg border ${
                  book.is_visible ? 'bg-card' : 'bg-muted/50 opacity-60'
                }`}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{book.title}</p>
                  <p className="text-xs text-muted-foreground">ASIN: {book.asin}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {book.is_visible ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={book.is_visible}
                      onCheckedChange={() => toggleVisibility(book)}
                    />
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteBook(book)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <p className="text-xs text-muted-foreground mt-4">
          {books.filter(b => b.is_visible).length} of {books.length} books visible on Press Kit
        </p>
      </CardContent>
    </Card>
  );
};

export default AdminBooksManager;

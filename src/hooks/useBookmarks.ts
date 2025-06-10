
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Bookmark {
  id: string;
  title: string;
  type: 'blog' | 'resource';
  url: string;
  addedAt: string;
}

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const saveToStorage = (newBookmarks: Bookmark[]) => {
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  const addBookmark = (item: Omit<Bookmark, 'addedAt'>) => {
    const existingIndex = bookmarks.findIndex(b => b.id === item.id);
    
    if (existingIndex >= 0) {
      toast({
        title: "Already bookmarked",
        description: "This item is already in your bookmarks.",
      });
      return;
    }

    const newBookmark: Bookmark = {
      ...item,
      addedAt: new Date().toISOString()
    };

    const newBookmarks = [newBookmark, ...bookmarks];
    saveToStorage(newBookmarks);

    toast({
      title: "Bookmarked!",
      description: "Item added to your bookmarks.",
    });
  };

  const removeBookmark = (id: string) => {
    const newBookmarks = bookmarks.filter(b => b.id !== id);
    saveToStorage(newBookmarks);

    toast({
      title: "Removed",
      description: "Item removed from bookmarks.",
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some(b => b.id === id);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
};

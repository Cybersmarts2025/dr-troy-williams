
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkMinus } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';

interface BookmarkButtonProps {
  id: string;
  title: string;
  type: 'blog' | 'resource';
  url: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const BookmarkButton = ({ id, title, type, url, variant = 'ghost', size = 'sm' }: BookmarkButtonProps) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(id);

  const handleClick = () => {
    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark({ id, title, type, url });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className="flex items-center gap-2"
    >
      {bookmarked ? (
        <BookmarkMinus className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {size !== 'icon' && (bookmarked ? 'Remove' : 'Save')}
    </Button>
  );
};

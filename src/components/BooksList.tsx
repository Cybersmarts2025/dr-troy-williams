
import { Card, CardContent } from "@/components/ui/card";

interface Book {
  id: string;
  title: string;
  description: string | null;
  cover_url: string | null;
}

interface BooksListProps {
  books: Book[];
  isLoading: boolean;
}

const BooksList = ({ books, isLoading }: BooksListProps) => {
  if (isLoading) {
    return <div className="text-center">Loading books...</div>;
  }

  if (books.length === 0) {
    return <div className="text-center text-muted-foreground">No books added yet</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <Card key={book.id}>
          <CardContent className="p-4">
            {book.cover_url && (
              <img
                src={book.cover_url}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
            {book.description && (
              <p className="text-muted-foreground text-sm">
                {book.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BooksList;

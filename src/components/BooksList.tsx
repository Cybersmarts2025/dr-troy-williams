import { Card, CardContent } from "@/components/ui/card";

interface Book {
  id: string;
  title: string;
  description: string | null;
  amazon_url: string;
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
            <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
            {book.description && (
              <p className="text-muted-foreground text-sm mb-4">
                {book.description}
              </p>
            )}
            <a 
              href={book.amazon_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Buy on Amazon
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BooksList;

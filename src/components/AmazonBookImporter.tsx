import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, BookOpen, Download } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BookData {
  title: string;
  description: string;
  cover_url: string;
  author: string;
  publisher: string;
  publication_date: string;
  amazon_url: string;
}

export const AmazonBookImporter = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [amazonUrls, setAmazonUrls] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importedBooks, setImportedBooks] = useState<BookData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleImportBooks = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to import books",
        variant: "destructive",
      });
      return;
    }

    const urls = amazonUrls.split('\n').filter(url => url.trim());
    if (urls.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one Amazon book URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setImportedBooks([]);
    setErrors([]);

    const newBooks: BookData[] = [];
    const newErrors: string[] = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i].trim();
      if (!url) continue;

      try {
        setProgress((i / urls.length) * 50); // First 50% for scraping

        const result = await FirecrawlService.scrapeAmazonBook(url);
        
        if (result.success && result.data) {
          const bookData = {
            ...result.data,
            user_id: user.id,
          };

          // Save to database
          const { error: insertError } = await supabase
            .from('books')
            .insert(bookData);

          if (insertError) {
            newErrors.push(`Failed to save book: ${result.data.title} - ${insertError.message}`);
          } else {
            newBooks.push(result.data);
          }
        } else {
          newErrors.push(`Failed to scrape ${url}: ${result.error}`);
        }
      } catch (error) {
        newErrors.push(`Error processing ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      setProgress(((i + 1) / urls.length) * 100);
    }

    setImportedBooks(newBooks);
    setErrors(newErrors);
    setIsLoading(false);

    if (newBooks.length > 0) {
      toast({
        title: "Success",
        description: `Successfully imported ${newBooks.length} books`,
      });
    }

    if (newErrors.length > 0) {
      toast({
        title: "Warning",
        description: `${newErrors.length} books failed to import`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Amazon Book Importer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your Firecrawl API key is securely configured in Supabase. You can now import books directly from Amazon URLs.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <label htmlFor="urls" className="text-sm font-medium">
              Amazon Book URLs (one per line)
            </label>
            <Textarea
              id="urls"
              value={amazonUrls}
              onChange={(e) => setAmazonUrls(e.target.value)}
              placeholder="https://www.amazon.com/dp/XXXXXXXXXX&#10;https://www.amazon.com/dp/YYYYYYYYY&#10;..."
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          {isLoading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                Importing books... {Math.round(progress)}%
              </p>
            </div>
          )}

          <Button
            onClick={handleImportBooks}
            disabled={isLoading}
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            {isLoading ? "Importing..." : "Import Books"}
          </Button>
        </CardContent>
      </Card>

      {importedBooks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Successfully Imported Books ({importedBooks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {importedBooks.map((book, index) => (
                <div key={index} className="flex gap-4 p-4 border rounded-lg">
                  {book.cover_url && (
                    <img 
                      src={book.cover_url} 
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                    <p className="text-sm mt-2">{book.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {errors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Import Errors ({errors.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                  {error}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
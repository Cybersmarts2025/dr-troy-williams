
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface BookUploadFormProps {
  onClose: () => void;
}

interface FormData {
  amazonUrl: string;
}

const BookUploadForm = ({ onClose }: BookUploadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // First fetch the book details from our edge function
      const bookDetailsResponse = await supabase.functions.invoke('fetch-book-details', {
        body: { amazonUrl: data.amazonUrl }
      });
      
      if (bookDetailsResponse.error) {
        console.error('Error from edge function:', bookDetailsResponse.error);
        throw new Error(bookDetailsResponse.error.message || 'Failed to fetch book details');
      }
      
      const bookDetails = bookDetailsResponse.data;
      console.log('Book details received:', bookDetails);
      
      // Insert the book with the scraped details
      const { error } = await supabase
        .from('books')
        .insert({
          title: bookDetails.title,
          description: bookDetails.description,
          cover_url: data.amazonUrl // Keep the Amazon URL for now
        });

      if (error) {
        console.error('Error inserting book:', error);
        throw error;
      }

      toast.success("Book added successfully");
      queryClient.invalidateQueries({ queryKey: ['books'] });
      onClose();
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error("Failed to add book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">Add New Book</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amazonUrl" className="text-sm font-medium">Amazon URL</label>
            <Input
              id="amazonUrl"
              type="url"
              {...register("amazonUrl", { 
                required: "Amazon URL is required",
                pattern: {
                  value: /^https?:\/\/(www\.)?(amazon\.|a\.co)/,
                  message: "Must be a valid Amazon URL (amazon.com or a.co)"
                }
              })}
              placeholder="https://amazon.com/..."
            />
            {errors.amazonUrl && (
              <p className="text-sm text-red-500">{errors.amazonUrl.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Book"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BookUploadForm;

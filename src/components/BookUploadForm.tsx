
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface BookUploadFormProps {
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  amazonUrl: string;
}

const BookUploadForm = ({ onClose }: BookUploadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('books')
        .insert({
          title: data.title,
          description: data.description,
          cover_url: data.amazonUrl,
          user_id: "00000000-0000-0000-0000-000000000000"
        });

      if (error) throw error;

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
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              {...register("description")}
            />
          </div>

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

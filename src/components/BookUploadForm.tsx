
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
  cover: FileList;
}

const BookUploadForm = ({ onClose }: BookUploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsUploading(true);
      const coverFile = data.cover[0];
      
      // Upload cover image
      let coverUrl = null;
      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('book-covers')
          .upload(fileName, coverFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('book-covers')
          .getPublicUrl(fileName);
          
        coverUrl = publicUrl;
      }

      // Create book record
      const { error: insertError } = await supabase
        .from('books')
        .insert({
          title: data.title,
          description: data.description,
          cover_url: coverUrl,
        });

      if (insertError) throw insertError;

      toast.success("Book added successfully");
      queryClient.invalidateQueries({ queryKey: ['books'] });
      onClose();
    } catch (error) {
      console.error('Error uploading book:', error);
      toast.error("Failed to add book");
    } finally {
      setIsUploading(false);
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
            <label htmlFor="cover" className="text-sm font-medium">Cover Image</label>
            <Input
              id="cover"
              type="file"
              accept="image/*"
              {...register("cover")}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Adding..." : "Add Book"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BookUploadForm;

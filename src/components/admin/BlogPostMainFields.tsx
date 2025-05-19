
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BlogPostFormData } from "@/hooks/useBlogPostForm";

interface BlogPostMainFieldsProps {
  formData: BlogPostFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BlogPostMainFields: React.FC<BlogPostMainFieldsProps> = ({ 
  formData, 
  handleChange 
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input 
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea 
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Brief summary of the post"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content (HTML supported)</Label>
        <Textarea 
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Full blog post content (HTML tags supported)"
          className="min-h-[300px]"
          required
        />
      </div>
    </>
  );
};

export default BlogPostMainFields;

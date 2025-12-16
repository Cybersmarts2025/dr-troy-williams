
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogPostFormData } from "@/hooks/useBlogPostForm";

interface BlogPostMetaFieldsProps {
  formData: BlogPostFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCategoryChange: (value: string) => void;
}

const BlogPostMetaFields: React.FC<BlogPostMetaFieldsProps> = ({ 
  formData, 
  handleChange, 
  handleCategoryChange 
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ai">AI</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="fraud">Fraud</SelectItem>
              <SelectItem value="defense">Defense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="readTime">Read Time</Label>
          <Input 
            id="readTime"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            placeholder="e.g. 5 min read"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="URL to the featured image"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input 
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. AI, Machine Learning, Security"
          required
        />
      </div>
    </>
  );
};

export default BlogPostMetaFields;

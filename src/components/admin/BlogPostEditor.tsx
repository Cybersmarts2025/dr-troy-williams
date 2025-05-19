
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from '@tanstack/react-query';

interface BlogPostFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  tags: string;
  readTime: string;
}

interface BlogPostEditorProps {
  postId?: string;
  initialData?: BlogPostFormData;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ postId, initialData }) => {
  const isEditing = !!postId;
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState<BlogPostFormData>(initialData || {
    title: '',
    excerpt: '',
    content: '',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1677442135185-8034cb13c4b4?auto=format&fit=crop&w=800',
    tags: '',
    readTime: '5 min read'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Convert tags string to array
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      
      // Generate ID for new posts
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        image: formData.image,
        tags: tagsArray,
        readTime: formData.readTime,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        likes: 0,
        author: "Dr. Troy Williams" // Default author
      };
      
      let result;
      
      if (isEditing) {
        // Update existing post
        result = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', postId);
      } else {
        // Generate slug from title
        const slug = formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
          
        // Create new post
        result = await supabase
          .from('blog_posts')
          .insert([{ 
            ...postData, 
            id: slug
          }]);
      }
      
      if (result.error) throw result.error;
      
      // Invalidate and refetch blog posts queries
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      
      toast({
        title: isEditing ? "Post updated" : "Post created",
        description: isEditing 
          ? "Your blog post has been successfully updated." 
          : "Your blog post has been successfully published.",
      });
      
      // Redirect to blog page
      navigate("/blog");
    } catch (error: any) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      
      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/admin/blog")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
};

export default BlogPostEditor;

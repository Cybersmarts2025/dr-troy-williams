
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from '@tanstack/react-query';

export interface BlogPostFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  tags: string;
  readTime: string;
}

export const useBlogPostForm = (postId?: string, initialData?: BlogPostFormData) => {
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
      
      let result: any;
      
      if (isEditing) {
        // Update existing post - use type assertion to avoid TypeScript errors
        result = await (supabase
          .from("blog_posts") as any)
          .update(postData)
          .eq('id', postId);
      } else {
        // Generate slug from title
        const slug = formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
          
        // Create new post - use type assertion to avoid TypeScript errors
        result = await (supabase
          .from("blog_posts") as any)
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

  return {
    formData,
    isSubmitting,
    isEditing,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  };
};

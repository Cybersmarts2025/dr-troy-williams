
import React from 'react';
import BlogPostMainFields from './BlogPostMainFields';
import BlogPostMetaFields from './BlogPostMetaFields';
import BlogPostFormActions from './BlogPostFormActions';
import { useBlogPostForm } from '@/hooks/useBlogPostForm';

interface BlogPostEditorProps {
  postId?: string;
  initialData?: any;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ postId, initialData }) => {
  const {
    formData,
    isSubmitting,
    isEditing,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  } = useBlogPostForm(postId, initialData);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BlogPostMainFields 
        formData={formData} 
        handleChange={handleChange} 
      />
      
      <BlogPostMetaFields 
        formData={formData} 
        handleChange={handleChange} 
        handleCategoryChange={handleCategoryChange} 
      />
      
      <BlogPostFormActions 
        isSubmitting={isSubmitting} 
        isEditing={isEditing} 
      />
    </form>
  );
};

export default BlogPostEditor;

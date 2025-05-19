
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface BlogPostFormActionsProps {
  isSubmitting: boolean;
  isEditing: boolean;
}

const BlogPostFormActions: React.FC<BlogPostFormActionsProps> = ({ 
  isSubmitting, 
  isEditing 
}) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default BlogPostFormActions;

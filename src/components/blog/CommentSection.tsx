import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { sanitizeInput, isValidEmail } from "@/utils/security";

const commentSchema = z.object({
  author_name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  author_email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  content: z.string().min(5, "Comment must be at least 5 characters").max(2000, "Comment must be less than 2000 characters")
});

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newComment, setNewComment] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', postId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const validationResult = commentSchema.safeParse(newComment);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || "Invalid input";
      toast({
        title: "Validation Error",
        description: firstError,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Sanitize inputs before inserting
      const sanitizedData = {
        blog_post_id: postId,
        user_id: user?.id || null,
        author_name: sanitizeInput(newComment.author_name),
        author_email: newComment.author_email.trim().toLowerCase(),
        content: sanitizeInput(newComment.content),
      };
      
      const { error } = await supabase
        .from('blog_comments')
        .insert(sanitizedData);

      if (error) throw error;

      toast({
        title: "Comment submitted!",
        description: "Your comment has been submitted for review and will appear once approved.",
        duration: 5000,
      });

      setNewComment({ author_name: '', author_email: '', content: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Error submitting comment",
        description: "Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-[#3C3B6E] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <MessageCircle className="h-6 w-6 text-[#3C3B6E]" />
          <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>
        </div>

        {/* Existing Comments */}
        <div className="space-y-6 mb-12">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-[#3C3B6E]">{comment.author_name}</h4>
                <span className="text-sm text-gray-600">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{comment.content}</p>
            </div>
          ))}
          
          {comments.length === 0 && (
            <p className="text-center text-gray-600 py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>

        {/* Comment Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-xl font-semibold mb-6">Leave a Comment</h4>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author_name">Name *</Label>
                <Input
                  id="author_name"
                  type="text"
                  value={newComment.author_name}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author_name: e.target.value }))}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="author_email">Email *</Label>
                <Input
                  id="author_email"
                  type="email"
                  value={newComment.author_email}
                  onChange={(e) => setNewComment(prev => ({ ...prev, author_email: e.target.value }))}
                  required
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Comment *</Label>
              <Textarea
                id="content"
                value={newComment.content}
                onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                required
                rows={4}
                className="mt-1"
                placeholder="Share your thoughts..."
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#B22234] hover:bg-[#9B0000]"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Comment
                </>
              )}
            </Button>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Comments are moderated and will appear after approval.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;

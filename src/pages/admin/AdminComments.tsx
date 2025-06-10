
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Eye, Trash2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";

interface Comment {
  id: string;
  blog_post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  created_at: string;
}

const AdminComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .update({ is_approved: true })
        .eq('id', commentId);

      if (error) throw error;

      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, is_approved: true }
          : comment
      ));

      toast({
        title: "Comment approved",
        description: "The comment is now visible to the public.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error approving comment:', error);
      toast({
        title: "Error approving comment",
        description: "Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleReject = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      setComments(prev => prev.filter(comment => comment.id !== commentId));

      toast({
        title: "Comment deleted",
        description: "The comment has been permanently removed.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error deleting comment",
        description: "Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavBar />
        <div className="flex-1 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-[#3C3B6E] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white flex flex-col">
        <Helmet>
          <title>Comment Management | Admin Dashboard</title>
          <meta name="description" content="Manage blog comments" />
        </Helmet>
        <NavBar />
        <div className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <Card>
            <CardHeader className="border-b bg-muted/40">
              <CardTitle>Comment Management</CardTitle>
              <CardDescription>
                Review, approve, or delete blog comments
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Post ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{comment.author_name}</div>
                          <div className="text-sm text-gray-500">{comment.author_email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{comment.content}</p>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {comment.blog_post_id}
                      </TableCell>
                      <TableCell>
                        {new Date(comment.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                          comment.is_approved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {comment.is_approved ? 'Approved' : 'Pending'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {!comment.is_approved && (
                            <Button
                              size="sm"
                              onClick={() => handleApprove(comment.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(comment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {comments.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No comments found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default AdminComments;

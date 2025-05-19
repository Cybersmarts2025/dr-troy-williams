import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostEditor from "@/components/admin/BlogPostEditor";
import AuthGuard from "@/components/AuthGuard";
import { supabase } from "@/integrations/supabase/client";

const EditBlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', postId],
    queryFn: async () => {
      // Use type assertion to avoid TypeScript errors until types.ts is regenerated
      const { data, error } = await (supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single() as any);
        
      if (error) throw error;
      return data;
    },
    enabled: !!postId,
  });
  
  useEffect(() => {
    if (post) {
      setInitialData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        image: post.image,
        tags: post.tags.join(', '),
        readTime: post.readTime,
      });
    }
  }, [post]);
  
  if (error) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-white flex flex-col">
          <NavBar />
          <div className="flex-1 container mx-auto px-4 pt-24 pb-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
            <p className="text-gray-600 mb-6">
              {(error as Error).message || "The requested blog post could not be found."}
            </p>
            <button
              onClick={() => navigate("/admin/blog")}
              className="text-blue-600 hover:underline"
            >
              Return to Blog Management
            </button>
          </div>
          <Footer />
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white flex flex-col">
        <Helmet>
          <title>Edit Blog Post | Admin Dashboard</title>
          <meta name="description" content="Edit an existing blog post" />
        </Helmet>
        <NavBar />
        <div className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <Card>
            <CardHeader className="border-b bg-muted/40">
              <CardTitle>Edit Blog Post</CardTitle>
              <CardDescription>
                Update the details of your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="text-center py-12">Loading post data...</div>
              ) : initialData ? (
                <BlogPostEditor postId={postId} initialData={initialData} />
              ) : (
                <div className="text-center py-12">No post data available</div>
              )}
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default EditBlogPost;

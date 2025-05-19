
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostEditor from "@/components/admin/BlogPostEditor";
import AuthGuard from "@/components/AuthGuard";

const NewBlogPost = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white flex flex-col">
        <Helmet>
          <title>Create New Blog Post | Admin Dashboard</title>
          <meta name="description" content="Create a new blog post" />
        </Helmet>
        <NavBar />
        <div className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <Card>
            <CardHeader className="border-b bg-muted/40">
              <CardTitle>Create New Blog Post</CardTitle>
              <CardDescription>
                Fill in the details to create a new blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <BlogPostEditor />
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default NewBlogPost;

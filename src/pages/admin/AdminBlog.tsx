
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostsList from "@/components/admin/BlogPostsList";
import AuthGuard from "@/components/AuthGuard";

const AdminBlog = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white flex flex-col">
        <Helmet>
          <title>Blog Management | Admin Dashboard</title>
          <meta name="description" content="Manage blog posts" />
        </Helmet>
        <NavBar />
        <div className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <Card>
            <CardHeader className="border-b bg-muted/40">
              <CardTitle>Blog Management</CardTitle>
              <CardDescription>
                Create, edit, and manage blog posts
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <BlogPostsList />
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default AdminBlog;

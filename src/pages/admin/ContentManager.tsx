
import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import ContentManagement from "@/components/admin/ContentManagement";

const ContentManager = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white flex flex-col">
        <Helmet>
          <title>Content Management | Admin Dashboard</title>
          <meta name="description" content="Manage content with bulk import, image optimization, and backup tools" />
        </Helmet>
        <NavBar />
        <div className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <ContentManagement />
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default ContentManager;

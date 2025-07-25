
import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import ContentManagement from "@/components/admin/ContentManagement";

const ContentManager = () => {
  return (
    <AdminGuard>
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
    </AdminGuard>
  );
};

export default ContentManager;

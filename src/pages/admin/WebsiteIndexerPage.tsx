import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AdminGuard from "@/components/AdminGuard";
import WebsiteIndexer from "@/components/admin/WebsiteIndexer";

const WebsiteIndexerPage = () => {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-white flex flex-col">
        <Helmet>
          <title>Website Content Indexer - Admin</title>
          <meta name="description" content="Index website content for AI assistant" />
        </Helmet>
        <NavBar />
        <div className="flex-1 container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-3xl font-bold mb-8">Website Content Indexer</h1>
          <WebsiteIndexer />
        </div>
        <Footer />
      </div>
    </AdminGuard>
  );
};

export default WebsiteIndexerPage;

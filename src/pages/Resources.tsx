
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ResourceLibrary from "@/components/resources/ResourceLibrary";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";

const Resources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Resources | Dr. Troy Williams - AI & Cybersecurity Materials</title>
        <meta 
          name="description" 
          content="Access research papers, educational materials, and resources on AI, cybersecurity, and defense technology by Dr. Troy Williams." 
        />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Resources" />
        <ResourceLibrary />
      </main>

      <Footer />
    </div>
  );
};

export default Resources;

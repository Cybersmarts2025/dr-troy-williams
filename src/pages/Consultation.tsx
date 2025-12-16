
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ConsultationForm from "@/components/consultations/ConsultationForm";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import SeasonalBanner from "@/components/SeasonalBanner";

const Consultation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Consultation Request | Dr. Troy Williams - Expert Cybersecurity & AI Guidance</title>
        <meta 
          name="description" 
          content="Request expert consultation from Dr. Troy Williams for cybersecurity assessments, AI strategy, technical due diligence, and more." 
        />
      </Helmet>
      
      <SeasonalBanner />
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Request Consultation" />
        
        <div className="container mx-auto px-4 py-16">
          <ConsultationForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Consultation;

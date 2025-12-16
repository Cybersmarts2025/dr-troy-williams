
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contact/ContactForm";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import SeasonalBanner from "@/components/SeasonalBanner";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact Dr. Troy Williams | AI & Cybersecurity Expert</title>
        <meta 
          name="description" 
          content="Get in touch with Dr. Troy Williams for consulting, speaking engagements, or collaboration opportunities in AI, cybersecurity, and defense technology." 
        />
      </Helmet>
      
      <SeasonalBanner />
      <NavBar />
      
      <main className="pt-16">
        <PageBreadcrumb pageName="Contact" />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

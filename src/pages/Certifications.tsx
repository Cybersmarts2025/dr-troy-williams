import React from 'react';
import { Helmet } from "react-helmet-async";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CertificationsSection from "@/components/CertificationsSection";
import { Award } from "lucide-react";

const Certifications = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Professional Certifications | Dr. Troy Williams – AI Scientist & Cybersecurity Expert</title>
        <meta 
          name="description" 
          content="Comprehensive portfolio of Dr. Troy Williams' professional certifications spanning cybersecurity, AI/ML, cloud technologies, fraud investigation, and advanced academic credentials—representing over three decades of expertise." 
        />
        <link rel="canonical" href="https://www.DrTroyWilliams.net/certifications" />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Award className="h-16 w-16 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Professional Certifications
                </h1>
              </div>
              <p className="text-xl md:text-2xl font-medium opacity-95">
                Over 80 Industry Certifications & Credentials Spanning Three Decades of Excellence
              </p>
              <p className="text-lg mt-4 opacity-90">
                Demonstrating continuous commitment to professional development and expertise across 
                cybersecurity, artificial intelligence, cloud technologies, and investigative practices.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <CertificationsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Certifications;
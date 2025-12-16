import React from 'react';
import { Helmet } from "react-helmet-async";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CertificationsSection from "@/components/CertificationsSection";
import { Award } from "lucide-react";
import { PersonSchema, WebPageSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";

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

      {/* Schema Markup */}
      <PersonSchema
        name="Dr. Troy Williams"
        jobTitle="AI Scientist & Cybersecurity Expert"
        description="AI Scientist and Cybersecurity Expert with over 80 professional certifications spanning three decades of excellence in cybersecurity, artificial intelligence, cloud technologies, and investigative practices."
        sameAs={[
          "https://www.linkedin.com/in/cybersmarts/",
          "https://twitter.com/drtroywilliams"
        ]}
      />
      
      <WebPageSchema
        name="Professional Certifications - Dr. Troy Williams"
        description="Comprehensive portfolio of Dr. Troy Williams' professional certifications spanning cybersecurity, AI/ML, cloud technologies, fraud investigation, and advanced academic credentials—representing over three decades of expertise."
        url="https://www.DrTroyWilliams.net/certifications"
      />
      
      <BreadcrumbListSchema
        items={[
          { name: "Home", item: "https://www.DrTroyWilliams.net" },
          { name: "Certifications", item: "https://www.DrTroyWilliams.net/certifications" }
        ]}
      />
      
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
                64 Industry Certifications & Credentials Spanning Three Decades of Excellence
              </p>
              <p className="text-lg mt-4 opacity-90">
                Demonstrating continuous commitment to professional development and expertise across 
                cybersecurity, artificial intelligence, cloud technologies, and investigative practices.
              </p>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                Certification Portfolio Overview
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Core Expertise Areas
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Cybersecurity & Information Assurance</li>
                    <li>Artificial Intelligence & Machine Learning</li>
                    <li>Cloud Computing Technologies</li>
                    <li>Project Management & IT Operations</li>
                    <li>Legal & Investigative Practices</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Professional Highlights
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>64+ Active Professional Certifications</li>
                    <li>30+ Years of Industry Experience</li>
                    <li>Multiple Advanced Degrees</li>
                    <li>Patent Holder in AI & Fraud Detection</li>
                    <li>Licensed Private Investigator</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <CertificationsSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Certifications;
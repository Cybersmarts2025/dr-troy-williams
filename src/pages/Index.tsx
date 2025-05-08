
import React, { useEffect } from 'react';
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import WorkHistory from "@/components/WorkHistory";
import YouTubeSection from "@/components/YouTubeSection";
import ResearchSection from "@/components/ResearchSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { PersonSchema, OrganizationSchema } from "@/utils/schemaMarkup";

const Index = () => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Force a reflow/repaint to ensure the navigation is visible
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.display = 'none';
      void navbar.offsetHeight; // trigger reflow
      navbar.style.display = '';
    }
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Helmet>
        <title>Dr. Troy Williams – AI Scientist | Cybersecurity Expert | U.S. Technology Authority</title>
        <meta 
          name="description" 
          content="Discover the official profile of Dr. Troy Williams — AI researcher, cybersecurity engineer, private investigator, and founder of Cybersmarts.ai. Protecting America through technology." 
        />
      </Helmet>
      
      {/* Schema.org markup for Dr. Troy Williams */}
      <PersonSchema 
        name="Dr. Troy Williams"
        jobTitle="AI Scientist, Cybersecurity Expert, U.S. Technology Authority"
        description="Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation."
        alumniOf={["Capitol Technology University", "Western Governors University"]}
        sameAs={["https://www.linkedin.com/in/troywilliams", "https://twitter.com/troywilliams"]}
      />
      
      {/* Schema.org markup for Cybersmarts.ai organization */}
      <OrganizationSchema 
        name="Cybersmarts.ai"
        description="A nonprofit organization advancing national AI security, ethical tech development, and digital sovereignty."
        url="https://cybersmarts.ai"
      />
      
      <NavBar />
      
      <main>
        <HeroSection />
        
        <div className="py-4 bg-[#B22234] bg-opacity-10 border-y border-[#B22234]/30">
          <div className="container mx-auto px-4">
            <p className="text-center text-[#B22234] font-medium italic">
              "Protecting America Through Technology. Built in Tennessee. By Americans. For Americans."
            </p>
          </div>
        </div>
        
        <WorkHistory />
        <TestimonialsSection />
        <ResearchSection />
        <YouTubeSection />
        <SocialLinks />
      </main>

      <Footer />
    </div>
  );
};

export default Index;

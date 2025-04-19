
import React from 'react';
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import WorkHistory from "@/components/WorkHistory";
import YouTubeSection from "@/components/YouTubeSection";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Helmet>
        <title>Dr. Troy Williams – AI Scientist | Cybersecurity Expert | U.S. Technology Authority</title>
        <meta 
          name="description" 
          content="Discover the official profile of Dr. Troy Williams — AI researcher, cybersecurity engineer, private investigator, and founder of Cybersmarts.ai. Protecting America through technology." 
        />
      </Helmet>
      
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
        <YouTubeSection />
        <SocialLinks />
      </main>

      <Footer />
    </div>
  );
};

export default Index;

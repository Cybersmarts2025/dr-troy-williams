
import React, { useEffect, lazy, Suspense } from 'react';
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import MentoringSection from "@/components/MentoringSection";
import { Helmet } from "react-helmet-async";
import { PersonSchema, OrganizationSchema } from "@/utils/schemaMarkup";
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

// Lazy load less critical components
const WorkHistory = lazy(() => import("@/components/WorkHistory"));
const YouTubeSection = lazy(() => import("@/components/YouTubeSection"));
const ResearchSection = lazy(() => import("@/components/ResearchSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));

// Loading fallback
const SectionLoader = () => (
  <div className="py-16 flex justify-center items-center">
    <div className="w-16 h-16 border-4 border-[#3C3B6E] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
        <link rel="preload" as="image" href="/lovable-uploads/circuit-pattern.png" />
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
              "Protecting America Through Technology™. Built in Tennessee. By Americans. For Americans."
            </p>
          </div>
        </div>
        
        <MentoringSection />
        
        <Suspense fallback={<SectionLoader />}>
          <WorkHistory />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ResearchSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <YouTubeSection />
        </Suspense>
        
        {/* Blog Banner Section */}
        <div className="bg-[#3C3B6E] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <FileText className="h-7 w-7" />
                  AI & Cybersecurity Blog
                </h2>
                <p className="text-lg max-w-xl">
                  Explore expert commentary on cybersecurity, AI policy, fraud trends, and defense technology.
                </p>
              </div>
              <Button asChild size="lg" className="bg-white text-[#3C3B6E] hover:bg-gray-100">
                <Link to="/blog" className="flex items-center gap-2">
                  Visit the Blog
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <SocialLinks />
      </main>

      <Footer />
    </div>
  );
};

export default Index;

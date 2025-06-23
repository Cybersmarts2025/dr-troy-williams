
import React, { useEffect, lazy, Suspense } from 'react';
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import MentoringSection from "@/components/MentoringSection";
import { Helmet } from "react-helmet-async";
import { PersonSchema, OrganizationSchema } from "@/utils/schemaMarkup";
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Shield, Users, Award, Target } from 'lucide-react';
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
        <link rel="canonical" href="https://www.DrTroyWilliams.net/" />
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
        
        {/* Mission Statement Banner */}
        <div className="py-8 bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Shield className="h-8 w-8" />
                Protecting America Through Technology™
              </h2>
              <p className="text-lg md:text-xl font-medium opacity-95">
                Leading the charge in national cybersecurity, AI governance, and digital sovereignty. 
                Built in Tennessee. By Americans. For Americans.
              </p>
            </div>
          </div>
        </div>

        {/* Key Statistics Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-4">
                Three Decades of Excellence
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                A proven track record of protecting critical infrastructure and advancing national security through innovative technology solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#B22234] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#3C3B6E] mb-2">32+</div>
                <div className="text-gray-700 font-medium">Years Experience</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3C3B6E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#3C3B6E] mb-2">1000+</div>
                <div className="text-gray-700 font-medium">Organizations Protected</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#3C3B6E] mb-2">$50M+</div>
                <div className="text-gray-700 font-medium">Fraud Prevented</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#3C3B6E] mb-2">Zero</div>
                <div className="text-gray-700 font-medium">Successful Breaches</div>
              </div>
            </div>
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
        
        {/* Professional Services CTA Section */}
        <div className="bg-white py-16 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-4">
                Professional Services Available
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Access world-class cybersecurity expertise, AI consulting, and private investigation services 
                through our comprehensive professional offerings.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-[#B22234]/5 to-[#B22234]/10 border border-[#B22234]/20 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#B22234] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#3C3B6E] mb-3">Cybersecurity Consulting</h3>
                <p className="text-gray-700 mb-4">Comprehensive security assessments and strategic planning</p>
                <Button asChild variant="outline" className="border-[#B22234] text-[#B22234] hover:bg-[#B22234] hover:text-white">
                  <Link to="/consultation">Learn More</Link>
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-[#3C3B6E]/5 to-[#3C3B6E]/10 border border-[#3C3B6E]/20 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#3C3B6E] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#3C3B6E] mb-3">Executive Briefings</h3>
                <p className="text-gray-700 mb-4">Strategic sessions for leadership teams and stakeholders</p>
                <Button asChild variant="outline" className="border-[#3C3B6E] text-[#3C3B6E] hover:bg-[#3C3B6E] hover:text-white">
                  <Link to="/appointments">Schedule Now</Link>
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-[#F97316]/5 to-[#F97316]/10 border border-[#F97316]/20 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#F97316] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#3C3B6E] mb-3">Expert Webinars</h3>
                <p className="text-gray-700 mb-4">Educational sessions on cutting-edge security topics</p>
                <Button asChild variant="outline" className="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white">
                  <Link to="/webinars">View Schedule</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Banner Section */}
        <div className="bg-[#3C3B6E] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <FileText className="h-7 w-7" />
                  AI & Cybersecurity Intelligence
                </h2>
                <p className="text-lg max-w-xl">
                  Stay informed with expert analysis on cybersecurity threats, AI policy developments, 
                  fraud trends, and national defense technology initiatives.
                </p>
              </div>
              <Button asChild size="lg" className="bg-white text-[#3C3B6E] hover:bg-gray-100">
                <Link to="/blog" className="flex items-center gap-2">
                  Access Intelligence Reports
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

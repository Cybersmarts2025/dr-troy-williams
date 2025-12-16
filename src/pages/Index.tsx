
import React, { useEffect, lazy, Suspense } from 'react';
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import MentoringSection from "@/components/MentoringSection";
import DissertationCallout from "@/components/DissertationCallout";
import { Helmet } from "react-helmet-async";
import { PersonSchema, OrganizationSchema } from "@/utils/schemaMarkup";
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Shield, Users, Award, Target, Flag, Brain, Search, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AsSeenInWidget from '@/components/press/AsSeenInWidget';
import AIChatWidget from '@/components/ai/AIChatWidget';
import StolenNationCTA from '@/components/home/StolenNationCTA';
import SeasonalBanner from '@/components/SeasonalBanner';

// Lazy load less critical components
const WorkHistory = lazy(() => import("@/components/WorkHistory"));
const YouTubeSection = lazy(() => import("@/components/YouTubeSection"));
const ResearchSection = lazy(() => import("@/components/ResearchSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));

// Loading fallback with accessibility
const SectionLoader = () => (
  <div 
    className="py-16 flex justify-center items-center"
    role="status"
    aria-label="Loading content"
  >
    <div className="w-16 h-16 border-4 border-[#3C3B6E] border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
    <span className="sr-only">Loading section content...</span>
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
        <meta name="author" content="Dr. Troy Williams, PhD" />
        <meta name="copyright" content="© 2025 Cybersmarts.ai LLC. All rights reserved." />
        <meta 
          name="description" 
          content="Dr. Troy Williams, PhD is the inventor of patented cybersecurity and AI platforms including AISF™, PPP™, FraudDNA™, and PatriotProof™. Protecting America through technology." 
        />
        <meta property="og:title" content="Dr. Troy Williams, PhD | Inventor & Trademark Owner" />
        <meta property="og:url" content="https://www.drtroywilliams.net" />
        <meta property="og:description" content="AI Scientist, Cybersecurity Expert, and inventor of revolutionary fraud prevention technologies." />
        
        <link rel="canonical" href="https://www.DrTroyWilliams.net/" />
      </Helmet>
      
      {/* Schema.org markup for Dr. Troy Williams */}
      <PersonSchema 
        name="Dr. Troy Williams"
        jobTitle="AI Scientist, Cybersecurity Expert, U.S. Technology Authority"
        description="Dr. Troy Williams has over 32 years of experience at the intersection of cybersecurity, artificial intelligence, fraud prevention, and private investigation. His research and publications are independently developed and published."
        alumniOf={["Western Governors University"]}
        sameAs={["https://www.linkedin.com/in/cybersmarts/", "https://twitter.com/troywilliams"]}
      />
      
      {/* Schema.org markup for Cybersmarts.ai organization */}
      <OrganizationSchema 
        name="Cybersmarts.ai"
        description="A nonprofit organization advancing national AI security, ethical tech development, and digital sovereignty."
        url="https://cybersmarts.ai"
      />
      
      <SeasonalBanner />
      <NavBar />
      
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        
        <DissertationCallout />
        
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

        {/* Legacy & Mission Preview Section - NEW */}
        <div className="py-16 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#3C3B6E] mb-4">
                  Defining the Future of Technology
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                  Completing the unfinished work of AI and cybersecurity pioneers through sovereign, ethical innovation
                </p>
              </div>
              
              <Card className="border-2 border-[#B22234] bg-gradient-to-br from-white to-red-50 mb-8">
                <CardHeader className="bg-gradient-to-r from-[#3C3B6E] to-[#B22234] text-white">
                  <CardTitle className="text-2xl text-center">Mission Statement</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <blockquote className="text-lg italic text-[#1A1F2C] leading-relaxed text-center mb-6">
                    "I want my inventions to define a new era of sovereign, ethical technology—built not to follow trends, but to lead with principles. My legacy is a future where fraud is proactively prevented, national security is fortified through American-made innovation, and artificial intelligence serves humanity without compromising privacy, trust, or liberty. I intend to leave behind not just systems, but a resilient infrastructure of truth."
                  </blockquote>
                  <p className="text-center text-[#1A1F2C] font-semibold">
                    — Dr. Troy Williams, PhD
                  </p>
                  <div className="text-center">
                    <Button asChild className="bg-[#B22234] hover:bg-[#9B0000] text-white">
                      <Link to="/legacy" className="flex items-center gap-2">
                        <Flag className="h-4 w-4" />
                        Explore Full Legacy & Mission
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* As Seen In Widget */}
              <div className="py-4 bg-white rounded-lg shadow-sm border border-gray-100 mb-4">
                <AsSeenInWidget />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#B22234]">
                      <Shield className="h-6 w-6" />
                      Proactive Prevention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Revolutionary systems that prevent fraud and cyber threats before they occur, 
                      using predictive AI and advanced threat intelligence.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#3C3B6E]">
                      <Flag className="h-6 w-6" />
                      Digital Sovereignty
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Ensuring American technological independence through domestic innovation 
                      and protection from foreign interference in critical systems.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#F97316]">
                      <Brain className="h-6 w-6" />
                      Ethical AI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Developing artificial intelligence that serves humanity while maintaining 
                      privacy, transparency, and human oversight in all applications.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#10B981]">
                      <Search className="h-6 w-6" />
                      FraudDNA™
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Advanced biometric fraud detection system that identifies fraudulent patterns 
                      using AI-driven behavioral analysis and genetic fraud fingerprinting.
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#7C3AED]">
                      <Lock className="h-6 w-6" />
                      PatriotProof™
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Quantum-ready security architecture designed to protect American infrastructure 
                      from foreign cyber threats and ensure digital sovereignty.
                    </p>
                  </CardContent>
                </Card>
              </div>
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
              
            </div>
          </div>
        </div>
        
        {/* Blog Banner Section */}
        <StolenNationCTA />
        
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
        
        {/* AI Chat Widget */}
        <AIChatWidget defaultChatType="general" />
      </div>
    );
  };

export default Index;

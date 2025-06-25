
import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import { WebPageSchema, PersonSchema, BreadcrumbListSchema } from "@/utils/schemaMarkup";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag, Target, Shield, Brain, Users, Award } from "lucide-react";

const Legacy = () => {
  // Force scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Helmet>
        <title>Legacy & Mission | Dr. Troy Williams - Defining the Future of AI & Cybersecurity</title>
        <meta name="description" content="Discover Dr. Troy Williams' mission to complete the unfinished work of AI pioneers and build sovereign, ethical technology for America's digital future." />
      </Helmet>
      
      {/* Schema.org markup */}
      <WebPageSchema 
        name="Legacy & Mission | Dr. Troy Williams"
        description="Dr. Troy Williams' legacy statement and mission to advance AI and cybersecurity through sovereign, ethical innovation."
        url="https://drtroywilliams.com/legacy"
      />
      
      <BreadcrumbListSchema 
        items={[
          { name: "Home", item: "https://drtroywilliams.com" },
          { name: "Legacy & Mission", item: "https://drtroywilliams.com/legacy" }
        ]}
      />
      
      <PersonSchema 
        name="Dr. Troy Williams"
        jobTitle="AI Scientist, Cybersecurity Expert, U.S. Technology Authority"
        description="Dr. Troy Williams dedicates his life's work to defining a new era of sovereign, ethical technology built on unyielding principles."
        alumniOf={["Capitol Technology University", "Western Governors University"]}
        sameAs={["https://www.linkedin.com/in/troywilliams", "https://twitter.com/troywilliams"]}
      />
      
      <NavBar />
      
      <div className="pt-20">
        <PageBreadcrumb pageName="Legacy & Mission" />
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section with Legacy Statement */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-[#3C3B6E]">
              Legacy & Mission
            </h1>
            
            <Card className="border-2 border-[#B22234] bg-gradient-to-br from-white to-red-50 mb-12">
              <CardHeader className="bg-gradient-to-r from-[#3C3B6E] to-[#B22234] text-white">
                <CardTitle className="text-2xl md:text-3xl">Legacy Statement of Dr. Troy Williams, PhD</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <blockquote className="text-xl md:text-2xl leading-relaxed italic text-[#1A1F2C] font-medium">
                  "I dedicate my life's work to defining a new era of sovereign, ethical technology—built not to follow fleeting trends but to lead with unyielding principles. My legacy is a future where fraud is not merely reacted to but proactively prevented, where national security stands fortified by American-made innovation, and where artificial intelligence serves humanity without ever compromising privacy, trust, or liberty. I will leave behind more than systems; I will leave a resilient infrastructure of truth—technology that empowers, protects, and endures."
                </blockquote>
                <footer className="text-right mt-6 text-lg font-bold text-[#B22234]">
                  — Dr. Troy Williams, PhD
                </footer>
              </CardContent>
            </Card>
          </motion.section>

          {/* Mission Pillars */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3C3B6E]">
              Mission Pillars
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#B22234]">
                    <Shield className="h-6 w-6" />
                    Proactive Prevention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Building systems that prevent fraud and cyber threats before they occur, 
                    rather than simply reacting to attacks after damage is done.
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
            </div>
          </motion.section>

          {/* Completing the Pioneer's Work */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <Card className="bg-gradient-to-br from-slate-50 to-white">
              <CardHeader>
                <CardTitle className="text-3xl text-center text-[#3C3B6E] flex items-center justify-center gap-2">
                  <Award className="h-8 w-8" />
                  Completing the Pioneer's Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg mb-6 text-center text-gray-700">
                  Dr. Williams is strategically advancing the unfinished work of legendary technology pioneers:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#B22234]">AI & Computing Pioneers</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Alan Turing</strong> - Computational intelligence</li>
                      <li>• <strong>John McCarthy</strong> - Artificial intelligence</li>
                      <li>• <strong>Marvin Minsky</strong> - Machine cognition</li>
                      <li>• <strong>Geoffrey Hinton</strong> - Deep learning</li>
                      <li>• <strong>Yoshua Bengio</strong> - Neural networks</li>
                      <li>• <strong>Yann LeCun</strong> - Convolutional networks</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-[#3C3B6E]">Cryptography & Security Pioneers</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Claude Shannon</strong> - Information theory</li>
                      <li>• <strong>Whitfield Diffie</strong> - Public key cryptography</li>
                      <li>• <strong>Ron Rivest</strong> - RSA encryption</li>
                      <li>• <strong>Norbert Wiener</strong> - Cybernetics</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-[#3C3B6E] text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Core Gaps Being Addressed:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li>• Post-quantum encryption frameworks</li>
                      <li>• Zero-trust privacy architectures</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>• Constitutional AI governance</li>
                      <li>• Human-centered cybernetics</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Proprietary Platforms */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3C3B6E]">
              Revolutionary Platforms
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 border-[#B22234]">
                <CardHeader className="bg-[#B22234] text-white">
                  <CardTitle>PatriotProof™</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700">
                    U.S.-only fraud defense SaaS platform built for agencies, law enforcement, 
                    and enterprise clients with zero-compromise security.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-[#3C3B6E]">
                <CardHeader className="bg-[#3C3B6E] text-white">
                  <CardTitle>AISF™</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700">
                    Autonomous Intelligence Security Framework that powers predictive 
                    threat detection and response systems.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-[#F97316]">
                <CardHeader className="bg-[#F97316] text-white">
                  <CardTitle>PPP™</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700">
                    Proactive Prevention Platform that anticipates and neutralizes 
                    cybersecurity threats before they materialize.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-[#10B981]">
                <CardHeader className="bg-[#10B981] text-white">
                  <CardTitle>FraudDNA™</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700">
                    Advanced fraud detection system that identifies patterns and 
                    signatures unique to fraudulent activities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-[#3C3B6E] to-[#B22234] text-white">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Built in Tennessee. By Americans. For Americans.
                </h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto">
                  Join the movement for technological sovereignty and ethical innovation. 
                  Together, we're building the future of American cybersecurity and AI.
                </p>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                  <Users className="h-8 w-8" />
                  "I am not ahead of the curve — I am the curve."
                </div>
              </CardContent>
            </Card>
          </motion.section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legacy;

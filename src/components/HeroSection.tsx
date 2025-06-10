
import React from 'react';
import { Button } from "./ui/button";
import { ArrowDown, Shield, Mail, Award } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-5"
        style={{ 
          backgroundImage: "url('/lovable-uploads/circuit-pattern.png')", 
          backgroundSize: "100px",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Professional headshot */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-white">
              <img 
                src="/lovable-uploads/e5dbe2db-0aab-40fa-9588-e2f96f1943f5.png"
                alt="Dr. Troy Williams - Chief Intelligence Architect"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content section */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#B22234]/10 text-[#B22234] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Award className="h-4 w-4" />
                32+ Years Experience
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-[#3C3B6E] leading-tight">
                Dr. Troy Williams
              </h1>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#B22234] mb-6">
                Chief Intelligence Architect & Cybersecurity Expert
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-6 mb-8"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  <strong className="text-[#3C3B6E]">Founder & Chief Intelligence Architect</strong> of Cybersmarts.ai, 
                  a Tennessee-based nonprofit advancing national AI security and digital sovereignty.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  Leading the design of <strong className="text-[#B22234]">national-scale AI systems</strong>, 
                  regulatory standards, and public education platforms to protect American citizens, 
                  law enforcement, and critical infrastructure from foreign cyber threats.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  <strong className="text-[#3C3B6E]">Licensed Tennessee Private Investigator</strong> | 
                  <strong className="text-[#B22234]"> Capitol Technology University & Western Governors University</strong>
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-gradient-to-r from-[#3C3B6E] to-[#B22234] text-white p-6 rounded-lg shadow-lg mb-8"
            >
              <p className="text-xl font-bold italic">
                "I'm not ahead of the curve — I am the curve."
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg"
                className="bg-[#B22234] hover:bg-[#9B0000] text-white text-lg px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection('work')}
              >
                <ArrowDown className="h-5 w-5 mr-2" />
                Explore Expertise
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#3C3B6E] text-[#3C3B6E] hover:bg-[#3C3B6E] hover:text-white text-lg px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => window.open("mailto:verifiedsafe8@gmail.com?subject=Security%20Briefing%20Request")}
              >
                <Mail className="h-5 w-5 mr-2" />
                Request Briefing
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Professional credentials bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0"
      >
        <div className="bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white py-4 border-t-4 border-white/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8 text-sm md:text-base font-semibold">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Tennessee Licensed PI
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                32+ Years Experience
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30"></div>
              <div className="text-center">
                Protecting America Through Technology™
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

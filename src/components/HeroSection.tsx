import React from 'react';
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden flag-overlay">
      {/* Animated flag background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-30 animate-flag-wave"
        style={{ 
          backgroundImage: "url('/lovable-uploads/flag-background.jpg')", 
        }}
      ></div>
      
      {/* Digital circuit pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: "url('/lovable-uploads/circuit-pattern.png')", 
          backgroundSize: "200px",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img 
              src="/lovable-uploads/e5dbe2db-0aab-40fa-9588-e2f96f1943f5.png"
              alt="Dr. Troy Williams"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-5xl md:text-6xl font-extrabold mb-4 text-[#ea384c] drop-shadow-lg"
            >
              Dr. Troy Williams
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-[#F97316] mb-6 drop-shadow-md"
            >
              Founder & Chief Intelligence Architect
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-base font-semibold text-white bg-gradient-to-r from-[#3C3B6E]/90 to-[#3C3B6E]/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-[#3C3B6E]/30">
                Cybersmarts.ai LLC | Lebanon, Tennessee | Licensed Tennessee Private Investigator
              </p>
              
              <p className="text-base text-white bg-gradient-to-r from-[#3C3B6E]/90 to-[#3C3B6E]/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-[#3C3B6E]/30">
                Dr. Troy Williams is the Founder and Chief Intelligence Architect of Cybersmarts.ai, a Tennessee-based nonprofit dedicated to advancing national security through artificial intelligence, cybersecurity innovation, and proactive fraud prevention.
              </p>
              
              <p className="text-base text-white bg-gradient-to-r from-[#3C3B6E]/90 to-[#3C3B6E]/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-[#3C3B6E]/30">
                At Cybersmarts.ai, Dr. Williams leads the design of national-scale AI systems, regulatory standards, and public education platforms aimed at protecting American citizens, law enforcement, and critical infrastructure from foreign cyber threats.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="italic text-[#F97316] font-bold text-xl bg-gradient-to-r from-[#3C3B6E]/90 to-[#3C3B6E]/80 backdrop-blur-sm p-4 rounded-lg shadow-lg mt-6 border border-[#3C3B6E]/30"
            >
              <p className="mb-0">"I'm not ahead of the curve — I am the curve."</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start mt-8"
            >
              <Button 
                variant="usaRed" 
                size="lg"
                className="text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
                onClick={() => scrollToSection('work')}
              >
                Explore My Work <ArrowDown className="h-5 w-5 animate-bounce" />
              </Button>
              
              <Button 
                variant="usaBlue" 
                size="lg"
                className="text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
                onClick={() => window.open("mailto:verifiedsafe8@gmail.com?subject=Security%20Briefing%20Request")}
              >
                Secure a Briefing <Shield className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="py-4 bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white font-semibold text-lg border-y-2 border-white/30 shadow-md">
          <p className="mb-0">Protecting America Through Technology</p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

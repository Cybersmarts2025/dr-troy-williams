import React from 'react';
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-15"
        style={{ 
          backgroundImage: "url('/lovable-uploads/e5dbe2db-0aab-40fa-9588-e2f96f1943f5.png')", 
          filter: "brightness(0.3) blur(2px)" 
        }}
      ></div>
      
      <div className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: "url('/lovable-uploads/circuit-pattern.png')", 
          backgroundSize: "200px",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src="/lovable-uploads/e5dbe2db-0aab-40fa-9588-e2f96f1943f5.png"
              alt="Dr. Troy Williams"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Dr. Troy Williams</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-[#F97316] mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">Founder & Chief Intelligence Architect</h2>
            
            <div className="space-y-4">
              <p className="text-base font-semibold text-white bg-[#3C3B6E] px-4 py-3 rounded-lg shadow-lg border border-[#3C3B6E]/30">
                Cybersmarts.ai LLC | Lebanon, Tennessee | Licensed Tennessee Private Investigator
              </p>
              
              <p className="text-base text-white bg-[#3C3B6E] px-4 py-3 rounded-lg shadow-lg border border-[#3C3B6E]/30">
                Dr. Troy Williams is the Founder and Chief Intelligence Architect of Cybersmarts.ai, a Tennessee-based nonprofit dedicated to advancing national security through artificial intelligence, cybersecurity innovation, and proactive fraud prevention.
              </p>
              
              <p className="text-base text-white bg-[#3C3B6E] px-4 py-3 rounded-lg shadow-lg border border-[#3C3B6E]/30">
                At Cybersmarts.ai, Dr. Williams leads the design of national-scale AI systems, regulatory standards, and public education platforms aimed at protecting American citizens, law enforcement, and critical infrastructure from foreign cyber threats.
              </p>
            </div>
            
            <div className="italic text-[#F97316] font-bold text-xl bg-[#3C3B6E] p-4 rounded-lg shadow-lg mt-6 border border-[#3C3B6E]/30">
              <p className="mb-0">"We don't react to threats. We outthink them."</p>
            </div>
            
            <Button 
              variant="usaBlue" 
              size="lg"
              className="mt-8 text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
              onClick={() => scrollToSection('work')}
            >
              Explore <ArrowDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="py-3 bg-gradient-to-r from-[#B22234] to-[#3C3B6E] text-white font-semibold">
          I am not ahead of the curve I am the curve
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

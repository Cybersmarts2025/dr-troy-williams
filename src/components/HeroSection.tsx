
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
      {/* Flag background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-15"
        style={{ 
          backgroundImage: "url('/lovable-uploads/e5dbe2db-0aab-40fa-9588-e2f96f1943f5.png')", 
          filter: "brightness(0.3) blur(2px)" 
        }}
      ></div>
      
      {/* Shield circuit pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{ 
          backgroundImage: "url('/lovable-uploads/circuit-pattern.png')", 
          backgroundSize: "200px",
          backgroundRepeat: "repeat"
        }}
      ></div>
      
      {/* Content with improved z-index */}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Dr. Troy Williams</h1>
            <h2 className="text-2xl font-semibold text-[#F97316] mb-4 drop-shadow-md">Founder & Chief Intelligence Architect</h2>
            
            <div className="space-y-4">
              <p className="text-base font-semibold text-white bg-[#3C3B6E] px-4 py-2 rounded-lg shadow-md">
                Cybersmarts.ai LLC | Lebanon, Tennessee | Licensed Tennessee Private Investigator
              </p>
              
              <p className="text-base text-white bg-[#3C3B6E]/80 px-4 py-3 rounded-lg shadow-md">
                Dr. Troy Williams is the Founder and Chief Intelligence Architect of Cybersmarts.ai, a Tennessee-based nonprofit dedicated to advancing national security through artificial intelligence, cybersecurity innovation, and proactive fraud prevention.
              </p>
              
              <p className="text-base text-white bg-[#3C3B6E]/80 px-4 py-3 rounded-lg shadow-md">
                At Cybersmarts.ai, Dr. Williams leads the design of national-scale AI systems, regulatory standards, and public education platforms aimed at protecting American citizens, law enforcement, and critical infrastructure from foreign cyber threats.
              </p>
            </div>
            
            <div className="italic text-[#F97316] font-semibold max-w-2xl text-lg bg-black/40 p-2 rounded mt-4">
              <p className="mb-2">"We don't react to threats. We outthink them."</p>
            </div>
            
            <Button 
              variant="usaBlue" 
              size="lg"
              className="mt-6"
              onClick={() => scrollToSection('work')}
            >
              Explore <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

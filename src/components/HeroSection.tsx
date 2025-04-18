
import React from 'react';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/e5dbe2db-0aab-40fa-9588-e2f96f1943f5.png"
              alt="Dr. Troy Williams"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Dr. Troy Williams</h1>
            <h2 className="text-2xl text-gray-600 mb-4">Founder & Chief Intelligence Architect</h2>
            <p className="text-base text-gray-700 max-w-2xl mb-6">
              Cybersmarts.ai LLC | Lebanon, Tennessee
            </p>
            <p className="text-base text-gray-700 max-w-2xl mb-6">
              Dr. Troy Williams is the Founder and Chief Intelligence Architect of Cybersmarts.ai, a Tennessee-based nonprofit dedicated to advancing national security through artificial intelligence, cybersecurity innovation, and proactive fraud prevention. Under his leadership, the organization has developed groundbreaking frameworks such as the Autonomous Intelligence Security Framework (AISF™) and the Proactive Prevention Platform (PPP™) — forming the foundation for secure, U.S.-only AI systems that prioritize ethics, legal compliance, and quantum-resilient infrastructure.
            </p>
            <p className="text-base text-gray-700 max-w-2xl mb-6">
              At Cybersmarts.ai, Dr. Williams leads the design of national-scale AI systems, regulatory standards, and public education platforms aimed at protecting American citizens, law enforcement, and critical infrastructure from foreign cyber threats, data exploitation, and algorithmic manipulation.
            </p>
            <div className="italic text-gray-600 max-w-2xl">
              <p className="mb-2">"We don't react to threats. We outthink them."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


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
            <p className="text-xl text-gray-600 max-w-2xl mb-6">
              Welcome to my official website.
            </p>
            <p className="text-base text-gray-700 max-w-2xl mb-6">
              I am an AI scientist, cybersecurity engineer, published author, and national advocate for proactive digital defense. With over three decades of experience across private investigation, fraud prevention, and AI ethics, I've dedicated my life to building technology that protects America — not just reacts to threats.
            </p>
            <p className="text-base text-gray-700 max-w-2xl mb-6">
              This platform serves as a hub for my personal research, public initiatives, whitepapers, and ongoing mission to reshape the future of artificial intelligence, privacy, and national security through innovation, integrity, and truth.
            </p>
            <div className="italic text-gray-600 max-w-2xl">
              <p className="mb-2">"I'm not ahead of the curve — I am the curve."</p>
              <p>"Protecting America through technology."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import React from 'react';
import FooterCTA from './footer/FooterCTA';
import FooterIdentity from './footer/FooterIdentity';
import FooterCopyright from './footer/FooterCopyright';

interface FooterProps {
  companyName?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  companyName = 'Dr. Troy Williams' 
}) => {
  return (
    <footer className="bg-[#3C3B6E] text-white py-8 border-t-4 border-[#B22234]">
      <div className="container mx-auto px-4">
        <FooterCTA />
        
        <div className="mt-8 mb-6 text-center space-y-3">
          <p className="text-lg font-semibold text-[#B22234]">Protecting America Through Technology™</p>
          <p className="text-base italic text-white/90">"I am not ahead of the curve. I am building the curve™"</p>
          <p className="text-sm text-white/80">Author: Troy Williams, PhD</p>
          <p className="text-xs text-white/70">Built in Tennessee. By Americans. For Americans.</p>
          <p className="text-xs text-white/70 font-semibold">Independent Civilian Intelligence to Protect Americans.</p>
        </div>

        <FooterIdentity companyName={companyName} />
        <FooterCopyright companyName="Cybersmarts.ai LLC" />
      </div>
    </footer>
  );
};

export default Footer;

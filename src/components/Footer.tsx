
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
    <footer className="bg-[#3C3B6E] text-white py-6 border-t-4 border-[#B22234]">
      <div className="container mx-auto px-4">
        <FooterCTA />
        <FooterIdentity companyName={companyName} />
        <FooterCopyright companyName={companyName} />
      </div>
    </footer>
  );
};

export default Footer;

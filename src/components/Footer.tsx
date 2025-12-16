
import React from 'react';
import { Link } from 'react-router-dom';
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
          <p className="text-lg font-semibold text-amber-400">Protecting America Through Technology™</p>
          <p className="text-base italic text-white">"I am not ahead of the curve. I am building the curve."</p>
          <p className="text-sm text-white/90">Author: Troy Williams, PhD</p>
          <p className="text-xs text-white/85">Built in Tennessee. By Americans. For Americans.</p>
          <p className="text-xs text-white/85 font-semibold">Independent Civilian Intelligence to Protect Americans.</p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link to="/sitemap" className="text-xs text-white/85 hover:text-white underline transition-colors">
              Sitemap
            </Link>
            <span className="text-white/50">|</span>
            <Link 
              to="/accessibility" 
              className="inline-flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 transition-colors"
              title="View ADA Compliance Certification"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ADA Compliant - Verified 12/8/2025
            </Link>
          </div>
        </div>

        <FooterIdentity companyName={companyName} />
        <FooterCopyright companyName="Cybersmarts.ai LLC" />
      </div>
    </footer>
  );
};

export default Footer;

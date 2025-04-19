
import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  companyName?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  companyName = 'Dr. Troy Williams' 
}) => {
  return (
    <footer className="bg-[#3C3B6E] text-white py-6 border-t-4 border-[#B22234]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-[#F97316]" />
            <h3 className="text-xl font-bold">{companyName}</h3>
          </div>
          
          <p className="text-sm mb-2 text-white/80">
            © {new Date().getFullYear()} {companyName}. All Rights Reserved.
          </p>
          
          <p className="text-xs text-white/60 max-w-md">
            All content, designs, and intellectual property are protected by copyright and other intellectual property laws. 
            Unauthorized reproduction or distribution is strictly prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

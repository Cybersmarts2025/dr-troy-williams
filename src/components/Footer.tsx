
import React from 'react';
import { Shield, FileText, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  companyName?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  companyName = 'Dr. Troy Williams' 
}) => {
  return (
    <footer className="bg-[#3C3B6E] text-white py-6 border-t-4 border-[#B22234]">
      <div className="container mx-auto px-4">
        {/* Media & Expert Testimony CTA Bar */}
        <div className="bg-[#B22234]/90 -mt-6 mb-6 py-4 px-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-1">Media & Expert Testimony</h3>
            <p className="text-sm text-white/80">Available for interviews, expert testimony, and speaking engagements</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-[#B22234] hover:bg-gray-100 border-white"
              onClick={() => window.location.href = 'tel:+11234567890'}
              aria-label="Contact by phone"
            >
              <Phone className="h-4 w-4 mr-2" /> Contact
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white text-[#B22234] hover:bg-gray-100 border-white"
              onClick={() => window.location.href = 'mailto:verifiedsafe8@gmail.com'}
              aria-label="Contact by email"
            >
              <Mail className="h-4 w-4 mr-2" /> Email
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-6 border-b border-white/20">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-[#F97316]" />
            <h3 className="text-xl font-bold">{companyName}</h3>
          </div>
          
          <Button
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white/10"
            onClick={() => window.location.href = "/downloads/cv-troy-williams.pdf"}
            aria-label="Download Portfolio PDF"
          >
            <FileText className="h-4 w-4 mr-2" />
            Download Portfolio PDF
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-sm mb-2 text-white/80">
            © {new Date().getFullYear()} {companyName}. All Rights Reserved.
          </p>
          
          <p className="text-xs text-white/60 max-w-md mx-auto">
            All content, designs, and intellectual property are protected by copyright and other intellectual property laws. 
            Unauthorized reproduction or distribution is strictly prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

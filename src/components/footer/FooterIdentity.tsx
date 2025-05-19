
import React from 'react';
import { FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterIdentityProps {
  companyName: string;
}

const FooterIdentity = ({ companyName }: FooterIdentityProps) => {
  return (
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
  );
};

export default FooterIdentity;

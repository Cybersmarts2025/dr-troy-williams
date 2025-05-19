
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FooterCTA = () => {
  return (
    <div className="bg-[#B22234]/90 -mt-6 mb-6 py-4 px-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
      <div>
        <h3 className="text-xl font-bold mb-1">Media & Expert Testimony</h3>
        <p className="text-sm text-white/80">Available for interviews and expert testimony</p>
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
  );
};

export default FooterCTA;


import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactDialog from '@/components/ContactDialog';

const FooterCTA = () => {
  return (
    <div className="bg-gradient-to-r from-[#B22234]/90 to-[#B22234]/80 -mt-6 mb-6 py-5 px-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h3 className="text-xl font-bold mb-1">Media & Consulting</h3>
        <p className="text-sm text-white/90">Available for interviews and consulting</p>
      </div>
      <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
        <Button
          size="sm"
          variant="outline"
          className="bg-white text-[#B22234] hover:bg-gray-100 border-white hover:scale-105 transition-transform"
          onClick={() => window.location.href = 'tel:+16155479563'}
          aria-label="Contact by phone"
        >
          <Phone className="h-4 w-4 mr-2" /> Contact
        </Button>
        <ContactDialog
          size="sm"
          variant="outline"
          className="bg-white text-[#B22234] hover:bg-gray-100 border-white hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
};

export default FooterCTA;


import React from 'react';
import { FileText, Shield, Award, Book, Flag, Newspaper, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface FooterIdentityProps {
  companyName: string;
}

const FooterIdentity = ({ companyName }: FooterIdentityProps) => {
  const { toast } = useToast();
  const location = useLocation();

  // Function to handle section navigation
  const handleSectionClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on homepage, navigate to home with section hash
      window.location.href = `/#${sectionId}`;
    } else {
      // If on homepage, scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDownloadPortfolio = async () => {
    try {
      // Get the download URL from Supabase storage
      const { data } = supabase.storage
        .from('downloads')
        .getPublicUrl('cv-troy-williams.pdf');
      
      if (data?.publicUrl) {
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = data.publicUrl;
        link.download = 'Dr-Troy-Williams-Portfolio.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Download Started",
          description: "Your portfolio download has started.",
        });
      } else {
        throw new Error('Portfolio not available');
      }
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Portfolio file is not currently available. Please contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-6 pb-6 border-b border-white/20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Shield className="h-6 w-6 text-[#F97316]" />
          <h3 className="text-xl font-bold">{companyName}</h3>
        </div>
        
        <Button
          variant="outline"
          className="bg-transparent text-white border-white hover:bg-white/10"
          onClick={handleDownloadPortfolio}
          aria-label="Download Portfolio PDF"
        >
          <FileText className="h-4 w-4 mr-2" />
          Download Portfolio PDF
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h4 className="font-semibold mb-3 text-[#F97316]">About</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/legacy" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                <Flag className="h-4 w-4" />
                Legacy & Mission
              </Link>
            </li>
            <li>
              <Link to="/certifications" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                <Award className="h-4 w-4" />
                Certifications
              </Link>
            </li>
            <li>
              <Link to="/books" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                <Book className="h-4 w-4" />
                Publications
              </Link>
            </li>
            <li>
              <Link 
                to="/ip" 
                className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                title="View all technologies developed by Dr. Troy Williams, PhD and owned by Cybersmarts.ai LLC"
              >
                🔒 Trademarked Technologies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-[#F97316]">Media</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/press" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                Press Coverage
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Intelligence Blog
              </Link>
            </li>
            <li>
              <button 
                onClick={() => handleSectionClick('videos')} 
                className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-left"
              >
                <Video className="h-4 w-4" />
                Video Content
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-[#F97316]">Services</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/consultation" className="text-white/80 hover:text-white transition-colors">
                Cybersecurity Consulting
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-[#F97316]">Connect</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                Contact Information
              </Link>
            </li>
            <li>
              <Link to="/testimonial" className="text-white/80 hover:text-white transition-colors">
                Submit Testimonial
              </Link>
            </li>
            <li>
              <button 
                onClick={() => handleSectionClick('mentoring')} 
                className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-left"
              >
                <Users className="h-4 w-4" />
                Mentoring Programs
              </button>
            </li>
            <li className="text-white/60 text-sm pt-2 border-t border-white/20">
              <span className="text-white/80">Connect:</span>{' '}
              <a href="https://www.linkedin.com/in/cybersmarts/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">LinkedIn</a>
              {' · '}
              <a href="https://www.researchgate.net/profile/Troy-Williams-14?ev=hdr_xprf" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">ResearchGate</a>
              {' · '}
              <a href="https://www.wikidata.org/wiki/Q136302603" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">Wikidata</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterIdentity;

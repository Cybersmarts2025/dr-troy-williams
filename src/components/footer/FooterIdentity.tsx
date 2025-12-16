
import React from 'react';
import { FileText, Shield, Award, Book, Flag, Newspaper, Users, Video, Briefcase } from 'lucide-react';
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


  return (
    <div className="mb-6 pb-6 border-b border-white/20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Shield className="h-6 w-6 text-[#F97316]" />
          <h3 className="text-xl font-bold">{companyName}</h3>
        </div>
        
        <Button
          asChild
          variant="outline"
          className="bg-transparent text-white border-white hover:bg-white/10"
          aria-label="View Portfolio"
        >
          <Link to="/portfolio">
            <FileText className="h-4 w-4 mr-2" />
            View Portfolio
          </Link>
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
              <Link to="/portfolio" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                <Award className="h-4 w-4" />
                Portfolio
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
              <button 
                onClick={() => handleSectionClick('work')} 
                className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-left"
              >
                <Briefcase className="h-4 w-4" />
                Work History
              </button>
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
            <li>
              <Link to="/mentorship" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                <Users className="h-4 w-4" />
                Mentorship Program
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
            <li className="text-white/85 text-sm pt-2 border-t border-white/20">
              <span className="text-white/90">Connect:</span>{' '}
              <a href="https://www.linkedin.com/in/cybersmarts/" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">LinkedIn</a>
              {' · '}
              <a href="https://www.researchgate.net/profile/Troy-Williams-14?ev=hdr_xprf" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">ResearchGate</a>
              {' · '}
              <a href="https://www.wikidata.org/wiki/Q136302603" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">Wikidata</a>
              {' · '}
              <a href="https://www.amazon.com/author/troy-williams" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors">Amazon Author</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterIdentity;

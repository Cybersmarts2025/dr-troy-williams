
import { Link } from "react-router-dom";
import { Info, Book, Briefcase, Video, Mail, Newspaper, FileText } from "lucide-react";
import { navColors } from "@/config/colors";

interface NavLinksProps {
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
}

const NavLinks = ({ isScrolled, onSectionClick }: NavLinksProps) => {
  // Use a more visible base color when not scrolled
  const baseTextColor = isScrolled ? "text-[#1A1F2C]" : "text-[#FFFFFF]";
  const baseShadow = isScrolled ? "" : "drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]";
  
  return (
    <div className="hidden md:flex gap-3 items-center">
      <Link 
        to="/about" 
        className={`flex items-center gap-1 font-medium hover:text-[#D946EF] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#6E59A5] hover:text-[#8B5CF6]' 
            : 'text-[#D946EF] hover:text-white ' + baseShadow
        }`}
      >
        <Info className="h-4 w-4" />
        About
      </Link>
      <Link 
        to="/books" 
        className={`flex items-center gap-1 font-medium hover:text-[#0EA5E9] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#0EA5E9]' 
            : 'text-[#0EA5E9] hover:text-white ' + baseShadow
        }`}
      >
        <Book className="h-4 w-4" />
        Books
      </Link>
      <Link 
        to="/press" 
        className={`flex items-center gap-1 font-medium hover:text-[#10B981] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#10B981]' 
            : 'text-[#10B981] hover:text-white ' + baseShadow
        }`}
      >
        <Newspaper className="h-4 w-4" />
        Press
      </Link>
      <Link 
        to="/blog" 
        className={`flex items-center gap-1 font-medium hover:text-[#8B5CF6] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#8B5CF6]' 
            : 'text-[#8B5CF6] hover:text-white ' + baseShadow
        }`}
      >
        <FileText className="h-4 w-4" />
        Blog
      </Link>
      <button 
        onClick={() => onSectionClick('work')}
        className={`flex items-center gap-1 font-medium hover:text-[#F97316] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#F97316]' 
            : 'text-[#F97316] hover:text-white ' + baseShadow
        }`}
      >
        <Briefcase className="h-4 w-4" />
        Work History
      </button>
      <button 
        onClick={() => onSectionClick('videos')}
        className={`flex items-center gap-1 font-medium hover:text-[#1EAEDB] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#1EAEDB]' 
            : 'text-[#1EAEDB] hover:text-white ' + baseShadow
        }`}
      >
        <Video className="h-4 w-4" />
        Videos
      </button>
      <button 
        onClick={() => onSectionClick('contact')}
        className={`flex items-center gap-1 font-medium hover:text-[#ea384c] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#ea384c]' 
            : 'text-[#ea384c] hover:text-white ' + baseShadow
        }`}
      >
        <Mail className="h-4 w-4" />
        Contact
      </button>
    </div>
  );
};

export default NavLinks;


import { Link } from "react-router-dom";
import { Info, Book, Briefcase, Video, Mail } from "lucide-react";

interface NavLinksProps {
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
}

const NavLinks = ({ isScrolled, onSectionClick }: NavLinksProps) => {
  return (
    <div className="hidden md:flex gap-3 items-center">
      <Link 
        to="/about" 
        className={`flex items-center gap-1 hover:text-[#D946EF] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#6E59A5] hover:text-[#8B5CF6]' 
            : 'text-white hover:text-[#D946EF] drop-shadow-sm'
        }`}
      >
        <Info className="h-4 w-4" />
        About
      </Link>
      <Link 
        to="/books" 
        className={`flex items-center gap-1 hover:text-[#0EA5E9] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#0EA5E9]' 
            : 'text-white hover:text-[#0EA5E9] drop-shadow-sm'
        }`}
      >
        <Book className="h-4 w-4" />
        Books
      </Link>
      <button 
        onClick={() => onSectionClick('work')}
        className={`flex items-center gap-1 hover:text-[#F97316] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#F97316]' 
            : 'text-white hover:text-[#F97316] drop-shadow-sm'
        }`}
      >
        <Briefcase className="h-4 w-4" />
        Work History
      </button>
      <button 
        onClick={() => onSectionClick('videos')}
        className={`flex items-center gap-1 hover:text-[#1EAEDB] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#1EAEDB]' 
            : 'text-white hover:text-[#1EAEDB] drop-shadow-sm'
        }`}
      >
        <Video className="h-4 w-4" />
        Videos
      </button>
      <button 
        onClick={() => onSectionClick('contact')}
        className={`flex items-center gap-1 hover:text-[#ea384c] transition-colors px-2 ${
          isScrolled 
            ? 'text-[#1A1F2C] hover:text-[#ea384c]' 
            : 'text-white hover:text-[#ea384c] drop-shadow-sm'
        }`}
      >
        <Mail className="h-4 w-4" />
        Contact
      </button>
    </div>
  );
};

export default NavLinks;

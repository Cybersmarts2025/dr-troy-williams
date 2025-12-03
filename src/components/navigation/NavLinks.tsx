import { useLocation } from "react-router-dom";
import { 
  Info, Book, Briefcase, Video, Mail, Newspaper, FileText, Flag, Award, 
  Bot, Users, Target, Shield, ChevronDown, GraduationCap, Calendar,
  Globe, Cpu, CheckCircle, User
} from "lucide-react";
import NavLink from "./NavLink";
import NavButton from "./NavButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface NavLinksProps {
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
}

const NavLinks = ({ isScrolled, onSectionClick }: NavLinksProps) => {
  const baseShadow = isScrolled ? "" : "drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]";
  const location = useLocation();
  
  const handleSectionClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      onSectionClick(sectionId);
    }
  };

  const dropdownItemClass = "flex items-center gap-2 cursor-pointer";
  
  return (
    <div className="hidden md:flex gap-2 items-center">
      {/* About Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 ${baseShadow}`}>
          <Info className="h-4 w-4 text-[#D946EF]" />
          <span>About</span>
          <ChevronDown className="h-3 w-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem asChild>
            <Link to="/about" className={dropdownItemClass}>
              <Info className="h-4 w-4 text-[#D946EF]" />
              About
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/master-bio" className={dropdownItemClass}>
              <User className="h-4 w-4 text-[#8B5CF6]" />
              Master Bio
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/credentials" className={dropdownItemClass}>
              <GraduationCap className="h-4 w-4 text-[#0EA5E9]" />
              Credentials
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/timeline" className={dropdownItemClass}>
              <Calendar className="h-4 w-4 text-[#10B981]" />
              Timeline
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Research & Tech Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 ${baseShadow}`}>
          <Cpu className="h-4 w-4 text-[#6366F1]" />
          <span>Research</span>
          <ChevronDown className="h-3 w-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          <DropdownMenuItem asChild>
            <Link to="/research-footprint" className={dropdownItemClass}>
              <Book className="h-4 w-4 text-[#0EA5E9]" />
              Research Footprint
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/technology-stack" className={dropdownItemClass}>
              <Cpu className="h-4 w-4 text-[#6366F1]" />
              Technology Stack
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/national-mission" className={dropdownItemClass}>
              <Flag className="h-4 w-4 text-[#B22234]" />
              National Mission
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/ip" className={dropdownItemClass}>
              <Award className="h-4 w-4 text-[#f97316]" />
              Intellectual Property
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <NavLink 
        to="/books" 
        icon={Book} 
        label="Books" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#0EA5E9" 
        hoverColor="#0EA5E9" 
      />
      
      {/* Press Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 ${baseShadow}`}>
          <Newspaper className="h-4 w-4 text-[#10B981]" />
          <span>Press</span>
          <ChevronDown className="h-3 w-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem asChild>
            <Link to="/press" className={dropdownItemClass}>
              <Newspaper className="h-4 w-4 text-[#10B981]" />
              Press & Media
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/press-kit" className={dropdownItemClass}>
              <FileText className="h-4 w-4 text-[#8B5CF6]" />
              Press Kit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/validation" className={dropdownItemClass}>
              <CheckCircle className="h-4 w-4 text-[#10B981]" />
              Verification Archive
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <NavLink 
        to="/blog" 
        icon={FileText} 
        label="Blog" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#8B5CF6" 
        hoverColor="#8B5CF6" 
      />
      
      <NavLink 
        to="/job-ready-360" 
        icon={Target} 
        label="Job Ready 360" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#f97316" 
        hoverColor="#f97316" 
      />
      
      <NavLink 
        to="/stolennation" 
        icon={Flag} 
        label="Stolen Nation" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#B22234" 
        hoverColor="#B22234" 
      />
      
      <NavLink 
        to="/synthetic-identity-defense" 
        icon={Shield} 
        label="SID" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#B22234" 
        hoverColor="#B22234" 
      />
      
      <NavButton
        onClick={() => handleSectionClick('contact')}
        icon={Mail} 
        label="Contact" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#ea384c" 
        hoverColor="#ea384c" 
      />
    </div>
  );
};

export default NavLinks;

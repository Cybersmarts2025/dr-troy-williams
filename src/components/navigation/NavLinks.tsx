
import { useLocation } from "react-router-dom";
import { Info, Book, Briefcase, Video, Mail, Newspaper, FileText, Flag, Award, Bot } from "lucide-react";
import NavLink from "./NavLink";
import NavButton from "./NavButton";

interface NavLinksProps {
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
}

const NavLinks = ({ isScrolled, onSectionClick }: NavLinksProps) => {
  // Use a more visible base color when not scrolled
  const baseTextColor = isScrolled ? "text-[#1A1F2C]" : "text-[#FFFFFF]";
  const baseShadow = isScrolled ? "" : "drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]";
  const location = useLocation();
  
  // Function to handle section navigation across pages
  const handleSectionClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on homepage, navigate to home with section hash
      window.location.href = `/#${sectionId}`;
    } else {
      // If on homepage, use the scroll function
      onSectionClick(sectionId);
    }
  };
  
  return (
    <div className="hidden md:flex gap-3 items-center">
      <NavLink 
        to="/about" 
        icon={Info} 
        label="About" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#D946EF" 
        hoverColor="#D946EF" 
      />
      
      <NavLink 
        to="/legacy" 
        icon={Flag} 
        label="Legacy" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#B22234" 
        hoverColor="#B22234" 
      />
      
      <NavLink 
        to="/books" 
        icon={Book} 
        label="Books" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#0EA5E9" 
        hoverColor="#0EA5E9" 
      />
      
      <NavLink 
        to="/press" 
        icon={Newspaper} 
        label="Press" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#10B981" 
        hoverColor="#10B981" 
      />
      
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
        to="/certifications" 
        icon={Award} 
        label="Certifications" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#6366F1" 
        hoverColor="#6366F1" 
      />
      
      <NavLink 
        to="/ai-tools" 
        icon={Bot} 
        label="AI Tools" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#3C3B6E" 
        hoverColor="#3C3B6E" 
      />
      <NavButton 
        onClick={() => handleSectionClick('work')}
        icon={Briefcase} 
        label="Work History" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#F97316" 
        hoverColor="#F97316" 
      />
      
      <NavButton 
        onClick={() => handleSectionClick('videos')}
        icon={Video} 
        label="Videos" 
        isScrolled={isScrolled} 
        baseShadow={baseShadow} 
        color="#1EAEDB" 
        hoverColor="#1EAEDB" 
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

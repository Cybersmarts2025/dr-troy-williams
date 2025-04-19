
import { useState, useEffect } from "react";
import { Menu, Info, Book, Briefcase, Video, Mail, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { navColors } from "@/config/colors";
import MobileMenu from "./navigation/MobileMenu";
import BackToTopButton from "./navigation/BackToTopButton";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full backdrop-blur-sm z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link 
            to="/" 
            className={`text-xl font-bold transition-colors flex items-center gap-2 ${
              isScrolled ? `text-[${navColors.logo.scrolled}]` : `text-${navColors.logo.default} drop-shadow-md`
            }`}
          >
            <Shield className={`h-5 w-5 ${isScrolled ? `text-[${navColors.logo.scrolled}]` : `text-${navColors.logo.default}`}`} />
            <span>Dr. Troy Williams</span>
          </Link>
          
          <div className="hidden md:flex gap-3 items-center">
            <Link 
              to="/about" 
              className={`flex items-center gap-1 hover:text-[${navColors.links.about.hover}] transition-colors px-2 ${
                isScrolled ? `text-[${navColors.links.about.scrolled}]` : `text-${navColors.default.text} ${navColors.default.shadow}`
              }`}
            >
              <Info className="h-4 w-4" />
              About
            </Link>
            <Link 
              to="/books" 
              className={`flex items-center gap-1 hover:text-[${navColors.links.books.hover}] transition-colors px-2 ${
                isScrolled ? `text-[${navColors.links.books.scrolled}]` : `text-${navColors.default.text} ${navColors.default.shadow}`
              }`}
            >
              <Book className="h-4 w-4" />
              Books
            </Link>
            <button 
              onClick={() => scrollToSection('work')}
              className={`flex items-center gap-1 hover:text-[${navColors.links.work.hover}] transition-colors px-2 ${
                isScrolled ? `text-[${navColors.links.work.scrolled}]` : `text-${navColors.default.text} ${navColors.default.shadow}`
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Work History
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className={`flex items-center gap-1 hover:text-[${navColors.links.videos.hover}] transition-colors px-2 ${
                isScrolled ? `text-[${navColors.links.videos.scrolled}]` : `text-${navColors.default.text} ${navColors.default.shadow}`
              }`}
            >
              <Video className="h-4 w-4" />
              Videos
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`flex items-center gap-1 hover:text-[${navColors.links.contact.hover}] transition-colors px-2 ${
                isScrolled ? `text-[${navColors.links.contact.scrolled}]` : `text-${navColors.default.text} ${navColors.default.shadow}`
              }`}
            >
              <Mail className="h-4 w-4" />
              Contact
            </button>
          </div>
          
          <Button 
            variant={isScrolled ? "usaRed" : "patriotic"} 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </motion.nav>
      
      {isMobile && (
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onNavigate={scrollToSection}
        />
      )}
      
      <BackToTopButton isVisible={isScrolled} />
    </>
  );
};

export default NavBar;

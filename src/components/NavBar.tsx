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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowBackToTop(window.scrollY > 300);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
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
        className={`fixed top-0 left-0 right-0 w-full backdrop-blur-sm z-[9997] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 shadow-lg py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link 
            to="/" 
            className={`text-xl font-bold transition-colors flex items-center gap-2 ${
              isScrolled 
                ? 'text-[#3C3B6E] drop-shadow-sm' 
                : 'text-white drop-shadow-md'
            }`}
          >
            <Shield className={`h-5 w-5 ${
              isScrolled ? 'text-[#3C3B6E]' : 'text-white'
            }`} />
            <span>Dr. Troy Williams</span>
          </Link>
          
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
              onClick={() => scrollToSection('work')}
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
              onClick={() => scrollToSection('videos')}
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
              onClick={() => scrollToSection('contact')}
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
      
      <BackToTopButton isVisible={showBackToTop} />
    </>
  );
};

export default NavBar;

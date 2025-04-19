
import { useState, useEffect } from "react";
import { Menu, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "./navigation/MobileMenu";
import BackToTopButton from "./navigation/BackToTopButton";
import NavLinks from "./navigation/NavLinks";

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
                ? 'text-[#8B5CF6] drop-shadow-sm' 
                : 'text-[#8B5CF6] drop-shadow-md'
            }`}
          >
            <Shield className={`h-5 w-5 ${
              isScrolled ? 'text-[#8B5CF6]' : 'text-[#8B5CF6]'
            }`} />
            <span>Dr. Troy Williams</span>
          </Link>
          
          <NavLinks isScrolled={isScrolled} onSectionClick={scrollToSection} />
          
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

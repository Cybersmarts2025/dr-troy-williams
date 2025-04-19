
import { useState, useEffect } from "react";
import { Menu, Info, Book, Briefcase, Video, Mail, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
              isScrolled ? 'text-[#B22234]' : 'text-white drop-shadow-md'
            }`}
          >
            <Shield className={`h-5 w-5 ${isScrolled ? 'text-[#B22234]' : 'text-white'}`} />
            <span>Dr. Troy Williams</span>
          </Link>
          
          <div className="hidden md:flex gap-3 items-center">
            <Link 
              to="/about" 
              className={`flex items-center gap-1 hover:text-[#B22234] transition-colors px-2 ${
                isScrolled ? 'text-[#3C3B6E]' : 'text-white drop-shadow-sm'
              }`}
            >
              <Info className="h-4 w-4" />
              About
            </Link>
            <Link 
              to="/books" 
              className={`flex items-center gap-1 hover:text-[#B22234] transition-colors px-2 ${
                isScrolled ? 'text-[#3C3B6E]' : 'text-white drop-shadow-sm'
              }`}
            >
              <Book className="h-4 w-4" />
              Books
            </Link>
            <button 
              onClick={() => scrollToSection('work')}
              className={`flex items-center gap-1 hover:text-[#B22234] transition-colors px-2 ${
                isScrolled ? 'text-[#3C3B6E]' : 'text-white drop-shadow-sm'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Work History
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className={`flex items-center gap-1 hover:text-[#B22234] transition-colors px-2 ${
                isScrolled ? 'text-[#3C3B6E]' : 'text-white drop-shadow-sm'
              }`}
            >
              <Video className="h-4 w-4" />
              Videos
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`flex items-center gap-1 hover:text-[#B22234] transition-colors px-2 ${
                isScrolled ? 'text-[#3C3B6E]' : 'text-white drop-shadow-sm'
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
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-40 border-t border-gray-200 overflow-hidden"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
              <Link 
                to="/about" 
                className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Info className="h-5 w-5" />
                About
              </Link>
              <Link 
                to="/books" 
                className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Book className="h-5 w-5" />
                Books
              </Link>
              <button 
                onClick={() => scrollToSection('work')}
                className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md text-left"
              >
                <Briefcase className="h-5 w-5" />
                Work History
              </button>
              <button 
                onClick={() => scrollToSection('videos')}
                className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md text-left"
              >
                <Video className="h-5 w-5" />
                Videos
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 py-3 px-4 text-[#3C3B6E] hover:bg-gray-100 rounded-md text-left"
              >
                <Mail className="h-5 w-5" />
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Back to Top Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 bg-[#B22234] text-white p-3 rounded-full shadow-lg hover:bg-[#9B0000] z-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;

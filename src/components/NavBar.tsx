import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalSearch } from './GlobalSearch';
import Logo from './navigation/Logo';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-md transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <DesktopNav isScrolled={scrolled} onSectionClick={handleSectionClick} />
          <ThemeToggle />
        </div>

        {/* Mobile menu button and navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <MobileNav 
            isOpen={mobileMenuOpen} 
            toggleMenu={toggleMobileMenu} 
            closeMenu={closeMobileMenu}
            onSectionClick={handleSectionClick}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;

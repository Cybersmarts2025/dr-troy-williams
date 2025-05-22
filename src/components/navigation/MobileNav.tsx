
import React from 'react';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import UserAccount from './UserAccount';

interface MobileNavProps {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  onSectionClick: (sectionId: string) => void;
}

const MobileNav = ({ isOpen, toggleMenu, closeMenu, onSectionClick }: MobileNavProps) => {
  return (
    <>
      <button 
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-gray-700" />
        ) : (
          <Menu className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {isOpen && (
        <MobileMenu 
          onClose={closeMenu} 
          onNavigate={onSectionClick}
        >
          <UserAccount isMobile onMobileClose={closeMenu} />
        </MobileMenu>
      )}
    </>
  );
};

export default MobileNav;

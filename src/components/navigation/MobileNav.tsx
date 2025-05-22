
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
        className="md:hidden text-gray-500 hover:text-gray-800"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
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

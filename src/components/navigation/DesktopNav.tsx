
import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import NavLinks from './NavLinks';
import UserAccount from './UserAccount';

interface DesktopNavProps {
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
}

const DesktopNav = ({ isScrolled, onSectionClick }: DesktopNavProps) => {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <NavLinks isScrolled={isScrolled} onSectionClick={onSectionClick} />
      <UserAccount />
    </nav>
  );
};

export default DesktopNav;


import React from 'react';
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isScrolled: boolean;
  baseShadow: string;
  color: string;
  hoverColor: string;
}

const NavLink = ({ to, icon: Icon, label, isScrolled, baseShadow, color, hoverColor }: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-1 font-medium hover:text-[${hoverColor}] transition-colors px-2 ${
        isScrolled 
          ? `text-[#1A1F2C] hover:text-[${hoverColor}]` 
          : `text-[${color}] hover:text-white ${baseShadow}`
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};

export default NavLink;

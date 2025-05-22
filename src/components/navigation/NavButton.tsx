
import React from 'react';
import { LucideIcon } from "lucide-react";

interface NavButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  isScrolled: boolean;
  baseShadow: string;
  color: string;
  hoverColor: string;
}

const NavButton = ({ onClick, icon: Icon, label, isScrolled, baseShadow, color, hoverColor }: NavButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-1 font-medium transition-colors hover:text-[${hoverColor}] ${
        isScrolled 
          ? `text-[#1A1F2C]` 
          : `${baseShadow}`
      }`}
      style={{
        color: isScrolled ? '#1A1F2C' : color
      }}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
};

export default NavButton;

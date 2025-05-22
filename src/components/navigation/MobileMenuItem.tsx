
import React from 'react';
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface MobileMenuItemProps {
  icon: LucideIcon;
  label: string;
  to?: string;
  onClick?: () => void;
  color: string;
}

const MobileMenuItem = ({ icon: Icon, label, to, onClick, color }: MobileMenuItemProps) => {
  if (to) {
    return (
      <Link 
        to={to} 
        className="flex items-center gap-3 py-4 px-5 hover:bg-gray-100 rounded-md font-medium w-full transition-colors"
        onClick={onClick}
        style={{ color }}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span>{label}</span>
      </Link>
    );
  }
  
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-3 py-4 px-5 hover:bg-gray-100 rounded-md text-left font-medium w-full transition-colors"
      style={{ color }}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span>{label}</span>
    </button>
  );
};

export default MobileMenuItem;

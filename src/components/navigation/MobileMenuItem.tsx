
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
        className={`flex items-center gap-2 py-3 px-4 text-[${color}] hover:bg-gray-100 rounded-md font-medium`}
        onClick={onClick}
      >
        <Icon className="h-5 w-5" />
        {label}
      </Link>
    );
  }
  
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 py-3 px-4 text-[${color}] hover:bg-gray-100 rounded-md text-left font-medium`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
};

export default MobileMenuItem;

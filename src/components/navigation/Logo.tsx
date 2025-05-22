
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
      aria-label="Dr. Troy Williams - Home"
    >
      <div className="relative">
        <Shield className="h-6 w-6 text-[#B22234] group-hover:text-[#3C3B6E] transition-colors duration-300" />
        <div className="absolute -top-1 -right-1 h-2 w-2 bg-[#3C3B6E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="font-bold text-[#B22234] text-xl md:text-2xl transition-colors duration-300 group-hover:text-[#3C3B6E]">
        Dr. Troy Williams
      </div>
    </Link>
  );
};

export default Logo;

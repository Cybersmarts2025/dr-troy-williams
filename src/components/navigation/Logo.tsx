
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
    >
      <Shield className="h-6 w-6 text-[#B22234] group-hover:text-[#3C3B6E] transition-colors" />
      <div className="font-bold text-[#B22234] text-xl md:text-2xl transition-colors group-hover:text-[#3C3B6E]">
        Dr. Troy Williams
      </div>
    </Link>
  );
};

export default Logo;

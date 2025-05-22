
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Shield className="h-6 w-6 text-[#B22234]" />
      <div className="font-bold text-[#B22234] text-xl md:text-2xl transition-colors duration-300 hover:text-[#3C3B6E]">
        Dr. Troy Williams
      </div>
    </Link>
  );
};

export default Logo;


import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="font-bold text-red-600 text-xl md:text-2xl">
        Dr. Troy Williams
      </div>
    </Link>
  );
};

export default Logo;

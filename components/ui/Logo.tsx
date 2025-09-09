
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center text-2xl font-bold text-[#e42525] ${className}`}>
      <FaHeart className="mr-2" />
      <span>DateMatch</span>
    </div>
  );
};

export default Logo;

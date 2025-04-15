import React from 'react';
import rocketLogo from './jumpstart.png';

const Logo: React.FC = () => {
  return (
    <img 
      src={rocketLogo} 
      alt="Jumpstart Jobs Logo" 
      className="w-14 h-14"
    />
  );
};

export default Logo; 
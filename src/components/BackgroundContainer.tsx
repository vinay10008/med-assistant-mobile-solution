
import React from 'react';

interface BackgroundContainerProps {
  children: React.ReactNode;
}

const BackgroundContainer = ({ children }: BackgroundContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-lightBlue/30 to-white relative">
      <div className="absolute inset-0 bg-[url('/images/hospital-pattern.png')] opacity-5"></div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default BackgroundContainer;

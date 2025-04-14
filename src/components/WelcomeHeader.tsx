
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';

const WelcomeHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full">
      <Card className="border-none bg-transparent shadow-none">
        <CardContent className="p-0 sm:p-2">
          <h1 className={`text-${isMobile ? '2xl' : '3xl'} font-bold text-medical-darkPurple mb-2`}>
            Welcome back!
          </h1>
          <p className="text-gray-600 mb-4">
            How are you feeling today?
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeHeader;


import React from 'react';
import BackgroundContainer from '@/components/BackgroundContainer';
import WelcomeHeader from '@/components/WelcomeHeader';
import AIConsultation from '@/components/AIConsultation';
import AppointmentManager from '@/components/AppointmentManager';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <BackgroundContainer>
      <div className="container mx-auto px-4 py-6">
        <WelcomeHeader />
        
        <div className={`mt-6 grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8'}`}>
          <AIConsultation />
          <AppointmentManager />
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Med Assistant Mobile Solution &copy; 2025</p>
          <p>This is a simulated healthcare application for educational purposes only.</p>
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default Index;

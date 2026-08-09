import React from 'react';
import { Hero } from '../components/Hero';
import { WhoWeAre } from '../components/WhoWeAre';
import { WhatWeProvide } from '../components/WhatWeProvide';
import { GlobalPresence } from '../components/GlobalPresence';
import { ContactCTA } from '../components/ContactCTA';

interface HomeViewProps {
  onNavigate: (route: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-300">
      <Hero onNavigate={onNavigate} />
      <WhoWeAre onNavigate={onNavigate} />
      <WhatWeProvide onNavigate={onNavigate} />
      <GlobalPresence />
      <ContactCTA onNavigate={onNavigate} />
    </div>
  );
};

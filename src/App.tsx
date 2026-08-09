import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './lib/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';

import { HomeView } from './views/HomeView';
import { ServicesOverviewView } from './views/ServicesOverviewView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { WorkView } from './views/WorkView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { AboutView } from './views/AboutView';
import { CareersView } from './views/CareersView';
import { JobDetailView } from './views/JobDetailView';
import { ResourcesView } from './views/ResourcesView';
import { ResourceDetailView } from './views/ResourceDetailView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Router logic
  const renderView = () => {
    if (currentRoute === '/' || currentRoute === '') {
      return <HomeView onNavigate={navigate} />;
    }

    if (currentRoute === '/services') {
      return <ServicesOverviewView onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/services/')) {
      const slug = currentRoute.replace('/services/', '');
      return <ServiceDetailView slug={slug} onNavigate={navigate} />;
    }

    if (currentRoute === '/work') {
      return <WorkView onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/work/')) {
      const slug = currentRoute.replace('/work/', '');
      return <ProjectDetailView slug={slug} onNavigate={navigate} />;
    }

    if (currentRoute === '/about') {
      return <AboutView onNavigate={navigate} />;
    }

    if (currentRoute === '/careers') {
      return <CareersView onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/careers/')) {
      const slug = currentRoute.replace('/careers/', '');
      return <JobDetailView slug={slug} onNavigate={navigate} />;
    }

    if (currentRoute === '/resources') {
      return <ResourcesView onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('/resources/')) {
      const slug = currentRoute.replace('/resources/', '');
      return <ResourceDetailView slug={slug} onNavigate={navigate} />;
    }

    if (currentRoute === '/contact') {
      return <ContactView onNavigate={navigate} />;
    }

    // Default Fallback
    return <HomeView onNavigate={navigate} />;
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-[#111111] font-sans flex flex-col justify-between selection:bg-[#00AEEF] selection:text-white relative">
        <Cursor />
        <Navbar currentRoute={currentRoute} onNavigate={navigate} />
        
        <main className="flex-grow">
          {renderView()}
        </main>

        <Footer onNavigate={navigate} />
      </div>
    </LanguageProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MegaMenu } from './MegaMenu';
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav_work'), route: '/work' },
    { label: t('nav_about'), route: '/about' },
    { label: t('nav_resources'), route: '/resources' },
    { label: t('nav_careers'), route: '/careers' },
  ];

  const handleNavClick = (route: string) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm py-3'
          : 'bg-white border-b border-gray-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">
        
        {/* LEFT: Logo & Descriptor */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => handleNavClick('/')}>
          <div className="font-display font-black text-xl sm:text-2xl tracking-tighter text-[#111111]">
            MG<span className="text-[#00AEEF]">.IO</span>
          </div>
          <div className="hidden sm:block border-l border-gray-300 pl-3">
            <span className="text-[10px] font-mono tracking-widest text-[#555555] uppercase block leading-none">
              DIGITAL SYSTEMS
            </span>
          </div>
        </div>

        {/* CENTER: Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono font-bold tracking-wider uppercase text-[#111111]">
          {/* Services with MegaMenu toggle */}
          <div
            className="relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
          >
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className={`flex items-center gap-1 py-1 hover:text-[#00AEEF] transition-colors ${
                currentRoute.startsWith('/services') ? 'text-[#00AEEF]' : ''
              }`}
            >
              <span>{t('nav_services')}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.route}
              onClick={() => handleNavClick(link.route)}
              className={`hover:text-[#00AEEF] transition-colors py-1 ${
                currentRoute === link.route ? 'text-[#00AEEF] underline underline-offset-4 decoration-2' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* RIGHT: Language Switcher & Call CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          
          <button
            onClick={() => handleNavClick('/contact')}
            className="px-4 py-2 bg-[#111111] hover:bg-[#00AEEF] text-white text-xs font-mono font-bold tracking-wider uppercase rounded transition-colors flex items-center gap-2 group shadow-sm"
          >
            <span>{t('nav_bookCall')}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#111111] hover:bg-gray-100 rounded"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mega Menu Overlay */}
      <div onMouseLeave={() => setIsMegaMenuOpen(false)}>
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
          onNavigate={handleNavClick}
        />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleNavClick('/services')}
              className="text-left font-display font-bold text-lg text-[#111111] border-b border-gray-100 pb-2"
            >
              {t('nav_services')} →
            </button>
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className="text-left font-display font-bold text-lg text-[#111111] border-b border-gray-100 pb-2"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('/contact')}
              className="w-full py-3 bg-[#111111] text-white text-xs font-mono font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 mt-4"
            >
              <span>{t('nav_bookCall')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

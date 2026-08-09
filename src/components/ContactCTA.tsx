import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { ArrowUpRight, MessageSquare } from 'lucide-react';

interface ContactCTAProps {
  onNavigate: (route: string) => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#111111] text-white relative overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#00AEEF] uppercase block mb-4">
          CONTACT MG.IO
        </span>

        <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6">
          {t('contact_cta_headline')}
        </h2>

        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10">
          {t('contact_cta_support')}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => onNavigate('/contact')}
            data-cursor="OPEN"
            className="w-full sm:w-auto px-8 py-4 bg-[#00AEEF] hover:bg-white text-white hover:text-[#111111] font-mono font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 flex items-center justify-center gap-3 shadow-lg group"
          >
            <span>{t('contact_cta_button')}</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="https://wa.me/?text=Hello%20MG.IO%20team"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-widest rounded border border-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#00AEEF]" />
            <span>WHATSAPP DIRECT</span>
          </a>
        </div>

      </div>
    </section>
  );
};

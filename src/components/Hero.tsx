import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { MGCore3D } from './3d/MGCore3D';

interface HeroProps {
  onNavigate: (route: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center bg-white overflow-hidden border-b border-gray-100">
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT 60% Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100/80 border border-gray-200 rounded text-[11px] font-mono font-bold tracking-[0.2em] text-[#555555] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>{t('hero_eyebrow')}</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl xl:text-7xl tracking-ultra text-[#111111] leading-tight sm:leading-[1.0] lg:leading-[0.95] mb-6 uppercase break-words">
              {t('hero_headline_1')}<br className="hidden sm:inline" />{' '}
              <span className="text-stroke-light">{t('hero_headline_2')}</span><br className="hidden sm:inline" />{' '}
              <span className="text-[#111111]">{t('hero_headline_3')}</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base md:text-lg text-[#555555] max-w-xl font-normal leading-relaxed mb-8">
              {t('hero_support')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('/contact')}
                data-cursor="OPEN"
                className="w-full sm:w-auto px-8 py-4 bg-[#111111] hover:bg-[#00AEEF] text-white font-mono font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 flex items-center justify-center gap-3 group shadow-md"
              >
                <span>{t('hero_primaryCta')}</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/services')}
                data-cursor="EXPLORE"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-[#111111] font-mono font-bold text-xs uppercase tracking-widest rounded border border-gray-300 transition-colors flex items-center justify-center gap-3"
              >
                <span>{t('hero_secondaryCta')}</span>
                <ArrowUpRight className="w-4 h-4 text-[#00AEEF]" />
              </button>
            </div>

            {/* Live Trust Metrics Bar */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 w-full grid grid-cols-3 gap-2 sm:gap-4 text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#111111]">9+</span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#777777] block leading-tight">Global Markets</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#00AEEF]">8</span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#777777] block leading-tight">Core Systems</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-display font-extrabold text-[#111111]">&lt; 1s</span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#777777] block leading-tight">Target Latency</span>
              </div>
            </div>

          </div>

          {/* RIGHT 40% Column - 3D Core Visual */}
          <div className="lg:col-span-5 h-[280px] sm:h-[420px] lg:h-[480px] w-full bg-gray-50/50 rounded-2xl border border-gray-200/80 p-2 relative flex items-center justify-center shadow-inner overflow-hidden">
            <MGCore3D />
          </div>

        </div>
      </div>

    </section>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { servicesData } from '../data/servicesData';
import { ArrowUpRight } from 'lucide-react';

interface WhatWeProvideProps {
  onNavigate: (route: string) => void;
}

export const WhatWeProvide: React.FC<WhatWeProvideProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-gray-200 gap-4">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">
              {t('provide_eyebrow')}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#111111] leading-tight">
              {t('provide_headline')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className="text-xs font-mono font-bold text-[#111111] hover:text-[#00AEEF] uppercase tracking-wider flex items-center gap-2 group transition-colors shrink-0"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Service List Rows */}
        <div className="divide-y divide-gray-200">
          {servicesData.map((service) => {
            const isHovered = hoveredId === service.id;
            const isAnyHovered = hoveredId !== null;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onNavigate(`/services/${service.slug}`)}
                data-cursor="EXPLORE"
                className={`group cursor-pointer py-6 sm:py-8 px-3 sm:px-6 transition-all duration-300 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 ${
                  isHovered
                    ? 'bg-[#F7F7F5] scale-[1.01] shadow-sm'
                    : isAnyHovered
                    ? 'opacity-40 hover:opacity-100'
                    : 'opacity-100'
                }`}
              >
                {/* Number & Title */}
                <div className="flex items-start sm:items-center gap-3 sm:gap-6 md:gap-10">
                  <span className="text-xs sm:text-base font-mono font-bold text-[#00AEEF] pt-1 sm:pt-0">
                    {service.number}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-3xl md:text-4xl text-[#111111] group-hover:text-[#00AEEF] transition-colors tracking-tight leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Short Description */}
                <div className="md:max-w-md">
                  <p className="text-xs sm:text-sm text-[#555555] font-normal leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Action Arrow */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className="text-[10px] font-mono font-bold text-[#00AEEF] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                    DISCOVER
                  </span>
                  <div className="w-10 h-10 rounded-full border border-gray-300 group-hover:border-[#00AEEF] group-hover:bg-[#00AEEF] flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-[#111111] group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

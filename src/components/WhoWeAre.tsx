import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { ArrowUpRight, Cpu, Layers, Zap } from 'lucide-react';

interface WhoWeAreProps {
  onNavigate: (route: string) => void;
}

export const WhoWeAre: React.FC<WhoWeAreProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Layers,
      title: 'Digital Experiences',
      desc: 'Bespoke websites and UI systems engineered for immediate discovery and engagement.'
    },
    {
      icon: Cpu,
      title: 'Intelligent AI',
      desc: 'Conversational voice callers and RAG chatbots built to solve real operational needs.'
    },
    {
      icon: Zap,
      title: 'Process Automation',
      desc: 'Seamless CRM and data pipelines that eliminate repetitive manual workflows.'
    }
  ];

  return (
    <section className="py-24 bg-[#F7F7F5] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-6">
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">
              {t('who_eyebrow')}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#111111] leading-tight mb-6">
              {t('who_headline')}
            </h2>
            <p className="text-base text-[#555555] leading-relaxed mb-8">
              {t('who_support')}
            </p>

            <button
              onClick={() => onNavigate('/about')}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#111111] hover:bg-[#00AEEF] text-white font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors group"
            >
              <span>{t('who_cta')}</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Right Column Pillars Grid */}
          <div className="lg:col-span-6 space-y-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-xl hover:border-[#00AEEF] transition-all duration-300 shadow-sm hover:shadow-md flex items-start gap-5 group"
                >
                  <div className="p-3 bg-blue-50 text-[#00AEEF] rounded-lg group-hover:bg-[#00AEEF] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#111111] mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#555555] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

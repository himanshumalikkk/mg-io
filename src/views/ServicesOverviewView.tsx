import React from 'react';
import { servicesData } from '../data/servicesData';
import { ArrowUpRight } from 'lucide-react';

interface ServicesOverviewProps {
  onNavigate: (route: string) => void;
}

export const ServicesOverviewView: React.FC<ServicesOverviewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-gray-200">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">
            ALL CAPABILITIES
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-tight mb-4 break-words">
            MG.IO SERVICES & SYSTEMS
          </h1>
          <p className="text-base text-[#555555] leading-relaxed">
            From bespoke high-conversion websites to multi-agent voice AI and automated operational workflows.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onClick={() => onNavigate(`/services/${service.slug}`)}
              data-cursor="EXPLORE"
              className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 hover:border-[#00AEEF] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono font-bold text-[#00AEEF]">{service.number}</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#777777] bg-white px-2 py-0.5 rounded border border-gray-200">
                    {service.category}
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-2xl text-[#111111] group-hover:text-[#00AEEF] transition-colors mb-3">
                  {service.title}
                </h2>

                <p className="text-xs text-[#555555] leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                <div className="space-y-1.5 mb-6">
                  {service.whatWeBuild.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-mono text-[#111111]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#111111] group-hover:text-[#00AEEF]">
                  EXPLORE {service.title}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#111111] group-hover:text-[#00AEEF] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

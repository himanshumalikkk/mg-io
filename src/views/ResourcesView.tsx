import React from 'react';
import { resourcesData } from '../data/resourcesData';
import { ArrowUpRight, Clock, Calendar, User } from 'lucide-react';

interface ResourcesViewProps {
  onNavigate: (route: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-gray-200">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">
            KNOWLEDGE & INSIGHTS
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-tight mb-4 break-words">
            RESOURCES & ANALYSIS
          </h1>
          <p className="text-base text-[#555555] leading-relaxed">
            Technical breakdowns, GEO strategy, and AI telephony implementation playbooks from our engineering labs.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resourcesData.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(`/resources/${item.slug}`)}
              data-cursor="READ"
              className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 hover:border-[#00AEEF] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00AEEF] bg-white px-2 py-0.5 rounded border border-gray-200">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#777777] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#00AEEF]" />
                    <span>{item.readTime}</span>
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-xl text-[#111111] group-hover:text-[#00AEEF] transition-colors mb-3 leading-snug">
                  {item.title}
                </h2>

                <p className="text-xs text-[#555555] leading-relaxed mb-6">
                  {item.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#777777]">
                  {item.date}
                </span>
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#111111] group-hover:text-[#00AEEF]">
                  <span>READ</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

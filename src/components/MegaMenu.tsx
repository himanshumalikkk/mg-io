import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>('websites');

  if (!isOpen) return null;

  const activeService = servicesData.find(s => s.slug === hoveredSlug) || servicesData[0];

  const handleServiceClick = (slug: string) => {
    onClose();
    onNavigate(`/services/${slug}`);
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Columns - Service Categories (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          {/* DIGITAL EXPERIENCES */}
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#555555] uppercase block mb-4 border-b border-gray-100 pb-2">
              DIGITAL EXPERIENCES
            </span>
            <div className="space-y-3">
              <button
                onMouseEnter={() => setHoveredSlug('websites')}
                onClick={() => handleServiceClick('websites')}
                className={`group w-full text-left flex items-center justify-between transition-opacity duration-200 ${
                  hoveredSlug && hoveredSlug !== 'websites' ? 'opacity-40 hover:opacity-100' : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#00AEEF]">01</span>
                  <span className="font-display font-bold text-base group-hover:text-[#00AEEF] transition-colors">Websites</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#00AEEF] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onMouseEnter={() => setHoveredSlug('websites')}
                onClick={() => handleServiceClick('websites')}
                className={`group w-full text-left flex items-center justify-between transition-opacity duration-200 ${
                  hoveredSlug && hoveredSlug !== 'websites' ? 'opacity-40 hover:opacity-100' : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#00AEEF]">02</span>
                  <span className="font-display font-bold text-base group-hover:text-[#00AEEF] transition-colors">UI/UX & Systems</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#00AEEF] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* INTELLIGENT SYSTEMS */}
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#555555] uppercase block mb-4 border-b border-gray-100 pb-2">
              INTELLIGENT SYSTEMS
            </span>
            <div className="space-y-3">
              {[
                { slug: 'ai-chatbots', num: '03', name: 'AI Chatbots' },
                { slug: 'ai-calling', num: '04', name: 'AI Voice Calling' },
                { slug: 'automation', num: '05', name: 'Automation' },
                { slug: 'custom-ai', num: '06', name: 'Custom AI' }
              ].map(item => (
                <button
                  key={item.slug}
                  onMouseEnter={() => setHoveredSlug(item.slug)}
                  onClick={() => handleServiceClick(item.slug)}
                  className={`group w-full text-left flex items-center justify-between transition-opacity duration-200 ${
                    hoveredSlug && hoveredSlug !== item.slug ? 'opacity-40 hover:opacity-100' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#00AEEF]">{item.num}</span>
                    <span className="font-display font-bold text-base group-hover:text-[#00AEEF] transition-colors">{item.name}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#00AEEF] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* GROWTH */}
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#555555] uppercase block mb-4 border-b border-gray-100 pb-2">
              GROWTH & ENGINE
            </span>
            <div className="space-y-3">
              {[
                { slug: 'seo', num: '07', name: 'SEO' },
                { slug: 'geo', num: '08', name: 'GEO (AI Discovery)' },
                { slug: 'lead-generation', num: '09', name: 'Lead Generation' }
              ].map(item => (
                <button
                  key={item.slug}
                  onMouseEnter={() => setHoveredSlug(item.slug)}
                  onClick={() => handleServiceClick(item.slug)}
                  className={`group w-full text-left flex items-center justify-between transition-opacity duration-200 ${
                    hoveredSlug && hoveredSlug !== item.slug ? 'opacity-40 hover:opacity-100' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#00AEEF]">{item.num}</span>
                    <span className="font-display font-bold text-base group-hover:text-[#00AEEF] transition-colors">{item.name}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#00AEEF] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Preview Card (4 cols) */}
        <div className="lg:col-span-4 bg-[#F7F7F5] border border-gray-200 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-1">
              PREVIEW — {activeService.number}
            </span>
            <h4 className="font-display font-extrabold text-xl text-[#111111] mb-2">
              {activeService.title}
            </h4>
            <p className="text-xs text-[#555555] leading-relaxed mb-4">
              {activeService.shortDesc}
            </p>
          </div>

          <div>
            <div className="mb-4 space-y-1">
              {activeService.whatWeBuild.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] text-[#111111] font-mono">
                  <span className="w-1 h-1 rounded-full bg-[#00AEEF]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleServiceClick(activeService.slug)}
              className="w-full py-2.5 px-4 bg-[#111111] hover:bg-[#00AEEF] text-white text-xs font-mono font-bold tracking-wider uppercase rounded transition-colors flex items-center justify-between"
            >
              <span>EXPLORE SERVICE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

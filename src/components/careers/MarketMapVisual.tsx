import React, { useState } from 'react';
import { Globe, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface MarketMapVisualProps {
  onSelectMarket: (marketCode: string) => void;
  selectedMarket: string;
}

export const MarketMapVisual: React.FC<MarketMapVisualProps> = ({ onSelectMarket, selectedMarket }) => {
  const [activeHoverNode, setActiveHoverNode] = useState<string | null>(null);

  const marketNodes = [
    {
      code: 'SPANISH',
      name: 'Spanish Market',
      region: 'Spain & Latin America',
      flag: '🇪🇸',
      language: 'Spanish',
      status: 'EXPANDING NETWORK',
      focus: 'SMBs, E-Commerce, Professional Services',
      coordinates: { x: '35%', y: '45%' }
    },
    {
      code: 'GERMAN',
      name: 'German Market',
      region: 'DACH Region (DE, AT, CH)',
      flag: '🇩🇪',
      language: 'German',
      status: 'EXPANDING NETWORK',
      focus: 'Industrial, Tech, B2B Services',
      coordinates: { x: '50%', y: '35%' }
    },
    {
      code: 'FRENCH',
      name: 'French Market',
      region: 'France & Francophone Hubs',
      flag: '🇫🇷',
      language: 'French',
      status: 'EXPANDING NETWORK',
      focus: 'Retail, Hospitality, Corporate Services',
      coordinates: { x: '42%', y: '40%' }
    },
    {
      code: 'ITALIAN',
      name: 'Italian Market',
      region: 'Italy',
      flag: '🇮🇹',
      language: 'Italian',
      status: 'EXPANDING NETWORK',
      focus: 'Manufacturing, Design, Commercial SMBs',
      coordinates: { x: '52%', y: '48%' }
    },
    {
      code: 'PORTUGUESE',
      name: 'Portuguese Market',
      region: 'Portugal & Global Hubs',
      flag: '🇵🇹',
      language: 'Portuguese',
      status: 'EXPANDING NETWORK',
      focus: 'Tourism, Tech Hubs, Services',
      coordinates: { x: '30%', y: '50%' }
    },
    {
      code: 'ENGLISH',
      name: 'International Market',
      region: 'Global Enterprise & US/UK',
      flag: '🌐',
      language: 'English',
      status: 'ACTIVE CORE',
      focus: 'SaaS, Scale-ups, Global Agencies',
      coordinates: { x: '70%', y: '40%' }
    }
  ];

  return (
    <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden my-12">
      {/* Background Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-[#111111_0.03]_1px,transparent_1px] bg-[size:24px_24px] pointer-events-none opacity-40" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase bg-white px-2.5 py-1 rounded border border-gray-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
            GLOBAL EXPANSION NETWORK
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111]">
            ACTIVE TARGET MARKETS
          </h3>
        </div>
        <p className="text-xs font-mono text-[#555555] max-w-md leading-relaxed">
          We deploy Market Growth Agents directly in local language regions to bridge local business trust with MG.IO digital technology.
        </p>
      </div>

      {/* Interactive Map Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {marketNodes.map((node) => {
          const isSelected = selectedMarket === node.code;
          const isHovered = activeHoverNode === node.code;

          return (
            <div
              key={node.code}
              onClick={() => onSelectMarket(node.code)}
              onMouseEnter={() => setActiveHoverNode(node.code)}
              onMouseLeave={() => setActiveHoverNode(null)}
              className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#00AEEF] shadow-md ring-2 ring-[#00AEEF]/20'
                  : 'bg-white/80 border-gray-200 hover:bg-white hover:border-gray-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{node.flag}</span>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    isSelected ? 'bg-[#00AEEF] text-white' : 'bg-gray-100 text-[#555555]'
                  }`}>
                    {node.status}
                  </span>
                </div>

                <h4 className="font-display font-bold text-lg text-[#111111] mb-1 flex items-center justify-between">
                  <span>{node.name}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${
                    isSelected || isHovered ? 'translate-x-1 text-[#00AEEF]' : 'text-gray-300'
                  }`} />
                </h4>

                <p className="text-xs text-[#555555] font-mono mb-3">
                  {node.region}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 text-[10px] font-mono text-[#777777] flex items-center justify-between">
                <span>LANGUAGE: <strong className="text-[#111111]">{node.language}</strong></span>
                <span className="text-[#00AEEF] font-bold">1 OPEN ROLE</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Network Bar */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#555555] relative z-10">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#00AEEF]" />
          <span>Local Language Proficiency & Market Knowledge Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Remote & Direct Growth Partnership</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { marketsData } from '../data/marketsData';
import { Globe, MapPin, Clock, Languages, ArrowRight } from 'lucide-react';

export const GlobalPresence: React.FC = () => {
  const { t } = useLanguage();
  const [selectedMarketId, setSelectedMarketId] = useState<string>('m-in');

  const selectedMarket = marketsData.find(m => m.id === selectedMarketId) || marketsData[0];

  return (
    <section className="py-24 bg-[#F7F7F5] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">
            {t('global_eyebrow')}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#111111] leading-tight mb-4">
            {t('global_headline')}
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            {t('global_support')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Country Selection Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {marketsData.map((market) => {
              const isSelected = market.id === selectedMarketId;
              return (
                <button
                  key={market.id}
                  onClick={() => setSelectedMarketId(market.id)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between min-h-[7rem] sm:h-32 ${
                    isSelected
                      ? 'bg-white border-[#00AEEF] shadow-md ring-2 ring-[#00AEEF]/20'
                      : 'bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{market.flagEmoji}</span>
                    <span className="text-[10px] font-mono font-bold text-[#555555] bg-gray-100 px-1.5 py-0.5 rounded">
                      {market.code}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-base text-[#111111]">
                      {market.country}
                    </h4>
                    <span className="text-[10px] font-mono text-[#777777] block truncate">
                      {market.keyMarket}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Selected Market Detail Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Globe className="w-48 h-48 text-[#111111]" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedMarket.flagEmoji}</span>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00AEEF] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {selectedMarket.type}
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#111111] mt-1">
                    {selectedMarket.country}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#555555] leading-relaxed mb-6 pb-6 border-b border-gray-100">
                {selectedMarket.summary}
              </p>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center gap-3 text-[#111111]">
                  <MapPin className="w-4 h-4 text-[#00AEEF] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#777777] block uppercase">Regional Hub</span>
                    <span className="font-bold">{selectedMarket.keyMarket}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#111111]">
                  <Languages className="w-4 h-4 text-[#00AEEF] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#777777] block uppercase">Languages</span>
                    <span className="font-bold">{selectedMarket.language}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#111111]">
                  <Clock className="w-4 h-4 text-[#00AEEF] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#777777] block uppercase">Timezone</span>
                    <span className="font-bold">{selectedMarket.timezone}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

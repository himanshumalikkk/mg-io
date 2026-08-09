import React from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, Globe, Cpu } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (route: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div className="max-w-4xl mb-20 pb-12 border-b border-gray-200">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">
            ABOUT MG.IO
          </span>
          <h1 className="font-display font-black text-2xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-tight mb-6 break-words">
            WE BUILD DIGITAL SYSTEMS FOR THE WAY BUSINESS WORKS TODAY.
          </h1>
          <p className="text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
            MG.IO is an international digital technology agency operating across India, Europe, and Latin America. We design websites, deploy conversational voice AI, and automate administrative business operations.
          </p>
        </div>

        {/* SECTIONS */}
        <div className="space-y-16">
          
          {/* WHO WE ARE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-gray-100">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-bold text-[#00AEEF] uppercase">01 / IDENTITY</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] mt-2">WHO WE ARE</h2>
            </div>
            <div className="lg:col-span-8 text-sm text-[#555555] leading-relaxed space-y-4">
              <p>
                MG.IO was founded on a straightforward thesis: modern enterprises require interconnected digital ecosystems, not disconnected marketing templates.
              </p>
              <p>
                Our teams combine visual design craft inspired by editorial publications with rigorous software engineering and AI agent deployment.
              </p>
            </div>
          </div>

          {/* WHAT WE BELIEVE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-gray-100">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-bold text-[#00AEEF] uppercase">02 / PHILOSOPHY</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] mt-2">WHAT WE BELIEVE</h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-[#F7F7F5] rounded-xl border border-gray-200">
                <ShieldCheck className="w-6 h-6 text-[#00AEEF] mb-3" />
                <h3 className="font-display font-bold text-base text-[#111111] mb-2">Clarity Over Noise</h3>
                <p className="text-xs text-[#555555]">We reject generic marketing fluff. Every interface and system must produce measurable ROI.</p>
              </div>
              <div className="p-6 bg-[#F7F7F5] rounded-xl border border-gray-200">
                <Cpu className="w-6 h-6 text-[#00AEEF] mb-3" />
                <h3 className="font-display font-bold text-base text-[#111111] mb-2">Practical AI</h3>
                <p className="text-xs text-[#555555]">AI is not a gimmick. We deploy voice callers, chatbots, and automation where they genuinely save time.</p>
              </div>
            </div>
          </div>

          {/* HUMAN + AI */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-gray-100">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-bold text-[#00AEEF] uppercase">03 / SYNERGY</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] mt-2">HUMAN + AI</h2>
            </div>
            <div className="lg:col-span-8 text-sm text-[#555555] leading-relaxed space-y-4">
              <p>
                We believe the most effective technology combines human creative strategy with artificial intelligence speed and precision.
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onNavigate('/contact')}
            className="px-8 py-4 bg-[#111111] hover:bg-[#00AEEF] text-white font-mono font-bold text-xs uppercase tracking-widest rounded transition-colors inline-flex items-center gap-2"
          >
            <span>START A CONVERSATION</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

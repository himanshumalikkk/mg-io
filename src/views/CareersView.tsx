import React, { useState } from 'react';
import { jobsData } from '../data/jobsData';
import { MarketMapVisual } from '../components/careers/MarketMapVisual';
import { ArrowUpRight, ArrowDown, Globe, CheckCircle2, Sparkles, Building2, Search, MessageSquare, Target, Users, PhoneCall, ShieldAlert } from 'lucide-react';

interface CareersViewProps {
  onNavigate: (route: string) => void;
}

export const CareersView: React.FC<CareersViewProps> = ({ onNavigate }) => {
  const [selectedMarketFilter, setSelectedMarketFilter] = useState<string>('ALL');

  const filteredJobs = selectedMarketFilter === 'ALL'
    ? jobsData
    : jobsData.filter(j => j.marketCode === selectedMarketFilter);

  const marketFilters = [
    { code: 'ALL', label: 'ALL MARKETS' },
    { code: 'SPANISH', label: 'SPANISH' },
    { code: 'GERMAN', label: 'GERMAN' },
    { code: 'FRENCH', label: 'FRENCH' },
    { code: 'ITALIAN', label: 'ITALIAN' },
    { code: 'PORTUGUESE', label: 'PORTUGUESE' },
    { code: 'ENGLISH', label: 'ENGLISH' },
  ];

  const actualActivities = [
    { icon: Search, title: 'Research Local Businesses', desc: 'Find businesses in your assigned language and market.' },
    { icon: Target, title: 'Identify Opportunities', desc: 'Spot businesses that suffer from digital friction or outdated systems.' },
    { icon: Users, title: 'Find Decision-Makers', desc: 'Locate owners, CEOs, and directors with direct contact channels.' },
    { icon: MessageSquare, title: 'Start Local Conversations', desc: 'Reach out naturally in the local language without pushy templates.' },
    { icon: Building2, title: 'Understand Current Setup', desc: 'Uncover real operational problems and digital limitations.' },
    { icon: Sparkles, title: 'Recommend MG.IO Solutions', desc: 'Match customer pain points with relevant web, AI, or automation services.' },
    { icon: PhoneCall, title: 'Qualify & Book Meetings', desc: 'Validate interest, budget, and timing, then connect prospects with MG.IO.' },
    { icon: CheckCircle2, title: 'Maintain CRM & Follow-Up', desc: 'Keep accurate lead records and share market insights with engineering.' },
  ];

  const requirementsList = [
    'Professional fluency or native-level fluency in the target market language.',
    'Strong spoken and written business communication skills.',
    'Comfortable speaking directly with business owners and decision-makers.',
    'Ability to research businesses independently across local directories and channels.',
    'Ability to identify business problems and explain technology in simple language.',
    'Ability to pitch services conversationally without sounding scripted.',
    'Good listening skills and comfort with cold outreach and follow-up.',
    'Basic understanding of websites, digital marketing, and modern business tools.',
    'Ability to work independently and maintain reliable communication with MG.IO.'
  ];

  const niceToHaveList = [
    'Previous sales or business development experience',
    'Lead generation & local business prospecting',
    'Cold calling, cold email, or LinkedIn outreach',
    'Agency sales experience (Websites, SEO, Automation, AI)',
    'CRM experience (HubSpot, Salesforce, etc.)',
    'Knowledge of local business culture & commercial networks'
  ];

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ==================================================
            1. HERO POSITIONING
        ================================================== */}
        <div className="max-w-4xl mb-16 pb-12 border-b border-gray-200">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">
            BUILD MG.IO IN YOUR MARKET
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl text-[#111111] tracking-tight leading-tight mb-6 uppercase break-words">
            BUILD THE NEXT MARKET WITH US.
          </h1>

          <p className="text-base sm:text-xl text-[#111111] font-medium leading-relaxed mb-4">
            We're building a global network of market specialists who understand local businesses, speak their language and know how to start meaningful conversations.
          </p>

          <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-8 max-w-2xl font-mono">
            You don't need to be a developer. You need to understand businesses, communicate naturally and know how to create opportunities.
          </p>

          <a
            href="#open-positions"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] hover:bg-[#00AEEF] text-white font-mono font-bold text-xs uppercase tracking-widest rounded transition-all duration-200 group shadow-md"
          >
            <span>VIEW OPEN POSITIONS</span>
            <ArrowDown className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" />
          </a>
        </div>

        {/* ==================================================
            2. CAREERS INTRODUCTION
        ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              OUR EXPANSION MODEL
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#111111] leading-tight">
              LOCAL KNOWLEDGE.<br />GLOBAL TECHNOLOGY.
            </h2>
          </div>

          <div className="lg:col-span-7 bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 text-sm sm:text-base text-[#333333] leading-relaxed space-y-4">
            <p className="font-semibold text-[#111111]">
              MG.IO builds websites, AI systems, automation and digital growth solutions for businesses.
            </p>
            <p>
              Our Market Growth Agents help us bring those solutions to local businesses in markets where language, culture and trust matter.
            </p>
            <p className="font-mono text-xs text-[#00AEEF] font-bold uppercase tracking-wider pt-2 border-t border-gray-200">
              YOUR ROLE IS TO BECOME THE LOCAL FACE OF MG.IO IN YOUR ASSIGNED MARKET.
            </p>
          </div>
        </div>

        {/* ==================================================
            INTERACTIVE WORLD / MARKET MAP VISUAL
        ================================================== */}
        <MarketMapVisual
          selectedMarket={selectedMarketFilter}
          onSelectMarket={(code) => {
            setSelectedMarketFilter(code);
            const el = document.getElementById('open-positions');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* ==================================================
            3. WHAT IS A MARKET GROWTH AGENT?
        ================================================== */}
        <div className="mb-20">
          <div className="max-w-3xl mb-10">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              THE DAY-TO-DAY SCOPE
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#111111] mb-3">
              WHAT YOU'LL ACTUALLY DO
            </h2>
            <p className="text-sm text-[#555555] leading-relaxed">
              A Market Growth Agent represents MG.IO within a specific language and market. Your core focus is business development, relationship building, and opportunity creation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {actualActivities.map((act, idx) => {
              const IconComp = act.icon;
              return (
                <div key={idx} className="bg-[#F7F7F5] border border-gray-200 rounded-xl p-6 hover:border-[#00AEEF] transition-all">
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#00AEEF] mb-4 shadow-xs">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#111111] mb-2">
                    {act.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-[#111111] text-white p-6 rounded-xl border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#00AEEF] animate-pulse shrink-0" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
                THIS ROLE IS FOCUSED ON BUSINESS DEVELOPMENT AND SALES.
              </span>
            </div>
            <span className="text-[11px] font-mono text-gray-400">
              No technical development work required.
            </span>
          </div>
        </div>

        {/* ==================================================
            4. WHO WE ARE LOOKING FOR & 5. NICE TO HAVE
        ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
          
          {/* Requirements (7 cols) */}
          <div className="lg:col-span-7 bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 sm:p-10">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              QUALIFICATIONS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111111] mb-6">
              WE'RE LOOKING FOR PEOPLE WHO KNOW THEIR MARKET.
            </h2>

            <ul className="space-y-3 mb-8">
              {requirementsList.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#333333]">
                  <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            {/* Nationality Rule Box */}
            <div className="p-4 bg-white rounded-xl border border-gray-200 flex items-start gap-3 text-xs text-[#555555]">
              <ShieldAlert className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#111111] block mb-0.5 font-mono uppercase text-[10px]">IMPORTANT REQUIREMENT NOTE:</strong>
                <span>We do NOT require a specific nationality. The only requirement is language proficiency, market familiarity and communication ability.</span>
              </div>
            </div>
          </div>

          {/* Nice to Have & Non-Mandatory Note (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
                BONUS ADVANTAGES
              </span>
              <h3 className="font-display font-bold text-xl text-[#111111] mb-4">
                NICE TO HAVE
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {niceToHaveList.map((item, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-[#F7F7F5] border border-gray-200 rounded text-[11px] font-mono text-[#333333]">
                    {item}
                  </span>
                ))}
              </div>

              <div className="p-4 bg-[#F7F7F5] rounded-xl border border-gray-200 text-xs text-[#555555] leading-relaxed">
                <strong className="text-[#111111] block mb-1">Previous agency experience is NOT mandatory.</strong>
                Strong communicators with the right market knowledge, curiosity, and drive should apply.
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================
            6 & 7. JOB LISTINGS & MARKET FILTER
        ================================================== */}
        <div id="open-positions" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
                CURRENT OPENINGS
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-[#111111]">
                SELECT YOUR MARKET
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {marketFilters.map((filter) => (
                <button
                  key={filter.code}
                  onClick={() => setSelectedMarketFilter(filter.code)}
                  className={`px-3 py-1.5 rounded transition-all ${
                    selectedMarketFilter === filter.code
                      ? 'bg-[#111111] text-white font-bold'
                      : 'bg-[#F7F7F5] text-[#555555] hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onNavigate(`/careers/${job.slug}`)}
                className="p-8 bg-[#F7F7F5] border border-gray-200 rounded-2xl hover:border-[#00AEEF] hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00AEEF] bg-white px-2.5 py-1 rounded border border-gray-200">
                      {job.marketCode} MARKET
                    </span>
                    <span className="text-xs font-mono text-[#777777] flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-[#00AEEF]" />
                      <span>{job.language} · {job.employmentType}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl text-[#111111] group-hover:text-[#00AEEF] transition-colors mb-3 leading-snug">
                    {job.title}
                  </h3>

                  <p className="text-xs text-[#555555] leading-relaxed mb-6">
                    {job.aboutRole}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#777777]">
                    {job.department}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#111111] group-hover:text-[#00AEEF]">
                    <span>VIEW POSITION</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

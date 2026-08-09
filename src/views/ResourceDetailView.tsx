import React from 'react';
import { resourcesData } from '../data/resourcesData';
import { ArrowUpRight, ArrowLeft, Clock, Calendar, User } from 'lucide-react';

interface ResourceDetailViewProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const ResourceDetailView: React.FC<ResourceDetailViewProps> = ({ slug, onNavigate }) => {
  const resource = resourcesData.find(r => r.slug === slug) || resourcesData[0];

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('/resources')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#555555] hover:text-[#00AEEF] uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO RESOURCES</span>
        </button>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-gray-200">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-3">
            {resource.category}
          </span>

          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#111111] tracking-tight mb-6 leading-tight break-words">
            {resource.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#777777]">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>{resource.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>{resource.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>{resource.readTime}</span>
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none text-base text-[#111111] leading-relaxed space-y-6 mb-16">
          <p className="font-display font-bold text-lg text-[#111111] border-l-2 border-[#00AEEF] pl-4 py-1">
            {resource.shortDesc}
          </p>

          {resource.content.map((paragraph, idx) => (
            <p key={idx} className="text-[#333333]">
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA Footer Card */}
        <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#00AEEF] uppercase block mb-1">
              APPLY THIS STRATEGY
            </span>
            <h3 className="font-display font-bold text-xl text-[#111111]">
              Ready to implement AI and digital systems in your organization?
            </h3>
          </div>

          <button
            onClick={() => onNavigate('/contact')}
            className="shrink-0 px-6 py-3.5 bg-[#111111] hover:bg-[#00AEEF] text-white font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
          >
            <span>BOOK STRATEGY CALL</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

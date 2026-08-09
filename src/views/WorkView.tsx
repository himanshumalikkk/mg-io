import React from 'react';
import { projectsData } from '../data/projectsData';
import { ArrowUpRight } from 'lucide-react';

interface WorkViewProps {
  onNavigate: (route: string) => void;
}

export const WorkView: React.FC<WorkViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-gray-200">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">
            PORTFOLIO & PROOF
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-tight mb-4 break-words">
            SELECTED CLIENT WORK
          </h1>
          <p className="text-base text-[#555555] leading-relaxed">
            Real systems built for international brands, technology platforms, and healthcare networks.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => onNavigate(`/work/${project.slug}`)}
              data-cursor="VIEW"
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F7F7F5] border border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-[#00AEEF] transition-all"
            >
              {/* Image Column */}
              <div className="lg:col-span-7 h-64 sm:h-80 overflow-hidden rounded-xl relative">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details Column */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono font-bold text-[#00AEEF]">{project.number}</span>
                    <span className="text-[10px] font-mono text-[#777777] uppercase bg-white px-2 py-0.5 rounded border border-gray-200">
                      {project.industry}
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#111111] group-hover:text-[#00AEEF] transition-colors mb-3">
                    {project.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
                    {project.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.servicesProvided.map((serviceName, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-white text-[#111111] px-2.5 py-1 rounded border border-gray-200">
                        {serviceName}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#111111] group-hover:text-[#00AEEF]">
                    READ CASE STUDY
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#111111] group-hover:text-[#00AEEF] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

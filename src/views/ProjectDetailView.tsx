import React from 'react';
import { projectsData } from '../data/projectsData';
import { ArrowUpRight, ArrowRight, CheckCircle } from 'lucide-react';

interface ProjectDetailViewProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ slug, onNavigate }) => {
  const projectIndex = projectsData.findIndex(p => p.slug === slug);
  const project = projectsData[projectIndex] || projectsData[0];

  const nextProjectIndex = (projectIndex + 1) % projectsData.length;
  const nextProject = projectsData[nextProjectIndex];

  return (
    <div className="pt-28 pb-20 animate-in fade-in duration-300">
      
      {/* HERO */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-4">
            CASE STUDY {project.number} / {project.industry}
          </span>

          <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#111111] tracking-tight leading-tight mb-6 max-w-4xl break-words">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.servicesProvided.map((s, idx) => (
              <span key={idx} className="text-xs font-mono bg-gray-100 text-[#111111] px-3 py-1 rounded">
                {s}
              </span>
            ))}
          </div>

          <div className="h-[240px] sm:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden relative shadow-sm">
            <img 
              src={project.coverImage} 
              alt={project.title} 
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>

      {/* CHALLENGE & APPROACH */}
      <section className="py-20 bg-[#F7F7F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest block mb-3">
              THE CHALLENGE
            </span>
            <p className="text-base text-[#111111] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-[#00AEEF] uppercase tracking-widest block mb-3">
              THE APPROACH
            </span>
            <p className="text-base text-[#111111] leading-relaxed">
              {project.approach}
            </p>
          </div>

        </div>
      </section>

      {/* SYSTEM ARCHITECTURE & EXPERIENCE */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#00AEEF] uppercase tracking-widest block mb-2">
              USER EXPERIENCE
            </span>
            <h2 className="font-display font-extrabold text-2xl text-[#111111] mb-3">THE EXPERIENCE</h2>
            <p className="text-base text-[#555555] leading-relaxed max-w-3xl">{project.experience}</p>
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold text-[#00AEEF] uppercase tracking-widest block mb-2">
              TECHNICAL STACK
            </span>
            <h2 className="font-display font-extrabold text-2xl text-[#111111] mb-3">THE SYSTEM ARCHITECTURE</h2>
            <p className="text-sm font-mono text-[#111111] bg-gray-50 p-4 rounded-lg border border-gray-200 max-w-3xl">
              {project.systemArchitecture}
            </p>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-20 bg-[#F7F7F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-mono font-bold text-[#00AEEF] uppercase tracking-widest block mb-3">
            VERIFIED OUTCOMES
          </span>
          <h2 className="font-display font-extrabold text-3xl text-[#111111] mb-8">THE RESULTS</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.results.map((res, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                <span className="font-display font-bold text-sm text-[#111111] leading-snug">{res}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT PROJECT BAR */}
      <section className="py-16 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono text-[#00AEEF] uppercase tracking-widest block mb-1">
              NEXT CASE STUDY — {nextProject.number}
            </span>
            <h3 className="font-display font-extrabold text-2xl text-white">
              {nextProject.title}
            </h3>
          </div>

          <button
            onClick={() => onNavigate(`/work/${nextProject.slug}`)}
            className="px-8 py-4 bg-[#00AEEF] hover:bg-white hover:text-[#111111] text-white font-mono font-bold text-xs uppercase tracking-widest rounded transition-colors flex items-center gap-2"
          >
            <span>VIEW NEXT CASE STUDY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};

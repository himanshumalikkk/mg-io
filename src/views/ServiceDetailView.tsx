import React from 'react';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { ServiceVisual3D } from '../components/3d/ServiceVisual3D';
import { ArrowUpRight, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';

interface ServiceDetailViewProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ slug, onNavigate }) => {
  const serviceIndex = servicesData.findIndex(s => s.slug === slug);
  const service = servicesData[serviceIndex] || servicesData[0];

  const nextServiceIndex = (serviceIndex + 1) % servicesData.length;
  const nextService = servicesData[nextServiceIndex];

  return (
    <div className="pt-28 pb-20 animate-in fade-in duration-300">
      
      {/* 01. SERVICE HERO */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase mb-6">
            <span>SERVICE {service.number}</span>
            <span>/</span>
            <span>{service.category}</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#111111] tracking-tight leading-tight sm:leading-[1.0] lg:leading-[0.95] mb-6 uppercase max-w-4xl break-words">
            {service.heroHeadline}
          </h1>

          <p className="text-lg sm:text-xl text-[#555555] max-w-2xl leading-relaxed font-normal mb-8">
            {service.heroSupport}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-4 bg-[#111111] hover:bg-[#00AEEF] text-white font-mono font-bold text-xs uppercase tracking-widest rounded transition-colors flex items-center gap-2 group"
            >
              <span>GET STARTED WITH {service.title}</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 02 & 03. INTRO & THE PROBLEM */}
      <section className="py-20 bg-[#F7F7F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-6">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-3">
              OVERVIEW
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#111111] mb-4">
              {service.subtitle}
            </h2>
            <p className="text-base text-[#555555] leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          <div className="lg:col-span-6 bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
            <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 uppercase block mb-3">
              THE PROBLEM WE SOLVE
            </span>
            <p className="text-base font-medium text-[#111111] leading-relaxed">
              "{service.problemStatement}"
            </p>
          </div>

        </div>
      </section>

      {/* 04 & 05. WHAT WE BUILD & INTERACTIVE 3D VISUAL */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-3">
              CAPABILITIES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#111111] mb-8">
              WHAT WE BUILD
            </h2>

            <div className="space-y-4">
              {service.whatWeBuild.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200/80">
                  <CheckCircle2 className="w-5 h-5 text-[#00AEEF] shrink-0 mt-0.5" />
                  <span className="font-display font-bold text-sm text-[#111111]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F7F7F5] border border-gray-200 rounded-2xl p-6 h-[400px] flex items-center justify-center relative">
            <ServiceVisual3D type={service.visualType} />
          </div>

        </div>
      </section>

      {/* 07. PROCESS STEPS */}
      <section className="py-24 bg-[#F7F7F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-3">
              EXECUTION
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#111111]">
              OUR DELIVERY PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.processSteps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-mono font-bold text-[#00AEEF] block mb-2">
                  {step.title}
                </span>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08. ADVANTAGES */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-extrabold text-3xl text-[#111111] mb-12">
            WHY MG.IO FOR {service.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.advantages.map((adv, idx) => (
              <div key={idx} className="border-l-2 border-[#00AEEF] pl-6 py-2">
                <h3 className="font-display font-bold text-lg text-[#111111] mb-2">{adv.title}</h3>
                <p className="text-xs text-[#555555] leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09. RELATED WORK */}
      <section className="py-20 bg-[#F7F7F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-3">
            PROOF & CASE STUDIES
          </span>
          <h2 className="font-display font-extrabold text-3xl text-[#111111] mb-8">
            RELATED WORK
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.slice(0, 2).map((project) => (
              <div
                key={project.id}
                onClick={() => onNavigate(`/work/${project.slug}`)}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#00AEEF] transition-all cursor-pointer group shadow-sm"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono text-[#00AEEF] uppercase block mb-1">{project.industry}</span>
                  <h3 className="font-display font-bold text-xl text-[#111111] group-hover:text-[#00AEEF] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#555555] line-clamp-2 mb-4">{project.shortDesc}</p>
                  <span className="text-xs font-mono font-bold text-[#111111] group-hover:text-[#00AEEF] flex items-center gap-1">
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display font-extrabold text-3xl text-[#111111] mb-8 text-center">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-6">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-display font-bold text-base text-[#111111] mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#00AEEF]" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. NEXT SERVICE BAR */}
      <section className="py-16 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono text-[#00AEEF] uppercase tracking-widest block mb-1">
              NEXT SERVICE — {nextService.number}
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {nextService.title}
            </h3>
          </div>

          <button
            onClick={() => onNavigate(`/services/${nextService.slug}`)}
            className="px-8 py-4 bg-[#00AEEF] hover:bg-white hover:text-[#111111] text-white font-mono font-bold text-xs uppercase tracking-widest rounded transition-colors flex items-center gap-2"
          >
            <span>EXPLORE {nextService.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};

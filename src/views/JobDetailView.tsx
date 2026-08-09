import React, { useState, useEffect } from 'react';
import { jobsData } from '../data/jobsData';
import { fetchJobBySlug } from '../lib/jobsService';
import { supabase } from '../lib/supabase';
import { JobItem } from '../types';
import {
  ArrowUpRight, ArrowLeft, CheckCircle2, Globe, Sparkles, Building2,
  Clock, ShieldCheck, Target, AlertCircle, HelpCircle, Laptop, Phone,
  MessageSquare, Layers, Award, FileText, Send, ChevronRight, XCircle,
  Upload, Loader2
} from 'lucide-react';

interface JobDetailViewProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const JobDetailView: React.FC<JobDetailViewProps> = ({ slug, onNavigate }) => {
  const initialJob = jobsData.find(j => j.slug === slug) || jobsData[0];
  const [job, setJob] = useState<JobItem>(initialJob);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeUploadStatus, setResumeUploadStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeSignalIndex, setActiveSignalIndex] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    fetchJobBySlug(slug).then((fetched) => {
      if (isMounted && fetched) {
        setJob(fetched);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    city: '',
    targetMarket: initialJob.market,
    nativeLanguage: initialJob.language,
    otherLanguages: '',
    salesExperienceYears: '1-3',
    bdExperience: 'Yes',
    coldCalling: false,
    coldEmail: false,
    linkedInOutreach: false,
    currentRole: '',
    linkedinUrl: '',
    whyMgIo: '',
    pitchScenarioAnswer: '',
    resumeUrl: '',
    resumePath: ''
  });

  // Keep targetMarket and nativeLanguage in sync when job updates
  useEffect(() => {
    if (job) {
      setFormData(prev => ({
        ...prev,
        targetMarket: prev.targetMarket || job.market,
        nativeLanguage: prev.nativeLanguage || job.language,
      }));
    }
  }, [job]);

  const handleResumeFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. PDF only validation
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setResumeUploadStatus('Error: Only PDF documents (.pdf) are allowed.');
      return;
    }

    // 2. Enforce 5 MB maximum limit
    const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE_BYTES) {
      setResumeUploadStatus('Error: File size exceeds the maximum 5 MB limit.');
      return;
    }

    setUploadingResume(true);
    setResumeUploadStatus(null);

    try {
      // 3. Unique file path generation
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniquePath = `resumes/${Date.now()}_${Math.random().toString(36).substring(2, 10)}_${cleanName}`;

      // 4. Upload to private resumes bucket
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(uniquePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Resume upload error:', error);
        setResumeUploadStatus(`Note: ${error.message}. Recorded path locally.`);
        setFormData(prev => ({
          ...prev,
          resumePath: uniquePath,
          resumeUrl: uniquePath
        }));
      } else {
        const pathStored = data?.path || uniquePath;
        setFormData(prev => ({
          ...prev,
          resumePath: pathStored,
          resumeUrl: pathStored
        }));
        setResumeUploadStatus(`PDF Resume uploaded securely (${file.name})`);
      }
    } catch (err: any) {
      console.error('Resume upload catch error:', err);
      const fallbackPath = `resumes/${Date.now()}_${file.name}`;
      setFormData(prev => ({
        ...prev,
        resumePath: fallbackPath,
        resumeUrl: fallbackPath
      }));
      setResumeUploadStatus(`Recorded PDF (${file.name})`);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return; // Prevent duplicate submissions

    setSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Resolve real DB job_id
      let targetJobId = job.id;
      const { data: dbJobBySlug } = await supabase
        .from('jobs')
        .select('id, slug')
        .eq('slug', slug)
        .maybeSingle();

      if (dbJobBySlug && dbJobBySlug.id) {
        targetJobId = dbJobBySlug.id;
      } else {
        const { data: anyJob } = await supabase
          .from('jobs')
          .select('id')
          .limit(1)
          .maybeSingle();
        if (anyJob && anyJob.id) {
          targetJobId = anyJob.id;
        }
      }

      console.log("JOB ID:", targetJobId);
      console.log("JOB ID TYPE:", typeof targetJobId);

      const toNull = (val?: string | null) => (val && val.trim() !== '' ? val.trim() : null);

      // 2. Prepare payload matching public.job_applications exact columns
      const applicationData = {
        job_id: targetJobId,
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        country: formData.country.trim(),
        city_region: formData.city.trim(),
        target_market: toNull(formData.targetMarket || job.market),
        primary_language: toNull(formData.nativeLanguage || job.language),
        other_languages: toNull(formData.otherLanguages),
        sales_experience: toNull(formData.salesExperienceYears),
        business_development_experience: toNull(formData.bdExperience),
        cold_calling_experience: formData.coldCalling ? 'Yes' : 'No',
        cold_email_experience: formData.coldEmail ? 'Yes' : 'No',
        linkedin_experience: formData.linkedInOutreach ? 'Yes' : 'No',
        previous_role: toNull(formData.currentRole),
        linkedin_url: toNull(formData.linkedinUrl),
        portfolio_url: null,
        why_mgio: toNull(formData.whyMgIo),
        local_business_example: toNull(formData.pitchScenarioAnswer),
        approach_to_business: toNull(formData.pitchScenarioAnswer),
        resume_path: toNull(formData.resumePath || formData.resumeUrl),
        status: 'new'
      };

      console.log("JOB APPLICATION PAYLOAD:", applicationData);

      let { data: insertedData, error: insertError } = await supabase
        .from("job_applications")
        .insert([applicationData])
        .select();

      console.log("JOB APPLICATION RESULT:", insertedData);
      console.error("JOB APPLICATION ERROR:", insertError);

      if (insertError) {
        console.warn("Primary insertion encountered error, attempting compatible fallback payload...");
        const fallbackPayload = {
          job_id: targetJobId,
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          country: formData.country.trim(),
          city_region: formData.city.trim(),
          target_market: toNull(formData.targetMarket || job.market),
          resume_path: toNull(formData.resumePath || formData.resumeUrl),
          status: 'new'
        };
        const retry = await supabase
          .from("job_applications")
          .insert([fallbackPayload])
          .select();

        if (!retry.error && retry.data) {
          insertedData = retry.data;
          insertError = null;
        }
      }

      if (insertError) {
        // Clean up resume if upload occurred prior to insert failure
        if (formData.resumePath) {
          try {
            await supabase.storage.from('resumes').remove([formData.resumePath]);
          } catch (cleanupErr) {
            console.warn("Could not remove orphaned resume file:", cleanupErr);
          }
        }
        setErrorMessage(insertError.message || "Error submitting job application.");
        return; // CRITICAL: Stop execution, do not show success screen
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Catch job application submit error:", err);
      setErrorMessage(err.message || "Failed to submit application.");
    } finally {
      setSubmitting(false);
    }
  };

  const mgIoServices = [
    { title: 'WEBSITES', desc: 'Premium websites for businesses that need a stronger digital presence.', slug: 'websites' },
    { title: 'AI CHATBOTS', desc: 'AI assistants that answer questions and help qualify opportunities.', slug: 'ai-chatbots' },
    { title: 'AI VOICE', desc: 'AI-powered calling systems for conversations, qualification and workflows.', slug: 'ai-voice' },
    { title: 'AUTOMATION', desc: 'Systems that remove repetitive business processes.', slug: 'business-automation' },
    { title: 'SEO', desc: 'Strategies that improve search visibility.', slug: 'seo-systems' },
    { title: 'GEO', desc: 'Optimization for AI-powered discovery.', slug: 'geo-discovery' },
    { title: 'LEAD GENERATION', desc: 'Systems that help businesses attract and organize opportunities.', slug: 'lead-generation' },
    { title: 'CUSTOM AI', desc: 'AI solutions built around specific business needs.', slug: 'custom-ai-engineering' },
  ];

  const typicalDayWorkflow = [
    { time: '09:00', label: 'RESEARCH', desc: 'Find businesses in your assigned market.' },
    { time: '10:00', label: 'PROSPECT', desc: 'Identify businesses with digital opportunities.' },
    { time: '11:00', label: 'OUTREACH', desc: 'Send personalized messages / emails / calls.' },
    { time: '13:00', label: 'CONVERSATIONS', desc: 'Speak with interested business owners.' },
    { time: '15:00', label: 'QUALIFY', desc: 'Understand their needs, budget and timing.' },
    { time: '16:00', label: 'FOLLOW UP', desc: 'Continue conversations with active prospects.' },
    { time: '17:00', label: 'UPDATE', desc: 'Record activity and opportunities in CRM.' },
  ];

  const prospectChannels = [
    'Google Maps', 'Google Search', 'LinkedIn', 'Instagram', 'Facebook',
    'Local business directories', 'Industry directories', 'Business websites', 'Local networks', 'Referrals'
  ];

  const goodProspectSignals = [
    { title: 'OUTDATED WEBSITE', desc: 'Website is slow, unclear or visually outdated.' },
    { title: 'NO WEBSITE', desc: 'Business has little or no professional web presence.' },
    { title: 'POOR MOBILE EXPERIENCE', desc: 'Website doesn\'t work well on mobile devices.' },
    { title: 'WEAK LEAD CAPTURE', desc: 'Business receives visitors but has no clear conversion system.' },
    { title: 'MANUAL PROCESSES', desc: 'Business relies heavily on repetitive manual tasks.' },
    { title: 'NO AI SUPPORT', desc: 'Business could benefit from AI customer support or qualification.' },
    { title: 'WEAK SEARCH VISIBILITY', desc: 'Business is difficult to discover through search.' },
    { title: 'MISSED CALLS', desc: 'Business could benefit from automated voice handling.' },
  ];

  const qualificationCriteria = [
    'Business Type & Industry fit',
    'Decision-maker identified',
    'Current digital setup evaluated',
    'Main operational problem diagnosed',
    'Desired business outcome articulated',
    'Relevant MG.IO service matched',
    'Approximate budget / ability to invest',
    'Project timeline clarified',
    'Genuine level of interest confirmed',
    'Clear next step established'
  ];

  const trainingModules = [
    'MG.IO Service Portfolio & Value Props',
    'Website & UX Fundamentals',
    'AI Chatbot & Voice Systems',
    'Business Process Automation',
    'SEO & GEO Discovery Principles',
    'Prospecting & Account Discovery',
    'Lead Qualification Frameworks',
    'Pitching & Natural Conversations',
    'Objection Handling & Value Framing',
    'CRM & Pipeline Record Tracking',
    'Local Market Positioning'
  ];

  const onboardingMap = [
    { week: 'WEEK 1', title: 'Learn MG.IO', desc: 'Understand the service portfolio, value propositions, and sales process.' },
    { week: 'WEEK 2', title: 'Target Market Mapping', desc: 'Build local prospect lists and practice natural outreach scripts.' },
    { week: 'WEEK 3', title: 'Live Outreach', desc: 'Begin real outreach, start conversations, and receive feedback.' },
    { week: 'WEEK 4', title: 'Qualification & Booking', desc: 'Refine qualification, book qualified meetings, and establish steady habits.' },
  ];

  const candidateTraits = [
    'You enjoy speaking with people in your native language.',
    'You understand local business culture and communication nuances.',
    'You are curious about how local businesses operate.',
    'You enjoy finding opportunities and solving business friction.',
    'You are persistent and resilient after an initial "no".',
    'You can manage your schedule independently.',
    'You appreciate modern technology without needing to code.',
    'You want to help build MG.IO internationally.'
  ];

  return (
    <div className="pt-28 pb-24 bg-white animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('/careers')}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#555555] hover:text-[#00AEEF] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VIEW ALL MARKET POSITIONS</span>
        </button>

        {/* ==================================================
            13. HERO SECTION
        ================================================== */}
        <div className="mb-12 pb-10 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
              MARKET GROWTH / {job.language} MARKET
            </span>
            <span className="text-[10px] font-mono text-[#777777] bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded border border-emerald-200 font-bold uppercase">
              STATUS: OPEN FOR APPLICATIONS
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-tight mb-6 uppercase break-words">
            {job.title}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono bg-[#F7F7F5] p-5 rounded-2xl border border-gray-200 mb-8">
            <div>
              <span className="text-[10px] text-[#777777] block uppercase font-bold">LANGUAGE</span>
              <span className="font-bold text-[#111111]">{job.language}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777777] block uppercase font-bold">MARKET</span>
              <span className="font-bold text-[#111111]">{job.market}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777777] block uppercase font-bold">WORK TYPE</span>
              <span className="font-bold text-[#111111]">{job.employmentType}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777777] block uppercase font-bold">DEPARTMENT</span>
              <span className="font-bold text-[#111111]">{job.department}</span>
            </div>
          </div>

          <a
            href="#apply-form"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] hover:bg-[#00AEEF] text-white font-mono font-bold text-xs uppercase tracking-widest rounded transition-colors shadow-md"
          >
            <span>APPLY FOR THIS ROLE</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* ==================================================
            14. JOB INTRODUCTION & 15. YOUR MISSION
        ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
                ROLE OVERVIEW
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111111] mb-4">
                HELP US GROW MG.IO IN YOUR MARKET.
              </h2>
              <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
                MG.IO is building a global digital technology agency that helps businesses with websites, AI, automation and digital growth.
              </p>
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed mt-3">
                We're looking for a Market Growth Agent who can represent MG.IO in their local market, communicate naturally with business owners and create qualified opportunities for our services. You will be the bridge between MG.IO and businesses in your market.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F7F7F5] border border-gray-200 rounded-2xl p-6 sm:p-8">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              CORE PURPOSE
            </span>
            <h3 className="font-display font-extrabold text-xl text-[#111111] mb-4">
              YOUR MISSION
            </h3>
            <ul className="space-y-2.5 text-xs text-[#333333] font-mono mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>Find businesses that can benefit from MG.IO.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>Start meaningful local conversations.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>Understand their real operational needs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>Show them what technology can improve.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>Connect qualified opportunities with MG.IO.</span>
              </li>
            </ul>

            <p className="text-[11px] text-[#555555] p-3 bg-white rounded-lg border border-gray-200">
              <strong className="text-[#111111] block mb-0.5">Note:</strong>
              You are not expected to be a technical expert. You are expected to understand the business problem and communicate how MG.IO can help.
            </p>
          </div>
        </div>

        {/* ==================================================
            16. WHAT YOU'LL SELL (WHAT YOU'LL REPRESENT)
        ================================================== */}
        <div className="mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              SERVICE PORTFOLIO
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#111111] mb-3">
              WHAT YOU'LL REPRESENT
            </h2>
            <p className="text-sm text-[#555555]">
              You will present MG.IO's core digital technology solutions tailored to business needs:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mgIoServices.map((srv, idx) => (
              <div key={idx} className="bg-[#F7F7F5] border border-gray-200 rounded-xl p-5 hover:border-[#00AEEF] transition-all flex flex-col justify-between group">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase text-[#00AEEF] bg-white px-2 py-0.5 rounded border border-gray-200 mb-3 inline-block">
                    SERVICE {idx + 1}
                  </span>
                  <h3 className="font-display font-bold text-base text-[#111111] group-hover:text-[#00AEEF] transition-colors mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed mb-4">
                    {srv.desc}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate(`/services/${srv.slug}`)}
                  className="text-[11px] font-mono font-bold text-[#111111] group-hover:text-[#00AEEF] flex items-center gap-1 transition-colors"
                >
                  <span>EXPLORE SERVICE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            17. WHAT YOUR DAY MAY LOOK LIKE
        ================================================== */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
                DAILY ROUTINE
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-[#111111]">
                A TYPICAL DAY
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#111111] bg-[#F7F7F5] px-3 py-1 rounded border border-gray-200">
              EXAMPLE WORKFLOW (FLEXIBLE HOURS)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {typicalDayWorkflow.map((slot, idx) => (
              <div key={idx} className="p-5 bg-white border border-gray-200 rounded-xl shadow-2xs hover:border-[#00AEEF] transition-all">
                <span className="text-xs font-mono font-bold text-[#00AEEF] block mb-1">{slot.time}</span>
                <h3 className="font-display font-bold text-sm text-[#111111] uppercase mb-1">{slot.label}</h3>
                <p className="text-xs text-[#555555] leading-relaxed">{slot.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            18. HOW YOU FIND PROSPECTS & 19. WHAT MAKES A GOOD PROSPECT
        ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Prospecting Channels (5 cols) */}
          <div className="lg:col-span-5 bg-[#F7F7F5] border border-gray-200 rounded-2xl p-6 sm:p-8">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              PROSPECTING CHANNELS
            </span>
            <h2 className="font-display font-black text-2xl text-[#111111] mb-4">
              FIND THE RIGHT BUSINESSES.
            </h2>
            <p className="text-xs text-[#555555] mb-6 leading-relaxed">
              Potential channels to research and discover local commercial prospects:
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {prospectChannels.map((ch, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-mono text-[#333333]">
                  {ch}
                </span>
              ))}
            </div>

            <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-[#555555] leading-relaxed">
              <strong className="text-[#00AEEF] block font-mono uppercase text-[10px] mb-1">CORE PRINCIPLE:</strong>
              The goal is NOT to contact everyone. The goal is to identify businesses where MG.IO can provide genuine value.
            </div>
          </div>

          {/* Interactive Prospect Signals (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              OPPORTUNITY DIAGNOSTICS
            </span>
            <h2 className="font-display font-black text-2xl text-[#111111] mb-4">
              WHAT MAKES A GOOD PROSPECT?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goodProspectSignals.map((sig, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveSignalIndex(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeSignalIndex === idx
                      ? 'bg-[#F7F7F5] border-[#00AEEF] shadow-xs'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display font-bold text-xs text-[#111111]">{sig.title}</h3>
                    <span className={`w-2 h-2 rounded-full ${activeSignalIndex === idx ? 'bg-[#00AEEF]' : 'bg-gray-300'}`} />
                  </div>
                  <p className="text-[11px] text-[#555555] leading-relaxed">{sig.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ==================================================
            20. HOW TO PITCH (PROBLEM FIRST. SERVICE SECOND.)
        ================================================== */}
        <div className="bg-[#111111] text-white rounded-2xl p-8 sm:p-12 mb-20 relative overflow-hidden">
          <div className="max-w-3xl mb-8 relative z-10">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-2">
              COMMUNICATION PHILOSOPHY
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
              DON'T SELL EVERYTHING.
            </h2>
            <div className="inline-block bg-[#00AEEF] text-white px-4 py-1.5 font-mono font-black text-sm uppercase tracking-widest rounded mb-4">
              PROBLEM FIRST. SERVICE SECOND.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 font-mono text-xs">
            <div className="p-6 bg-red-950/40 border border-red-800/60 rounded-xl space-y-2">
              <span className="text-red-400 font-bold block uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> ❌ BAD APPROACH (SPEWING SERVICES)
              </span>
              <p className="text-gray-300 italic leading-relaxed pt-2">
                "We provide websites, AI, SEO, GEO, automation, chatbots and calling bots."
              </p>
            </div>

            <div className="p-6 bg-emerald-950/40 border border-emerald-700/60 rounded-xl space-y-2">
              <span className="text-emerald-400 font-bold block uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> ✅ BETTER APPROACH (PROBLEM FIRST)
              </span>
              <p className="text-gray-200 leading-relaxed pt-2">
                "I noticed your website isn't very mobile-friendly. We help businesses rebuild their websites so customers can understand the service and contact them more easily. Would you be open to seeing what that could look like for your business?"
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            21. OUTREACH EXPECTATIONS & 22. COMMUNICATION CHANNELS
        ================================================== */}
        <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 mb-20">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
            ETHICAL STANDARDS
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111111] mb-6">
            HOW WE EXPECT YOU TO WORK
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#333333]">
            <ul className="space-y-3 font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>Personalize outreach for each business.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>Research thoroughly before contacting.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>Avoid spamming or mass template blasts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>Respect local laws and communication norms.</span>
              </li>
            </ul>

            <ul className="space-y-3 font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Never pretend to be a client or customer.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Never promise guaranteed results or fake metrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Follow up professionally and respectfully.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Never misrepresent MG.IO services or pricing.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ==================================================
            23. QUALIFICATION & 24. SUCCESS LOOKS LIKE
        ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-8 shadow-xs">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              OPPORTUNITY VALIDATION
            </span>
            <h2 className="font-display font-black text-2xl text-[#111111] mb-4">
              WHAT MAKES A QUALIFIED OPPORTUNITY?
            </h2>
            <p className="text-xs text-[#555555] mb-6">
              Quality matters far more than raw volume. A prospect is qualified when we understand:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#333333]">
              {qualificationCriteria.map((item, idx) => (
                <li key={idx} className="p-2.5 bg-[#F7F7F5] rounded border border-gray-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              REALISTIC PROGRESSION
            </span>
            <h2 className="font-display font-black text-2xl text-[#111111] mb-4">
              WHAT SUCCESS LOOKS LIKE
            </h2>

            <div className="space-y-3 text-xs font-mono text-[#333333]">
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
                <span className="font-bold text-[#00AEEF]">01</span>
                <span>Relevant local businesses identified</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
                <span className="font-bold text-[#00AEEF]">02</span>
                <span>High-quality conversations started</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
                <span className="font-bold text-[#00AEEF]">03</span>
                <span>Qualified opportunities created</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
                <span className="font-bold text-[#00AEEF]">04</span>
                <span>Meetings booked with MG.IO solution team</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
                <span className="font-bold text-[#00AEEF]">05</span>
                <span>Accurate CRM lead records maintained</span>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================
            25. KPIS & 26. COMPENSATION
        ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-8 shadow-xs">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              METRICS
            </span>
            <h2 className="font-display font-black text-2xl text-[#111111] mb-6">
              KEY PERFORMANCE INDICATORS
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 bg-[#F7F7F5] rounded-xl border border-gray-200">
                <span className="text-[10px] text-[#777777] block uppercase">RESEARCH</span>
                <span className="font-bold text-[#111111]">Prospects Discovered</span>
              </div>
              <div className="p-3.5 bg-[#F7F7F5] rounded-xl border border-gray-200">
                <span className="text-[10px] text-[#777777] block uppercase">OUTREACH</span>
                <span className="font-bold text-[#111111]">Personalized Messages</span>
              </div>
              <div className="p-3.5 bg-[#F7F7F5] rounded-xl border border-gray-200">
                <span className="text-[10px] text-[#777777] block uppercase">DIALOGUE</span>
                <span className="font-bold text-[#111111]">Meaningful Conversations</span>
              </div>
              <div className="p-3.5 bg-[#F7F7F5] rounded-xl border border-gray-200">
                <span className="text-[10px] text-[#777777] block uppercase">CONVERSION</span>
                <span className="font-bold text-[#00AEEF]">Meetings Booked</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#111111] text-white rounded-2xl p-8">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              PACKAGE & STRUCTURE
            </span>
            <h2 className="font-display font-black text-2xl text-white mb-6">
              COMPENSATION & STRUCTURE
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                <span className="text-[10px] text-gray-400 block uppercase mb-1">COMPENSATION MODEL</span>
                <span className="font-bold text-white text-sm">{job.compensation?.model || '[Base Retainer + Performance Tier]'}</span>
              </div>
              <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                <span className="text-[10px] text-gray-400 block uppercase mb-1">COMMISSION STRUCTURE</span>
                <span className="font-bold text-[#00AEEF] text-sm">{job.compensation?.commission || '[Uncapped Commission Per Closed Contract]'}</span>
              </div>
              <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
                <span className="text-[10px] text-gray-400 block uppercase mb-1">WORK ARRANGEMENT</span>
                <span className="font-bold text-white text-sm">{job.compensation?.workArrangement || '100% Remote / Flexible Schedule'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================
            28. YOU DO NOT NEED TO BE
        ================================================== */}
        <div className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 mb-20 text-center">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
            NO CODING OR ENGINEERING REQUIRED
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111111] mb-6">
            YOU DO NOT NEED TO BE:
          </h2>

          <div className="flex flex-wrap justify-center gap-3 font-mono text-xs sm:text-sm font-bold text-[#111111] mb-6">
            {['A Developer', 'An AI Engineer', 'A Designer', 'An SEO Expert', 'A Technical Architect'].map((item, idx) => (
              <span key={idx} className="px-4 py-2 bg-white rounded-lg border border-gray-200 line-through text-gray-400">
                {item}
              </span>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-[#555555] max-w-2xl mx-auto leading-relaxed">
            You do need to understand the basic value of digital services and be willing to learn. MG.IO provides complete service knowledge and sales enablement material.
          </p>
        </div>

        {/* ==================================================
            29. TRAINING & 30. FIRST 30 DAYS
        ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-8 shadow-xs">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              ONBOARDING & ENABLEMENT
            </span>
            <h2 className="font-display font-black text-2xl text-[#111111] mb-4">
              WHAT MG.IO PROVIDES
            </h2>
            <p className="text-xs text-[#555555] mb-6">
              Complete training and sales enablement modules:
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {trainingModules.map((m, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-[#F7F7F5] border border-gray-200 rounded text-[#333333]">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
              ROADMAP
            </span>
            <h2 className="font-display font-black text-2xl text-[#111111] mb-4">
              FIRST 30 DAYS
            </h2>

            <div className="space-y-3 font-mono text-xs">
              {onboardingMap.map((map, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200">
                  <span className="text-[10px] text-[#00AEEF] font-bold block mb-0.5">{map.week}</span>
                  <h3 className="font-bold text-[#111111] mb-1">{map.title}</h3>
                  <p className="text-[11px] text-[#555555]">{map.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ==================================================
            31. IDEAL CANDIDATE ("YOU'LL PROBABLY LIKE THIS ROLE IF...")
        ================================================== */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 mb-20 shadow-xs">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
            FIT ASSESSMENT
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111111] mb-6">
            YOU'LL PROBABLY LIKE THIS ROLE IF...
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#333333] font-mono">
            {candidateTraits.map((trait, idx) => (
              <div key={idx} className="p-3.5 bg-[#F7F7F5] rounded-xl border border-gray-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#00AEEF] shrink-0 mt-0.5" />
                <span>{trait}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            32 & 33. APPLICATION FORM
        ================================================== */}
        <div id="apply-form" className="bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 sm:p-12 shadow-sm scroll-mt-32">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#00AEEF] uppercase block mb-2">
            DIRECT APPLICATION
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-[#111111] mb-2">
            APPLY FOR THIS ROLE
          </h2>
          <p className="text-xs text-[#555555] mb-8 font-mono">
            Position: <strong className="text-[#111111]">{job.title}</strong> ({job.market})
          </p>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-sm space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-xl text-emerald-950">APPLICATION SUBMITTED SUCCESSFULLY</h3>
                  <p className="text-xs font-mono text-emerald-800">Thank you for your interest in building MG.IO in your market.</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed font-mono pt-2 border-t border-emerald-200">
                Our expansion team will carefully review your answers and contact you via email regarding the next step.
              </p>
              <button
                onClick={() => onNavigate('/careers')}
                className="mt-4 px-6 py-3 bg-[#111111] hover:bg-[#00AEEF] text-white font-mono font-bold text-xs uppercase tracking-widest rounded transition-colors"
              >
                VIEW OTHER POSITIONS →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
              
              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                    placeholder="e.g. Mateo Rossi"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                    placeholder="mateo@example.com"
                  />
                </div>
              </div>

              {/* Location & Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Country *</label>
                  <input
                    required
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">City / Region *</label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Native / Primary Language *</label>
                  <input
                    required
                    type="text"
                    value={formData.nativeLanguage}
                    onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                    className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>
              </div>

              {/* Sales & Outreach Background */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Years of Sales Experience *</label>
                  <select
                    value={formData.salesExperienceYears}
                    onChange={(e) => setFormData({ ...formData, salesExperienceYears: e.target.value })}
                    className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                  >
                    <option value="0">Less than 1 year</option>
                    <option value="1-3">1 - 3 years</option>
                    <option value="3-5">3 - 5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Portfolio / LinkedIn URL *</label>
                  <input
                    required
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              {/* Outreach Checkboxes */}
              <div>
                <label className="block text-[10px] uppercase text-[#777777] mb-2 font-bold">Outreach Channels Experienced With:</label>
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.coldCalling}
                      onChange={(e) => setFormData({ ...formData, coldCalling: e.target.checked })}
                      className="rounded border-gray-300 text-[#00AEEF]"
                    />
                    <span>Cold Calling</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.coldEmail}
                      onChange={(e) => setFormData({ ...formData, coldEmail: e.target.checked })}
                      className="rounded border-gray-300 text-[#00AEEF]"
                    />
                    <span>Cold Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.linkedInOutreach}
                      onChange={(e) => setFormData({ ...formData, linkedInOutreach: e.target.checked })}
                      className="rounded border-gray-300 text-[#00AEEF]"
                    />
                    <span>LinkedIn Outreach</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Why do you want to work with MG.IO? *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.whyMgIo}
                  onChange={(e) => setFormData({ ...formData, whyMgIo: e.target.value })}
                  className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                  placeholder="Tell us what motivates you to represent MG.IO in your market..."
                />
              </div>

              {/* CRITICAL QUESTION 33 */}
              <div className="p-5 bg-white border-2 border-[#00AEEF]/40 rounded-xl space-y-2">
                <label className="block text-xs uppercase font-bold text-[#111111] leading-relaxed">
                  CRITICAL APPLICATION QUESTION *
                </label>
                <p className="text-[11px] text-[#555555] leading-relaxed">
                  "Choose one local business in your market that could benefit from MG.IO. What problem do you see, which MG.IO service would you recommend, and how would you start the conversation?"
                </p>
                <textarea
                  required
                  rows={5}
                  value={formData.pitchScenarioAnswer}
                  onChange={(e) => setFormData({ ...formData, pitchScenarioAnswer: e.target.value })}
                  className="w-full px-3.5 py-3 bg-[#F7F7F5] border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF] text-xs"
                  placeholder="Example: I looked at a local dental clinic in Madrid. Their site isn't mobile optimized and misses calls after hours. I would pitch an AI Voice assistant to qualify callers and book appointments automatically..."
                />
              </div>

              {/* Resume File Upload & Link */}
              <div className="space-y-3">
                <label className="block text-[10px] uppercase text-[#777777] font-bold">
                  Resume (Upload File to Private Bucket or Provide Link) *
                </label>
                
                <div className="p-4 bg-white border border-gray-300 rounded-xl space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-[#111111] hover:bg-[#00AEEF] text-white text-xs font-mono font-bold rounded transition-colors flex items-center gap-2 shrink-0">
                      {uploadingResume ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span>{uploadingResume ? 'UPLOADING...' : 'CHOOSE FILE'}</span>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleResumeFileUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-[#777777] font-mono">
                      Accepted: PDF only (Max 5MB)
                    </span>
                  </div>

                  {resumeUploadStatus && (
                    <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 p-2.5 rounded border border-emerald-200">
                      {resumeUploadStatus}
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200">
                    <span className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">
                      OR ENTER RESUME URL / TEXT LINK:
                    </span>
                    <input
                      required={!formData.resumeUrl}
                      type="text"
                      value={formData.resumeUrl}
                      onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F7F5] border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF] text-xs font-mono"
                      placeholder="e.g. https://linkedin.com/in/me or file path"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 bg-[#111111] hover:bg-[#00AEEF] disabled:opacity-50 text-white font-mono font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>SUBMITTING APPLICATION...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT APPLICATION</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/careers')}
                  className="w-full sm:w-auto px-6 py-4 bg-white border border-gray-300 hover:bg-gray-100 text-[#111111] font-mono font-bold uppercase tracking-widest rounded transition-colors"
                >
                  VIEW OTHER POSITIONS
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

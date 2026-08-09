import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'p-nexustech',
    slug: 'nexus-enterprise',
    number: '01',
    title: 'Nexus Enterprise Global Platform',
    clientName: 'Nexus Digital Technologies',
    industry: 'Enterprise Software / SaaS',
    servicesProvided: ['Website Design & Development', 'AI Chatbots', 'SEO', 'GEO'],
    shortDesc: 'A multilingual enterprise digital platform with an integrated RAG AI assistant, driving global market acquisition.',
    challenge: 'Nexus required a complete web redesign to unify 4 global regional offices and deploy an AI assistant capable of answering technical product questions in 5 languages.',
    approach: 'We architected a high-performance, minimal editorial website with custom 3D webGL elements and built an LLM assistant connected to Nexus technical knowledge bases.',
    experience: 'Clean, spacious layouts with sub-second page transitions, responsive design across all viewports, and instantaneous multi-country localization.',
    systemArchitecture: 'React, TypeScript, Vite, Tailwind CSS, Express AI API, Gemini 2.5 RAG pipeline, and Three.js visual assets.',
    results: [
      '310% Increase in qualified inbound leads',
      '84% Reduction in first-touch support response times',
      '4.2x Growth in organic search traffic across ES, DE, and EN markets'
    ],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#00AEEF'
  },
  {
    id: 'p-lumina-health',
    slug: 'lumina-voice-automation',
    number: '02',
    title: 'Lumina Care AI Voice & Scheduling',
    clientName: 'Lumina Healthcare Network',
    industry: 'Healthcare & Telemedicine',
    servicesProvided: ['AI Calling', 'Automation', 'Custom AI'],
    shortDesc: 'An ultra-low latency AI voice caller handling inbound patient bookings and phone inquiries across Europe and Latin America.',
    challenge: 'High inbound phone volume created long hold times for patients and placed significant operational burden on reception staff.',
    approach: 'Engineered an AI telephony pipeline configured with multilingual voice synthesis, real-time EHR integration, and instant WhatsApp confirmation messaging.',
    experience: 'Conversations feel entirely natural with zero noticeable latency, allowing patients to schedule appointments or ask clinic queries effortlessly.',
    systemArchitecture: 'Twilio Telephony, Streaming Audio Websockets, Custom LLM Orchestrator, and Automated Webhook Pipeline.',
    results: [
      '12,000+ Inbound calls handled monthly without human intervention',
      '99.4% Appointment booking accuracy',
      '$180,000 Annual operational cost savings'
    ],
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#6366F1'
  },
  {
    id: 'p-solaris-automation',
    slug: 'solaris-b2b-pipeline',
    number: '03',
    title: 'Solaris Energy Lead Pipeline',
    clientName: 'Solaris Renewable Systems',
    industry: 'Clean Energy & Infrastructure',
    servicesProvided: ['Websites', 'Lead Generation', 'Automation', 'SEO'],
    shortDesc: 'An automated B2B lead generation engine with interactive solar ROI calculators and instant CRM routing.',
    challenge: 'Solaris had low landing page conversion rates and struggled to qualify high-value industrial solar prospects efficiently.',
    approach: 'Built a high-converting web platform featuring interactive 3D solar yield estimators and automated WhatsApp/Email nurture sequences.',
    experience: 'Visitors can input their facility dimensions and receive a tailored ROI report in under 30 seconds.',
    systemArchitecture: 'Custom Web Application, Interactive Canvas Engine, Automated CRM Connectors, and Multi-channel Webhooks.',
    results: [
      '240% Increase in commercial quote requests',
      '68% Faster lead-to-meeting conversion velocity',
      'Ranked #1 for commercial solar energy terms in target markets'
    ],
    coverImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#10B981'
  }
];

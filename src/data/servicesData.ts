import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 's-websites',
    slug: 'websites',
    number: '01',
    title: 'WEBSITES',
    subtitle: 'Website Design & Development',
    category: 'DIGITAL EXPERIENCES',
    shortDesc: 'Digital experiences designed to attract, engage and convert visitors into long-term partners.',
    fullDesc: 'We build high-performance, responsive, and visually commanding websites that articulate your brand proposition with absolute clarity. From custom bespoke architectures to automated lead acquisition platforms.',
    heroHeadline: 'WEBSITE DESIGN & DEVELOPMENT',
    heroSupport: 'Digital experiences built to make your business easier to discover, understand and choose.',
    problemStatement: 'Legacy websites often suffer from slow load times, outdated mobile responsiveness, unclear value propositions, and disconnected lead pipelines that lose potential clients.',
    whatWeBuild: [
      'Business Websites & Digital Ecosystems',
      'High-Conversion Landing Pages',
      'Service & Agency Portfolios',
      'Custom E-Commerce & Booking Platforms',
      'Web Applications & Client Portals',
      'Multilingual Global Sites'
    ],
    visualType: 'browser',
    processSteps: [
      { title: '01. Discovery & Strategy', desc: 'Analyzing brand positioning, target demographics, and digital UX goals.' },
      { title: '02. Architecture & Wireframing', desc: 'Mapping user journeys, site hierarchy, and responsive layout blueprints.' },
      { title: '03. Visual Design & 3D Assets', desc: 'Crafting bespoke typography, interactive components, and visual assets.' },
      { title: '04. Production Engineering', desc: 'Building clean, semantic code with optimized speed and accessibility.' },
      { title: '05. QA & Launch', desc: 'Rigorously testing performance, SEO metadata, and cross-browser stability.' }
    ],
    advantages: [
      { title: 'Sub-second Load Times', desc: 'Engineered with modern build tools for instant page rendering.' },
      { title: 'International Multi-locale', desc: 'Seamless localization for multi-country campaigns.' },
      { title: 'Bespoke Visual Quality', desc: 'Halo-Lab inspired interaction design and clean editorial typography.' }
    ],
    faqs: [
      { question: 'How long does a website project take?', answer: 'Typically 3 to 6 weeks depending on custom visual requirements and platform integrations.' },
      { question: 'Will our team be able to update content easily?', answer: 'Yes. We deliver intuitive content interfaces and detailed documentation.' }
    ],
    relatedServices: ['seo', 'geo', 'lead-generation', 'automation']
  },
  {
    id: 's-ai-chatbots',
    slug: 'ai-chatbots',
    number: '02',
    title: 'AI CHATBOTS',
    subtitle: 'Intelligent Conversational Systems',
    category: 'INTELLIGENT SYSTEMS',
    shortDesc: 'AI assistants that answer questions, qualify leads and guide customers 24/7.',
    fullDesc: 'Custom AI conversational agents trained specifically on your company knowledge base, technical documentation, and product catalog to resolve support queries and capture qualified prospects.',
    heroHeadline: 'AI CHATBOTS & ASSISTANTS',
    heroSupport: 'Conversations that work around the clock to capture interest and streamline inquiries.',
    problemStatement: 'Traditional chatbots fail with rigid pre-programmed trees. Modern buyers demand immediate, natural, and accurate answers at any hour.',
    whatWeBuild: [
      'Knowledge-Base Trained Assistants',
      'Lead Qualification Chat Workflows',
      'Multilingual Customer Support Bots',
      'WhatsApp & Telegram AI Integrations',
      'Internal Team Operations Assistants'
    ],
    visualType: 'chatbot',
    processSteps: [
      { title: '01. Knowledge Ingestion', desc: 'Indexing your PDFs, documentation, and operational guidelines.' },
      { title: '02. Guardrail & Prompt Engineering', desc: 'Configuring precise brand voice, security boundaries, and response logic.' },
      { title: '03. Platform Integration', desc: 'Embedding into your website, CRM, or messaging channels.' },
      { title: '04. Continuous Fine-Tuning', desc: 'Monitoring conversation accuracy and optimizing response quality.' }
    ],
    advantages: [
      { title: 'Zero Hallucination Guardrails', desc: 'Strict context grounding ensures accurate factual responses.' },
      { title: 'Instant Escalation', desc: 'Automatically routes high-intent leads to human sales representatives.' },
      { title: '24/7 Multi-language Support', desc: 'Communicates fluently across English, Spanish, German, French, Italian, and Portuguese.' }
    ],
    faqs: [
      { question: 'Can the chatbot integrate with our CRM?', answer: 'Yes, we connect directly with HubSpot, Salesforce, Zoho, and custom webhooks.' },
      { question: 'Is client data kept private?', answer: 'Absolutely. We enforce strict data privacy protocols and enterprise security standards.' }
    ],
    relatedServices: ['ai-calling', 'automation', 'lead-generation', 'websites']
  },
  {
    id: 's-ai-calling',
    slug: 'ai-calling',
    number: '03',
    title: 'AI CALLING',
    subtitle: 'AI Voice Agents & Telephony',
    category: 'INTELLIGENT SYSTEMS',
    shortDesc: 'Intelligent voice agents for natural phone conversations, appointment scheduling, and qualification.',
    fullDesc: 'Ultra-low latency AI voice agents capable of conducting natural phone calls in multiple languages, handling inbound customer inquiries, confirming bookings, and qualifying outbound sales leads.',
    heroHeadline: 'AI VOICE AGENTS',
    heroSupport: 'Ensure your business never misses an important inbound call or sales opportunity.',
    problemStatement: 'Missed calls equal lost revenue. Human call centers are costly and difficult to scale across global timezones.',
    whatWeBuild: [
      'Inbound Reception & FAQ Voice Agents',
      'Outbound Lead Qualification Callers',
      'Automated Appointment Booking Telephony',
      'Multilingual Regional Voice Bots',
      'CRM-Integrated Phone Systems'
    ],
    visualType: 'voice',
    processSteps: [
      { title: '01. Dialogue & Voice Scripting', desc: 'Designing natural speech flows and realistic human voice accents.' },
      { title: '02. Latency Optimization', desc: 'Configuring streaming audio pipelines for under 800ms response latency.' },
      { title: '03. Telephony Setup', desc: 'Connecting phone numbers and call routing infrastructure.' },
      { title: '04. CRM Sync', desc: 'Logging transcriptions, summaries, and action items directly to your CRM.' }
    ],
    advantages: [
      { title: 'Human-like Conversations', desc: 'Natural pauses, dynamic turn-taking, and regional accent tuning.' },
      { title: 'Massive Scalability', desc: 'Concurrently handle hundreds of calls without wait times.' }
    ],
    faqs: [
      { question: 'How realistic do the voice agents sound?', answer: 'Extremely realistic with natural cadence, tone, and context understanding.' }
    ],
    relatedServices: ['ai-chatbots', 'automation', 'lead-generation']
  },
  {
    id: 's-automation',
    slug: 'automation',
    number: '04',
    title: 'AUTOMATION',
    subtitle: 'Business Process Automation',
    category: 'INTELLIGENT SYSTEMS',
    shortDesc: 'Connected workflows that eliminate manual data entry and streamline team operations.',
    fullDesc: 'End-to-end business automation architectures linking your CRM, communication tools, accounting software, and marketing channels into a frictionless machine.',
    heroHeadline: 'BUSINESS PROCESS AUTOMATION',
    heroSupport: 'Connect your tools and eliminate repetitive administrative workload.',
    problemStatement: 'Teams waste hundreds of hours copying data between platforms, tracking down approvals, and managing disconnected workflows.',
    whatWeBuild: [
      'CRM & Sales Pipeline Automations',
      'Invoicing & Financial Workflows',
      'Lead Routing & Notification Pipelines',
      'Data Sync Between Disparate Tools',
      'Custom Webhook & API Infrastructure'
    ],
    visualType: 'automation',
    processSteps: [
      { title: '01. Process Mapping', desc: 'Audit manual bottlenecks and identify high-ROI automation opportunities.' },
      { title: '02. Architecture Blueprinting', desc: 'Map triggers, conditions, and actions across systems.' },
      { title: '03. Integration Development', desc: 'Build robust API triggers, error fallbacks, and notification alerts.' },
      { title: '04. Deployment & Monitoring', desc: 'Launch and continuously monitor execution health.' }
    ],
    advantages: [
      { title: 'Error-Free Operations', desc: 'Eliminates human entry mistakes in critical business workflows.' },
      { title: 'Time Reclamation', desc: 'Saves 20-30+ hours per week for operational teams.' }
    ],
    faqs: [
      { question: 'What tools do you integrate with?', answer: 'Make, Zapier, custom Python/Node scripts, HubSpot, WhatsApp, Stripe, Google Workspace, and proprietary APIs.' }
    ],
    relatedServices: ['ai-chatbots', 'lead-generation', 'custom-ai']
  },
  {
    id: 's-seo',
    slug: 'seo',
    number: '05',
    title: 'SEO',
    subtitle: 'Search Engine Optimization',
    category: 'GROWTH',
    shortDesc: 'Search strategies designed to improve organic visibility and attract high-intent traffic.',
    fullDesc: 'Comprehensive, technical, and content-driven search engine optimization built to dominate local and international market keywords with sustainable long-term rankings.',
    heroHeadline: 'SEARCH ENGINE OPTIMIZATION',
    heroSupport: 'Be discovered when high-intent prospects search for your services.',
    problemStatement: 'Without technical SEO authority and keyword architecture, even the best products remain invisible in search engine results.',
    whatWeBuild: [
      'Technical Site Audits & Core Web Vitals Optimization',
      'International & Multilingual SEO Systems',
      'Keyword Research & Content Strategy',
      'On-Page & Schema Markup Architecture',
      'Local Market SEO & Google Business Profiles'
    ],
    visualType: 'seo',
    processSteps: [
      { title: '01. Technical Audit', desc: 'Identifying crawl barriers, speed issues, and schema gaps.' },
      { title: '02. Keyword Intent Mapping', desc: 'Targeting commercial search terms across strategic target markets.' },
      { title: '03. On-Page Optimization', desc: 'Refining titles, headings, structured data, and performance.' },
      { title: '04. Authority Expansion', desc: 'Building semantic topical authority with structured editorial content.' }
    ],
    advantages: [
      { title: 'Sustainable Organic Traffic', desc: 'Build long-term inbound client acquisition pipelines.' },
      { title: 'Multi-Country Targeting', desc: 'Optimize rankings across India, Europe, and Latin America.' }
    ],
    faqs: [
      { question: 'How quickly will we see SEO results?', answer: 'Initial indexation and technical gains appear in 2-4 weeks, with significant organic growth compounding over 3-6 months.' }
    ],
    relatedServices: ['geo', 'websites', 'lead-generation']
  },
  {
    id: 's-geo',
    slug: 'geo',
    number: '06',
    title: 'GEO',
    subtitle: 'Generative Engine Optimization',
    category: 'GROWTH',
    shortDesc: 'Optimization strategies designed for AI search engines like ChatGPT, Gemini, and Perplexity.',
    fullDesc: 'Position your brand as the definitive authoritative entity referenced by Generative AI answer engines and AI search summaries.',
    heroHeadline: 'GENERATIVE ENGINE OPTIMIZATION',
    heroSupport: 'Get discovered and cited when prospective clients ask AI search engines for recommendations.',
    problemStatement: 'Search behavior is shifting to conversational AI interfaces. Brands that rely solely on legacy SEO risk disappearing from AI-generated summaries.',
    whatWeBuild: [
      'Entity Clarity & Schema Optimization',
      'Citation & Knowledge Graph Alignment',
      'AI-Readable Semantic Data Frameworks',
      'Brand Mention & Contextual Authority Building'
    ],
    visualType: 'geo',
    processSteps: [
      { title: '01. Entity Audit', desc: 'Evaluating how ChatGPT, Gemini, and Perplexity perceive your brand.' },
      { title: '02. Knowledge Graph Structuring', desc: 'Implementing deep JSON-LD schemas and clear factual matrices.' },
      { title: '03. Semantic Coverage', desc: 'Creating comprehensive authoritative content answering core domain prompts.' }
    ],
    advantages: [
      { title: 'First-Mover AI Advantage', desc: 'Establish early entity dominance in AI answer engines.' }
    ],
    faqs: [
      { question: 'How does GEO differ from traditional SEO?', answer: 'Traditional SEO targets search engine ranking algorithms; GEO structures information so Large Language Models synthesize and recommend your brand directly.' }
    ],
    relatedServices: ['seo', 'custom-ai', 'websites']
  },
  {
    id: 's-lead-generation',
    slug: 'lead-generation',
    number: '07',
    title: 'LEAD GENERATION',
    subtitle: 'Digital Acquisition Pipelines',
    category: 'GROWTH',
    shortDesc: 'Digital systems that capture attention and turn interest into qualified sales appointments.',
    fullDesc: 'End-to-end client acquisition architecture combining targeted outreach, high-converting landing pages, interactive lead magnets, and automated follow-up sequences.',
    heroHeadline: 'LEAD GENERATION SYSTEMS',
    heroSupport: 'Turn digital attention into consistent qualified business opportunities.',
    problemStatement: 'Random marketing efforts fail without an interconnected pipeline that captures, qualifies, and nurtures leads systematically.',
    whatWeBuild: [
      'High-Intent Acquisition Funnels',
      'Automated Email & WhatsApp Follow-up Sequences',
      'Interactive Calculators & Lead Qualification Tools',
      'Multi-Market B2B Lead Pipelines'
    ],
    visualType: 'leadgen',
    processSteps: [
      { title: '01. Funnel Architecture', desc: 'Designing the conversion pathway from impression to booked meeting.' },
      { title: '02. Asset Creation', desc: 'Crafting persuasive copy, landing interfaces, and lead capture mechanisms.' },
      { title: '03. Automation Hookup', desc: 'Connecting instant SMS/Email/WhatsApp alerts and CRM tracking.' }
    ],
    advantages: [
      { title: 'Predictable Growth Pipeline', desc: 'Systematized lead intake with qualified scheduling.' }
    ],
    faqs: [
      { question: 'What industries benefit most?', answer: 'B2B technology, professional services, healthcare, real estate, and high-ticket service companies.' }
    ],
    relatedServices: ['websites', 'automation', 'ai-calling']
  },
  {
    id: 's-custom-ai',
    slug: 'custom-ai',
    number: '08',
    title: 'CUSTOM AI',
    subtitle: 'Bespoke AI Systems & Engineering',
    category: 'INTELLIGENT SYSTEMS',
    shortDesc: 'Bespoke AI solutions and custom LLM applications built around unique operational requirements.',
    fullDesc: 'Tailored artificial intelligence models, RAG systems, and custom LLM integrations engineered to solve complex domain-specific challenges.',
    heroHeadline: 'CUSTOM AI SOLUTIONS',
    heroSupport: 'Engineered specifically for your proprietary business logic and data workflows.',
    problemStatement: 'Off-the-shelf software tools cannot handle specialized industry logic, proprietary data formats, or custom compliance rules.',
    whatWeBuild: [
      'Enterprise RAG Knowledge Systems',
      'Proprietary Fine-Tuned Models',
      'AI Document Processing & Extraction',
      'Custom Multi-Agent Orchestration Platforms'
    ],
    visualType: 'customai',
    processSteps: [
      { title: '01. Technical Scoping', desc: 'Defining data inputs, system outputs, latency requirements, and security.' },
      { title: '02. Architecture & RAG Pipeline', desc: 'Building vector indexes and embedding infrastructure.' },
      { title: '03. Model Fine-Tuning & Evaluation', desc: 'Testing accuracy, speed, and safety parameters.' }
    ],
    advantages: [
      { title: 'Proprietary IP', desc: 'Own your custom AI models and specialized business logic.' }
    ],
    faqs: [
      { question: 'Do you host models on private infrastructure?', answer: 'Yes, we offer on-premise, cloud, or hybrid deployments depending on security needs.' }
    ],
    relatedServices: ['automation', 'ai-chatbots', 'websites']
  }
];

export type Language = 'EN' | 'ES' | 'DE' | 'FR' | 'IT' | 'PT';

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'DIGITAL EXPERIENCES' | 'INTELLIGENT SYSTEMS' | 'GROWTH';
  shortDesc: string;
  fullDesc: string;
  heroHeadline: string;
  heroSupport: string;
  problemStatement: string;
  whatWeBuild: string[];
  visualType: 'browser' | 'chatbot' | 'voice' | 'automation' | 'seo' | 'geo' | 'leadgen' | 'customai';
  processSteps: { title: string; desc: string }[];
  advantages: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[]; // slugs
}

export interface ProjectItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  clientName: string;
  industry: string;
  servicesProvided: string[];
  shortDesc: string;
  challenge: string;
  approach: string;
  experience: string;
  systemArchitecture: string;
  results: string[];
  coverImage: string;
  accentColor?: string;
}

export interface MarketItem {
  id: string;
  code: string;
  country: string;
  region: string;
  keyMarket: string;
  language: string;
  timezone: string;
  type: 'REGIONAL MARKET' | 'INNOVATION HUB';
  summary: string;
  flagEmoji: string;
}

export interface JobItem {
  id: string;
  slug: string;
  title: string;
  marketCode: 'SPANISH' | 'GERMAN' | 'FRENCH' | 'ITALIAN' | 'PORTUGUESE' | 'ENGLISH';
  market: string;
  language: string;
  employmentType: string;
  department: string;
  roleType: string;
  experience: string;
  aboutRole: string;
  whatYouWillDo: string[];
  whatWeAreLookingFor: string[];
  niceToHave: string[];
  compensation?: {
    model: string;
    commission: string;
    bonus: string;
    workArrangement: string;
  };
}

export interface ResourceItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDesc: string;
  content: string[];
  readTime: string;
  date: string;
  author: string;
}

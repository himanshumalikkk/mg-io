import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Language } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();

  const languagesList: { code: Language; name: string }[] = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'IT', name: 'Italiano' },
    { code: 'PT', name: 'Português' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 text-[#111111] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-gray-200">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="font-display font-black text-3xl tracking-tighter text-[#111111] mb-2">
                MG<span className="text-[#00AEEF]">.IO</span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#555555] uppercase block mb-4">
                DIGITAL TECHNOLOGY AGENCY
              </span>
              <p className="text-xs text-[#555555] max-w-sm leading-relaxed mb-4">
                Designing websites, AI systems, business automation, and digital growth platforms for companies ready to scale.
              </p>
              <div className="space-y-1 text-xs font-mono mb-6 text-[#111111]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#777777] font-bold uppercase">EMAIL:</span>
                  <a href="mailto:malik.businessweb@gmail.com" className="font-bold hover:text-[#00AEEF] transition-colors">
                    malik.businessweb@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#777777] font-bold uppercase">TEL:</span>
                  <a href="tel:+91922820685" className="font-bold hover:text-[#00AEEF] transition-colors">
                    +91 92282 0685
                  </a>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#777777] uppercase block mb-2">
                SELECT LANGUAGE
              </span>
              <div className="flex flex-wrap gap-2">
                {languagesList.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setLanguage(item.code)}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-colors ${
                      language === item.code
                        ? 'bg-[#111111] text-white border-[#111111] font-bold'
                        : 'bg-gray-50 text-[#555555] border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {item.code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Services (3 cols) */}
          <div className="lg:col-span-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-4">
              SERVICES
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              {[
                { name: 'Websites', slug: 'websites' },
                { name: 'AI Chatbots', slug: 'ai-chatbots' },
                { name: 'AI Calling', slug: 'ai-calling' },
                { name: 'Automation', slug: 'automation' },
                { name: 'SEO', slug: 'seo' },
                { name: 'GEO (AI Discovery)', slug: 'geo' },
                { name: 'Lead Generation', slug: 'lead-generation' },
                { name: 'Custom AI', slug: 'custom-ai' },
              ].map((s) => (
                <li key={s.slug}>
                  <button
                    onClick={() => onNavigate(`/services/${s.slug}`)}
                    className="hover:text-[#00AEEF] transition-colors flex items-center gap-1 group"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#00AEEF]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-4">
              COMPANY
            </span>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[#00AEEF] transition-colors">
                  {t('nav_about')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/work')} className="hover:text-[#00AEEF] transition-colors">
                  {t('nav_work')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resources')} className="hover:text-[#00AEEF] transition-colors">
                  {t('nav_resources')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/careers')} className="hover:text-[#00AEEF] transition-colors">
                  {t('nav_careers')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-[#00AEEF] transition-colors">
                  {t('nav_contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Markets (3 cols) */}
          <div className="lg:col-span-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-4">
              MARKETS
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#555555]">
              <span>India</span>
              <span>Spain</span>
              <span>Mexico</span>
              <span>Colombia</span>
              <span>Argentina</span>
              <span>Germany</span>
              <span>France</span>
              <span>Italy</span>
              <span>Portugal</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#777777] gap-4">
          <div>
            © {new Date().getFullYear()} MG.IO. {t('footer_rights')}
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#111111] transition-colors">{t('footer_privacy')}</a>
            <a href="#terms" className="hover:text-[#111111] transition-colors">{t('footer_terms')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

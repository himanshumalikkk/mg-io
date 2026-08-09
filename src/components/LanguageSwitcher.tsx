import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Language } from '../types';
import { Globe, ChevronDown } from 'lucide-react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'PT', name: 'Português', flag: '🇵🇹' }
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium tracking-wider text-[#111111] bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#00AEEF]" />
        <span>{language}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLanguage(item.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-mono flex items-center justify-between hover:bg-gray-50 transition-colors ${
                language === item.code ? 'font-bold text-[#00AEEF] bg-blue-50/50' : 'text-[#111111]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{item.flag}</span>
                <span>{item.name}</span>
              </span>
              {language === item.code && <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

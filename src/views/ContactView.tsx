import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, Phone, MapPin, Globe, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { marketsData } from '../data/marketsData';
import { supabase } from '../lib/supabase';

interface ContactViewProps {
  onNavigate: (route: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string>('Websites & Digital Platforms');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [budget, setBudget] = useState('$10,000 - $25,000');
  const [details, setDetails] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return; // Prevent duplicate submissions

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const primaryPayload = {
        name: fullName,
        business: company,
        email,
        country,
        service: selectedService,
        budget,
        project_details: details,
      };

      let { error } = await supabase.from('contact_submissions').insert([primaryPayload]);

      if (error && (error.message?.includes('column') || error.code === 'PGRST204')) {
        // Fallback for alternative column schemas
        const altPayload = {
          full_name: fullName,
          company,
          email,
          country,
          service_requested: selectedService,
          details
        };
        const retry = await supabase.from('contact_submissions').insert([altPayload]);
        error = retry.error;
      }

      if (error) {
        console.error('Supabase contact submission error:', error);
        setErrorMessage(error.message || 'Unable to submit inquiry. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission catch error:', err);
      setErrorMessage(err.message || 'Submission error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const serviceOptions = [
    'Websites & Digital Platforms',
    'AI Chatbots & RAG',
    'AI Calling & Telephony',
    'Business Automation',
    'SEO & GEO (AI Discovery)',
    'Lead Generation Systems',
    'Custom AI Engineering'
  ];

  return (
    <div className="pt-32 pb-24 bg-white animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 pb-8 border-b border-gray-200">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#00AEEF] uppercase block mb-3">
            START A CONVERSATION
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-tight mb-4 break-words">
            TALK TO THE MG.IO TEAM
          </h1>
          <p className="text-base text-[#555555] leading-relaxed">
            Tell us about your company, your objectives, or where technology can eliminate friction in your operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F7F7F5] border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-sm">
            <h2 className="font-display font-extrabold text-2xl text-[#111111] mb-2">BOOK A CONSULTATION</h2>
            <p className="text-xs text-[#555555] mb-8">We respond within 24 business hours across all international timezones.</p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">Message Received</h3>
                  <p className="text-xs text-emerald-700 leading-relaxed mb-4">
                    Thank you! An MG.IO digital technology director will review your requirements and follow up via email or phone within 24 hours.
                  </p>
                  {errorMessage && (
                    <p className="text-[11px] font-mono text-amber-700 mb-4 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </p>
                  )}
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setCompany('');
                      setCountry('');
                      setDetails('');
                    }}
                    className="text-xs font-mono font-bold text-emerald-800 underline uppercase"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs font-mono">
                
                {/* Service Selector Chips */}
                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-2 font-bold">What service are you inquiring about? *</label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setSelectedService(opt)}
                        className={`px-3 py-1.5 rounded border text-[11px] font-mono transition-colors ${
                          selectedService === opt
                            ? 'bg-[#111111] text-white border-[#111111] font-bold'
                            : 'bg-white text-[#111111] border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Your Name *</label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Business Email *</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Company / Organization *</label>
                    <input
                      required
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Country / Market *</label>
                    <input
                      required
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. Spain, India, Mexico"
                      className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Estimated Project Budget *</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                  >
                    <option value="Under $10,000">Under $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#777777] mb-1 font-bold">Project Details & Objectives *</label>
                  <textarea
                    required
                    rows={5}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us about your current digital setup, goals, timeline, or key challenges..."
                    className="w-full px-3.5 py-3 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00AEEF]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#111111] hover:bg-[#00AEEF] disabled:opacity-50 text-white font-mono font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 group shadow-md"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT INQUIRY</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

          {/* Right Info & Regional Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-[#00AEEF] uppercase tracking-widest block mb-2">
                DIRECT CHANNELS
              </span>
              <h3 className="font-display font-bold text-xl text-[#111111] mb-6">GLOBAL INQUIRIES</h3>

              <div className="space-y-4 text-xs font-mono text-[#111111]">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#00AEEF] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#777777] block uppercase">EMAIL</span>
                    <a href="mailto:hello@mg.io" className="font-bold hover:text-[#00AEEF]">hello@mg.io</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-[#00AEEF] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#777777] block uppercase">WHATSAPP DIRECT</span>
                    <a href="https://wa.me/?text=Hello%20MG.IO" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-[#00AEEF]">
                      Connect via WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Hubs Overview */}
            <div className="bg-[#F7F7F5] p-8 rounded-2xl border border-gray-200">
              <span className="text-[10px] font-mono font-bold text-[#00AEEF] uppercase tracking-widest block mb-3">
                REGIONAL MARKETS
              </span>
              <div className="space-y-3 text-xs font-mono">
                {marketsData.map((m) => (
                  <div key={m.id} className="flex items-center justify-between pb-2 border-b border-gray-200/60 last:border-0">
                    <span className="flex items-center gap-2">
                      <span>{m.flagEmoji}</span>
                      <span className="font-bold text-[#111111]">{m.country}</span>
                    </span>
                    <span className="text-[10px] text-[#777777]">{m.keyMarket}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

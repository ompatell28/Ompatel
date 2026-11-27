import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Send } from 'lucide-react';
import ReelCarousel3D from '../components/ReelCarousel3D';
import { carouselReels } from '../data/reelsData';
import { siteConfig } from '../data/siteConfig';

export default function Home({ skipLoader, onNavigate, onModeChange }) {
  const [sentenceHover, setSentenceHover] = useState(null);
  const [msgOpen, setMsgOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [messageText, setMessageText] = useState('');

  const buildCard = carouselReels.find((r) => r.category === 'BUILD');
  const brandCard = carouselReels.find((r) => r.category === 'BRAND');

  const handleSendMessage = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${senderName || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(messageText);
    window.open(`mailto:${siteConfig.email}?subject=${subject}&body=${body}`, '_blank');
    setMsgOpen(false);
    setSenderName('');
    setMessageText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[1440px] mx-auto px-3 sm:px-8 pt-2 sm:pt-7 pb-3 sm:pb-6 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] flex flex-col justify-start sm:justify-between overflow-x-hidden"
    >
      {/* Independent Sky Window */}
      <ReelCarousel3D skipLoader={skipLoader} />

      {/* Bottom Row */}
      <section className="mt-5 sm:mt-8 pb-3 grid lg:grid-cols-12 gap-5 sm:gap-6 items-end">
        <div className="lg:col-span-7">
          <div className="font-serif font-normal text-[27px] sm:text-[38px] lg:text-[42px] leading-[1.22] tracking-[-0.015em] text-white break-words">
            <span className={`transition-opacity duration-200 ${sentenceHover ? 'opacity-35' : 'opacity-100'}`}>
              I build products for{' '}
            </span>

            <span className="relative inline-block">
              <AnimatePresence>
                {sentenceHover === 'BUILD' && buildCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-40 bg-[#141414]/95 backdrop-blur-md text-white border border-white/15 rounded-xl px-4 py-3 shadow-2xl w-64 text-left pointer-events-none"
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] tracking-widest uppercase">
                      <span className="flex items-center gap-1.5 text-[#A1A1AA]">
                        <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                        BUILD
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-white font-semibold">
                        OPEN <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="font-serif text-xl leading-snug mt-1">
                      {buildCard.tooltipTitle}
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-0.5">{buildCard.tooltipSub}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onMouseEnter={() => setSentenceHover('BUILD')}
                onMouseLeave={() => setSentenceHover(null)}
                onClick={() => onNavigate('/build')}
                className={`px-1 rounded-[3px] transition-all duration-200 ${
                  sentenceHover === 'BUILD'
                    ? 'bg-[#2563EB] text-white opacity-100'
                    : sentenceHover
                    ? 'underline-build opacity-35'
                    : 'underline-build opacity-100'
                }`}
              >
                founders
              </button>
            </span>
            <sup className={`font-mono text-[10px] text-[#71717A] ml-0.5 mr-0.5 ${sentenceHover ? 'opacity-35' : ''}`}>
              01
            </sup>

            <span className={`transition-opacity duration-200 ${sentenceHover ? 'opacity-35' : 'opacity-100'}`}>
              ,<br className="sm:hidden" />{' '}campaigns for{' '}
            </span>

            <span className="relative inline-block">
              <AnimatePresence>
                {sentenceHover === 'BRAND' && brandCard && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-40 bg-[#141414]/95 backdrop-blur-md text-white border border-white/15 rounded-xl px-4 py-3 shadow-2xl w-64 text-left pointer-events-none"
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] tracking-widest uppercase">
                      <span className="flex items-center gap-1.5 text-[#A1A1AA]">
                        <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                        BRAND
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-white font-semibold">
                        OPEN <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="font-serif text-xl leading-snug mt-1">
                      {brandCard.tooltipTitle}
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-0.5">{brandCard.tooltipSub}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onMouseEnter={() => setSentenceHover('BRAND')}
                onMouseLeave={() => setSentenceHover(null)}
                onClick={() => onNavigate('/brand')}
                className={`px-1 rounded-[3px] transition-all duration-200 ${
                  sentenceHover === 'BRAND'
                    ? 'bg-[#EF4444] text-white opacity-100'
                    : sentenceHover
                    ? 'underline-brand opacity-35'
                    : 'underline-brand opacity-100'
                }`}
              >
                brands
              </button>
            </span>
            <sup className={`font-mono text-[10px] text-[#71717A] ml-0.5 ${sentenceHover ? 'opacity-35' : ''}`}>
              02
            </sup>
            <span className={`transition-opacity duration-200 ${sentenceHover ? 'opacity-35' : 'opacity-100'}`}>
              .
            </span>

            <br />

            <span className={`transition-opacity duration-200 ${sentenceHover ? 'opacity-35' : 'opacity-100'}`}>
              Or just{' '}
            </span>

            <span className="relative inline-block">
              <AnimatePresence>
                {sentenceHover === 'AGENT' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-40 bg-[#141414] text-white border border-white/20 rounded-xl px-5 py-4 shadow-2xl w-60 text-left pointer-events-none"
                  >
                    <div className="font-serif text-xl leading-snug">What are you working on?</div>
                    <div className="text-[11px] text-[#A1A1AA] mt-1.5 leading-relaxed">
                      Ask AI about a build, a brand collab, or where to start.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onMouseEnter={() => setSentenceHover('AGENT')}
                onMouseLeave={() => setSentenceHover(null)}
                onClick={() => {
                  onModeChange('agent');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-1 rounded-[3px] transition-all duration-200 ${
                  sentenceHover === 'AGENT'
                    ? 'bg-white text-[#0A0A0A] opacity-100'
                    : sentenceHover
                    ? 'underline decoration-white/80 decoration-2 underline-offset-4 opacity-35'
                    : 'underline decoration-white/80 decoration-2 underline-offset-4 opacity-100'
                }`}
              >
                talk to my AI
              </button>
            </span>
            <sup className={`font-mono text-[10px] text-[#71717A] ml-0.5 ${sentenceHover ? 'opacity-35' : ''}`}>
              03
            </sup>
            <span className={`transition-opacity duration-200 ${sentenceHover ? 'opacity-35' : 'opacity-100'}`}>
              .
            </span>
          </div>
        </div>

        {/* Right Side: Builder Snapshot + Full-Width Mobile Send Msg */}
        <div className="lg:col-span-5 flex flex-wrap lg:justify-end items-end gap-6 sm:gap-7">
          <div>
            <div className="font-serif text-2xl sm:text-3xl text-white leading-none">10+</div>
            <div className="font-mono text-[9px] tracking-widest text-[#A1A1AA] mt-1.5">
              PROJECTS SHIPPED
            </div>
          </div>

          <a
            href="https://ekvion-tech.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
          >
            <span className="pointer-events-none absolute -top-6 left-0 inline-flex items-center gap-0.5 font-mono text-[9px] tracking-wider px-2 py-0.5 rounded bg-[#2563EB] text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap">
              VISIT <ArrowUpRight className="w-2.5 h-2.5" />
            </span>

            <div className="relative font-serif text-2xl sm:text-3xl text-white leading-none px-1.5 -mx-1.5 py-0.5 overflow-hidden rounded-[3px] inline-flex items-center gap-1">
              <span className="absolute inset-0 bg-[#2563EB] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              <span className="relative z-10 underline decoration-[#2563EB] decoration-2 underline-offset-4 group-hover:no-underline">
                Ekvion
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="font-mono text-[9px] tracking-widest text-[#A1A1AA] group-hover:text-white transition-colors mt-1.5">
              CO-FOUNDER
            </div>
          </a>

          <div>
            <div className="flex items-center gap-1.5 font-serif text-2xl sm:text-3xl text-white leading-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open
            </div>
            <div className="font-mono text-[9px] tracking-widest text-[#A1A1AA] mt-1.5">
              AHMEDABAD, IN
            </div>
          </div>

          <button
            onClick={() => setMsgOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white text-[#0A0A0A] px-5 py-3 sm:py-2.5 rounded-xl text-xs font-mono font-semibold tracking-wider hover:bg-white/90 transition-colors"
          >
            SEND MSG <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Send Message Box Modal */}
      <AnimatePresence>
        {msgOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMsgOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSendMessage}
              className="relative w-full max-w-md bg-[#141414] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl text-white"
            >
              <button
                type="button"
                onClick={() => setMsgOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="font-mono text-[10px] tracking-widest text-[#A1A1AA] uppercase">
                DIRECT MESSAGE
              </div>
              <h3 className="font-serif text-3xl mt-1">Send a message to Om</h3>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-[#A1A1AA] mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Rohan / Founder"
                    className="w-full bg-[#0A0A0A] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-[#71717A] outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-[#A1A1AA] mb-1.5">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Tell me what you're building or want to collaborate on..."
                    className="w-full bg-[#0A0A0A] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-[#71717A] outline-none focus:border-white/40 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-white text-[#0A0A0A] px-5 py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
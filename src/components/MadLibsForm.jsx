import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Check } from 'lucide-react';
import skyBuild from '../assets/sky-build.jpg';
import skyBrand from '../assets/sky-brand.jpg';
import { siteConfig } from '../data/siteConfig';

export default function MadLibsForm({
  variant = 'build',
  eyebrow = "TELL ME WHAT YOU'RE MAKING",
  defaultFirst = 'an AI tool for clinics',
  defaultSecond = 'doctors in India',
  timelines = ['in 8 weeks', 'in 3 months', "when it's right"],
  ctaLabel = 'Send to Om',
  footerNote = 'GOES TO OMPATEL28107@GMAIL.COM. OM REPLIES HIMSELF.',
  embedded = false,
}) {
  const [first, setFirst] = useState(defaultFirst);
  const [second, setSecond] = useState(defaultSecond);
  const [timeline, setTimeline] = useState(timelines[0]);
  const [sent, setSent] = useState(false);

  const isBrand = variant === 'brand';
  const accentBg = isBrand ? 'bg-[#F43F5E] text-white' : 'bg-[#3B82F6] text-white';
  const bgImage = isBrand ? skyBrand : skyBuild;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    const subject = encodeURIComponent(
      isBrand ? `Campaign Inquiry: ${first}` : `Project Inquiry: ${first}`
    );
    const body = encodeURIComponent(
      isBrand
        ? `Hi,\n\nWe're launching ${first} for ${second}, and want it live ${timeline}.\n\nLet's connect!`
        : `Hi,\n\nI'm building ${first} for ${second}, and I need it ${timeline}.\n\nLet's connect!`
    );
    window.open(`mailto:${siteConfig.email}?subject=${subject}&body=${body}`, '_blank');
    setTimeout(() => setSent(false), 3000);
  };

  const formCard = (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 bg-[#141414]/95 backdrop-blur-md rounded-2xl p-5 sm:p-8 shadow-glass border border-white/15 w-full"
    >
      <div className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#A1A1AA] uppercase mb-4 sm:mb-5">
        {eyebrow}
      </div>

      <div className="font-serif text-[22px] sm:text-3xl leading-[1.55] sm:leading-[1.5] text-white">
        {isBrand ? "We're launching " : "I'm building "}
        <input
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          aria-label="Project or product"
          className="inline-block bg-transparent border-b-2 border-white/25 focus:border-white outline-none px-1 w-44 sm:w-64 text-white"
        />{' '}
        for{' '}
        <input
          type="text"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          aria-label="Target audience"
          className="inline-block bg-transparent border-b-2 border-white/25 focus:border-white outline-none px-1 w-36 sm:w-52 text-white"
        />
        , and {isBrand ? 'want it live ' : 'I need it '}
        <span className="inline-flex flex-wrap items-center gap-1 sm:gap-1.5 align-baseline">
          {timelines.map((item, idx) => {
            const active = timeline === item;
            const isLast = idx === timelines.length - 1;
            return (
              <span key={item} className="inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => setTimeline(item)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    active
                      ? accentBg
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item}
                </button>
                {!isLast ? (
                  <span className="text-[#71717A] text-lg sm:text-xl">/</span>
                ) : (
                  <span>.</span>
                )}
              </span>
            );
          })}
        </span>
      </div>

      <p className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#A1A1AA] uppercase mt-5 sm:mt-6 leading-relaxed">
        {footerNote}
      </p>

      <div className="mt-5 sm:mt-6 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 text-[#A1A1AA] min-w-0">
          <span className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
          <span className="text-[11px] sm:text-xs font-mono truncate">
            Direct brief · No forms
          </span>
        </div>

        <button
          type="submit"
          className="shrink-0 inline-flex items-center gap-1.5 sm:gap-2 bg-white text-[#0A0A0A] px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          {sent ? (
            <>
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Opened Email
            </>
          ) : (
            <>
              {ctaLabel} <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );

  if (embedded) return formCard;

  return (
    <div className="relative rounded-2xl overflow-hidden p-4 sm:p-8 shadow-card border border-white/10">
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-85"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="max-w-2xl mx-auto">{formCard}</div>
    </div>
  );
}
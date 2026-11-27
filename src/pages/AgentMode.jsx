import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal } from 'lucide-react';
import skyBuild from '../assets/sky-build.jpg';

export default function AgentMode({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-[78vh] flex items-center justify-center overflow-hidden px-4 sm:px-8 py-16"
    >
      {/* Subtle Sky Backdrop */}
      <img
        src={skyBuild}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]" />

      {/* Center Coming Soon Card */}
      <div className="relative z-10 max-w-2xl w-full bg-[#141414]/90 backdrop-blur-md border border-white/15 rounded-2xl p-8 sm:p-12 text-center shadow-2xl">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#FACC15] uppercase bg-[#FACC15]/10 border border-[#FACC15]/30 px-3.5 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse" />
          AGENT MODE · UNDER CONSTRUCTION
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl text-white leading-[1.02]">
          Coming soon.
        </h1>

        <p className="text-sm sm:text-base text-[#A1A1AA] mt-5 max-w-md mx-auto leading-relaxed">
          Om&apos;s interactive AI agent is currently being built. Meanwhile, explore
          projects on Build, browse Stereoscopia, or reach out directly.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/build')}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#3B82F6] text-black hover:text-white font-mono text-xs font-semibold tracking-wider px-5 py-3 rounded-xl transition-colors"
          >
            EXPLORE BUILD <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/brand')}
            className="inline-flex items-center gap-2 border border-white/20 hover:border-[#EAB308] text-white hover:text-[#EAB308] font-mono text-xs tracking-wider px-5 py-3 rounded-xl transition-colors"
          >
            STEREOSCOPIA <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 font-mono text-[11px] text-[#71717A]">
          <Terminal className="w-3.5 h-3.5 text-[#FACC15]" />
          <a
            href="mailto:ompatel28107@gmail.com"
            className="hover:text-white transition-colors"
          >
            ompatel28107@gmail.com
          </a>
        </div>
      </div>
    </motion.div>
  );
}
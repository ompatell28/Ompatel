import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import skyBrand from '../assets/sky-brand.jpg';

export default function ReelDeck({ reels = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!reels.length) return null;

  const prev = () => setActiveIndex((i) => (i - 1 + reels.length) % reels.length);
  const next = () => setActiveIndex((i) => (i + 1) % reels.length);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 p-5 sm:p-8 flex flex-col items-center justify-between min-h-[340px]">
      <img
        src={skyBrand}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/75" />

      {/* Fanned Cards */}
      <div className="relative z-10 w-full flex items-center justify-center h-56 sm:h-64 my-2">
        {reels.map((reel, idx) => {
          const offset = idx - activeIndex;
          const abs = Math.abs(offset);
          const isCenter = offset === 0;
          return (
            <motion.div
              key={reel.title}
              onClick={() => setActiveIndex(idx)}
              animate={{
                x: offset * 68,
                scale: isCenter ? 1 : Math.max(0.78, 1 - abs * 0.12),
                rotate: offset * 5,
                zIndex: reels.length - abs,
                opacity: abs > 2 ? 0 : 1 - abs * 0.15,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className={`absolute w-36 sm:w-44 aspect-[9/15] rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer border shadow-2xl ${
                isCenter
                  ? 'bg-gradient-to-b from-zinc-900 to-black border-white/30'
                  : 'bg-zinc-900/90 border-white/15'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-white/70 truncate">
                  {reel.title}
                </span>
              </div>

              <div className="self-center w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>

              <div className="font-mono text-[10px] text-white/90 font-medium">
                {reel.likes}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls: < 01 / 04 > */}
      <div className="relative z-10 flex items-center gap-3 mt-3">
        <button
          onClick={prev}
          className="w-7 h-7 rounded-full bg-black/55 border border-white/15 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Previous reel"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="font-mono text-[11px] text-white/90 bg-black/55 px-3 py-1 rounded-full border border-white/10">
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(reels.length).padStart(2, '0')}
        </span>
        <button
          onClick={next}
          className="w-7 h-7 rounded-full bg-black/55 border border-white/15 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Next reel"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import skyBuild from '../assets/sky-build.jpg';
import skyBrand from '../assets/sky-brand.jpg';

const curtainAssets = {
  '/': { image: skyBuild, title: 'Om Patel.' },
  '/build': { image: skyBuild, title: 'Build.' },
  '/brand': { image: skyBrand, title: 'Stereoscopia.' },
};

export default function PageTransition({ transitioningTo }) {
  const active = transitioningTo ? curtainAssets[transitioningTo] : null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="sky-curtain"
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 overflow-hidden bg-[#0A0A0A] pointer-events-none"
        >
          <img
            src={active.image}
            alt=""
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.35 }}
            className="absolute bottom-10 left-6 sm:left-12"
          >
            <h2 className="font-serif text-6xl sm:text-8xl text-white drop-shadow-md">
              {active.title}
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
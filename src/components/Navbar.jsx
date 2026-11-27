import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

const navItems = [
  { label: 'Build', path: '/build', bg: '#2563EB', textActive: '#FFFFFF' },
  { label: 'Stereoscopia', path: '/brand', bg: '#EF4444', textActive: '#FFFFFF' },
];
export default function Navbar({ currentPath, mode, onNavigate, onModeChange }) {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredMode, setHoveredMode] = useState(null);
  const [brandHover, setBrandHover] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 40) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 6) {
        setVisible(false);
      } else if (currentY < lastScrollY.current - 6) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-8 h-16 flex items-baseline justify-between pt-5 sm:pt-3.5">
        <div className="flex items-baseline gap-1.5 sm:gap-3 min-w-0">
          <button
            onMouseEnter={() => setBrandHover(true)}
            onMouseLeave={() => setBrandHover(false)}
            onTouchStart={() => setBrandHover((prev) => !prev)}
            onClick={() => {
              if (mode !== 'human') onModeChange('human');
              onNavigate('/');
            }}
            className="relative font-serif font-normal text-[22px] sm:text-[36px] leading-none tracking-[-0.02em] text-white flex items-center overflow-hidden shrink-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              {brandHover ? (
                <motion.span
                  key="tagline"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="whitespace-nowrap text-[14px] sm:text-[32px]"
                >
                  I build cool things with AI.
                </motion.span>
              ) : (
                <motion.span
                  key="brand"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="whitespace-nowrap"
                >
                  {siteConfig.brandName}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <span className="font-serif text-[#71717A] text-sm sm:text-[21px] select-none">/</span>

          <nav className="flex items-baseline gap-1 sm:gap-2 font-serif text-[15px] sm:text-[21px]">
            {navItems.map((item, idx) => {
              const isActive = mode === 'human' && currentPath === item.path;
              const isHovered = hoveredNav === item.path;
              const filled = isActive || isHovered;
              return (
                <React.Fragment key={item.path}>
                  <button
                    onMouseEnter={() => setHoveredNav(item.path)}
                    onMouseLeave={() => setHoveredNav(null)}
                    onTouchStart={() => setHoveredNav(item.path)}
                    onClick={() => {
                      setHoveredNav(null);
                      if (mode !== 'human') onModeChange('human');
                      onNavigate(item.path);
                    }}
                    className="relative px-1.5 py-0.5 overflow-hidden rounded-[2px] leading-none"
                  >
                    <span
                      className="absolute inset-0 transition-transform duration-300 ease-out"
                      style={{
                        backgroundColor: item.bg,
                        transformOrigin: filled ? 'left' : 'right',
                        transform: filled ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                    <span
                      className="relative z-10 transition-colors duration-200"
                      style={{ color: filled ? item.textActive : '#A1A1AA' }}
                    >
                      {item.label}
                    </span>
                  </button>
                  {idx < navItems.length - 1 && (
                    <span className="text-[#71717A] text-sm sm:text-[21px] select-none">/</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        <div className="flex items-baseline gap-1 sm:gap-1.5 font-serif text-[15px] sm:text-[21px] shrink-0">
          {[
            { id: 'human', label: 'Human' },
            { id: 'agent', label: 'Agent' },
          ].map((m, idx) => {
            const isActive = mode === m.id;
            const isHovered = hoveredMode === m.id;
            const filled = isActive || isHovered;
            return (
              <React.Fragment key={m.id}>
                <button
                  onMouseEnter={() => setHoveredMode(m.id)}
                  onMouseLeave={() => setHoveredMode(null)}
                  onTouchStart={() => setHoveredMode(m.id)}
                  onClick={() => {
                    setHoveredMode(null);
                    onModeChange(m.id);
                  }}
                  className="relative px-1.5 py-0.5 overflow-hidden rounded-[2px] leading-none"
                >
                  <span
                    className="absolute inset-0 bg-white transition-transform duration-300 ease-out"
                    style={{
                      transformOrigin: filled ? 'left' : 'right',
                      transform: filled ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                  <span
                    className="relative z-10 transition-colors duration-200"
                    style={{ color: filled ? '#0A0A0A' : '#A1A1AA' }}
                  >
                    {m.label}
                  </span>
                </button>
                {idx === 0 && (
                  <span className="text-[#71717A] text-sm sm:text-[21px] select-none">/</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
}
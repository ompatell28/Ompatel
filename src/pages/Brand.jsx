import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  stereoHero,
  stereoStatement,
  fourColumnSeries,
  stereoQuote,
  heritageSectionMeta,
  heritageChapters,
  polShowcase,
  instaWall,
} from '../data/brandData';

function HeritageChapter({ chapter, index, onOpenLightbox }) {
  const [hoveredThumb, setHoveredThumb] = useState(null);
  const chapterRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ['start 95%', 'center 55%'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const isReversed = index % 2 === 1;
  const allPhotos = [chapter.mainImage, ...chapter.photos];

  return (
    <article
      ref={chapterRef}
      className="border-b border-[#1A1612]/15 pb-14 sm:pb-16 last:border-b-0"
    >
      {/* Top Row: Zig-Zag Alternating Layout (100% Frameless Main Photo + Scroll Reveal Text) */}
      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onOpenLightbox(allPhotos, 0, chapter.title)}
          className={`lg:col-span-7 group relative aspect-[16/10] overflow-hidden shadow-2xl cursor-pointer ${
            isReversed ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <motion.img
            style={{ scale: imgScale, y: imgY }}
            src={chapter.mainImage}
            alt={chapter.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-[#78654C] uppercase">
            CHAPTER {chapter.number}
          </span>
          <h3 className="font-serif text-3xl sm:text-5xl text-[#1A1612] mt-2 leading-tight">
            {chapter.title}
          </h3>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-wider text-[#5C4E3C] mt-2">
            {chapter.subtitle}
          </p>

          <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-2.5 text-sm sm:text-base text-[#2D251C] leading-relaxed">
            {chapter.points.map((pt, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                className="flex items-start gap-2.5"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1A1612] shrink-0" />
                <span>{pt}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom Row: Clean Black Mat Frames */}
      <div
        onMouseLeave={() => setHoveredThumb(null)}
        className={`mt-7 sm:mt-8 grid ${chapter.gridCols} gap-2.5 sm:gap-4`}
      >
        {chapter.photos.map((photo, idx) => {
          const isDimmed = hoveredThumb !== null && hoveredThumb !== idx;
          const isOddLastOnMobile =
            chapter.photos.length % 2 === 1 && idx === chapter.photos.length - 1;

          return (
            <motion.button
              key={idx}
              type="button"
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredThumb(idx)}
              onClick={() => onOpenLightbox(allPhotos, idx + 1, chapter.title)}
              className={`group bg-[#0A0A0A] p-2.5 sm:p-3.5 border border-black/30 hover:border-[#EAB308] shadow-lg transition-all duration-300 flex items-center justify-center ${
                isOddLastOnMobile
                  ? 'col-span-2 aspect-[16/9] sm:col-span-1 sm:aspect-square'
                  : 'aspect-square'
              } ${
                isDimmed ? 'opacity-45 scale-[0.97]' : 'opacity-100 hover:-translate-y-1.5 hover:scale-[1.04]'
              }`}
            >
              <img
                src={photo}
                alt={`${chapter.title} ${idx + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </motion.button>
          );
        })}
      </div>
    </article>
  );
}

// Spiral Split Frame Component (each photo uncoils from a central spiral as you scroll)
function SpiralWallFrame({ src, sizeClass, index, total, progress, paddingClass, onClick }) {
  const angle = index * 0.62;
  const spiralRadius = 90 + (index / total) * 110;
  const startX = Math.cos(angle) * spiralRadius * (index % 2 === 0 ? 1 : -1);
  const startY = Math.sin(angle) * spiralRadius * 0.75;
  const startRot = ((index % 7) - 3) * 16;

  const x = useTransform(progress, [0, 0.85], [startX, 0], { clamp: true });
  const y = useTransform(progress, [0, 0.85], [startY, 0], { clamp: true });
  const rotate = useTransform(progress, [0, 0.85], [startRot, 0], { clamp: true });
  const scale = useTransform(progress, [0, 0.85], [0.42, 1], { clamp: true });
  const opacity = useTransform(progress, [0, 0.3, 0.85], [0.1, 0.85, 1], { clamp: true });

  return (
    <motion.button
      type="button"
      style={{ x, y, rotate, scale, opacity }}
      onClick={onClick}
      className={`${sizeClass} shrink-0 bg-[#F5F5F4] ${paddingClass} border border-white/90 shadow-[0_14px_30px_rgba(0,0,0,0.85)] cursor-pointer hover:scale-105 transition-transform duration-300`}
    >
      <div className="w-full h-full overflow-hidden bg-black">
        <img
          src={src}
          alt={`Stereoscopia wall ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.button>
  );
}

export default function Brand() {
  const [activeSeries, setActiveSeries] = useState(0);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [lightbox, setLightbox] = useState({ images: [], index: null, title: '' });

  // Section 4: Quote Collage Scroll Animation
  const quoteSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: quoteSectionRef,
    offset: ['start 95%', 'center 55%'],
  });

  const qOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.15, 0.85, 1]);
  const q1Scale = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const q1X = useTransform(scrollYProgress, [0, 1], [-90, 0]);
  const q1Y = useTransform(scrollYProgress, [0, 1], [-55, 0]);
  const q1Rot = useTransform(scrollYProgress, [0, 1], [-14, -2]);

  const q2Scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const q2X = useTransform(scrollYProgress, [0, 1], [65, 0]);
  const q2Y = useTransform(scrollYProgress, [0, 1], [-85, 0]);
  const q2Rot = useTransform(scrollYProgress, [0, 1], [12, 2]);

  const q3Scale = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const q3X = useTransform(scrollYProgress, [0, 1], [-75, 0]);
  const q3Y = useTransform(scrollYProgress, [0, 1], [85, 0]);
  const q3Rot = useTransform(scrollYProgress, [0, 1], [14, -1.5]);

  const q4Scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const q4X = useTransform(scrollYProgress, [0, 1], [95, 0]);
  const q4Y = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const q4Rot = useTransform(scrollYProgress, [0, 1], [-12, 2.5]);

  // Section 5: Shop Shutter Roll-Up Reveal on Scroll
  const heritageSectionRef = useRef(null);
  const { scrollYProgress: shutterProgress } = useScroll({
    target: heritageSectionRef,
    offset: ['start 92%', 'start 22%'],
  });
  const shutterY = useTransform(shutterProgress, [0, 1], ['0%', '-105%']);

  // Section 6: Spiral Split Animation on Scroll (completes before bottom scroll settles)
  const wallRef = useRef(null);
  const { scrollYProgress: rawWallProgress } = useScroll({
    target: wallRef,
    offset: ['start 95%', 'start 26%'],
  });
  const wallProgress = useSpring(rawWallProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.4,
  });

  // Continuously cycle 4 images, pause while hovering any column
  useEffect(() => {
    if (hoveredCol !== null) return;
    const timer = setInterval(() => {
      setActiveSeries((prev) => (prev + 1) % fourColumnSeries.items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [hoveredCol]);

  // Keyboard support for Lightbox
  useEffect(() => {
    if (lightbox.index === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox({ images: [], index: null, title: '' });
      if (e.key === 'ArrowRight')
        setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
      if (e.key === 'ArrowLeft')
        setLightbox((prev) => ({
          ...prev,
          index: (prev.index - 1 + prev.images.length) % prev.images.length,
        }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.index]);

  const currentIdx = hoveredCol !== null ? hoveredCol : activeSeries;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLightbox = (images, index, title) => {
    setLightbox({ images, index, title });
  };

  const flatWallImages = instaWall.rows.flat().map((item) => item.src);
  const mobileDiamondRows = [
    ['w-16 h-14', 'w-20 h-24', 'w-16 h-14'],
    ['w-16 h-20', 'w-20 h-14', 'w-16 h-16', 'w-14 h-20'],
    ['w-12 h-14', 'w-16 h-12', 'w-14 h-20', 'w-16 h-12', 'w-12 h-16'],
    ['w-16 h-16', 'w-20 h-14', 'w-16 h-20', 'w-16 h-14'],
    ['w-12 h-16', 'w-16 h-12', 'w-16 h-20', 'w-14 h-12', 'w-12 h-14'],
    ['w-16 h-14', 'w-16 h-20', 'w-20 h-14', 'w-14 h-16'],
    ['w-16 h-14', 'w-20 h-20', 'w-16 h-14'],
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0A0A0A] text-white overflow-x-clip"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
      `}</style>

      {/* 1. CLEAN FULL-BLEED STEREOSCOPIA HERO */}
      <section className="relative min-h-[72vh] sm:min-h-[82vh] flex items-center overflow-hidden border-b border-white/10">
        <img
          src={stereoHero.heroImage}
          alt="Stereoscopia Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40" />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-14 sm:py-16">
          <h1 className="font-sans font-extrabold text-[13.5vw] sm:text-[104px] lg:text-[142px] tracking-tight leading-[0.88] text-white drop-shadow-lg">
            {stereoHero.titleTop}
          </h1>
          <div
            className="font-sans font-extrabold text-[12vw] sm:text-[90px] lg:text-[124px] tracking-tight leading-[0.92] text-transparent select-none drop-shadow-lg"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.82)' }}
          >
            {stereoHero.titleOutline}
          </div>
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.22em] text-white/95 uppercase mt-5 drop-shadow">
            {stereoHero.tagline}
          </p>
        </div>
      </section>

      {/* 2. COLOR KADANA DAM STATEMENT BANNER */}
      <section
        id="stereo-statement"
        className="relative min-h-[58vh] sm:min-h-[75vh] flex items-center overflow-hidden border-b border-white/10"
      >
        <img
          src={stereoStatement.image}
          alt="Kadana Dam"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-14 sm:py-16">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-white/90 uppercase">
            {stereoStatement.eyebrow}
          </div>
          <div className="font-mono text-xs sm:text-sm tracking-[0.26em] text-[#EAB308] uppercase mt-1.5 mb-4">
            KADANA DAM · GUJARAT
          </div>
          <h2 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight drop-shadow-lg">
            {stereoStatement.line1}
            <br />
            {stereoStatement.line2}
          </h2>

          <button
            type="button"
            onClick={() => scrollToSection('four-col-showcase')}
            className="mt-8 inline-flex items-center gap-3 pb-2 border-b border-white/70 hover:border-[#EAB308] text-sm font-sans text-white hover:text-[#EAB308] transition-colors"
          >
            {stereoStatement.ctaLabel}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3. 4-COLUMN 16:9 HOVER SHOWCASE */}
      <section id="four-col-showcase" className="border-y border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            {fourColumnSeries.heading}
          </h2>
          <a
            href={stereoHero.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/25 hover:border-[#EAB308] hover:text-[#EAB308] px-4 py-2 rounded-sm font-mono text-xs tracking-wider transition-colors"
          >
            {fourColumnSeries.ctaLabel} <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Desktop: 4-Column 16:9 Showcase */}
        <div
          onMouseLeave={() => setHoveredCol(null)}
          className="hidden lg:grid lg:grid-cols-4 relative max-w-[1440px] mx-auto lg:aspect-[16/9] overflow-hidden border-t border-white/10"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIdx}
              src={fourColumnSeries.items[currentIdx].image}
              alt={fourColumnSeries.items[currentIdx].title}
              initial={{ opacity: 0.45 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.45 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`absolute inset-0 w-full h-full object-cover ${fourColumnSeries.items[currentIdx].focus}`}
            />
          </AnimatePresence>

          {fourColumnSeries.items.map((item, idx) => {
            const isHovered = hoveredCol === idx;
            return (
              <div
                key={item.title}
                onMouseEnter={() => {
                  setHoveredCol(idx);
                  setActiveSeries(idx);
                }}
                className="relative z-10 h-full border-r border-white/20 last:border-r-0 flex flex-col justify-start cursor-pointer"
              >
                <div className="relative h-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
                  <span
                    aria-hidden="true"
                    style={{
                      transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'top',
                    }}
                    className="absolute inset-0 bg-[#0A0A0A] transition-transform duration-300 ease-out"
                  />
                  <div
                    className={`relative z-10 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 drop-shadow ${
                      isHovered ? 'text-[#EAB308]' : 'text-white/95'
                    }`}
                  >
                    {item.tag}
                  </div>
                  <h3
                    style={{ fontFamily: "'Caveat', cursive" }}
                    className="relative z-10 text-3xl sm:text-4xl font-bold text-white mt-1 drop-shadow"
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet: Single Full-Bleed Image + Top-Flush & Bottom-Flush 2x2 Grid */}
        <div className="lg:hidden relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden border-t border-white/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIdx}
              src={fourColumnSeries.items[currentIdx].image}
              alt={fourColumnSeries.items[currentIdx].title}
              initial={{ opacity: 0.45 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.45 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`absolute inset-0 w-full h-full object-cover ${fourColumnSeries.items[currentIdx].focus}`}
            />
          </AnimatePresence>

          <div className="relative z-10 grid grid-cols-2 grid-rows-2 h-full w-full">
            {fourColumnSeries.items.map((item, idx) => {
              const isActive = currentIdx === idx;
              const isTopRow = idx < 2;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveSeries(idx)}
                  className={`relative border-r border-b border-white/20 even:border-r-0 [&:nth-child(n+3)]:border-b-0 flex flex-col items-center text-center ${
                    isTopRow ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`w-full py-3.5 px-2 transition-colors duration-300 ${
                      isActive ? 'bg-[#0A0A0A]' : 'bg-transparent'
                    }`}
                  >
                    <div
                      className={`font-mono text-[8px] tracking-[0.2em] uppercase drop-shadow ${
                        isActive ? 'text-[#EAB308]' : 'text-white/95'
                      }`}
                    >
                      {item.tag}
                    </div>
                    <div
                      style={{ fontFamily: "'Caveat', cursive" }}
                      className="text-2xl sm:text-3xl font-bold text-white mt-0.5 leading-tight drop-shadow"
                    >
                      {item.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. STARRY BG + QUOTE COLLAGE BOX */}
      <section
        ref={quoteSectionRef}
        className="relative py-20 sm:py-32 overflow-hidden border-b border-white/10"
      >
        <div
          aria-hidden="true"
          style={{
            backgroundImage: `url(${stereoQuote.starBg})`,
            backgroundSize: '650px auto',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
          }}
          className="absolute inset-0 opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="relative rounded-2xl border border-white/15 border-l-4 border-l-[#EAB308] bg-[#141414] shadow-2xl overflow-visible">
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <img
                src={stereoQuote.boxBg}
                alt=""
                className="w-full h-full object-cover object-center opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/65 to-[#0A0A0A]/35" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center p-6 sm:p-10 lg:px-12 lg:py-10">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-[#EAB308] uppercase mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
                  {stereoQuote.eyebrow}
                </div>
                <p
                  style={{ fontFamily: "'Caveat', cursive" }}
                  className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white leading-[1.22] tracking-wide"
                >
                  “{stereoQuote.text}”
                </p>
              </div>

              <div className="lg:col-span-7 hidden lg:flex items-center justify-end gap-4 relative">
                <motion.div
                  style={{ opacity: qOpacity, scale: q1Scale, x: q1X, y: q1Y, rotate: q1Rot }}
                  className="shrink-0"
                >
                  <motion.div
                    animate={{ y: [-6, 7, -6], rotate: [-1.5, 1.5, -1.5] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-28 h-28 rounded-xl overflow-hidden border border-white/25 shadow-2xl bg-black"
                  >
                    <img
                      src={stereoQuote.collageImages[0].src}
                      alt={stereoQuote.collageImages[0].alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                </motion.div>

                <div className="flex flex-col items-center gap-3.5">
                  <motion.div
                    style={{ opacity: qOpacity, scale: q2Scale, x: q2X, y: q2Y, rotate: q2Rot }}
                  >
                    <motion.div
                      animate={{ y: [7, -7, 7], rotate: [1.5, -1.5, 1.5] }}
                      transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-40 h-48 -mt-20 rounded-xl overflow-hidden border border-white/25 shadow-2xl bg-black"
                    >
                      <img
                        src={stereoQuote.collageImages[1].src}
                        alt={stereoQuote.collageImages[1].alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    style={{ opacity: qOpacity, scale: q3Scale, x: q3X, y: q3Y, rotate: q3Rot }}
                  >
                    <motion.div
                      animate={{ y: [-7, 6, -7], rotate: [-1, 1.5, -1] }}
                      transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-48 h-32 -mb-20 rounded-xl overflow-hidden border border-white/25 shadow-2xl bg-black"
                    >
                      <img
                        src={stereoQuote.collageImages[2].src}
                        alt={stereoQuote.collageImages[2].alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  style={{ opacity: qOpacity, scale: q4Scale, x: q4X, y: q4Y, rotate: q4Rot }}
                  className="shrink-0"
                >
                  <motion.div
                    animate={{ y: [6, -8, 6], rotate: [2, -1, 2] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-40 h-40 rounded-xl overflow-hidden border border-white/25 shadow-2xl bg-black"
                  >
                    <img
                      src={stereoQuote.collageImages[3].src}
                      alt={stereoQuote.collageImages[3].alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                </motion.div>
              </div>

              <div className="lg:hidden grid grid-cols-2 gap-3">
                {stereoQuote.collageImages.map((img, idx) => (
                  <motion.div
                    key={img.alt}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                  >
                    <motion.div
                      animate={{ y: idx % 2 === 0 ? [-4, 4, -4] : [4, -4, 4] }}
                      transition={{ duration: 4 + idx * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="aspect-square rounded-xl overflow-hidden border border-white/20 shadow-xl bg-black"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HERITAGE SITES — Rounded Cut Window + Shop Shutter Roll-Up */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-8 py-8 sm:py-14">
        <div
          ref={heritageSectionRef}
          id="heritage-blog"
          style={{
            backgroundImage: `url(${heritageSectionMeta.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
          className="relative bg-[#DFC9A6] text-[#1A1612] rounded-2xl border border-[#8C5A2B]/40 shadow-2xl overflow-hidden"
        >
          {/* Shop Shutter Roll-Up Curtain */}
          <motion.div
            aria-hidden="true"
            style={{
              y: shutterY,
              backgroundImage:
                'repeating-linear-gradient(180deg, #0E0E10 0px, #0E0E10 22px, #1B1B1F 22px, #1B1B1F 26px)',
            }}
            className="pointer-events-none absolute top-0 left-0 right-0 h-[560px] z-30 flex flex-col justify-end shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
          >
            <div className="h-10 bg-[#0A0A0A] border-t border-b-4 border-b-[#EAB308] border-t-white/15 flex items-center justify-center gap-4 px-6">
              <span className="w-12 h-1 rounded-full bg-white/30" />
              <span className="font-mono text-[10px] tracking-[0.28em] text-[#EAB308] uppercase">
                HERITAGE ARCHIVE · ROLLING OPEN
              </span>
              <span className="w-12 h-1 rounded-full bg-white/30" />
            </div>
          </motion.div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#C89D6C]/35 via-[#D9B68C]/25 to-[#B98754]/35 pointer-events-none"
          />

          <div className="relative z-10 px-4 sm:px-10 pt-12 sm:pt-18 pb-16 sm:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="border-b-2 border-[#1A1612]/20 pb-5 sm:pb-6 mb-10 sm:mb-14"
            >
              <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.26em] text-[#6B5B45] uppercase">
                {heritageSectionMeta.eyebrow}
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#1A1612] mt-2 leading-none">
                {heritageSectionMeta.heading}
              </h2>
            </motion.div>

            <div className="space-y-16 sm:space-y-20">
              {heritageChapters.map((chapter, index) => (
                <HeritageChapter
                  key={chapter.id}
                  chapter={chapter}
                  index={index}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>

            {/* 4th Heritage Showcase: Ahmedabad ni Pol */}
            <section className="pt-14 sm:pt-16 border-t-2 border-[#1A1612]/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55 }}
                className="text-center mb-12 sm:mb-14"
              >
                <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#6B5B45] uppercase">
                  {polShowcase.eyebrow}
                </div>
                <h3 className="font-serif text-3xl sm:text-5xl text-[#1A1612] mt-2">
                  {polShowcase.title}
                </h3>
              </motion.div>

              <div className="relative max-w-4xl mx-auto py-20 lg:py-14">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 max-w-2xl mx-auto bg-[#0A0A0A] p-2 sm:p-2.5 rounded-xl shadow-2xl border border-black/40"
                >
                  <video
                    src={polShowcase.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                </motion.div>

                {/* Floating Border Photos — Staggered on Mobile, Same on Laptop */}
                <div>
                  {[
                    {
                      pos: '-top-2 left-3 w-16 h-16 lg:-top-4 lg:-left-10 lg:w-36 lg:h-36',
                      y: [-4, 4, -4],
                      rot: [-4, 2, -4],
                      dur: 4.5,
                    },
                    {
                      pos: '-top-7 left-[40%] w-20 h-14 lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:-left-16 lg:w-40 lg:h-28',
                      y: [4, -5, 4],
                      rot: [3, -2, 3],
                      dur: 5.2,
                    },
                    {
                      pos: '-top-1 right-3 w-14 h-16 lg:-top-6 lg:-right-10 lg:w-40 lg:h-32',
                      y: [4, -4, 4],
                      rot: [4, -2, 4],
                      dur: 5.0,
                    },
                    {
                      pos: '-bottom-1 left-5 w-20 h-14 lg:-bottom-6 lg:-left-8 lg:w-32 lg:h-40',
                      y: [-4, 5, -4],
                      rot: [-3, 3, -3],
                      dur: 4.8,
                    },
                    {
                      pos: '-bottom-7 left-[44%] w-16 h-16 lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:-right-16 lg:w-36 lg:h-36',
                      y: [-5, 4, -5],
                      rot: [-2, 3, -2],
                      dur: 4.3,
                    },
                    {
                      pos: '-bottom-2 right-4 w-16 h-14 lg:-bottom-4 lg:-right-10 lg:w-36 lg:h-28',
                      y: [4, -4, 4],
                      rot: [3, -3, 3],
                      dur: 5.4,
                    },
                  ].map((cfg, idx) => (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() =>
                        openLightbox(polShowcase.floatingPhotos, idx, polShowcase.title)
                      }
                      initial={{ opacity: 0, scale: 0.75 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: idx * 0.07 }}
                      className={`absolute z-20 ${cfg.pos} overflow-hidden`}
                    >
                      <motion.div
                        animate={{ y: cfg.y, rotate: cfg.rot }}
                        transition={{ duration: cfg.dur, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-full h-full p-1 lg:p-2 bg-[#0A0A0A] border border-black/40 hover:border-[#EAB308] shadow-2xl cursor-pointer flex items-center justify-center overflow-hidden"
                      >
                        <img
                          src={polShowcase.floatingPhotos[idx]}
                          alt={`Ahmedabad Pol ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* 6. BLACK GALLERY WALL + REAL WHITE FRAMES + SPIRAL SPLIT ANIMATION */}
      <section
        ref={wallRef}
        id="insta-wall"
        className="relative pt-14 sm:pt-24 pb-12 bg-[#0A0A0A] text-white overflow-hidden"
      >
        <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-8">
          {/* Desktop: Salon-Style Clustered White Frames with Spiral Split */}
          {(() => {
            let runningIndex = 0;
            return (
              <div className="hidden lg:flex flex-col items-center gap-4">
                {instaWall.rows.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="flex flex-nowrap items-center justify-center gap-4"
                  >
                    {row.map((frame, colIdx) => {
                      const currentFlatIdx = runningIndex++;
                      return (
                        <SpiralWallFrame
                          key={`${rowIdx}-${colIdx}`}
                          src={frame.src}
                          sizeClass={frame.size}
                          paddingClass="p-2.5"
                          index={currentFlatIdx}
                          total={flatWallImages.length}
                          progress={wallProgress}
                          onClick={() =>
                            openLightbox(
                              flatWallImages,
                              currentFlatIdx,
                              'Stereoscopia Wall'
                            )
                          }
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Mobile / Tablet: Balanced Diamond Salon Wall with Spiral Split */}
          {(() => {
            let mIdx = 0;
            return (
              <div className="lg:hidden flex flex-col items-center gap-2">
                {mobileDiamondRows.map((row, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex flex-nowrap items-center justify-center gap-2"
                  >
                    {row.map((sizeClass, cIdx) => {
                      const imgIdx = mIdx++;
                      const src = flatWallImages[imgIdx];
                      if (!src) return null;
                      return (
                        <SpiralWallFrame
                          key={`${rIdx}-${cIdx}`}
                          src={src}
                          sizeClass={sizeClass}
                          paddingClass="p-1"
                          index={imgIdx}
                          total={flatWallImages.length}
                          progress={wallProgress}
                          onClick={() =>
                            openLightbox(flatWallImages, imgIdx, 'Stereoscopia Wall')
                          }
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Clean Editorial Bottom CTA Row */}
          <div className="mt-16 sm:mt-20 pt-10 pb-6 sm:py-14 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <h2 className="font-serif text-[34px] leading-[1.08] sm:text-5xl lg:text-6xl text-white">
              {instaWall.heading}{' '}
              <span className="italic text-[#EAB308]">{instaWall.handle}</span>
            </h2>
            <a
              href={instaWall.instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-white hover:text-[#EAB308] transition-colors self-start sm:self-auto"
            >
              FOLLOW ON INSTAGRAM <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* TRANSPARENT BLUR LIGHTBOX (Website Background Visible Behind) */}
      <AnimatePresence>
        {lightbox.index !== null && lightbox.images[lightbox.index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox({ images: [], index: null, title: '' })}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#0A0A0A]/90 border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <span className="font-mono text-xs tracking-widest text-[#EAB308] uppercase">
                  {lightbox.title} · {lightbox.index + 1} / {lightbox.images.length}
                </span>
                <button
                  type="button"
                  onClick={() => setLightbox({ images: [], index: null, title: '' })}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-[70vh] bg-black/60 flex items-center justify-center p-3">
                <img
                  src={lightbox.images[lightbox.index]}
                  alt={lightbox.title}
                  className="max-h-full max-w-full object-contain rounded"
                />

                <button
                  type="button"
                  onClick={() =>
                    setLightbox((prev) => ({
                      ...prev,
                      index: (prev.index - 1 + prev.images.length) % prev.images.length,
                    }))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#EAB308] text-white hover:text-black flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightbox((prev) => ({
                      ...prev,
                      index: (prev.index + 1) % prev.images.length,
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-[#EAB308] text-white hover:text-black flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
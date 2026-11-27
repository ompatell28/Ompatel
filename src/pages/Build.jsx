import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import skyBuild from '../assets/sky-build.jpg';
import FloatingLeaves from '../components/FloatingLeaves';
import MadLibsForm from '../components/MadLibsForm';
import AnimatedCounter from '../components/AnimatedCounter';
import {
  buildHero,
  buildMadLibs,
  workedAtLogos,
  buildCounters,
  startupCaseStudies,
  soloProjects,
  clientWork,
} from '../data/buildData';

function AutoScrollShowcase({ screenshots, accent, badge, caption }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!screenshots?.length || paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % screenshots.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [screenshots, paused]);

  const active = screenshots[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-[#0D0D0F] border border-white/10 p-3.5 sm:p-5 h-[270px] sm:h-[340px] lg:h-full min-h-0 overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-2 shrink-0 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 shrink-0" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 shrink-0" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 shrink-0" />
          <span className="ml-1.5 sm:ml-2 font-mono text-[9px] sm:text-[10px] text-[#A1A1AA] truncate">
            {active.label}
          </span>
        </div>
        <span
          className="font-mono text-[9px] px-2 py-0.5 rounded-full shrink-0"
          style={{ backgroundColor: `${accent}33`, color: accent }}
        >
          {index + 1} / {screenshots.length} · {badge}
        </span>
      </div>

      {/* Full-bleed inside card height with zero side gaps */}
      <div className="relative my-2.5 sm:my-3 flex-1 min-h-0 w-full rounded-lg overflow-hidden bg-black border border-white/10">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.src}
            src={active.src}
            alt={active.label}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 pt-0.5 shrink-0">
        <div className="flex items-center gap-1 sm:gap-1.5">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              aria-label={`Show project ${idx + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: idx === index ? '18px' : '5px',
                backgroundColor: idx === index ? accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#71717A] truncate">
          {caption}
        </span>
      </div>
    </div>
  );
}

export default function Build() {
  const formRef = useRef(null);
  const [hoveredExp, setHoveredExp] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pb-12 overflow-x-clip"
    >
      {/* 2-Column Hero Banner */}
      <section className="relative overflow-hidden mx-3 mt-2 sm:mx-0 sm:mt-0 rounded-2xl sm:rounded-none pt-7 pb-8 sm:pt-10 sm:pb-16 border border-white/10 sm:border-0 sm:border-b sm:border-white/10">
        <img
          src={skyBuild}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0A0A0A]" />
        <FloatingLeaves />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-7 sm:gap-8 items-center">
          <div className="lg:col-span-6">
            <div className="font-mono text-[10px] sm:text-[11px] tracking-widest text-white/90 uppercase mb-2.5 sm:mb-3">
              {buildHero.eyebrow}
            </div>
            <h1 className="font-serif text-[36px] sm:text-5xl lg:text-6xl text-white leading-[1.06]">
              I take products
              <br />
              from{' '}
              <span className="underline decoration-[#2563EB] decoration-2 underline-offset-4">
                idea to launch.
              </span>
            </h1>
            <p className="text-white/90 text-sm sm:text-lg mt-3.5 sm:mt-4 leading-relaxed max-w-xl">
              {buildHero.subtitle}
            </p>
          </div>

          <div ref={formRef} className="lg:col-span-6">
            <MadLibsForm
              embedded
              variant="build"
              eyebrow={buildMadLibs.eyebrow}
              defaultFirst={buildMadLibs.defaultIdea}
              defaultSecond={buildMadLibs.defaultAudience}
              timelines={buildMadLibs.timelines}
              ctaLabel={buildMadLibs.ctaLabel}
              footerNote={buildMadLibs.note}
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Worked At 3-Column Logo Strip (2+1 on mobile, 3-col on desktop) */}
        <section className="mt-10 sm:mt-12">
          <div className="font-mono text-[11px] tracking-widest text-[#A1A1AA] uppercase mb-3.5 sm:mb-4">
            WORKED AT
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 border border-white/10 rounded-2xl overflow-hidden bg-[#141414]">
            {workedAtLogos.map((item, idx) => (
              <div
                key={item.name}
                className={`group relative h-24 sm:h-28 flex items-center justify-center px-4 sm:px-6 py-4 border-white/10 ${
                  idx === 0 ? 'border-r border-b sm:border-b-0' : ''
                } ${idx === 1 ? 'border-b sm:border-b-0 sm:border-r' : ''} ${
                  idx === 2 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-10 sm:max-h-14 w-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-out"
                />
                {item.tag && (
                  <span className="absolute top-2 right-2.5 font-mono text-[8px] sm:text-[9px] bg-[#3B82F6]/20 text-[#60A5FA] px-1.5 py-0.5 rounded">
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 sm:mt-10 pb-8 sm:pb-10 border-b border-white/10 text-center">
            {buildCounters.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="font-serif text-3xl sm:text-5xl text-white">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#A1A1AA] mt-1.5 sm:mt-2 leading-relaxed">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Cards — Normal scroll on mobile, sticky stacking on lg+ */}
        <section className="mt-12 sm:mt-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6 sm:mb-8">
            Experience
          </h2>

          <div className="space-y-6 sm:space-y-8 pb-4 sm:pb-8">
            {startupCaseStudies.map((study, index) => {
              const isHovered = hoveredExp === study.company;
              const stickyTop = 24 + index * 20;
              return (
                <article
                  key={study.company}
                  onMouseEnter={() => setHoveredExp(study.company)}
                  onMouseLeave={() => setHoveredExp(null)}
                  style={{
                    top: `${stickyTop}px`,
                    zIndex: 10 + index,
                    borderColor: isHovered ? study.accent : 'rgba(255,255,255,0.12)',
                    boxShadow: isHovered
                      ? `0 25px 60px -15px ${study.accent}33`
                      : '0 25px 50px -12px rgba(0,0,0,0.9)',
                  }}
                  className="lg:sticky bg-[#141414] rounded-2xl border p-5 sm:p-8 grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch lg:h-[460px] overflow-hidden transition-all duration-300"
                >
                  <div className="lg:col-span-5 flex flex-col justify-between min-h-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                        {study.logo && (
                          <img
                            src={study.logo}
                            alt={study.company}
                            className="h-6 sm:h-7 w-auto object-contain"
                          />
                        )}
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-[#A1A1AA]">
                          {study.period}
                        </span>
                      </div>

                      <div className="mt-3 sm:mt-4">
                        <span className="relative inline-block font-serif text-2xl sm:text-4xl px-2 -mx-2 sm:px-2.5 sm:-mx-2.5 py-0.5 sm:py-1 overflow-hidden rounded-[4px]">
                          <span
                            className="absolute inset-0 transition-transform duration-300 ease-out"
                            style={{
                              backgroundColor: study.accent,
                              transformOrigin: isHovered ? 'left' : 'right',
                              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                            }}
                          />
                          <span className="relative z-10 text-white">{study.company}</span>
                        </span>
                      </div>

                      <p className="text-[#D4D4D8] text-sm sm:text-base mt-2.5 sm:mt-3 leading-relaxed">
                        {study.description}
                      </p>
                    </div>

                    <div className="mt-5 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                      {study.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] sm:text-[11px] bg-white/5 border border-white/10 text-[#D4D4D8] px-2 sm:px-2.5 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {study.screenshots?.length > 0 ? (
                    <AutoScrollShowcase
                      screenshots={study.screenshots}
                      accent={study.accent}
                      badge={study.badge}
                      caption={study.previewCaption}
                    />
                  ) : (
                    <div className="lg:col-span-7 flex flex-col justify-between rounded-xl bg-[#0D0D0F] border border-white/10 p-4 sm:p-6 h-full min-h-0 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20" />
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20" />
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20" />
                        </div>
                        <span
                          className="font-mono text-[9px] px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: `${study.accent}33`, color: study.accent }}
                        >
                          {study.badge}
                        </span>
                      </div>

                      <div className="my-auto py-4">
                        <h4 className="font-serif text-xl sm:text-3xl text-white text-center max-w-md mx-auto leading-snug">
                          {study.previewHeadline}
                        </h4>

                        <div className="grid sm:grid-cols-2 gap-3 mt-4 sm:mt-5">
                          {study.previewCards.map((pc) => (
                            <div
                              key={pc.title}
                              className="rounded-xl bg-[#161618] border border-white/10 p-3.5 sm:p-4"
                            >
                              <div
                                className="w-2 h-2 rounded-full mb-2"
                                style={{ backgroundColor: study.accent }}
                              />
                              <div className="font-sans text-xs sm:text-sm font-semibold text-white">
                                {pc.title}
                              </div>
                              <div className="text-[11px] sm:text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                                {pc.sub}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-right font-mono text-[9px] sm:text-[10px] tracking-widest text-[#71717A] pt-1 shrink-0">
                        {study.previewCaption}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Built Myself — 1-col mobile, 2-col tablet, 3-col desktop */}
        <section className="mt-14 sm:mt-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6 sm:mb-8">
            Built myself
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {soloProjects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#141414] rounded-2xl border border-white/10 hover:border-[#2563EB] overflow-hidden shadow-sm flex flex-col transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-[#0A0A0A]/95 text-white px-3.5 py-1.5 rounded-lg border border-white/20 shadow-xl">
                      VISIT <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[#A1A1AA]">
                      {project.year}
                    </div>

                    <div className="mt-2">
                      <span className="relative inline-block font-serif text-2xl sm:text-3xl px-2 -mx-2 py-0.5 overflow-hidden rounded-[3px]">
                        <span className="absolute inset-0 bg-[#2563EB] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 text-white">{project.title}</span>
                      </span>
                    </div>

                    <p className="text-sm text-[#A1A1AA] mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] bg-white/5 border border-white/10 text-[#D4D4D8] px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between font-mono text-[11px] tracking-wider text-white group-hover:text-[#60A5FA] transition-colors">
                      <span>VISIT LIVE SITE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Client work, at 19 — 2-col on mobile (like Avi), 3-col on desktop */}
        <section className="mt-16 sm:mt-20 relative rounded-2xl overflow-hidden border border-white/10 p-5 sm:p-10">
          <img
            src={skyBuild}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />
          <FloatingLeaves />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                {clientWork.heading}
              </h2>
              <p className="text-xs sm:text-sm text-white/85 max-w-md leading-relaxed">
                {clientWork.intro}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3.5 gap-y-5 sm:gap-6">
              {clientWork.items.map((client) => {
                const CardTag = client.href ? 'a' : 'div';
                const cardProps = client.href
                  ? { href: client.href, target: '_blank', rel: 'noopener noreferrer' }
                  : {};

                return (
                  <CardTag
                    key={client.name}
                    {...cardProps}
                    className="group block"
                  >
                    <div
                      className={`relative aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden border border-white/20 ${
                        client.href ? 'group-hover:border-[#2563EB]' : ''
                      } bg-[#141414] transition-all duration-300 shadow-2xl`}
                    >
                      <img
                        src={client.image}
                        alt={client.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      {client.href && (
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] bg-[#2563EB] text-white px-3 py-1 rounded-lg shadow-xl font-semibold">
                            VISIT <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <span className="font-mono text-[9px] sm:text-[11px] tracking-wider text-white/85 group-hover:text-white transition-colors truncate">
                        {client.name}
                      </span>
                      {client.href && (
                        <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-white/60 group-hover:text-[#60A5FA] transition-colors" />
                      )}
                    </div>
                  </CardTag>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-12 sm:mt-16 pt-10 pb-6 sm:py-14 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <h2 className="font-serif text-[40px] leading-[1.05] sm:text-5xl lg:text-6xl text-white">
            Have something to build?
          </h2>
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-white hover:text-[#3B82F6] transition-colors self-start sm:self-auto"
          >
            TELL ME ABOUT IT <ArrowUp className="w-4 h-4" />
          </button>
        </section>
      </div>
    </motion.div>
  );
}
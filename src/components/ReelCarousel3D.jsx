import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import skyBuild from '../assets/sky-build.jpg';
import FloatingLeaves from './FloatingLeaves';
import { carouselReels } from '../data/reelsData';
import { siteConfig } from '../data/siteConfig';

const lerp = (a, b, t) => a + (b - a) * t;

export default function ReelCarousel3D({ skipLoader = false }) {
  const wrapperRef = useRef(null);
  const skyRef = useRef(null);
  const stageRef = useRef(null);
  const perspRef = useRef(null);
  const brandRef = useRef(null);
  const loaderUiRef = useRef(null);
  const pctRef = useRef(null);
  const cardRefs = useRef([]);

  const stateRef = useRef({
    unfold: skipLoader ? 1 : 0,
    spin: 0,
    speed: skipLoader ? -7.5 : 70,
    paused: false,
    progress: skipLoader ? 100 : 0,
    settled: skipLoader,
  });

  const [settled, setSettled] = useState(skipLoader);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    const total = carouselReels.length;

    let last = performance.now();
    let raf;
    const renderLoop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const st = stateRef.current;
      const isMobile = window.innerWidth < 640;

      if (!(st.paused && st.settled)) {
        st.spin = (st.spin + dt * st.speed + 360) % 360;
      }

      const u = st.unfold;

      if (perspRef.current) {
        perspRef.current.style.perspective = `${lerp(1000, isMobile ? 740 : 620, u)}px`;
      }

      if (stageRef.current) {
        if (u >= 0.999) {
          stageRef.current.style.transform = 'none';
        } else {
          const tiltX = lerp(-20, 0, u);
          const tiltZ = lerp(-12, 0, u);
          stageRef.current.style.transform = `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`;
        }
      }

      // Larger 16:10 landscape cards with clean gap on mobile & desktop
      const radius = lerp(isMobile ? 135 : 220, isMobile ? 560 : 780, u);
      const cardW = lerp(isMobile ? 64 : 100, isMobile ? 270 : 380, u);
      const cardH = lerp(isMobile ? 88 : 135, isMobile ? 168 : 238, u);

      carouselReels.forEach((_, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;

        let deg = ((idx / total) * 360 + st.spin) % 360;
        if (deg > 180) deg -= 360;

        const dealt = st.progress >= (idx / total) * 80;
        const visibleInArc = Math.abs(deg) < 114 ? 1 : 0;
        const opacity = lerp(dealt ? 1 : 0, visibleInArc, u);
        const scale = lerp(dealt ? 1 : 0.3, 1, u);

        el.style.width = `${cardW}px`;
        el.style.height = `${cardH}px`;
        el.style.backfaceVisibility = u > 0.7 ? 'hidden' : 'visible';
        el.style.transform = `rotateY(${deg}deg) translateZ(${-radius}px) scale(${scale})`;
        el.style.opacity = opacity;
        el.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
      });

      raf = requestAnimationFrame(renderLoop);
    };
    raf = requestAnimationFrame(renderLoop);

    if (skipLoader) {
      return () => cancelAnimationFrame(raf);
    }

    const isMobileStart = window.innerWidth < 640;
    const tl = gsap.timeline();

    tl.to(stateRef.current, {
      progress: 100,
      duration: 1.3,
      ease: 'power2.out',
      onUpdate: () => {
        if (pctRef.current) {
          pctRef.current.textContent = Math.round(stateRef.current.progress);
        }
      },
    })
      .to(loaderUiRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
      .to(skyRef.current, { opacity: 1, duration: 0.85, ease: 'power3.inOut' }, '<')
      .to(
        stateRef.current,
        { unfold: 1, speed: -7.5, duration: 1.15, ease: 'power3.inOut' },
        '<'
      )
      .to(
        brandRef.current,
        { scale: 0.36, x: -8, y: -14, opacity: 0, duration: 0.75, ease: 'power3.inOut' },
        '-=0.35'
      )
      .to(
        wrapperRef.current,
        {
          top: isMobileStart ? '62px' : '76px',
          left: isMobileStart ? '12px' : '32px',
          right: isMobileStart ? '12px' : '32px',
          height: isMobileStart ? '60vh' : '64vh',
          borderRadius: '16px',
          duration: 0.75,
          ease: 'power3.inOut',
          onComplete: () => {
            stateRef.current.settled = true;
            setSettled(true);
          },
        },
        '<'
      );

    return () => {
      cancelAnimationFrame(raf);
      tl.kill();
    };
  }, [skipLoader]);

  return (
    <div
      ref={wrapperRef}
      style={
        settled
          ? undefined
          : { position: 'fixed', top: 0, left: 0, right: 0, height: '100vh', zIndex: 50 }
      }
      className={
        settled
          ? 'relative h-[60vh] sm:h-[64vh] min-h-[380px] max-h-[600px] w-full rounded-2xl overflow-hidden shadow-card border border-white/10 bg-[#0A0A0A]'
          : 'bg-[#0A0A0A] overflow-hidden'
      }
    >
      <div
        ref={skyRef}
        style={{ opacity: skipLoader ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none"
      >
        <img src={skyBuild} alt="Sky" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />
        <FloatingLeaves />
      </div>

      {!settled && (
        <div
          ref={brandRef}
          className="absolute top-6 left-5 sm:left-8 z-20 origin-top-left font-serif text-4xl sm:text-7xl text-white tracking-tight pointer-events-none"
        >
          {siteConfig.brandName}
        </div>
      )}

      <div
        ref={perspRef}
        className="relative h-full w-full flex items-center justify-center overflow-hidden"
        style={{ perspective: '620px' }}
      >
        {/* pointer-events-none on stageRef so hover/clicks reach cards at negative Z */}
        <div
          ref={stageRef}
          className="relative w-full h-full flex items-center justify-center preserve-3d pointer-events-none"
        >
          {carouselReels.map((project, idx) => {
            const isCardHovered = hoveredCardId === project.id;
            const CardTag = project.href && settled ? 'a' : 'div';
            const linkProps =
              project.href && settled
                ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
                : {};

            return (
              <CardTag
                key={project.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                {...linkProps}
                onMouseEnter={() => {
                  if (!settled) return;
                  stateRef.current.paused = true;
                  setHoveredCardId(project.id);
                }}
                onMouseLeave={() => {
                  if (!settled) return;
                  stateRef.current.paused = false;
                  setHoveredCardId(null);
                }}
                onTouchStart={() => {
                  if (!settled) return;
                  stateRef.current.paused = true;
                  setHoveredCardId(project.id);
                }}
                onTouchEnd={() => {
                  if (!settled) return;
                  stateRef.current.paused = false;
                  setHoveredCardId(null);
                }}
                className={`group absolute block rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950 border shadow-2xl will-change-transform transition-colors duration-200 ${
                  project.href ? 'cursor-pointer hover:border-[#EF4444]' : 'cursor-default'
                } ${isCardHovered ? 'border-[#EF4444]' : 'border-white/25'}`}
              >
                {/* Project Screenshot Background */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* Readability Scrim */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/85" />

                <div className="relative z-10 w-full h-full p-2.5 sm:p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                      <span className="font-mono text-[8px] sm:text-[10px] text-white/95 truncate drop-shadow">
                        {project.tag}
                      </span>
                    </div>
                    {project.href && (
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-[8px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-white text-[#0A0A0A] font-semibold transition-opacity duration-200 shrink-0 shadow group-hover:opacity-100 ${
                          isCardHovered ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        VISIT <ArrowUpRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div className="mt-auto rounded-lg bg-black/60 border border-white/15 px-2.5 py-2 sm:px-3.5 sm:py-2.5 backdrop-blur-sm">
                    <p className="font-serif text-sm sm:text-2xl text-white leading-tight line-clamp-1">
                      {project.title}
                    </p>
                    <p className="text-white/80 text-[9px] sm:text-[11px] mt-0.5 line-clamp-1 hidden sm:block">
                      {project.subtitle}
                    </p>
                  </div>
                </div>
              </CardTag>
            );
          })}
        </div>
      </div>

      {!settled && (
        <div ref={loaderUiRef} className="pointer-events-none">
          <div className="absolute bottom-6 left-5 sm:left-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/25 flex items-center justify-center text-white">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <div className="absolute bottom-6 right-5 sm:right-10 text-right">
            <div className="font-mono text-[10px] tracking-widest text-[#A1A1AA]">
              LOADING PROJECTS
            </div>
            <div className="font-serif text-5xl sm:text-7xl leading-none text-white">
              <span ref={pctRef}>0</span>
              <span className="text-xl sm:text-2xl font-mono ml-1 text-[#A1A1AA]">%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
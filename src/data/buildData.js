import logoGlobalIt from '../assets/logo-global-it.png';
import logoTataEv from '../assets/logo-tata-ev.png';
import logoPrakriti from '../assets/logo-prakriti.png';

import proj1 from '../assets/projects/proj-1.jpg';
import proj2 from '../assets/projects/proj-2.jpg';
import proj3 from '../assets/projects/proj-3.jpg';
import proj4 from '../assets/projects/proj-4.jpg';
import proj5 from '../assets/projects/proj-5.jpg';
import proj6 from '../assets/projects/proj-6.jpg';
import proj7 from '../assets/projects/proj-7.jpg';
import proj8 from '../assets/projects/proj-8.jpg';
import proj9 from '../assets/projects/proj-9.jpg';
import proj10 from '../assets/projects/proj-10.jpg';

export const buildHero = {
  eyebrow: 'BUILD · PRODUCTS FOR FOUNDERS',
  title: 'I take products from idea to launch.',
  subtitle:
    'Frontend & React.js developer building fast, interactive websites and 3D motion interfaces—from initial design concept to live launch.',
};

export const buildMadLibs = {
  eyebrow: "TELL ME WHAT YOU'RE MAKING",
  defaultIdea: 'a modern web app',
  defaultAudience: 'our startup launch',
  timelines: ['in 4 weeks', 'in 8 weeks', "when it's right"],
  note: 'GOES TO OMPATEL28107@GMAIL.COM. OM REPLIES HIMSELF.',
  ctaLabel: 'Send to Om',
};

export const workedAtLogos = [
  { name: 'Global IT Infosolution', logo: logoGlobalIt, tag: 'FRONTEND · NOW' },
  { name: 'Tata Motors (TPEM)', logo: logoTataEv, tag: 'EV · SANAND' },
  { name: 'Prakriti Infotech', logo: logoPrakriti, tag: 'UI/UX · 2024' },
];

export const buildCounters = [
  { value: 10, suffix: '+', label: 'PROJECTS SHIPPED' },
  { value: 3, suffix: '', label: 'COMPANIES WORKED AT' },
  { value: 1, suffix: '+ yr', label: 'FRONTEND EXPERIENCE' },
  { value: 100, suffix: '%', label: 'RESPONSIVE & CLEAN CODE' },
];

export const startupCaseStudies = [
  {
    company: 'Global IT Infosolution',
    logo: logoGlobalIt,
    accent: '#F97316',
    badge: 'AHMEDABAD',
    period: 'DEC 2025 – NOW · FRONTEND DEVELOPER',
    description:
      'Built modern, responsive user interfaces using React.js, JavaScript, HTML5, and CSS3. Collaborated on client projects, converting design mockups into clean, interactive, and semantic frontend code.',
    stack: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive UI'],
    screenshots: [
      { src: proj1, label: 'Ekvion Tech · WebGL & Motion' },
      { src: proj2, label: 'School OS · Admin Dashboard' },
      { src: proj3, label: 'plutOM Studio · Interactive 3D' },
      { src: proj4, label: 'Pretty Nails Studio · Brand Site' },
      { src: proj5, label: 'Stereoscopia · Photography' },
      { src: proj6, label: 'Om Jewellers · E-Commerce UI' },
      { src: proj7, label: 'Culture Store · Luxury Fashion' },
      { src: proj8, label: 'Eklavya Campus · Education' },
      { src: proj9, label: 'Developer Portfolio · React' },
      { src: proj10, label: 'Dentalux · Healthcare & RCM' },
    ],
    previewHeadline: 'Responsive React UI built from client mockups',
    previewCards: [],
    previewCaption: 'GLOBAL IT INFOSOLUTION · AHMEDABAD',
  },
  {
    company: 'Tata Passenger Electric Mobility (TPEM)',
    logo: logoTataEv,
    accent: '#0EA5E9',
    badge: 'SANAND, GUJARAT',
    period: 'JAN 2025 – OCT 2025 · TRAINEE / APPRENTICE (IT SUPPORT)',
    description:
      'Provided hands-on IT support and system troubleshooting in the EV manufacturing sector. Collaborated with cross-functional teams to support daily plant operations.',
    stack: ['IT Support', 'EV Operations', 'Troubleshooting', 'Cross-Functional Teams'],
    screenshots: [],
    previewHeadline: 'IT support & plant operations at Sanand',
    previewCards: [
      { title: 'IT Support', sub: 'Hardware, software & network troubleshooting across plant systems.' },
      { title: 'Plant Operations', sub: 'Cross-functional coordination for daily targets.' },
    ],
    previewCaption: 'TATA PASSENGER ELECTRIC MOBILITY · SANAND',
  },
  {
    company: 'Prakriti Infotech',
    logo: logoPrakriti,
    accent: '#EF4444',
    badge: 'AHMEDABAD',
    period: 'MAY 2024 – JUL 2024 · UI/UX & GRAPHIC DESIGN INTERN',
    description:
      'Designed user flows, wireframes, and visual assets using Adobe Illustrator and UI/UX tools—translating brand concepts into clean, user-friendly web layouts.',
    stack: ['Adobe Illustrator', 'UI/UX Design', 'Wireframing', 'Visual Assets'],
    screenshots: [],
    previewHeadline: 'Adobe Illustrator & UI/UX web layouts',
    previewCards: [
      { title: 'Adobe Illustrator', sub: 'Vector graphics, icons & custom brand visuals.' },
      { title: 'UI/UX & Wireframes', sub: 'User flows and clean layouts ready for frontend.' },
    ],
    previewCaption: 'PRAKRITI INFOTECH · AHMEDABAD',
  },
];

export const soloProjects = [
  {
    title: 'Ekvion Tech',
    year: '2026 · SOLO',
    image: proj1,
    href: 'https://ekvion-tech.vercel.app/',
    description:
      'High-performance digital agency platform with interactive WebGL particle canvas, bold editorial typography, and smooth motion transitions.',
    stack: ['React', 'Tailwind CSS', 'WebGL', 'GSAP'],
  },
  {
    title: 'plutOM Studio',
    year: '2026 · SOLO',
    image: proj3,
    href: 'https://plutom-portfolio.vercel.app/',
    description:
      'Interactive 3D galaxy particle experience built to showcase modern web craftsmanship and spatial frontend engineering.',
    stack: ['React', 'Three.js', 'GSAP', 'Tailwind'],
  },
  {
    title: 'Stereoscopia',
    year: '2025 · CREATIVE',
    image: proj5,
    href: 'https://stereoscopia.vercel.app/',
    description:
      'Creative photography portfolio built around bold editorial framing, crisp typography, and immersive visual storytelling.',
    stack: ['React', 'Framer Motion', 'Tailwind CSS'],
  },
];

export const clientWork = {
  heading: 'Client work, at 19',
  intro:
    'Freelance & client websites shipped across India for jewelry brands, fashion stores, healthcare, studios, and educational platforms.',
  items: [
    {
      name: 'OM JEWELLERS',
      image: proj6,
      href: 'https://om-jewellers-in.vercel.app/',
    },
    {
      name: 'AARAMBH CULTURE',
      image: proj7,
      href: 'https://aarambhh.vercel.app/',
    },
    {
      name: 'DENTALUX',
      image: proj10,
      href: 'https://dentalux-three.vercel.app/',
    },
    {
      name: 'PRETTY NAILS STUDIO',
      image: proj4,
      href: null,
    },
    {
      name: 'EKLAVYA CAMPUS',
      image: proj8,
      href: 'https://schoolproject-lime.vercel.app/',
    },
    {
      name: 'OM PATEL PORTFOLIO',
      image: proj9,
      href: 'https://ompatell.vercel.app/',
    },
  ],
};
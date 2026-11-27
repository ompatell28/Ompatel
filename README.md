# Editorial 3D Portfolio — Dark Theme Edition (React + Vite + Tailwind + Framer Motion)

A modular, file-wise React.js portfolio in **sleek dark mode (`#0A0A0A`)** featuring:
- **Opening 3D Ring Loader (0% -> 100%)** that expands into an interactive **3D Curved Reel Carousel** with desktop hover tooltips
- **Human / Agent Mode Switch** in the sticky navigation bar (`Build` & `Brand` — no `Learn` section)
- **Sky Curtain Page Transitions** between `Home`, `Build`, and `Brand`
- **Interactive Mad-Libs Contact Forms**, **Fanned Reel Decks (`< 01 / 04 >`)**, **Animated SVG Donut & Bar Charts**, and **Developer API Terminal**

## Quick Start

```bash
cd portfolio-react
npm install
npm run dev
```

## How to Swap Your Own Content (File-Wise Structure)

All text, stats, projects, analytics, and links live in `src/data/`:

- `src/data/siteConfig.js` — Your brand name, email, hero stats, and footer links
- `src/data/reelsData.js` — 3D carousel cards & hover tooltips
- `src/data/buildData.js` — Work history, startup case studies, personal projects, client work, experiments
- `src/data/brandData.js` — Media kit, brand campaigns, analytics numbers, formats, rates
- `src/data/agentData.js` — AI Agent mode personas, prompts, and developer API endpoints
- `src/assets/` — `sky-build.jpg` and `sky-brand.jpg`

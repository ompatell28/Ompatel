/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        paper: '#0A0A0A',
        surface: '#141414',
        ink: '#F5F5F4',
        muted: '#A1A1AA',
        subtle: '#71717A',
        borderDark: 'rgba(255,255,255,0.10)',
        accentBuild: '#3B82F6',
        accentBrand: '#F43F5E',
        accentAgent: '#FACC15',
      },
      boxShadow: {
        card: '0 14px 40px -12px rgba(0, 0, 0, 0.7)',
        glass: '0 24px 60px -15px rgba(0, 0, 0, 0.85)',
      },
    },
  },
  plugins: [],
};

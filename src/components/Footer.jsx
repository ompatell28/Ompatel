import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16 py-8 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center gap-5 sm:gap-8 text-xs sm:text-sm text-[#A1A1AA] whitespace-nowrap">
        <a
          href="mailto:ompatel28107@gmail.com"
          className="hover:text-white transition-colors"
        >
          ompatel28107@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/om-patel-429958364"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white border-b-2 border-[#3B82F6] pb-0.5 hover:text-[#60A5FA] transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollToPlugin);

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
  onScrollToSection: (id: string) => void;
  isNavigating?: boolean;
}

export default function Navbar({ onOpenResume, activeSection, onScrollToSection, isNavigating }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-3 md:pt-6 px-3 md:px-4 pointer-events-none transition-all duration-300 ${isNavigating ? 'opacity-85 pointer-events-none is-navigating' : ''}`}>
      {/* Navbar Container Pill */}
      <div 
        className={`inline-flex items-center justify-between md:justify-start rounded-full backdrop-blur-md border border-white/10 bg-surface/85 px-3 py-1.5 md:px-3 md:py-2 transition-all duration-500 pointer-events-auto w-full max-w-[calc(100vw-24px)] min-[375px]:max-w-[calc(100vw-32px)] md:w-auto ${
          scrolled ? 'shadow-lg shadow-black/40 scale-95 border-white/15' : 'shadow-none'
        }`}
      >
        {/* 1. Logo */}
        <button
          onClick={() => {
            onScrollToSection('home');
            setIsOpen(false);
          }}
          className="relative w-8 h-8 md:w-9 md:h-9 rounded-full p-[1px] md:p-[1.5px] group overflow-hidden transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shrink-0"
        >
          {/* Rotating gradient ring */}
          <div className="absolute inset-0 accent-gradient animate-gradient-shift transition-transform duration-500 group-hover:rotate-180" />
          <div className="relative w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
            <span className="font-display italic text-[11px] md:text-[13px] text-text-primary tracking-normal font-semibold">
              KK
            </span>
          </div>
        </button>

        {/* 2. Divider - Visible on desktop only */}
        <div className="hidden md:block w-px h-5 bg-stroke mx-2" />

        {/* Active Section Indicator for Mobile */}
        <div className="flex-1 flex justify-center overflow-hidden h-5 md:hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeSection}
              initial={{ opacity: 0, filter: 'blur(3px)', y: 2 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(3px)', y: -2 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="font-sans font-medium text-[11px] min-[360px]:text-xs min-[390px]:text-[13px] tracking-[1px] min-[375px]:tracking-[2px] uppercase text-[#94a3b8] text-center select-none pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis px-1"
            >
              {activeSection === 'home' || !activeSection ? 'Home' : activeSection}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* 3. Inline Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-0.5 md:gap-2">
          {['about', 'skills', 'experience', 'projects', 'certifications', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => onScrollToSection(section)}
              className={`text-sm rounded-full px-4 py-2 transition-all duration-300 cursor-pointer font-medium capitalize shrink-0 ${
                activeSection === section
                  ? 'text-text-primary bg-stroke/60 font-semibold scale-[1.02]'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/40'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* 4. Hamburger Toggle on Mobile (Visible on mobile/tablet < md style) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex w-8 h-8 items-center justify-center text-muted hover:text-text-primary focus:outline-none cursor-pointer transition-colors duration-200 shrink-0"
        >
          {isOpen ? <X className="w-5 h-5 animate-pulse" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 5. Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-full max-w-[calc(100vw-24px)] min-[375px]:max-w-[calc(100vw-32px)] mt-2.5 bg-surface/95 border border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-2xl shadow-black/60 pointer-events-auto md:hidden z-40 flex flex-col gap-1.5"
          >
            {['about', 'skills', 'experience', 'projects', 'certifications', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => {
                  onScrollToSection(section);
                  setIsOpen(false);
                }}
                className={`w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer capitalize ${
                  activeSection === section
                    ? 'text-text-primary bg-stroke/60 font-semibold'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                }`}
              >
                {section}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

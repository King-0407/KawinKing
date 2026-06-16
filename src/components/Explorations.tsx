/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, ZoomIn } from 'lucide-react';
import { ExplorationItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

const EXPLORATIONS: ExplorationItem[] = [
  {
    id: "exp-1",
    title: "Dynamic Audio Visualizer",
    category: "Interface Interaction",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[-3deg]"
  },
  {
    id: "exp-2",
    title: "Modern E-Commerce Transition",
    category: "Motion Prototype",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[4deg]"
  },
  {
    id: "exp-3",
    title: "3D WebGL Fluid Canvas",
    category: "Creative Coding",
    imageUrl: "https://images.unsplash.com/photo-1618005198143-d3667cd354ed?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[-2deg]"
  },
  {
    id: "exp-4",
    title: "Retro Terminal Simulator",
    category: "Interaction Space",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[3deg]"
  },
  {
    id: "exp-5",
    title: "AI Agent Prompt Playground",
    category: "AI Design Systems",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[-4deg]"
  },
  {
    id: "exp-6",
    title: "Sleek Typography Experiments",
    category: "Branding Systems",
    imageUrl: "https://images.unsplash.com/photo-1618005082655-7da7a1fe2cb1?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[2deg]"
  }
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);

  // Set up the offset GSAP ScrollTrigger parallax values for wide viewports
  useEffect(() => {
    // Only run on md (768px) and up screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Left gallery column glides upwards
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current,
          { y: '150' },
          {
            y: '-120',
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      }

      // Right gallery column glides downwards
      if (rightColRef.current) {
        gsap.fromTo(rightColRef.current,
          { y: '-120' },
          {
            y: '150',
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  const leftItems = EXPLORATIONS.filter((_, idx) => idx % 2 === 0);
  const rightItems = EXPLORATIONS.filter((_, idx) => idx % 2 !== 0);

  return (
    <section 
      ref={containerRef}
      id="explorations" 
      className="relative bg-[#040404] py-24 md:py-36 text-white overflow-hidden select-none"
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Layout grid: Left side is sticky text block, Right side is the gliding columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Pinned left panel area */}
          <div className="md:col-span-5 md:sticky md:top-32 md:py-6 self-start z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Explorations
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white mb-6">
              Visual <span className="font-display italic">playground</span>
            </h2>
            
            <p className="text-sm md:text-base text-muted max-w-sm leading-relaxed mb-8">
              Exploring interfaces, motion, and intelligent product experiences.
            </p>

            {/* GitHub CTA Button */}
            <a
              href="https://github.com/King-0407"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 group relative p-[1.5px] rounded-full overflow-hidden leading-none cursor-pointer"
            >
              <div className="absolute inset-0 bg-stroke group-hover:accent-gradient transition-all duration-300 rounded-full animate-gradient-shift" />
              <div className="relative px-6 py-3.5 rounded-full bg-surface text-xs font-semibold text-text-primary transition-colors flex items-center gap-2">
                <span>GitHub Portfolio</span>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          </div>

          {/* Gliding right parallax panels */}
          <div className="md:col-span-7 grid grid-cols-2 gap-8 md:gap-12 relative">
            
            {/* Left Parallax Column */}
            <div ref={leftColRef} className="flex flex-col gap-10 md:gap-16">
              {leftItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative overflow-hidden bg-surface border border-stroke rounded-2xl aspect-square cursor-pointer transition-all duration-500 hover:border-white/20 select-none ${item.rotation} hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/60`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-45 transition-opacity z-10" />

                  {/* Icon zoom reveal */}
                  <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-350">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>

                  {/* Card Details on Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20">
                    <span className="text-[9px] sm:text-[10px] text-muted tracking-widest uppercase font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Parallax Column */}
            <div ref={rightColRef} className="flex flex-col gap-10 md:gap-16 md:mt-24">
              {rightItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative overflow-hidden bg-surface border border-stroke rounded-2xl aspect-square cursor-pointer transition-all duration-500 hover:border-white/20 select-none ${item.rotation} hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/60`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-45 transition-opacity z-10" />

                  {/* Icon zoom reveal */}
                  <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-350">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>

                  {/* Card Details on Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20">
                    <span className="text-[9px] sm:text-[10px] text-muted tracking-widest uppercase font-semibold block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* 2. Full screen Interactive Lightbox modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 flex flex-col md:flex-row items-center justify-center p-6 md:p-16 select-none"
          >
            {/* Backdrop Area tap to close */}
            <div className="absolute inset-0 z-0" onClick={() => setSelectedItem(null)} />

            {/* Floating Top Close Command */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full border border-white/10 bg-surface/40 hover:bg-white hover:text-black flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-md hover:scale-110 active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Primary Visual Frame */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative z-10 max-w-4xl w-full flex flex-col bg-[#0b0b0b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black"
            >
              <div className="relative aspect-video md:aspect-[16/10] w-full bg-black overflow-hidden">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Halftone grid inside expanded presentation */}
                <div className="absolute inset-0 halftone-overlay opacity-10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Detail specs at bottom of Lightbox card */}
              <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-surface">
                <div>
                  <span className="text-[10px] text-muted tracking-[0.2em] uppercase font-bold block mb-2">
                    {selectedItem.category} &bull; Visual Lab
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-display italic text-white tracking-wide">
                    {selectedItem.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2.5 rounded-full bg-stroke/60 text-xs sm:text-sm font-semibold text-text-primary hover:bg-white hover:text-black transition-colors self-stretch sm:self-auto flex items-center justify-center"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { JournalEntry } from '../types';

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "journal-1",
    title: "UI/UX Design Process",
    readTime: "5 Min Read",
    date: "June 08, 2026",
    imageUrl: "https://images.unsplash.com/photo-1541462608141-27b2c7453c6e?q=80&w=300&auto=format&fit=crop",
    category: "Design System"
  },
  {
    id: "journal-2",
    title: "AI Product Design",
    readTime: "8 Min Read",
    date: "May 24, 2026",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=300&auto=format&fit=crop",
    category: "AI & Innovation"
  },
  {
    id: "journal-3",
    title: "Building Better User Experiences",
    readTime: "6 Min Read",
    date: "May 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop",
    category: "UX Research"
  },
  {
    id: "journal-4",
    title: "Full Stack Product Thinking",
    readTime: "10 Min Read",
    date: "April 29, 2026",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=300&auto=format&fit=crop",
    category: "Engineering"
  }
];

export default function Journal() {
  return (
    <section id="journal" className="bg-[#0a0a0a] py-20 md:py-28 text-white select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Same Header Pattern */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white mb-4">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            
            <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
              Insights, explorations, and learnings at the intersection of development and design.
            </p>
          </div>

          {/* Desktop "View All" Button */}
          <a
            href="https://github.com/King-0407"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 group relative p-[1.5px] rounded-full overflow-hidden leading-none animate-gradient-shift"
          >
            <div className="absolute inset-0 bg-stroke group-hover:accent-gradient transition-all duration-300 rounded-full animate-gradient-shift" />
            <div className="relative px-5 py-3 rounded-full bg-surface text-xs font-semibold text-text-primary transition-colors flex items-center gap-2">
              <span>View all entries</span>
              <ArrowUpRight className="w-4.5 h-4.5 text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        </motion.div>

        {/* 4 Journal entries displayed as majestic horizontal pills */}
        <div className="flex flex-col gap-5">
          {JOURNAL_ENTRIES.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-[32px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke hover:border-white/10 transition-all duration-400 group cursor-pointer"
            >
              {/* Left Item: Image wrapper */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-3xl sm:rounded-full overflow-hidden shrink-0 border border-white/5 bg-background">
                <img
                  src={entry.imageUrl}
                  alt={entry.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
              </div>

              {/* Center Item: Main Title and date */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] uppercase font-semibold text-muted tracking-wide shrink-0">
                    {entry.category}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-bold shrink-0">&bull;</span>
                  <span className="text-xs text-muted font-light shrink-0">
                    {entry.date}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-white transition-colors tracking-wide line-clamp-1">
                  {entry.title}
                </h3>
              </div>

              {/* Right Item: Read Time and arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t border-stroke/50 sm:border-0 shrink-0">
                <span className="text-xs text-muted italic font-display pr-1 font-medium sm:block">
                  {entry.readTime}
                </span>
                
                {/* Visual circle arrow indicator */}
                <div className="w-10 h-10 rounded-full bg-[#121212] border border-stroke flex items-center justify-center relative overflow-hidden group-hover:scale-105 group-hover:bg-white group-hover:border-white transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-black transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <a
            href="https://github.com/King-0407"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group relative p-[1.5px] rounded-full overflow-hidden leading-none w-full max-w-sm"
          >
            <div className="absolute inset-0 bg-stroke group-hover:accent-gradient transition-all duration-300 rounded-full animate-gradient-shift" />
            <div className="relative w-full justify-center px-5 py-4 rounded-full bg-surface/80 text-xs font-semibold text-text-primary transition-colors flex items-center gap-2">
              <span>View all entries</span>
              <ArrowUpRight className="w-4.5 h-4.5 text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}

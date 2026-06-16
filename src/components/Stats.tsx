/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { StatItem } from '../types';

const STATS: StatItem[] = [
  {
    value: "2+",
    label: "Years Learning"
  },
  {
    value: "8+",
    label: "Projects Built"
  },
  {
    value: "100%",
    label: "Dedication Goal"
  }
];

export default function Stats() {
  return (
    <section id="stats" className="bg-[#0a0a0a] py-16 md:py-24 border-t border-stroke/30 border-b border-stroke/30 select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stroke/60">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`flex flex-col items-center justify-center text-center ${
                idx > 0 ? "pt-10 md:pt-0" : ""
              }`}
            >
              <span className="text-6xl md:text-8xl font-display italic text-white tracking-tight block mb-4 tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-neutral-400 uppercase tracking-[0.25em] font-medium block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

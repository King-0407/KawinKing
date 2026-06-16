/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, MapPin, Briefcase } from 'lucide-react';

const EXPERIENCE_ITEMS = [
  {
    company: "NoviTech R&D Private Limited",
    role: "Full Stack Intern",
    location: "Coimbatore, India",
    duration: "Jan 2025",
    bullets: [
      "Designed and built responsive interfaces using HTML, CSS, and React.js.",
      "Applied modern UI principles of spacious layout, typography hierarchy, and flexible component reuse.",
      "Integrated REST APIs connecting highly interactive frontends with structured database backend services."
    ]
  },
  {
    company: "Ether Infotech",
    role: "Data Science Intern",
    location: "Coimbatore, India",
    duration: "Jul 2025",
    bullets: [
      "Performed advanced data cleaning, preparation, and structuring of high-volume datasets.",
      "Built resilient regression and classification models using Python and modern library pipelines.",
      "Applied EDA (Exploratory Data Analysis) and generated interactive Power BI charts and dashboard views."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="bg-[#0a0a0a] py-20 md:py-28 text-white select-none relative overflow-hidden">
      {/* Dynamic top-right ambient background illumination */}
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full accent-gradient opacity-10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Same Header Pattern */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Experience
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white mb-4">
              Professional <span className="font-display italic">journey</span>
            </h2>
          </div>
        </div>

        {/* Experience Timeline Grid / Stack */}
        <div className="flex flex-col gap-8 md:gap-10">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <div
              key={item.company}
              className="bg-surface border border-stroke rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-white/10 transition-all duration-400 group relative overflow-hidden"
            >
              {/* Halftone BG effect */}
              <div className="halftone absolute inset-0 opacity-[0.03]" />
              
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-6 border-b border-stroke/50 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stroke/60 border border-white/5 flex items-center justify-center text-muted group-hover:text-text-primary group-hover:scale-105 transition-all duration-350">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-wide">
                      {item.company}
                    </h3>
                    <p className="text-sm font-display italic text-neutral-300 font-medium mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Sub Metadata Tags */}
                <div className="flex flex-wrap gap-3 text-xs text-muted font-medium lg:self-center">
                  <span className="inline-flex items-center gap-1.5 bg-stroke/30 px-3 py-1 rounded-full border border-stroke/50">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-stroke/30 px-3 py-1 rounded-full border border-stroke/50">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </span>
                </div>
              </div>

              {/* Bullet details */}
              <ul className="flex flex-col gap-3 relative z-10 text-neutral-400 text-sm">
                {item.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="flex items-start gap-3">
                    {/* Tiny custom list dot wrapper */}
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full accent-gradient" />
                    <span className="leading-relaxed hover:text-white transition-colors duration-250">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

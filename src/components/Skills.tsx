/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, MouseEvent, CSSProperties } from 'react';
import { PenTool, Layout, Terminal, Wrench } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    title: "UI/UX Design",
    icon: PenTool,
    skills: ["Figma", "Wireframing", "Prototyping", "User Research", "User Flows", "Design Systems", "Journey Maps", "WCAG Accessibility"]
  },
  {
    title: "Frontend Development",
    icon: Layout,
    skills: ["React.js", "HTML", "CSS", "JavaScript", "Tailwind CSS", "Responsive Design" ,"Vercel", "Expo Go"]
  },
  {
    title: "Backend Development",
    icon: Terminal,
    skills: ["Python", "Flask", "FastAPI", "MongoDB" ,"MySQL" ,"LangGraph", "OpenAI API","JWT Authentication"]
  },
  {
    title: "AI &Tools",
    icon: Wrench,
    skills: ["Machine Learning", "LangGraph","AWS", "GitHub","Power BI","Google Colab"]
  }
];

interface SkillsCardProps {
  category: typeof SKILL_CATEGORIES[0];
}

const SkillsCard: React.FC<SkillsCardProps> = ({ category }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState<CSSProperties>({ opacity: 0 });
  const [transformStyle, setTransformStyle] = useState<CSSProperties>({});
  const Icon = category.icon;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || isReducedMotion) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalizing coordinates from -0.5 to 0.5
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // 3D tilt: perspective(1000px) rotateY(x*8deg) rotateX(-y*8deg) with active elevation translateY(-4px)
    const rotateX = -normY * 8; 
    const rotateY = normX * 8; 

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: `0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.15)`,
      transition: 'none'
    });

    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(200px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.15) 0%, transparent 80%)`
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)`,
      boxShadow: `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)`,
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
    });
    setGlowStyle({
      opacity: 0,
      transition: 'opacity 0.4s ease'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...transformStyle, transformStyle: 'preserve-3d', willChange: 'transform' }}
      className="bg-surface border border-stroke rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-all duration-300 group relative overflow-hidden cursor-default shadow-md"
    >
      {/* Light Reflection Glow Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={glowStyle}
      />

      {/* Subtle halftone overlay */}
      <div className="halftone absolute inset-0 opacity-[0.03] pointer-events-none" />
      
      {/* Accent line shown on hover */}
      <div className="absolute top-0 left-0 w-0 h-[2px] accent-gradient group-hover:w-full transition-all duration-500 z-10" />
      
      <div className="flex items-center gap-4 mb-6 relative z-10" style={{ transform: 'translateZ(10px)' }}>
        <div className="w-12 h-12 rounded-xl bg-stroke/60 border border-white/5 flex items-center justify-center text-muted group-hover:text-text-primary group-hover:scale-105 transition-all duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg sm:text-xl font-normal font-display italic tracking-wide text-white">
          {category.title}
        </h3>
      </div>

      {/* Grid of Pill Badges */}
      <div className="flex flex-wrap gap-2.5 relative z-10" style={{ transform: 'translateZ(15px)' }}>
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="bg-stroke/30 hover:bg-stroke/60 hover:text-white border border-stroke hover:border-white/10 px-3.5 py-1.5 rounded-full text-xs text-neutral-300 font-medium transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(99,102,241,0.2)] active:scale-[0.98] inline-block font-sans cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="bg-[#040404] py-20 md:py-28 text-white select-none relative overflow-hidden">
      {/* Dynamic background lighting */}
      <div className="absolute bottom-[10%] left-[-15%] w-[600px] h-[600px] rounded-full accent-gradient opacity-10 blur-[130px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Same Header Pattern */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-medium">
                My Skills
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white mb-4">
              Intelligent tech, <span className="font-display italic">elegant code</span>
            </h2>
          </div>
        </div>

        {/* Categories Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SKILL_CATEGORIES.map((category) => (
            <SkillsCard key={category.title} category={category} />
          ))}
        </div>

      </div>
    </section>
  );
}

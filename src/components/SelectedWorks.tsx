/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, MouseEvent, CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
}

const PROJECTS: Project[] = [
  {
    id: "propose-iq",
    title: "ProposeIQ",
    category: "AI-Powered Proposal Evaluation Product",
    description: "A multi-agent AI desktop app that autonomously processes RFP documents using specialized AI agents with FastAPI, LangGraph, and MongoDB.",
    imageUrl: "/assets/ProposeIQ.png",
    colSpanClass: "md:col-span-12 lg:col-span-7",
    link: "https://github.com/King-0407/Propose-IQ-Lakshana-S-Kawin-King-C-"
  },
  {
    id: "dertz-pizza",
    title: "DERTZ Pizza — Mobile App UI/UX Design",
    category: "Mobile Design Systems",
    description: "Premium pizza delivery mobile app designed in Figma featuring cinematic UI and modern UX systems.",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
    colSpanClass: "md:col-span-12 lg:col-span-5",
    caseStudyUrl: "https://app.notion.com/p/DERTZ-Pizza-UI-UX-Case-Study-390bc98ccb60807ba5d3e89df298375e?source=copy_link",
    designUrl: "https://www.figma.com/proto/HMccAq19cDcFh1RHDzDUU7/Dertz-Pizza-s-%E2%80%94-Mobile-App-UI?node-id=5-2&page-id=0%3A1&starting-point-node-id=506%3A322&t=awMUILyNo24HorvF-1"
  },
  {
    id: "hewq",
    title: "HewQ — Freelancer Work & Invoice Manager UI/UX Design",
    category: "UI/UX Design + SaaS Product Design",
    description: "Designed a mobile-first SaaS application for freelancers to manage clients, projects, invoices, payment tracking, and income analytics, backed by UX research, user flows, and interactive prototyping in Figma.",
    imageUrl: "/assets/Hew.png",
    colSpanClass: "md:col-span-12",
    caseStudyUrl: "https://app.notion.com/p/HewQ-UI-UX-Case-Study-39235451b85b80c3b76bdf6cb853b239?source=copy_link",
    designUrl: "https://www.figma.com/proto/XFNbsDCFPuLu1IM7cx4sok/HewQ?node-id=449-342&viewport=9456%2C-142%2C0.36&t=Cj6afPEMc0EKdxpn-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=449%3A342&page-id=0%3A1"
  },
  {
    id: "resume-screening",
    title: "AI Resume Screening System",
    category: "NLP Evaluation System",
    description: "NLP-powered resume screening system with structured dashboard and intelligent candidate evaluation.",
    imageUrl: "/assets/Resu.png",
    colSpanClass: "md:col-span-12 lg:col-span-6",
    link: "https://github.com/King-0407/AI_Resume_Screener"
  },
  {
    id: "pdf-summarizer",
    title: "PDF Summarizer with Conversational Chatbot",
    category: "Generative AI",
    description: "AI-powered chatbot for real-time PDF summarization and context-aware responses.",
    imageUrl: "/assets/PDF.png",
    colSpanClass: "md:col-span-12 lg:col-span-6",
    link: "https://github.com/King-0407/PDF_Summarizer-with-Chatbot"
  }
];

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<CSSProperties>({});
  const [glowStyle, setGlowStyle] = useState<CSSProperties>({ opacity: 0 });

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

    // Tilt limits: rotateX, rotateY max 4 degrees (subtle for larger cards)
    const rotateX = -normY * 4; 
    const rotateY = normX * 4; 

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });

    setGlowStyle({
      opacity: 1,
      // Store cursor offsets as custom CSS keys
      '--x': `${x}px`,
      '--y': `${y}px`
    } as CSSProperties);
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
    });
    setGlowStyle({
      opacity: 0,
      transition: 'opacity 0.6s ease'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        ...transformStyle, 
        transformStyle: 'preserve-3d', 
        willChange: 'transform',
        '--x': glowStyle['--x' as any] || '50%',
        '--y': glowStyle['--y' as any] || '50%'
      } as React.CSSProperties}
      className={`${project.colSpanClass} group relative flex flex-col justify-between bg-surface border border-stroke rounded-3xl overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[460px] cursor-pointer shadow-lg glass-reflection`}
      onClick={() => onSelectProject(project)}
    >
      {/* Cursor-following radial glow via CSS variables */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(99, 102, 241, 0.15) 0%, transparent 60%)`
        }}
      />

      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden project-image-container" style={{ transform: 'translateZ(-10px)' }}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
          style={project.id === 'pdf-summarizer' ? { objectPosition: 'top center' } : undefined}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Halftone grid overlay */}
        <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />
        
        {/* Visual shadow gradient profile */}
        {project.id === 'hewq' ? (
          <div 
            className="absolute inset-0 z-10 pointer-events-none" 
            style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(15, 20, 16, 0.85))' }}
          />
        ) : project.id === 'pdf-summarizer' ? (
          <div 
            className="absolute inset-0 z-10 pointer-events-none" 
            style={{ backgroundImage: 'linear-gradient(180deg, rgba(8, 9, 13, 0.45) 0%, rgba(8, 9, 13, 0.70) 55%, rgba(8, 9, 13, 0.92) 100%)' }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10 pointer-events-none" />
        )}
      </div>

      {/* Top Banner (Category Badge) */}
      <div className="relative z-20 p-6 md:p-8 flex justify-between items-start" style={{ transform: 'translateZ(10px)' }}>
        <span className="text-[10px] md:text-xs text-muted uppercase tracking-[0.2em] font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
          {project.category}
        </span>
        
        {/* Quick actions button */}
        <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:border-white transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
        </div>
      </div>

      {/* Bottom Card Copy Details */}
      <div className="relative z-20 p-6 md:p-8 mt-auto project-text-container" style={{ transform: 'translateZ(15px)' }}>
        <h3 className="text-xl md:text-3xl font-display italic text-white tracking-wide mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-xs md:text-sm text-neutral-400 max-w-sm md:max-w-md line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
          {project.description}
        </p>
      </div>

      {/* Premium Floating hover card overlay */}
      {project.caseStudyUrl && project.designUrl ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex flex-row items-center gap-4 px-6">
            <a
              href={project.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/btn relative p-[1px] rounded-full overflow-hidden inline-flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
            >
              <div className="absolute inset-0 accent-gradient animate-gradient-shift rounded-full opacity-90 group-hover/btn:opacity-100 transition-opacity" />
              <div className="relative bg-[#0d0d0d] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                View Case Study
              </div>
            </a>
            <a
              href={project.designUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/btn relative p-[1px] rounded-full overflow-hidden inline-flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
            >
              <div className="absolute inset-0 accent-gradient animate-gradient-shift rounded-full opacity-90 group-hover/btn:opacity-100 transition-opacity" />
              <div className="relative bg-[#0d0d0d] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                View Design
              </div>
            </a>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300 pointer-events-none">
          <div className="p-1 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 accent-gradient animate-gradient-shift rounded-full" />
            
            <div className="relative bg-[#0d0d0d] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              <span>View &mdash; <span className="font-display italic text-sm">{project.title}</span></span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function SelectedWorks({ onSelectProject }: SelectedWorksProps) {
  return (
    <section id="projects" className="bg-[#0a0a0a] py-20 md:py-28 text-white select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Projects
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-xl font-normal leading-tight tracking-tight text-white mb-4">
              Featured <span className="font-display italic text-3xl md:text-5xl lg:text-6xl">projects</span>
            </h2>
            
            <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
              A selection of projects blending UI/UX, AI systems, and full-stack engineering.
            </p>
          </div>

          {/* Desktop "View All" Button */}
          <a
            href="https://github.com/King-0407"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 group relative p-[1.5px] rounded-full overflow-hidden leading-none animate-gradient-shift"
          >
            <div className="absolute inset-0 bg-stroke group-hover:accent-gradient transition-all duration-300 rounded-full" />
            <div className="relative px-5 py-3 rounded-full bg-surface text-xs font-semibold text-text-primary transition-colors flex items-center gap-2">
              <span>View all work</span>
              <ArrowUpRight className="w-4.5 h-4.5 text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onSelectProject={onSelectProject} 
            />
          ))}
        </div>

        {/* Mobile "View All" Button (Only visible on smaller viewports) */}
        <div className="mt-10 flex justify-center md:hidden">
          <a
            href="https://github.com/King-0407"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group relative p-[1.5px] rounded-full overflow-hidden leading-none w-full max-w-sm"
          >
            <div className="absolute inset-0 bg-stroke group-hover:accent-gradient transition-all duration-300 rounded-full animate-gradient-shift" />
            <div className="relative w-full justify-center px-5 py-4 rounded-full bg-surface text-xs font-semibold text-text-primary transition-colors flex items-center gap-2">
              <span>View all work</span>
              <ArrowUpRight className="w-4.5 h-4.5 text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}

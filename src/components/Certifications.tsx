/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS_DATA = [
  {
    id: "deloitte-data-analytics",
    title: "Data Analytics Job Simulation",
    org: "Deloitte (Forage)",
    description: "Practical job simulation focused on data analytics, business insights, and real-world problem solving.",
    isSilverElite: false
  },
  {
    id: "nvidia-cuda-python",
    title: "Fundamentals of Accelerated Computing with CUDA Python",
    org: "NVIDIA",
    description: "Learned GPU acceleration concepts using CUDA Python for high-performance computing applications.",
    isSilverElite: false
  },
  {
    id: "nvidia-cuda-c-cpp",
    title: "Fundamentals of Accelerated Computing with CUDA C/C++",
    org: "NVIDIA",
    description: "Hands-on accelerated computing with CUDA programming in C/C++ for parallel processing systems.",
    isSilverElite: false
  },
  {
    id: "nptel-industry-4-0",
    title: "Introduction to Industry 4.0 and Industrial Internet of Things",
    org: "NPTEL",
    description: "Comprehensive understanding of Industry 4.0 systems, IIoT, smart manufacturing, and industrial automation.",
    isSilverElite: true,
    achievement: "Silver Elite"
  },
  {
    id: "nptel-business-intelligence",
    title: "Business Intelligence & Analytics",
    org: "NPTEL",
    description: "Focused on business intelligence concepts, data-driven decision making, and analytics techniques.",
    isSilverElite: false
  }
];

interface CardProps {
  cert: typeof CERTIFICATIONS_DATA[0];
}

const CertificationCard: React.FC<CardProps> = ({ cert }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || isReducedMotion) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Subtle 3D tilt
    const rotateX = -normY * 6; 
    const rotateY = normX * 6;

    const shadowColor = cert.isSilverElite 
      ? 'rgba(245, 158, 11, 0.15)' 
      : 'rgba(99, 102, 241, 0.15)';
      
    const dropShadow = cert.isSilverElite
      ? '0 24px 64px rgba(0,0,0,0.5)'
      : '0 25px 50px rgba(0,0,0,0.4)';

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`,
      boxShadow: `${dropShadow}, 0 0 0 1px ${shadowColor}`,
      transition: 'none'
    });

    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(220px circle at ${x}px ${y}px, ${cert.isSilverElite ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)'} 0%, transparent 80%)`
    });
  };

  const handleMouseLeave = () => {
    const defaultBorderColor = cert.isSilverElite 
      ? 'rgba(245, 158, 11, 0.30)' 
      : 'rgba(255, 255, 255, 0.05)';

    setTransformStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)`,
      boxShadow: `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px ${defaultBorderColor}`,
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
      className={`bg-surface ${
        cert.isSilverElite 
          ? "border border-[rgba(245,158,11,0.30)]" 
          : "border border-stroke"
      } rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-all duration-300 group relative overflow-hidden cursor-default shadow-md ${
        cert.isSilverElite ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      {/* Light Reflection Glow Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={glowStyle}
      />

      {/* Subtle halftone overlay */}
      <div className="halftone absolute inset-0 opacity-[0.03] pointer-events-none" />
      
      {/* Accent line shown on hover */}
      <div className={`absolute top-0 left-0 w-0 h-[2px] ${
        cert.isSilverElite 
          ? "bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]" 
          : "accent-gradient"
      } group-hover:w-full transition-all duration-500 z-10`} />

      {/* Top row with badge pill and icon */}
      <div className="flex flex-wrap items-center gap-3 relative z-10" style={{ transform: 'translateZ(10px)' }}>
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-muted transition-all duration-300 ${
          cert.isSilverElite 
            ? "bg-[#f59e0b]/5 border-[#f59e0b]/10 group-hover:text-[#f59e0b] group-hover:scale-105" 
            : "bg-stroke/60 border-white/5 group-hover:text-[#818cf8] group-hover:scale-105"
        }`}>
          <Award className="w-5 h-5 text-indigo-400" />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <span className="bg-[rgba(99,102,241,0.10)] border border-[rgba(99,102,241,0.25)] text-[#818cf8] px-3 py-1 rounded-full text-xs font-semibold font-sans tracking-wide">
            {cert.org}
          </span>
          {cert.isSilverElite && (
            <span className="bg-[rgba(245,158,11,0.10)] border border-[rgba(245,158,11,0.30)] text-[#f59e0b] px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-sans tracking-wide">
              {cert.achievement}
            </span>
          )}
        </div>
      </div>

      {/* Title (Inter 700, 16px, text-slate-100, margin-top 12px) */}
      <h3 className="text-base font-bold font-sans text-[#f1f5f9] mt-3 tracking-wide leading-tight relative z-10" style={{ transform: 'translateZ(12px)' }}>
        {cert.title}
      </h3>

      {/* Description (Inter 400, 14px, #94a3b8, line-height 1.65, margin-top 8px) */}
      <p className="text-sm font-normal font-sans text-[#94a3b8] leading-[1.65] mt-2 relative z-10" style={{ transform: 'translateZ(15px)' }}>
        {cert.description}
      </p>
    </div>
  );
};

export default function Certifications() {
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const underline = underlineRef.current;
    if (!underline) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      gsap.set(underline, { width: '48px' });
      return;
    }

    const anim = gsap.fromTo(underline, 
      { width: 0 },
      { 
        width: '48px', 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: underline,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section id="certifications" className="bg-[#040404] py-20 md:py-28 text-white select-none relative overflow-hidden">
      {/* Background radial illumination */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full accent-gradient opacity-10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-[11px] font-semibold text-[#818cf8] uppercase tracking-[3px] font-sans">
                / CERTIFICATIONS
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-[40px] font-bold leading-tight tracking-tight text-white mb-4">
              Learning through <span className="font-display italic text-3xl md:text-5xl lg:text-6xl font-normal">industry-recognized credentials</span>
            </h2>

            {/* Violet animated underline: 48px x 3px */}
            <div 
              ref={underlineRef}
              className="h-[3px] bg-[#818cf8] rounded-full mt-4"
              style={{ width: '0px' }}
            />

            <p className="text-base text-muted max-w-lg leading-relaxed text-[#94a3b8] mt-6 font-normal">
              Professional certifications across AI, accelerated computing, analytics, and Industry 4.0 technologies.
            </p>
          </div>
        </div>

        {/* Layout: Responsive Grid (desktop md:col-span-2 for Card 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {CERTIFICATIONS_DATA.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </div>

      </div>
    </section>
  );
}

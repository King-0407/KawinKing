/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { MapPin, GraduationCap, FileText, ArrowRight } from 'lucide-react';

interface AboutProps {
  onOpenResume: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const educationCardRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const educationCard = educationCardRef.current;
    const profileCard = profileCardRef.current;
    if (!section) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || isReducedMotion) return;

    let mouseX = 0;
    let mouseY = 0;
    
    let isMouseOverProfile = false;
    let profileMouseX = 0;
    let profileMouseY = 0;

    let eduCurrentX = 0;
    let eduCurrentY = 0;

    let profileRotX = 0;
    let profileRotY = 0;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX = Math.min(Math.max(mouseX, -0.5), 0.5);
      mouseY = Math.min(Math.max(mouseY, -0.5), 0.5);
    };

    const handleProfileMouseMove = (e: MouseEvent) => {
      if (!profileCard) return;
      isMouseOverProfile = true;
      const rect = profileCard.getBoundingClientRect();
      profileMouseX = (e.clientX - rect.left) / rect.width - 0.5;
      profileMouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const handleProfileMouseLeave = () => {
      isMouseOverProfile = false;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    if (profileCard) {
      profileCard.addEventListener('mousemove', handleProfileMouseMove);
      profileCard.addEventListener('mouseleave', handleProfileMouseLeave);
    }

    let animationId: number;

    const update = () => {
      // Education card parallax depth (max 6px opposite to mouse, lerp 0.06)
      const eduTargetX = -mouseX * 12;
      const eduTargetY = -mouseY * 12;

      eduCurrentX += (eduTargetX - eduCurrentX) * 0.06;
      eduCurrentY += (eduTargetY - eduCurrentY) * 0.06;

      if (educationCard) {
        educationCard.style.transform = `translate3d(${eduCurrentX}px, ${eduCurrentY}px, 0)`;
      }

      // Profile Card 3D Tilt (max 5 deg)
      let profileTargetRotX = 0;
      let profileTargetRotY = 0;

      if (isMouseOverProfile) {
        profileTargetRotX = -profileMouseY * 10;
        profileTargetRotY = profileMouseX * 10;
      }

      profileRotX += (profileTargetRotX - profileRotX) * 0.1;
      profileRotY += (profileTargetRotY - profileRotY) * 0.1;

      if (profileCard) {
        if (isMouseOverProfile || Math.abs(profileRotX) > 0.01 || Math.abs(profileRotY) > 0.01) {
          const shadowOffsetX = -profileRotY * 2.5;
          const shadowOffsetY = profileRotX * 2.5;

          profileCard.style.transform = `perspective(1000px) rotateX(${profileRotX}deg) rotateY(${profileRotY}deg) scale3d(1.02, 1.02, 1.02)`;
          profileCard.style.boxShadow = `${shadowOffsetX}px ${shadowOffsetY}px 35px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(99, 102, 241, 0.15)`;
        } else {
          profileCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
          profileCard.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)`;
        }
      }

      animationId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      if (profileCard) {
        profileCard.removeEventListener('mousemove', handleProfileMouseMove);
        profileCard.removeEventListener('mouseleave', handleProfileMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-[#0a0a0a] py-20 md:py-28 text-white select-none relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full accent-gradient opacity-10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Same Header Pattern as selected works / journal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.3em] font-medium">
                About Me
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white mb-4">
              Designing thoughtful <span className="font-display italic">digital experiences</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Main Description */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              With professional experience spanning UI/UX design, modern interactive frontends, scalable autonomous AI agents, and complete full-stack web applications, he focuses on engineering comprehensive digital products that are visually refined, technically robust, and strictly user-focused.
            </p>

            {/* Premium trigger button to launch the comprehensive Resume Modal */}
            <div className="pt-4">
              <button
                onClick={onOpenResume}
                className="group relative p-[1.5px] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden inline-flex items-center gap-2 leading-none"
              >
                <div className="absolute inset-0 bg-stroke group-hover:accent-gradient transition-all duration-300 rounded-full animate-gradient-shift" />
                <div className="relative px-6 py-3.5 rounded-full bg-surface text-xs font-semibold text-text-primary transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
                  <span>Interactive Resume</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-white transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>

          {/* Location & Education Cards using design system container style */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* 3D Profile Portrait Card with Glow Enhancements */}
            <div className="relative group/glow">
              {/* Backing layered glow orbs for volumetric feel */}
              <div className="absolute -inset-4 rounded-3xl bg-[#6366f1]/15 blur-[50px] pointer-events-none transition-all duration-500 group-hover/glow:bg-[#6366f1]/20" style={{ zIndex: 0 }} />
              <div className="absolute -inset-2 rounded-3xl bg-[#38bdf8]/15 blur-[30px] pointer-events-none transition-all duration-500 group-hover/glow:bg-[#38bdf8]/20" style={{ zIndex: 0 }} />
              
              <div 
                ref={profileCardRef}
                className="relative z-10 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square border border-stroke bg-surface hover:border-white/10 transition-all duration-300 group shadow-lg cursor-pointer"
                style={{ transformStyle: 'preserve-3d', transition: 'box-shadow 0.3s ease, border-color 0.3s ease' }}
              >
                <img 
                  src="assets/image.png" 
                  alt="Kawin King C Portrait" 
                  className="w-full h-full object-cover opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 pointer-events-none select-none">
                  <h3 className="text-xl font-display italic text-white leading-none mb-1">Kawin King C</h3>
                  <p className="text-xs text-muted">UI/UX Designer & Full Stack Developer</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-surface/60 border border-stroke rounded-2xl p-6 hover:border-white/10 transition-all group relative overflow-hidden">
              <div className="halftone absolute inset-0 opacity-[0.03]" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stroke/60 border border-white/5 flex items-center justify-center text-muted group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-muted uppercase tracking-widest font-semibold mb-1">Current Location</h4>
                  <p className="text-base text-text-primary font-medium">Coimbatore, Tamil Nadu, India</p>
                  <p className="text-xs text-muted mt-1">Available for onsite/hybrid/remote roles.</p>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div 
              ref={educationCardRef} 
              className="bg-surface/60 border border-stroke rounded-2xl p-6 hover:border-white/10 transition-all group relative overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <div className="halftone absolute inset-0 opacity-[0.03]" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stroke/60 border border-white/5 flex items-center justify-center text-muted group-hover:text-white transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-muted uppercase tracking-widest font-semibold mb-1">Education Background</h4>
                  <p className="text-sm text-text-primary font-semibold">B.Tech Artificial Intelligence & Data Science</p>
                  <p className="text-xs text-muted mt-0.5 font-medium">KPR Institute of Engineering and Technology</p>
                  <p className="text-xs text-text-primary/80 font-bold mt-2 inline-flex items-center gap-1">
                    <span className="accent-gradient w-1.5 h-1.5 rounded-full" />
                    CGPA: 7.5 / 10
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

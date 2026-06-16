/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowDown, Play, Github, Linkedin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

const ROLES = [
  "UI/UX Designer",
  "Full Stack Developer"
];

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Initialize HLS Stream Background
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const videoUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.warn("HLS autoplay failed, enabling click-to-play backup:", err);
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari support
      video.src = videoUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((err) => {
          console.warn("Native player autoplay failed:", err);
        });
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // Cycle through professional roles every 2000ms
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setWordTransition();
    }, 2000);

    return () => clearInterval(roleInterval);
  }, []);

  const setWordTransition = () => {
    setRoleIndex((prev) => (prev + 1) % ROLES.length);
  };

  // Run the detailed GSAP layout entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Hero Background Entrance Animation: scale 1.1 -> 1.0, opacity 0 -> 1, duration 1.5s
      tl.fromTo('.hero-bg-animate',
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
        0
      );

      // Name Reveal Animation: opacity 0 -> 1, y 50 -> 0, duration 1.2s
      tl.fromTo('.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.1
      );

      // Blur in Animation: opacity 0 -> 1, filter blur(10px) -> blur(0px), y 20 -> 0, duration 1s, stagger 0.1
      tl.fromTo('.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToWorks = () => {
    onScrollToSection('projects');
  };

  const scrollToContact = () => {
    onScrollToSection('contact');
  };

  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-bg">
      {/* 1. HLS Streaming Background Video */}
      <div className="hero-bg-animate absolute inset-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 z-0 opacity-40"
        />
        {/* Abstract background glowing effect from Sophisticated Dark design */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-20 blur-[130px] rounded-full accent-gradient z-0"></div>
        {/* Cinematic dark overlay filters */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
      </div>



      {/* 2. Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mt-16 md:mt-20">
        {/* High-contrast name typography */}
        <h1 className="text-4xl md:text-[4.8rem] lg:text-[5.5rem] font-display italic leading-[0.9] tracking-tight text-white mb-6 select-none name-reveal">
          Kawin King C
        </h1>

        {/* Dynamic sliding role system */}
        <div className="h-auto md:h-12 overflow-visible md:overflow-hidden mb-6 blur-in">
          <p className="text-sm sm:text-base md:text-xl font-light text-[#ececec] leading-relaxed">
            A{" "}
            <span
              key={roleIndex}
              className="font-display italic text-white px-1 sm:px-2 text-base sm:text-lg md:text-2xl inline-block animate-role-fade-in"
            >
              {ROLES[roleIndex]}
            </span>{" "}
            crafting intelligent digital experiences.
          </p>
        </div>

        {/* Description block */}
        <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-10 leading-relaxed blur-in">
          I craft digital experiences that merge clean design with intelligent technology &mdash; from pixel-perfect interfaces to scalable AI systems.
        </p>

        {/* Custom luxury CTA buttons */}
        <div className="inline-flex flex-col sm:flex-row gap-4 justify-center items-center blur-in">
          {/* See Works */}
          <button
            onClick={scrollToWorks}
            className="group relative p-[1.5px] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden leading-none"
          >
            <div className="absolute inset-0 bg-transparent group-hover:accent-gradient transition-all duration-500 rounded-full animate-gradient-shift" />
            <div className="relative px-7 py-3.5 rounded-full bg-text-primary text-bg font-semibold text-sm transition-colors duration-300">
              See Works
            </div>
          </button>

          {/* Reach out... */}
          <button
            onClick={scrollToContact}
            className="group relative p-[1.5px] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden leading-none"
          >
            <div className="absolute inset-0 bg-stroke group-hover:accent-gradient transition-all duration-500 rounded-full animate-gradient-shift" />
            <div className="relative px-7 py-3.5 rounded-full bg-bg text-text-primary font-semibold text-sm transition-colors duration-300">
              Reach out...
            </div>
          </button>
        </div>
      </div>

      {/* 4. Elegant Minimal Social Quick Links (Bottom Right) */}
      <div className="absolute bottom-7 right-6 sm:right-10 lg:right-16 z-20 flex items-center gap-3 select-none">
        <a
          href="https://github.com/King-0407"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-[1px] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden inline-flex items-center"
        >
          {/* Subtle outline turns to moving accent gradient on hover */}
          <div className="absolute inset-0 bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300 rounded-full" />
          <div className="relative px-4 py-2 rounded-full bg-surface text-xs font-medium text-neutral-300 group-hover:text-white transition-colors flex items-center gap-2">
            <Github className="w-3.5 h-3.5 text-muted group-hover:text-white transition-colors" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>

        <a
          href="https://linkedin.com/in/kawinkingc"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-[1px] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden inline-flex items-center"
        >
          <div className="absolute inset-0 bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300 rounded-full" />
          <div className="relative px-4 py-2 rounded-full bg-surface text-xs font-medium text-neutral-300 group-hover:text-white transition-colors flex items-center gap-2">
            <Linkedin className="w-3.5 h-3.5 text-muted group-hover:text-white transition-colors" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>
      </div>
    </section>
  );
}

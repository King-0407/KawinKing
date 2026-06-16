/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import SelectedWorks from './components/SelectedWorks';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import { Project } from './types';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isNavigating, setIsNavigating] = useState(false);

  // Lock to prevent window scroll listeners from hijacking programmatically driven transitions
  const isProgrammaticScrolling = useRef(false);
  const lenisRef = useRef<any>(null);

  // Centralized premium cinematic scrolling controller
  const scrollToSection = (id: string) => {
    let target: string | number | HTMLElement = 0;
    if (id !== 'home') {
      const element = document.getElementById(id);
      if (element) {
        target = element;
      } else {
        return;
      }
    }

    const isMobile = window.innerWidth < 768;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    isProgrammaticScrolling.current = true;
    setActiveSection(id);
    setIsNavigating(true);

    if (isReducedMotion) {
      window.scrollTo({
        top: id === 'home' ? 0 : (target as HTMLElement).offsetTop - 70,
        behavior: 'auto'
      });
      isProgrammaticScrolling.current = false;
      setIsNavigating(false);
      return;
    }

    const duration = isMobile ? 1.1 : 1.5;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: duration,
        offset: id === 'home' ? 0 : -70,
        onComplete: () => {
          setTimeout(() => {
            isProgrammaticScrolling.current = false;
            setIsNavigating(false);
          }, 120);
        }
      });
    } else {
      gsap.to(window, {
        duration: duration,
        scrollTo: { y: target, offsetY: id === 'home' ? 0 : 70, autoKill: false },
        ease: 'power4.inOut',
        onComplete: () => {
          setTimeout(() => {
            isProgrammaticScrolling.current = false;
            setIsNavigating(false);
          }, 120);
        }
      });
    }
  };

  // Track active section via performance-optimized GSAP ScrollTrigger
  useEffect(() => {
    if (isLoading) return;

    const sections = ['about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
    const triggers: ScrollTrigger[] = [];

    // Home Section Trigger
    const homeTrigger = ScrollTrigger.create({
      trigger: '#home',
      start: 'top top',
      end: 'bottom center',
      onToggle: (self) => {
        if (self.isActive) {
          setActiveSection('home');
        }
      }
    });
    triggers.push(homeTrigger);

    // Sub sections
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(id);
          }
        }
      });
      triggers.push(trigger);
    });

    // Refresh after layout updates to keep calculations precise
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [isLoading]);

  // 0. Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (isLoading) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Disable scroll smoothing on mobile devices and for reduced motion
    if (isTouchDevice || isReducedMotion) return;

    const LenisClass = (window as any).Lenis;
    if (!LenisClass) return;

    const lenis = new LenisClass({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });
    
    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoading]);

  // 1. Global Cinematic Particles Canvas effect
  useEffect(() => {
    if (isLoading) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const THREE = (window as any).THREE;
    if (!THREE) {
      console.warn("Global Three.js CDN not loaded yet!");
      return;
    }

    const canvas = document.getElementById('cinematic-bg') as HTMLCanvasElement;
    if (!canvas) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Budget: 160 particles
    const count = 160; 
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorIndigo = new THREE.Color('#6366f1');
    const colorSky = new THREE.Color('#38bdf8');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;     // X spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;   // Y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;   // Z spread

      const mixedColor = colorIndigo.clone().lerp(colorSky, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const createCircleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 16;
      c.height = 16;
      const ctx = c.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(c);
    };

    const texture = createCircleTexture();
    const material = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMoveGlobal);
    }

    let isVisible = true;
    let frameId: number;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const onBeforeUnload = () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    const animate = () => {
      if (!isVisible) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      particles.rotation.y += 0.0002;

      if (!isTouchDevice && !isReducedMotion) {
        targetX = mouseX * 0.03;
        targetY = mouseY * 0.03;

        camera.rotation.y += (targetX - camera.rotation.y) * 0.04;
        camera.rotation.x += (-targetY - camera.rotation.x) * 0.04;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('beforeunload', onBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibility);
      onBeforeUnload();
    };
  }, [isLoading]);

  // Refresh ScrollTrigger positions after layout has completed rendering
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // GSAP ScrollTrigger premium section reveal and dimensional effects
  useEffect(() => {
    if (isLoading) return;

    // 1. Hero Content Smooth Fade & Scale Out on Scroll
    gsap.to('#home .relative.z-20', {
      opacity: 0,
      yPercent: -15,
      filter: 'blur(10px)',
      scale: 0.96,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: '60% top',
        scrub: true,
      }
    });

    // Hero Background Video Parallax (Dimensional depth)
    gsap.to('#home video', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 2. Contact Section Parallax Background (Deep kinetic reveal)
    gsap.fromTo('#contact video', 
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // 3. Staggered reveal for body section blocks
    const sections = ['about', 'skills', 'experience', 'projects', 'certifications', 'contact'];

    // 3.0. Cinematic Section Reveals
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((id) => {
        const sectionElement = document.getElementById(id);
        if (!sectionElement) return;

        gsap.fromTo(sectionElement, 
          { opacity: 0, y: 50, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", 
            duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionElement, start: "top 78%" }
          }
        );
      });
    }

    sections.forEach((id) => {
      const sectionElement = document.getElementById(id);
      if (!sectionElement) return;

      // Select inner nodes to orchestrate progressive staggers
      const elementsToAnimate = sectionElement.querySelectorAll([
        'span.text-\\[10px\\]',
        'span.text-muted',
        'h2',
        'p.text-neutral-300',
        'p.text-muted',
        '.grid > div',
        '.flex-col > div.bg-surface',
        '#contact-mail-cta',
        '.pt-4 > button',
        '.text-xs.uppercase'
      ].join(', '));

      if (elementsToAnimate.length === 0) {
        let fallback = sectionElement.querySelector('.max-w-\\[1200px\\], .max-w-\\[1240px\\]');
        if (!fallback) fallback = sectionElement.children[0];
        if (fallback) {
          gsap.fromTo(fallback,
            {
              opacity: 0,
              y: 80,
              filter: 'blur(12px)',
              scale: 0.98,
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1,
              duration: 1.4,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: sectionElement,
                start: 'top 82%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
        return;
      }

      // Initialize default invisible state of all targets to avoid flickering
      gsap.set(elementsToAnimate, {
        opacity: 0,
        y: 80,
        filter: 'blur(12px)',
        scale: 0.98,
      });

      // Implement cinematic stagger
      gsap.to(elementsToAnimate, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.4,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionElement,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading]);

  // Handle Select Project
  const handleSelectProject = (project: Project) => {
    if (project.link) {
      window.open(project.link, '_blank', 'noreferrer,noopener');
    }
  };

  return (
    <div id="portfolio-app-root" className="relative bg-[#040404] text-[#f5f5f5] font-sans antialiased selection:bg-white/20 selection:text-white min-h-screen">
      
      {/* 1. Loading screen presentation layer */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Primary layout loaded once active */}
      {!isLoading && (
        <>
          {/* Global Particle Canvas Layer */}
          <canvas 
            id="cinematic-bg" 
            className="fixed inset-0 w-full h-full pointer-events-none" 
            style={{ zIndex: 0, pointerEvents: 'none' }} 
          />

          <div id="main-content-flow" className="relative z-10">
            
            {/* Floating navigation pill */}
            <Navbar 
              activeSection={activeSection} 
              onOpenResume={() => setIsResumeOpen(true)} 
              onScrollToSection={scrollToSection}
              isNavigating={isNavigating}
            />

            {/* Interactive Sections */}
            <Hero onScrollToSection={scrollToSection} />
            <About onOpenResume={() => setIsResumeOpen(true)} />
            <Skills />
            <Experience />
            <SelectedWorks onSelectProject={handleSelectProject} />
            <Certifications />
            <Footer />

            {/* Detailed Popup Resume view overlay */}
            <ResumeModal 
              isOpen={isResumeOpen} 
              onClose={() => setIsResumeOpen(false)} 
            />
            
          </div>
        </>
      )}
      
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { gsap } from 'gsap';
import { ArrowUpRight, Mail, Check, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = "service_ygk4wc9";
const TEMPLATE_ID = "template_lg60x3u";
const PUBLIC_KEY = "OvkOp9WMmWJtuPRny";

export default function Footer() {
  const footerVideoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus('idle');
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        message: message
      }, PUBLIC_KEY);

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (err: any) {
      console.error("EmailJS sending error: ", err);
      setStatus('error');
      alert(err?.text || err?.message || "Failed to send message. Please try again or email me directly.");
    }
  };

  // Initialize vertically-flipped Footer HLS Background
  useEffect(() => {
    const video = footerVideoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const videoUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
      });
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.warn("Footer HLS play error:", err);
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((err) => {
          console.warn("Footer Native HLS play error:", err);
        });
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // Sync the GSAP marquee seamless -50% loop
  useEffect(() => {
    const elements = marqueeRef.current;
    if (!elements) return;

    // Linear translate to -50% infinitely
    const tween = gsap.to(elements, {
      xPercent: -50,
      ease: "none",
      duration: 40,
      repeat: -1
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <footer id="contact" className="relative bg-[#040404] pt-24 md:pt-36 pb-12 overflow-hidden select-none border-t border-stroke/10">
      
      {/* 1. Flipped HLS Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={footerVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-40 scale-y-[-1] scale-x-[1] z-0"
        />
        {/* Extremely heavy dark shade overlay */}
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col justify-between h-full">
        
        {/* Contact Prompt Header */}
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-semibold block mb-4">
            Contact
          </span>
          <h2 className="text-4xl md:text-6xl font-normal text-white mb-6">
            Let&rsquo;s build <span className="font-display italic">something meaningful</span>.
          </h2>
        </div>

        {/* 2. Interactive Contact Form Card wrapped in Slate Glassmorphism */}
        <div id="contact-form-card" className="w-full max-w-[480px] mx-auto my-8 bg-surface border border-stroke rounded-[20px] md:rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative z-10">
          <form onSubmit={handleSubmit} className="flex flex-col text-left">
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-[13px] font-medium text-[#94a3b8] mb-1.5 font-sans">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors(prev => ({ ...prev, name: undefined }));
                  }
                }}
                placeholder="Your Name"
                required
                className={`w-full px-4 py-3.5 rounded-[10px] bg-white/[0.04] text-[#f1f5f9] placeholder-[#475569] text-base md:text-[15px] font-sans font-normal border transition-all duration-200 ${
                  errors.name ? 'border-[#f43f5e] focus:border-[#f43f5e]/50 focus:ring-[#f43f5e]/10' : 'border-white/[0.08] focus:border-[#6366f1]/50 focus:ring-[#6366f1]/10'
                } focus:outline-none focus:ring-[3px]`}
              />
              {errors.name && (
                <span className="text-[12px] text-[#f43f5e] mt-1 block font-sans font-medium">{errors.name}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[13px] font-medium text-[#94a3b8] mb-1.5 font-sans">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors(prev => ({ ...prev, email: undefined }));
                  }
                }}
                placeholder="your.email@example.com"
                required
                autoComplete="email"
                className={`w-full px-4 py-3.5 rounded-[10px] bg-white/[0.04] text-[#f1f5f9] placeholder-[#475569] text-base md:text-[15px] font-sans font-normal border transition-all duration-200 ${
                  errors.email ? 'border-[#f43f5e] focus:border-[#f43f5e]/50 focus:ring-[#f43f5e]/10' : 'border-white/[0.08] focus:border-[#6366f1]/50 focus:ring-[#6366f1]/10'
                } focus:outline-none focus:ring-[3px]`}
              />
              {errors.email && (
                <span className="text-[12px] text-[#f43f5e] mt-1 block font-sans font-medium">{errors.email}</span>
              )}
            </div>

            {/* Message Field */}
            <div className="mb-5">
              <label htmlFor="message" className="block text-[13px] font-medium text-[#94a3b8] mb-1.5 font-sans">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors(prev => ({ ...prev, message: undefined }));
                  }
                }}
                placeholder="Your Message..."
                required
                className={`w-full px-4 py-3.5 rounded-[10px] bg-white/[0.04] text-[#f1f5f9] placeholder-[#475569] text-base md:text-[15px] font-sans font-normal border resize-y transition-all duration-200 ${
                  errors.message ? 'border-[#f43f5e] focus:border-[#f43f5e]/50 focus:ring-[#f43f5e]/10' : 'border-white/[0.08] focus:border-[#6366f1]/50 focus:ring-[#6366f1]/10'
                } focus:outline-none focus:ring-[3px]`}
              />
              {errors.message && (
                <span className="text-[12px] text-[#f43f5e] mt-1 block font-sans font-medium">{errors.message}</span>
              )}
            </div>

            {/* Form Submission status message boxes */}
            {status === 'error' && (
              <div className="mb-4 p-3 rounded-[10px] bg-[#f43f5e]/10 border border-[#f43f5e]/20 text-[#f43f5e] text-xs sm:text-sm font-sans flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Something went wrong. Please email me directly.</span>
              </div>
            )}

            {status === 'success' && (
              <div className="mb-4 p-3 rounded-[10px] bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs sm:text-sm font-sans flex items-start gap-2">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#10b981]" />
                <span>Message Sent!</span>
              </div>
            )}

            {/* Send Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#6366f1] text-white py-3.5 rounded-[10px] font-semibold text-[15px] hover:bg-[#4f46e5] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(99,102,241,0.35)] active:translate-y-0 active:scale-98 transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 font-sans select-none disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Message Sent! 🎉</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </form>
        </div>

        {/* 3. Secondary Email CTA Option */}
        <div className="text-center mt-6 mb-10 relative z-10">
          <p className="text-xs sm:text-sm text-[#94a3b8] font-medium font-sans mb-5 tracking-wide uppercase">
            or email me directly
          </p>
          <div className="flex justify-center items-center" id="contact-mail-cta">
            <a
              href="mailto:kawinkingc74@gmail.com"
              className="group relative p-[1.5px] rounded-full overflow-hidden block hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_50px_rgba(99,102,241,0.25)] transition-all duration-550 cursor-pointer text-center select-none"
            >
              <div className="absolute inset-0 bg-stroke group-hover:accent-gradient transition-all duration-500 rounded-full animate-gradient-shift" />
              
              <div className="relative bg-[#0d0d0d] group-hover:bg-[#070707] text-white px-8 sm:px-12 py-5 sm:py-6 rounded-full text-lg sm:text-2xl font-display italic tracking-wide transition-all flex items-center justify-center gap-3 sm:gap-4 leading-none select-none">
                <Mail className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                <span>kawinkingc74@gmail.com</span>
                <span className="text-muted group-hover:text-white transition-transform group-hover:translate-x-1.5">&rarr;</span>
              </div>
            </a>
          </div>
        </div>

        {/* 3. GSAP Scrolling Text Marquee */}
        <div className="overflow-hidden w-full relative py-6 md:py-8 border-t border-b border-stroke/20 bg-black/45 pointer-events-none select-none my-14">
          <div className="flex w-max shrink-0">
            <div ref={marqueeRef} className="flex whitespace-nowrap gap-4 text-4xl md:text-6xl lg:text-7xl font-display italic tracking-widest text-[#dfdfdf]/10 uppercase font-semibold">
              {/* Duplicate join to create seamless linear mapping */}
              <span>{Array(10).fill("I CRAFT DIGITAL EXPERIENCES • ").join('')}</span>
              <span>{Array(10).fill("I CRAFT DIGITAL EXPERIENCES • ").join('')}</span>
            </div>
          </div>
        </div>

        {/* 4. Footer bottom bar detailing */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-stroke/20 text-xs text-muted select-none">
          
          {/* Metadata Attribution */}
          <div className="text-center md:text-left">
            <p className="font-semibold text-text-primary/70 mb-1">
              &copy; &mdash; 2026 Portfolio. All Rights Reserved.
            </p>
          </div>

          

          {/* Social Links Platform connections */}
          <div className="flex items-center gap-4 sm:gap-6 font-medium text-neutral-400">
            <a
              href="https://linkedin.com/in/kawinkingc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors flex items-center gap-0.5"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-600" />
            </a>
            
            <a
              href="https://github.com/King-0407"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors flex items-center gap-0.5"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-600" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}

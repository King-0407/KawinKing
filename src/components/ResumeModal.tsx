/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Download, FileText, X, Award, Briefcase, Code, GraduationCap, MapPin, Mail, Phone, Linkedin, Github } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="resume-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
        >
          {/* Dismiss backdrop click */}
          <div className="absolute inset-0 z-0" onClick={onClose} />

          {/* Modal Content container */}
          <motion.div
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] bg-[#0c0c0c] border border-stroke rounded-3xl overflow-hidden flex flex-col shadow-2xl shadow-black"
          >
            {/* Header Area */}
            <div className="p-6 md:p-8 border-b border-stroke flex justify-between items-center bg-surface">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stroke flex items-center justify-center border border-white/5">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">
                    Professional Resume
                  </h3>
                  <p className="text-xs text-muted">
                    Kawin King C &bull; UI/UX Designer | Full Stack Developer
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-stroke hover:bg-white hover:text-black hover:border-white text-muted flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Core resume data */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 gap-8 flex flex-col scrollbar-thin text-neutral-300">
              
              {/* Profile Overview Section */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-stroke pb-6">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-display italic text-white tracking-wide mb-1 leading-none">
                    Kawin King C
                  </h1>
                  <p className="text-xs md:text-sm text-text-primary/70 font-semibold uppercase tracking-wider">
                    UI/UX Designer | Full Stack Developer
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-muted font-medium min-w-[220px]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Coimbatore, Tamil Nadu, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <a href="mailto:kawinkingc74@gmail.com" className="hover:text-white transition-colors">
                      kawinkingc74@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    <a href="tel:+919787832124" className="hover:text-white transition-colors">
                      +91 978-783-2124
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                    <a href="https://linkedin.com/in/kawinkingc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      linkedin.com/in/kawinkingc
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-indigo-400" />
                    <a href="https://github.com/King-0407" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      github.com/King-0407
                    </a>
                  </div>
                </div>
              </div>

              {/* Profile Summary Section */}
              <div className="border-b border-stroke pb-6">
                <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
                  B.Tech AI &amp; Data Science student with hands-on experience in 
                  full-stack development and AI-powered product building. Proficient 
                  in React.js, FastAPI, Python, and Figma — skilled across the full 
                  design-to-deployment pipeline. Dual internship experience in 
                  full-stack development and data science.
                </p>
              </div>

              {/* Layout splits into two columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                
                {/* Left Side: Skills & Certifications */}
                <div className="flex flex-col gap-8 md:col-span-1">
                  
                  {/* Skill Groups */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-white font-semibold uppercase tracking-wider text-xs border-b border-stroke pb-2 mb-2">
                      <Code className="w-4 h-4 text-indigo-400" />
                      <span>Technical Skills</span>
                    </div>
                    
                    {[
                      {
                        category: "Design Tools",
                        skills: ["Figma", "Wireframing", "Prototyping", "User Flows", "Design Systems", "WCAG Accessibility", "Visual Hierarchy", "Glassmorphism", "Smart Animate", "Responsive Design"]
                      },
                      {
                        category: "Frontend",
                        skills: ["React.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Vercel", "Expo Go"]
                      },
                      {
                        category: "Backend & AI",
                        skills: ["Python", "FastAPI", "Flask", "LangGraph", "LangChain", "NLP", "Machine Learning", "RAG"]
                      },
                      {
                        category: "Data & DB",
                        skills: ["MySQL", "MongoDB", "Pandas", "NumPy", "Scikit-learn", "Power BI"]
                      },
                      {
                        category: "Platforms",
                        skills: ["Git", "GitHub", "AWS", "Azure", "Jupyter Notebook", "Google Colab", "Canva"]
                      }
                    ].map((group) => (
                      <div key={group.category} className="flex flex-col gap-1">
                        <span className="text-[11px] font-semibold text-white/95 tracking-wide">{group.category}</span>
                        <div className="flex flex-wrap gap-1">
                          {group.skills.map((skill) => (
                            <span key={skill} className="bg-stroke/40 border border-white/5 px-2 py-0.5 rounded text-[10px] font-normal text-white/80 hover:border-white/20 transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expertise Focus Fields */}
                  <div>
                    <div className="flex items-center gap-2 text-white font-semibold uppercase tracking-wider text-xs mb-3 border-b border-stroke pb-2">
                      <Award className="w-4 h-4 text-indigo-400" />
                      <span>Focus Fields</span>
                    </div>
                    
                    <ul className="list-disc list-inside text-xs text-muted flex flex-col gap-2 pl-1.5">
                      <li>Autonomous Multi-Agent Systems</li>
                      <li>Intelligent NLP Data Processing</li>
                      <li>Figma Cinematic Design Prototypes</li>
                      <li>High Performance Full-Stack Tech</li>
                    </ul>
                  </div>

                  {/* Certifications Block */}
                  <div>
                    <div className="flex items-center gap-2 text-white font-semibold uppercase tracking-wider text-xs mb-3 border-b border-stroke pb-2">
                      <Award className="w-4 h-4 text-indigo-400" />
                      <span>Certifications</span>
                    </div>
                    
                    <ul className="text-xs text-muted flex flex-col gap-3 pl-1">
                      <li className="flex flex-col gap-0.5">
                        <span className="font-semibold text-white/95">Data Analytics Job Simulation</span>
                        <span className="text-[11px] text-amber-500 font-medium">Deloitte (Forage) &bull; Aug 2025</span>
                      </li>
                      <li className="flex flex-col gap-0.5">
                        <span className="font-semibold text-white/95">Accelerated Computing with CUDA Python</span>
                        <span className="text-[11px] text-amber-500 font-medium">NVIDIA &bull; Oct 2024</span>
                      </li>
                      <li className="flex flex-col gap-0.5">
                        <span className="font-semibold text-white/95">Accelerated Computing with CUDA C/C++</span>
                        <span className="text-[11px] text-amber-500 font-medium">NVIDIA &bull; Oct 2024</span>
                      </li>
                      <li className="flex flex-col gap-0.5">
                        <span className="font-semibold text-white/95 text-amber-400">Industry 4.0 &amp; Industrial IoT</span>
                        <span className="text-[11px] text-amber-500 font-medium">NPTEL (Silver Elite) &bull; Completed</span>
                      </li>
                      <li className="flex flex-col gap-0.5">
                        <span className="font-semibold text-white/95">Business Intelligence &amp; Analytics</span>
                        <span className="text-[11px] text-amber-500 font-medium">NPTEL &bull; Completed</span>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Right Side: Experience, Personal projects, Education, Leadership */}
                <div className="md:col-span-2 flex flex-col gap-8">
                  
                  {/* Experience Section */}
                  <div>
                    <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs mb-4 border-b border-stroke pb-2">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                      <span>Professional Experience</span>
                    </div>

                    <div className="flex flex-col gap-6">
                      <div className="border-l-2 border-stroke pl-4 gap-1.5 flex flex-col">
                        <div className="flex justify-between items-start gap-2 flex-wrap">
                          <h4 className="font-semibold text-white text-[15px]">Full Stack Intern</h4>
                          <span className="text-[11px] text-indigo-400 font-medium whitespace-nowrap bg-[rgba(99,102,241,0.06)] px-2 py-0.5 rounded border border-[rgba(99,102,241,0.15)]">Jan 2025</span>
                        </div>
                        <p className="text-xs text-muted font-medium">NoviTech R&D Private Limited &bull; Coimbatore</p>
                        <ul className="list-disc pl-4 text-xs text-neutral-400 flex flex-col gap-1.5 mt-1">
                          <li>Designed and built responsive interfaces using HTML, CSS, and React.js — applying UI principles of visual hierarchy, spacing, and component reuse for consistent cross-device layouts.</li>
                          <li>Integrated RESTful APIs to connect frontend interactions with backend services, optimising load performance and ensuring smooth user experience.</li>
                          <li>Delivered UI enhancements aligned with design best practices — improving page structure, readability, and overall interface quality.</li>
                        </ul>
                      </div>

                      <div className="border-l-2 border-stroke pl-4 gap-1.5 flex flex-col">
                        <div className="flex justify-between items-start gap-2 flex-wrap">
                          <h4 className="font-semibold text-white text-[15px]">Data Science Intern</h4>
                          <span className="text-[11px] text-indigo-400 font-medium whitespace-nowrap bg-[rgba(99,102,241,0.06)] px-2 py-0.5 rounded border border-[rgba(99,102,241,0.15)]">Jul 2025</span>
                        </div>
                        <p className="text-xs text-muted font-medium">Ether Infotech &bull; Coimbatore</p>
                        <ul className="list-disc pl-4 text-xs text-neutral-400 flex flex-col gap-1.5 mt-1">
                          <li>Performed data cleaning, preprocessing, and feature engineering on real-world datasets.</li>
                          <li>Built and evaluated regression and classification models using Scikit-learn.</li>
                          <li>Applied exploratory data analysis (EDA) and Power BI visualisations to derive actionable business insights.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Core Projects block */}
                  <div>
                    <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs mb-4 border-b border-stroke pb-2">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                      <span>Signature Core Projects</span>
                    </div>

                    <div className="flex flex-col gap-6">
                      {[
                        {
                          title: "DERTZ Pizza — Mobile App UI/UX Design",
                          tags: ["Figma", "Prototyping", "Smart Animate", "Glassmorphism", "Design Systems", "Mobile UI"],
                          desc: "Designed a premium 10-screen pizza delivery mobile app in Figma featuring glassmorphism, vibrant gradients, and a complete design system. Built cinematic splash animations using Smart Animate with multi-frame sequencing, Ease Out transitions, and layered motion design."
                        },
                        {
                          title: "ProposeIQ — AI-Powered Proposal Evaluation Product",
                          tags: ["React.js", "Figma", "FastAPI", "LangGraph", "MongoDB", "Electron", "Multi-Agent AI"],
                          desc: "Designed the end-to-end product UI in Figma — user flows, component library, and design system — then built the full-stack application with React frontend and FastAPI backend. Integrated a 4-agent LangGraph pipeline (Sales, Technical, Pricing, Master) with real-time SSE streaming and PDF/Word export for automated RFP evaluation."
                        },
                        {
                          title: "HewQ — Freelancer Work & Invoice Manager",
                          tags: ["Figma", "UX Research", "User Flows", "Interactive Prototyping", "Mobile-First Design", "SaaS"],
                          desc: "Designed a mobile-first SaaS application for freelancers to manage clients, projects, invoices, payment tracking, and income analytics, backed by UX research, user flows, and interactive prototyping in Figma."
                        },
                        {
                          title: "AI Resume Screening System",
                          tags: ["Python", "Flask", "NLP", "Machine Learning", "Web UI", "Dashboard Design"],
                          desc: "Built an NLP-based resume screening system with a structured web dashboard and clean UI. Used TF-IDF feature extraction and a Random Forest classifier to automate domain-based candidate evaluation and improve screening efficiency."
                        },
                        {
                          title: "PDF Summarizer with Conversational Chatbot",
                          tags: ["Python", "NLP", "Transformers", "Streamlit", "PyMuPDF"],
                          desc: "Engineered an AI-powered PDF summarization chatbot that reduced document review time by 60% and enabled 45% faster query resolution using transformer-based NLP pipelines and real-time conversational UI."
                        }
                      ].map((project, idx) => (
                        <div key={idx} className="border-l-2 border-stroke pl-4 hover:border-white/25 transition-colors gap-2 flex flex-col">
                          <h4 className="font-semibold text-white text-[15px] leading-tight">
                            {project.title}
                          </h4>
                          <div className="flex flex-wrap gap-1.5 my-1">
                            {project.tags.map(t => (
                              <span key={t} className="bg-surface/50 border border-stroke/50 text-[10px] px-1.5 py-0.5 rounded text-white/70">
                                {t}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-neutral-400 leading-relaxed">
                            {project.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education block */}
                  <div>
                    <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs mb-4 border-b border-stroke pb-2">
                      <GraduationCap className="w-4 h-4 text-indigo-400" />
                      <span>Education &amp; Background</span>
                    </div>

                    <div className="border-l-2 border-stroke pl-4">
                      <div className="flex justify-between items-start gap-2 flex-wrap">
                        <h4 className="font-semibold text-white text-[15px] leading-tight">
                          B.Tech in Artificial Intelligence &amp; Data Science
                        </h4>
                        <span className="text-[11px] text-indigo-400 font-medium whitespace-nowrap bg-[rgba(99,102,241,0.06)] px-2 py-0.5 rounded border border-[rgba(99,102,241,0.15)]">2023 – 2027</span>
                      </div>
                      <p className="text-xs text-muted mb-1 font-medium italic mt-1">
                        KPR Institute of Engineering and Technology &bull; Coimbatore, Tamil Nadu
                      </p>
                      <p className="text-xs text-white/90 font-medium">
                        CGPA: 7.5/10
                      </p>
                    </div>
                  </div>

                  {/* Leadership & Achievements */}
                  <div>
                    <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs mb-4 border-b border-stroke pb-2">
                      <Award className="w-4 h-4 text-indigo-400" />
                      <span>Leadership &amp; Achievements</span>
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="border-l-2 border-stroke pl-4 gap-1.5 flex flex-col">
                        <h5 className="font-semibold text-white text-[14px]">Branding &amp; Editing Chair</h5>
                        <p className="text-[11px] text-muted italic font-medium">ACM Student Chapter &bull; AI &amp; DS Association &bull; 2023 – Present</p>
                        <ul className="list-disc pl-4 text-xs text-neutral-400 flex flex-col gap-1">
                          <li>Led visual identity and brand guidelines for the ACM Student Chapter — designed posters, digital assets, and motion graphics with consistent, user-focused design language.</li>
                          <li>Managed content strategy and digital outreach, driving engagement across the AI &amp; DS Association community.</li>
                        </ul>
                      </div>

                      <div className="border-l-2 border-stroke pl-4 gap-1 flex flex-col">
                        <h5 className="font-semibold text-white text-[14px]">Achievements</h5>
                        <ul className="list-disc pl-4 text-xs text-neutral-400 flex flex-col gap-1.5 mt-1">
                          <li>
                            <strong className="text-white font-semibold">EY Techathon 6.0 (AI Agents Track - Advanced Round):</strong> Advanced to the competitive round by building and pitching an AI agent-based solution under tight deadlines at Ernst &amp; Young.
                          </li>
                          <li>Organised and executed 2 national-level hackathons, managing end-to-end planning, coordination, and participant experience.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Footer download / link buttons */}
            <div className="p-6 md:p-8 bg-surface border-t border-stroke flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-muted font-medium text-center sm:text-left select-none">
                Open to Product Design and Full Stack Development roles
              </span>
              
              <div className="flex items-center w-full sm:w-auto shrink-0 select-none justify-center sm:justify-end">
                <a
                  href="/assets/Kawin_KingC_Resume.pdf"
                  download="Kawin_KingC_Resume.pdf"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-stroke hover:bg-white hover:text-black hover:border-white text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

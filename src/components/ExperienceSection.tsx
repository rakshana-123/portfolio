import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface RouteStop { id: string; year: string; title: string; organization: string; description: string; }

const journey: RouteStop[] = [
  { id: '01', year: '2023 — 2024', title: 'HIGHER SECONDARY', organization: 'SRI VIDYA MANDIR HR. SEC SCHOOL', description: 'Completed higher secondary education with 70% aggregate.' },
  { id: '02', year: '2024 — PRESENT', title: 'B.Sc COMPUTER SCIENCE (AI & DS)', organization: 'SONA COLLEGE OF ARTS AND SCIENCE, SALEM', description: 'Specializing in AI & Data Science. CGPA: 8.7. Building expertise in machine learning, NLP, and intelligent systems.' },
  { id: '03', year: 'APR — MAY 2026', title: 'MERN STACK DEVELOPER INTERN', organization: 'TRICUBE DIGITAL SOLUTIONS', description: 'Built full-stack apps with MongoDB, Express.js, React.js, Node.js; implemented secure REST APIs and CRUD operations; improved responsiveness through debugging and state management.' },
  { id: '04', year: 'APR 2026 — PRESENT', title: 'SOFTWARE DEVELOPER INTERN', organization: 'INTERNATIONAL JOURNAL OF RESEARCH NEXUS (IJRN)', description: 'Developed and maintained a SaaS-based research/academic publishing platform, implementing full-stack features and improving performance, usability, scalability.' },
  { id: '05', year: 'MAY 2026 — PRESENT', title: 'WEB DEVELOPER INTERN', organization: 'SONA INCUBATION FOUNDATION', description: 'Engineered and optimized a live web app (Edgyy), integrating AI-powered features. Built modular frontend/backend components for Segment 2, speeding up feature deployment through clean, maintainable code.' },
];

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 70%', 'end 90%'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="experience" ref={containerRef} className="relative w-full font-heading pt-4 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full blur-[150px] pointer-events-none ${isLight ? 'orb-green' : ''}`} style={{ backgroundColor: isLight ? 'transparent' : 'var(--accent-green)', opacity: isLight ? 1 : 0.02 }} />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center space-x-4 mb-7">
          <span className="text-[11px] font-mono font-medium tracking-[0.35em] uppercase" style={{ color: 'var(--accent-green)' }}>02 / EXPERIENCE</span>
          <div className="w-20 h-[1px]" style={{ backgroundImage: `linear-gradient(to right, var(--accent-green), var(--accent-cyan), transparent)`, opacity: 0.8 }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mb-16">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none font-bold">
            <span className="block" style={{ color: 'var(--accent-green)' }}>EXPERIENCE &amp;</span>
            <span className="block" style={{ color: 'var(--accent-cyan)' }}>MILESTONES.</span>
          </h2>
        </motion.div>

        <div className="relative w-full">
          <div className="absolute left-[19px] md:left-[140px] top-4 bottom-8 w-[1px]" style={{ backgroundColor: isLight ? 'rgba(45, 58, 140, 0.12)' : 'color-mix(in srgb, var(--accent-green) 15%, transparent)' }} />
          <motion.div className="absolute left-[19px] md:left-[140px] top-4 w-[2px] origin-top"
            style={{ height: lineHeight, background: isLight ? `linear-gradient(to bottom, var(--accent-green), var(--accent-cyan), color-mix(in srgb, var(--accent-purple) 20%, transparent))` : `linear-gradient(to bottom, var(--accent-green), var(--accent-cyan), color-mix(in srgb, var(--accent-purple) 20%, transparent))`, boxShadow: `0 0 10px var(--accent-green)` }} />

          <div className="space-y-12">
            {journey.map((stop, idx) => (
              <motion.div key={stop.id} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7, delay: idx * 0.08 }} className="relative flex flex-col md:flex-row items-start group">
                <div className="hidden md:block w-[140px] shrink-0 pr-8 pt-0.5 text-right">
                  <span className="text-[10px] font-mono tracking-[0.2em] transition-colors" style={{ color: 'var(--text-secondary)' }}>{stop.year}</span>
                </div>
                <div className="absolute left-[19px] md:left-[140px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full transition-all duration-700 group-hover:scale-150" style={{ border: `1px solid ${isLight ? 'rgba(45, 58, 140, 0.0)' : 'transparent'}` }} />
                  <div className="w-2.5 h-2.5 rounded-full transition-all duration-300" style={{ backgroundColor: 'var(--bg-primary)', border: `1px solid ${isLight ? 'rgba(45, 58, 140, 0.3)' : 'color-mix(in srgb, var(--accent-green) 50%, transparent)'}` }} />
                </div>
                <div className="ml-14 md:ml-12 pl-2">
                  <div className="md:hidden mb-1.5"><span className="text-[10px] font-mono tracking-[0.2em]" style={{ color: 'var(--accent-green)' }}>{stop.year}</span></div>
                  <h3 className="text-3xl sm:text-4xl tracking-wide mb-1 leading-none font-bold" style={{ color: 'var(--text-primary)' }}>{stop.title}</h3>
                  <span className="block text-[10px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--accent-cyan)' }}>{stop.organization}</span>
                  <p className="text-xs sm:text-[13px] font-light leading-[1.7] max-w-lg" style={{ color: 'var(--text-secondary)' }}>{stop.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

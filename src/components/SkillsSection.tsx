import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

const bentoCategories = [
  { title: 'FRONTEND ARCHITECTURE', badge: 'CORE PILLAR', items: ['Next.js', 'React.js', 'React Native', 'Tailwind CSS', 'HTML5', 'CSS3', 'Bootstrap'], description: 'Building high-performance client applications, responsive UIs, and interactive component systems with modern React ecosystem.', stat: '100% RESPONSIVE', colSpan: 'lg:col-span-7' },
  { title: 'BACKEND & APIs', badge: 'HIGH CONCURRENCY', items: ['Node.js', 'Express.js', 'FastAPI', 'RESTful APIs', 'Python', 'Java'], description: 'Engineered scalable REST APIs, authentication systems, and backend services with clean architecture patterns.', stat: 'PRODUCTION READY', colSpan: 'lg:col-span-5' },
  { title: 'AI & MACHINE LEARNING', badge: 'INTELLIGENCE', items: ['RAG', 'LangChain', 'ChromaDB', 'NLP', 'Computer Vision', 'OpenAI', 'Llama 3.1'], description: 'Building intelligent systems — from RAG document engines to AI memory assistants with multimodal processing capabilities.', stat: 'AI-POWERED', colSpan: 'lg:col-span-5' },
  { title: 'DATABASES & TOOLS', badge: 'INFRASTRUCTURE', items: ['MongoDB', 'MySQL', 'SQL', 'Git', 'GitHub', 'VS Code', 'Selenium', 'Test Automation'], description: 'Proficient in relational and NoSQL databases, version control, and automated testing frameworks.', stat: 'FULL STACK', colSpan: 'lg:col-span-7' },
];

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.1 } } };

export const SkillsSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Animated blur filters are expensive on phone GPUs — fade/slide only there.
  const cardVariants: Variants = isMobile
    ? { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }
    : { hidden: { opacity: 0, y: 30, filter: 'blur(6px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <section id="skills" className="relative w-full font-heading pt-8 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className={`absolute top-1/3 left-1/4 w-[34rem] h-[34rem] rounded-full blur-[180px] pointer-events-none ${isLight ? 'orb-green' : ''}`} style={{ backgroundColor: isLight ? 'transparent' : 'var(--accent-green)', opacity: isLight ? 1 : 0.04 }} />
      <div className={`absolute bottom-10 right-1/4 w-[28rem] h-[28rem] rounded-full blur-[180px] pointer-events-none ${isLight ? 'orb-cyan' : ''}`} style={{ backgroundColor: isLight ? 'transparent' : 'var(--accent-cyan)', opacity: isLight ? 1 : 0.04 }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center space-x-4 mb-7">
          <span className="text-[11px] font-mono font-medium tracking-[0.35em] uppercase" style={{ color: 'var(--accent-green)' }}>03 / TECH MATRIX</span>
          <div className="w-20 h-[1px]" style={{ backgroundImage: `linear-gradient(to right, var(--accent-green), var(--accent-cyan), transparent)`, opacity: 0.8 }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mb-10">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none font-bold">
            <span className="block" style={{ color: 'var(--accent-green)' }}>TECHNICAL</span>
            <span className="block" style={{ color: 'var(--accent-cyan)' }}>ARSENAL.</span>
          </h2>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {bentoCategories.map((block, idx) => (
            <motion.div key={block.title} variants={cardVariants} onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)} whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className={`${block.colSpan} relative p-8 sm:p-9 backdrop-blur-xl overflow-hidden transition-all duration-500 cursor-pointer group ${isLight ? 'glass-card' : ''}`}
              style={!isLight ? { backgroundColor: 'color-mix(in srgb, var(--bg-secondary) 85%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)' } : {}}>

              {!isLight && <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, transparent, var(--accent-green), transparent)` }} />}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors duration-300" style={{ borderColor: isLight ? 'rgba(45, 58, 140, 0.2)' : 'color-mix(in srgb, var(--accent-green) 30%, transparent)' }} />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors duration-300" style={{ borderColor: isLight ? 'rgba(45, 58, 140, 0.2)' : 'color-mix(in srgb, var(--accent-green) 30%, transparent)' }} />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase transition-colors" style={{ color: 'var(--accent-green)' }}>{block.badge}</span>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 transition-all ${isLight ? 'glass-tag' : ''}`} style={!isLight ? { border: '1px solid color-mix(in srgb, var(--accent-green) 30%, transparent)', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-primary)' } : { color: 'var(--text-secondary)' }}>{block.stat}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold tracking-wide mb-3 transition-colors" style={{ color: hoveredIdx === idx ? 'var(--accent-green)' : 'var(--text-primary)' }}>{block.title}</h3>
              <p className="text-xs sm:text-sm font-light leading-relaxed mb-7 max-w-xl transition-colors" style={{ color: 'var(--text-secondary)' }}>{block.description}</p>

              <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: `1px solid ${isLight ? 'rgba(45, 58, 140, 0.1)' : 'color-mix(in srgb, var(--accent-green) 15%, transparent)'}` }}>
                {block.items.map((tech) => (
                  <span key={tech} className={`px-3.5 py-1.5 text-[10.5px] font-mono font-medium tracking-[0.1em] uppercase transition-all duration-300 ${isLight ? 'glass-tag' : ''}`}
                    style={!isLight ? { border: '1px solid color-mix(in srgb, var(--accent-green) 25%, transparent)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' } : { color: 'var(--text-secondary)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

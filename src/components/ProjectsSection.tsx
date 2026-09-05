import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface Project { number: string; title: string; category: string; description: string; githubUrl: string; tech: string[]; metrics: { label: string; value: string }[]; }

const projects: Project[] = [
  { number: '01', title: 'AI Memory Assistant', category: 'AI / PERSONALIZATION PLATFORM', description: 'Captures, organizes, and manages user memories and academic/professional workflows. Automates summaries, reminders, study plans, meeting minutes, flashcards, quizzes, and daily briefings via multimodal RAG, OCR, and NLP processing.', githubUrl: 'https://github.com/rakshana-123', tech: ['Next.js', 'FastAPI', 'MongoDB Atlas', 'RAG', 'NLP', 'OCR', 'AI/ML'], metrics: [{ label: 'MODE', value: 'Multimodal Processing' }, { label: 'ENGINE', value: 'RAG + NLP + OCR' }, { label: 'OUTPUT', value: 'Automated Workflows' }] },
  { number: '02', title: 'RAG Document Intelligence', category: 'AI / DOCUMENT PROCESSING', description: 'Document processing and information retrieval system with context-aware LLM responses. Implements text extraction, recursive chunking, embedding generation, vector storage, and semantic retrieval for relevant context chunks.', githubUrl: 'https://github.com/rakshana-123', tech: ['Python', 'Streamlit', 'LangChain', 'ChromaDB', 'Groq', 'Llama 3.1'], metrics: [{ label: 'FRAMEWORK', value: 'LangChain + Groq' }, { label: 'VECTOR DB', value: 'ChromaDB' }, { label: 'MODEL', value: 'Llama 3.1' }] },
  { number: '03', title: 'Edgyy Web Platform', category: 'WEB DEV / SAAS', description: 'Live web application with AI-powered features, built during internship at Sona Incubation Foundation. Engineered modular frontend/backend components, speeding up feature deployment through clean, maintainable code.', githubUrl: 'https://github.com/rakshana-123', tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'], metrics: [{ label: 'STATUS', value: 'Live in Production' }, { label: 'FEATURES', value: 'AI-Powered' }, { label: 'STACK', value: 'MERN Full Stack' }] },
  { number: '04', title: 'IJRN Research Platform', category: 'EDTECH / PUBLISHING SYSTEM', description: 'SaaS-based research and academic publishing platform. Developed as Intern, implementing full-stack features and improving performance, usability, and scalability for the International Journal of Research Nexus.', githubUrl: 'https://github.com/rakshana-123', tech: ['Next.js', 'Node.js', 'PostgreSQL', 'REST APIs', 'SaaS'], metrics: [{ label: 'TYPE', value: 'SaaS Platform' }, { label: 'DOMAIN', value: 'Academic Publishing' }, { label: 'ROLE', value: 'Intern' }] },
];

export const ProjectsSection = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const neo = {
    bg: '#E8ECF4',
    light: '#FFFFFF',
    dark: '#C5CAD6',
    raised: `8px 8px 16px #C5CAD6, -8px -8px 16px #FFFFFF`,
    raisedHover: `10px 10px 20px #BFC4D0, -10px -10px 20px #FFFFFF`,
    inset: `inset 4px 4px 8px #C5CAD6, inset -4px -4px 8px #FFFFFF`,
    flat: `6px 6px 12px #C5CAD6, -6px -6px 12px #FFFFFF`,
  };

  return (
    <section id="projects" className="relative w-full font-heading pt-20 pb-32 px-6 sm:px-12 lg:px-20" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className={`absolute top-1/4 left-1/3 w-[36rem] h-[36rem] rounded-full blur-[180px] pointer-events-none ${isLight ? 'orb-green' : ''}`} style={{ backgroundColor: isLight ? 'transparent' : 'var(--accent-green)', opacity: isLight ? 1 : 0.04 }} />
      <div className={`absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full blur-[180px] pointer-events-none ${isLight ? 'orb-cyan' : ''}`} style={{ backgroundColor: isLight ? 'transparent' : 'var(--accent-cyan)', opacity: isLight ? 1 : 0.04 }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center space-x-4 mb-5">
          <span className="text-[11px] font-mono font-medium tracking-[0.35em] uppercase" style={{ color: 'var(--accent-green)' }}>04 / FEATURED WORK</span>
          <div className="w-20 h-[1px]" style={{ backgroundImage: `linear-gradient(to right, var(--accent-green), var(--accent-cyan), transparent)`, opacity: 0.8 }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none font-bold">
            <span className="block" style={{ color: 'var(--accent-green)' }}>SELECTED WORKS.</span>
            <span className="block" style={{ color: 'var(--accent-cyan)' }}>ENGINEERED IMPACT.</span>
          </h2>
          <p className="text-xs sm:text-sm font-light max-w-sm mt-4 md:mt-0 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Scroll to explore each project. Every system was built to solve complex problems with intelligent engineering.</p>
        </motion.div>

        <ScrollStack itemDistance={20} itemScale={0.035} itemStackDistance={28} stackPosition="15%" scaleEndPosition="6%" baseScale={0.88} useWindowScroll={true}>
          {projects.map((project) => (
            <ScrollStackItem key={project.title}>
              <div className={`relative w-full p-8 sm:p-12 group overflow-hidden transition-colors duration-500 rounded-2xl`}
                style={isLight
                  ? { background: neo.bg, boxShadow: neo.raised }
                  : { backgroundColor: 'var(--bg-secondary)', border: '1px solid color-mix(in srgb, var(--accent-green) 30%, transparent)' }
                }>
                {!isLight && <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundImage: `linear-gradient(to right, transparent, color-mix(in srgb, var(--accent-green) 60%, transparent), transparent)` }} />}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors rounded-tl-lg" style={{ borderColor: isLight ? neo.dark : 'color-mix(in srgb, var(--accent-green) 40%, transparent)' }} />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors rounded-tr-lg" style={{ borderColor: isLight ? neo.dark : 'color-mix(in srgb, var(--accent-green) 40%, transparent)' }} />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors rounded-bl-lg" style={{ borderColor: isLight ? neo.dark : 'color-mix(in srgb, var(--accent-green) 40%, transparent)' }} />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors rounded-br-lg" style={{ borderColor: isLight ? neo.dark : 'color-mix(in srgb, var(--accent-green) 40%, transparent)' }} />
                <span className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold select-none pointer-events-none leading-none" style={{ fontFamily: "'Orbitron', sans-serif", color: isLight ? 'rgba(45, 58, 140, 0.06)' : 'color-mix(in srgb, var(--accent-green) 5%, transparent)' }}>{project.number}</span>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent-green)' }}>{project.number} //</span>
                        <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--text-secondary)' }}>{project.category}</span>
                      </div>
                      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 uppercase leading-[0.9] transition-colors" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
                      <p className="text-xs sm:text-sm md:text-[14px] font-light leading-[1.85] tracking-wide mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-6" style={{ borderTop: `1px solid ${isLight ? neo.dark : 'color-mix(in srgb, var(--accent-green) 15%, transparent)'}` }}>
                      {project.tech.map((t) => (
                        <span key={t} className={`px-3 py-1 text-[10px] font-mono font-medium tracking-[0.16em] uppercase transition-all duration-300 rounded-lg`}
                          style={isLight
                            ? { background: neo.bg, boxShadow: neo.inset, color: 'var(--text-secondary)' }
                            : { border: '1px solid color-mix(in srgb, var(--accent-green) 30%, transparent)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }
                          }>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6" style={{ borderLeft: `1px solid ${isLight ? neo.dark : 'color-mix(in srgb, var(--accent-green) 15%, transparent)'}` }}>
                    <div className="space-y-3">
                      <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase block mb-2" style={{ color: 'var(--accent-cyan)' }}>// SYSTEM METRICS</span>
                      {project.metrics.map((m) => (
                        <div key={m.label} className={`p-3.5 flex items-center justify-between rounded-xl`}
                          style={isLight
                            ? { background: neo.bg, boxShadow: neo.inset }
                            : { border: '1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)', backgroundColor: 'var(--bg-primary)' }
                          }>
                          <span className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>{m.label}</span>
                          <span className="text-[11px] font-mono font-medium" style={{ color: 'var(--accent-green)' }}>{m.value}</span>
                        </div>
                      ))}
                    </div>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center space-x-3 px-6 py-3.5 text-[11px] font-mono font-medium tracking-[0.24em] uppercase transition-all duration-300 rounded-xl`}
                      style={isLight
                        ? { background: neo.bg, boxShadow: neo.raised, color: 'var(--accent-green)' }
                        : { border: '1px solid color-mix(in srgb, var(--accent-green) 50%, transparent)', backgroundColor: 'var(--bg-primary)', color: 'var(--accent-green)' }
                      }>
                      <span>VIEW ON GITHUB</span><span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

export const AboutSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(200);
  const spotlightY = useMotionValue(200);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), { damping: 18, stiffness: 220 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), { damping: 18, stiffness: 220 });
  const spotlightBg = useTransform([spotlightX, spotlightY], ([x, y]) =>
    isLight
      ? `radial-gradient(circle 240px at ${x}px ${y}px, rgba(45,58,140,0.06), rgba(13,148,136,0.04), transparent 80%)`
      : `radial-gradient(circle 240px at ${x}px ${y}px, rgba(57,255,20,0.15), rgba(0,240,255,0.1), transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };
  const handleMouseEnter = () => setIsCardHovered(true);
  const handleMouseLeave = () => { setIsCardHovered(false); mouseX.set(0); mouseY.set(0); };

  // Neumorphism tokens for light mode
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
    <section id="about" className="relative w-screen min-h-screen font-heading py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex items-center" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Ambient Orbs */}
      <div className={`absolute top-1/4 left-1/6 w-[32rem] h-[32rem] rounded-full blur-[180px] pointer-events-none ${isLight ? 'orb-green' : ''}`} style={{ backgroundColor: isLight ? 'transparent' : 'var(--accent-green)', opacity: isLight ? 1 : 0.05 }} />
      <div className={`absolute bottom-1/6 right-1/4 w-[28rem] h-[28rem] rounded-full blur-[180px] pointer-events-none ${isLight ? 'orb-cyan' : ''}`} style={{ backgroundColor: isLight ? 'transparent' : 'var(--accent-cyan)', opacity: isLight ? 1 : 0.03 }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="flex items-center space-x-4 mb-10">
          <span className="text-[11px] font-mono font-medium tracking-[0.35em] uppercase" style={{ color: 'var(--accent-green)' }}>01 / ABOUT ME</span>
          <div className="w-20 h-[1px]" style={{ backgroundImage: `linear-gradient(to right, var(--accent-green), var(--accent-cyan), transparent)`, opacity: 0.8 }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="lg:col-span-7 flex flex-col justify-center">
            <motion.div variants={fadeUpVariants} className="relative mb-6 select-none">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tight uppercase leading-[0.88] font-bold">
                <span className="block" style={{ color: 'var(--accent-green)' }}>I DON'T JUST WRITE CODE.</span>
                <span className="block" style={{ color: 'var(--accent-cyan)' }}>I BUILD INTELLIGENT SYSTEMS.</span>
              </h2>
            </motion.div>

            <motion.p variants={fadeUpVariants} className="text-xs sm:text-sm md:text-[14.5px] font-light leading-[1.85] tracking-wide mb-10 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              I'm <span className="font-medium" style={{ color: 'var(--accent-green)' }}>Rakshana Jayagopal</span>, a Full Stack Developer and AI Engineer specializing in building scalable web architectures, intelligent workflows, and AI-driven solutions. With hands-on experience in RAG systems, MERN stack, and cloud deployment, I turn complex requirements into impactful products.
            </motion.p>

            {/* Stats — Neumorphic in light */}
            <motion.div variants={fadeUpVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-6 pb-2"
              style={isLight ? { borderTop: 'none' } : { borderTop: `1px solid color-mix(in srgb, var(--accent-green) 15%, transparent)` }}>
              {[
                { val: '8.7', label: 'B.Sc CGPA', color: 'var(--accent-green)' },
                { val: '6+', label: 'Projects Built', color: 'var(--accent-cyan)' },
                { val: '3', label: 'Internships', color: 'var(--accent-purple)' },
                { val: '4', label: 'Certifications', color: 'var(--accent-green)' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center text-center p-4 rounded-2xl"
                  style={isLight ? { background: neo.bg, boxShadow: neo.raised, transition: 'box-shadow 0.3s ease' } : {}}>
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif", color: s.color }}>{s.val}</span>
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase mt-1.5" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D ID Card */}
          <div className="lg:col-span-5 flex items-center justify-center relative" style={{ perspective: '1400px' }}>
            {/* Glow ring behind card */}
            {!isLight && (
              <motion.div animate={{ scale: isCardHovered ? 1.15 : 1, opacity: isCardHovered ? 0.4 : 0.15, rotate: isCardHovered ? 180 : 0 }} transition={{ duration: 3, ease: "easeOut" }}
                className="absolute -inset-6 blur-2xl rounded-3xl pointer-events-none"
                style={{ background: `conic-gradient(from 0deg, var(--accent-green) 0%, var(--accent-cyan) 30%, transparent 60%, var(--accent-green) 100%)` }} />
            )}

            {/* Neumorphic outer ring — light only */}
            {isLight && (
              <div className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ background: neo.bg, boxShadow: neo.raised }} />
            )}

            {isCardHovered && !isLight && (
              <>
                <motion.div initial={{ opacity: 0, y: 10, x: -20 }} animate={{ opacity: [0, 1, 0], y: -50, x: -30 }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-1/4 -left-6 w-1.5 h-1.5 rounded-full blur-[1px] pointer-events-none z-30" style={{ backgroundColor: 'var(--accent-green)', boxShadow: `0 0 8px var(--accent-green)` }} />
                <motion.div initial={{ opacity: 0, y: 20, x: 20 }} animate={{ opacity: [0, 1, 0], y: -60, x: 40 }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.3 }} className="absolute bottom-1/3 -right-6 w-2 h-2 rounded-full blur-[1px] pointer-events-none z-30" style={{ backgroundColor: 'var(--accent-cyan)', boxShadow: `0 0 10px var(--accent-cyan)` }} />
              </>
            )}

            <motion.div ref={cardRef}
              style={isLight
                ? { rotateX, rotateY, transformStyle: 'preserve-3d' as const, background: neo.bg, boxShadow: isCardHovered ? neo.raisedHover : neo.raised, borderRadius: '24px' }
                : { rotateX, rotateY, transformStyle: 'preserve-3d' as const, border: `1px solid color-mix(in srgb, var(--accent-green) 30%, transparent)`, backgroundColor: 'var(--bg-secondary)' }
              }
              onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.9, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
              className="relative p-3.5 backdrop-blur-xl cursor-pointer group transition-all duration-500"
            >
              {/* Laser sweep — dark only */}
              {!isLight && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: 'inherit' }}>
                  <motion.div animate={{ x: isCardHovered ? ['-100%', '200%'] : '-100%' }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    className="w-1/2 h-full skew-x-12"
                    style={{ background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--accent-green) 20%, transparent), transparent)` }} />
                </div>
              )}

              {/* Corner Brackets — dark only */}
              {!isLight && (
                <div className="pointer-events-none">
                  {['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((pos, i) => (
                    <div key={i} className={`absolute w-6 h-6 ${pos}`} style={{ borderColor: 'var(--accent-green)', boxShadow: `0 0 10px color-mix(in srgb, var(--accent-green) 40%, transparent)` }} />
                  ))}
                </div>
              )}

              {/* Card Content */}
              <div className="relative overflow-hidden w-full max-w-[360px] p-6 flex flex-col justify-between rounded-2xl"
                style={isLight ? { background: 'transparent' } : { backgroundColor: 'var(--bg-primary)' }}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--accent-green)' }}>IDENTITY CARD</span>
                    <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: 'var(--accent-green)' }} />
                  </div>

                  {/* Divider — neumorphic groove in light */}
                  {isLight ? (
                    <div className="w-full h-[3px] mb-4 rounded-full" style={{ background: neo.bg, boxShadow: neo.inset }} />
                  ) : (
                    <div className="w-full h-[1px] mb-4" style={{ backgroundImage: `linear-gradient(to right, var(--accent-green), var(--accent-cyan), transparent)`, opacity: 0.5 }} />
                  )}

                  {/* Avatar — neumorphic inset in light */}
                  <div className="w-full aspect-square mb-4 flex items-center justify-center overflow-hidden relative rounded-2xl"
                    style={isLight
                      ? { background: neo.bg, boxShadow: neo.inset }
                      : { backgroundColor: 'var(--bg-tertiary)', border: `1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)` }
                    }>
                    <img
                      src="/profile.jpeg"
                      alt="Rakshana Jayagopal"
                      className="w-full h-full object-cover object-top rounded-2xl"
                      style={{ filter: isLight ? 'brightness(1.02) contrast(1.02)' : 'brightness(0.95) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0 rounded-2xl" style={{ background: isLight ? 'linear-gradient(to top, rgba(232,236,244,0.6) 0%, transparent 30%)' : `linear-gradient(to top, rgba(10,10,15,0.85) 0%, transparent 40%)` }} />
                  </div>

                  {/* Name below image */}
                  <div className="text-center mt-3 mb-4">
                    <span className="text-2xl tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: 'var(--accent-green)', textShadow: isLight ? 'none' : `0 0 12px var(--glow-green)` }}>
                      Rakshana J
                    </span>
                  </div>

                  {/* Info rows */}
                  <div className="space-y-2 text-[10px] font-mono">
                    {[
                      { label: 'NAME:', value: 'RAKSHANA JAYAGOPAL', color: 'var(--text-primary)' },
                      { label: 'ROLE:', value: 'FULL STACK + AI', color: 'var(--accent-green)' },
                      { label: 'LOCATION:', value: 'SALEM, IN', color: 'var(--accent-cyan)' },
                      { label: 'CGPA:', value: '8.7 / 10', color: 'var(--accent-purple)' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-3 py-2 rounded-xl"
                        style={isLight ? { background: neo.bg, boxShadow: `3px 3px 6px ${neo.dark}, -3px -3px 6px ${neo.light}` } : {}}>
                        <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                        <span style={{ color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 rounded-2xl" style={{ background: spotlightBg, opacity: isCardHovered ? 1 : 0 }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

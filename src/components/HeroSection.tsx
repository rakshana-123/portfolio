import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { useMediaQuery } from '../hooks/useMediaQuery';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

const typingTexts = [
  { text: "Welcome to my portfolio", style: "primary" },
  { text: "Aspiring Full Stack Developer", style: "secondary" },
  { text: "Fresh Graduate in Computer Science", style: "tertiary" },
  { text: "AI & Machine Learning Enthusiast", style: "primary" },
  { text: "Ready to build impactful solutions", style: "secondary" },
];

const navItems = [
  { name: 'ABOUT', href: '#about' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },
];

const TypingAnimation = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typingTexts[textIndex].text;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 80);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % typingTexts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  const currentStyle = typingTexts[textIndex].style;

  const getStyleClass = () => {
    switch (currentStyle) {
      case 'primary':
        return 'animate-glitch';
      case 'secondary':
        return 'animate-neon-pulse';
      case 'tertiary':
        return 'animate-cyber-flicker';
      default:
        return '';
    }
  };

  const getGlowColor = () => {
    switch (currentStyle) {
      case 'primary': return 'var(--accent-green)';
      case 'secondary': return 'var(--accent-cyan)';
      case 'tertiary': return 'var(--accent-purple)';
      default: return 'var(--accent-green)';
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="relative whitespace-nowrap">
        <span className={`text-xl sm:text-2xl md:text-3xl font-mono tracking-wide ${getStyleClass()}`}
          style={{
            color: getGlowColor(),
            textShadow: `0 0 10px ${getGlowColor()}, 0 0 20px ${getGlowColor()}`,
          }}>
          {typingTexts[textIndex].text.slice(0, charIndex)}
        </span>
        <span className="inline-block w-[3px] h-7 ml-1 animate-blink" style={{ backgroundColor: getGlowColor(), boxShadow: `0 0 8px ${getGlowColor()}` }} />
      </div>
      <div className="flex space-x-1">
        {typingTexts.map((_, i) => (
          <div key={i} className="h-[2px] flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === textIndex ? getGlowColor() : 'var(--text-secondary)',
              opacity: i === textIndex ? 1 : 0.3,
              boxShadow: i === textIndex ? `0 0 6px ${getGlowColor()}` : 'none',
            }} />
        ))}
      </div>
    </div>
  );
};

export const HeroSection = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  // Touch screens fire synthetic mousemove on tap — only render the custom
  // cursor for real mouse devices.
  const isFinePointer = useMediaQuery('(pointer: fine)');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden font-heading cursor-none" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Custom Cursor */}
      {isFinePointer && cursorPos.x >= 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center"
          animate={{
            x: cursorPos.x - (isHovered ? 24 : 5),
            y: cursorPos.y - (isHovered ? 24 : 5),
            width: isHovered ? 48 : 10,
            height: isHovered ? 48 : 10,
            backgroundColor: 'var(--accent-green)',
            opacity: isHovered ? 0.15 : 0.8,
            boxShadow: isHovered ? `0 0 30px var(--glow-green), 0 0 60px var(--glow-green)` : `0 0 10px var(--glow-green)`,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.5 }}
        />
      )}

      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full blur-[150px] ${theme === 'light' ? 'orb-green' : ''}`} style={{ backgroundColor: theme === 'dark' ? 'var(--accent-green)' : 'transparent', opacity: theme === 'dark' ? 0.05 : 1 }} />
        <div className={`absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] rounded-full blur-[150px] ${theme === 'light' ? 'orb-cyan' : ''}`} style={{ backgroundColor: theme === 'dark' ? 'var(--accent-cyan)' : 'transparent', opacity: theme === 'dark' ? 0.05 : 1 }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full blur-[150px] ${theme === 'light' ? 'orb-purple' : ''}`} style={{ backgroundColor: theme === 'dark' ? 'var(--accent-purple)' : 'transparent', opacity: theme === 'dark' ? 0.03 : 1 }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full px-6 sm:px-12 lg:px-16 pt-6 pb-8 pointer-events-none">
        {/* Navigation */}
        <header className="relative flex items-center justify-between w-full pointer-events-auto">
          <a href="#" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            className="text-sm font-bold tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ fontFamily: "'Orbitron', sans-serif", color: 'var(--accent-green)' }}>
            PORTFOLIO<span style={{ color: 'var(--accent-cyan)' }}>.</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-[11px] tracking-[0.25em] font-mono uppercase absolute left-1/2 -translate-x-1/2" style={{ color: 'var(--text-secondary)' }}>
            {navItems.map((item) => (
              <a key={item.name} href={item.href} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                className="relative group py-1 transition-colors duration-300 hover:text-[var(--text-primary)]">
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full" style={{ backgroundColor: 'var(--text-primary)', boxShadow: `0 0 8px var(--text-primary)` }} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-auto md:ml-0">
            <ThemeToggle />
            <a href="#contact" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
              className="group hidden sm:flex items-center space-x-2 text-[11px] tracking-[0.2em] font-mono uppercase py-2 px-4 border transition-all duration-300 hover:bg-[var(--glow-green)]"
              style={{ borderColor: `color-mix(in srgb, var(--text-primary) 40%, transparent)`, color: 'var(--text-primary)' }}>
              <span>LET'S CONNECT</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">↗</span>
            </a>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full pt-4 pb-2 my-auto">
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[42rem] pointer-events-auto z-20">

            <motion.div variants={fadeUpVariants} className="relative mb-4 select-none">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight uppercase leading-[0.85] font-bold">
                <span className="block" style={{ color: 'var(--text-primary)', textShadow: `0 0 20px var(--glow-green)` }}>RAKSHANA</span>
                <span className="block" style={{ color: 'var(--accent-green)', textShadow: `0 0 20px var(--glow-green)` }}>JAYAGOPAL</span>
              </h1>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mb-5">
              <p className="text-[11px] sm:text-xs font-mono font-normal tracking-[0.25em] uppercase" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--text-primary)' }}>FULL STACK DEVELOPER</span>
                <span className="mx-2" style={{ color: 'var(--accent-green)' }}>◆</span>
                <span style={{ color: 'var(--accent-cyan)' }}>AI ENGINEER</span>
                <span className="mx-2" style={{ color: 'var(--accent-green)' }}>◆</span>
                <span style={{ color: 'var(--text-muted)' }}>SALEM, INDIA</span>
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="text-xs sm:text-sm md:text-[14px] font-light leading-[1.85] tracking-wide max-w-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
              <p>Building scalable applications, intelligent workflows, and practical AI-driven solutions.<br />Where full-stack engineering meets AI innovation.</p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="flex flex-row items-center gap-4 sm:gap-6">
              <motion.a href="#projects" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} whileHover={{ scale: 1.02 }}
                className={theme === 'light' ? 'glass-btn relative inline-flex items-center space-x-3 px-6 sm:px-7 py-3.5 text-[11px] font-mono font-medium tracking-[0.2em] uppercase' : 'relative inline-flex items-center space-x-3 px-6 sm:px-7 py-3.5 border text-[11px] font-mono font-medium tracking-[0.2em] uppercase transition-all duration-300'}
                style={theme === 'dark' ? { borderColor: 'var(--text-primary)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-secondary)' } : {}}>
                {theme === 'dark' && <div className="absolute top-0 left-0 w-full h-[1px] pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, transparent, var(--text-primary), transparent)`, opacity: 0.3 }} />}
                <span>VIEW PROJECTS</span><span className="text-xs">↗</span>
              </motion.a>

              <motion.a href="#contact" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} whileHover={{ scale: 1.02 }}
                className="inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 border text-[11px] font-mono font-medium tracking-[0.2em] uppercase transition-all duration-300"
                style={{ borderColor: `color-mix(in srgb, var(--text-secondary) 40%, transparent)`, color: 'var(--text-secondary)' }}>
                <span>CONTACT</span><span className="text-xs">↓</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Typing Animation */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-start pointer-events-auto pr-16 xl:pr-28 ml-8 z-20 select-none">
            <div className={theme === 'light' ? 'glass p-6 space-y-4' : 'p-6 space-y-4'} style={theme === 'dark' ? { border: `1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)`, backgroundColor: 'var(--bg-secondary)' } : {}}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: 'var(--accent-green)' }} />
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--accent-green)' }}>PORTFOLIO v2.0</span>
              </div>
              <div className="w-full h-[1px]" style={{ backgroundImage: `linear-gradient(to right, var(--accent-green), var(--accent-cyan), transparent)`, opacity: 0.5 }} />
              <TypingAnimation />
            </div>
          </motion.div>
        </div>
        <div className="h-2" />
      </div>
      <div className="absolute inset-0 pointer-events-none scan-line" />
    </section>
  );
};

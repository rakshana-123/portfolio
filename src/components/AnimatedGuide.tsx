import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sectionText: Record<string, string> = {
  hero: "Hi! I'm Rakshana Jayagopal, a Full Stack Developer and AI Engineer from Salem, India. I build scalable applications, intelligent workflows, and AI-driven solutions.",
  about: "I'm a B.Sc. Computer Science student specializing in AI and Data Science with a CGPA of 8.7. I've built 6+ projects and completed 3 internships so far.",
  experience: "I've worked as a Web Developer Intern at Sona Incubation Foundation, Software Developer Intern at IJRN, and MERN Stack Developer at Tricube Digital Solutions.",
  skills: "My technical arsenal includes React, Next.js, Node.js, Python, FastAPI, RAG, LangChain, ChromaDB, MongoDB, and more across the full AI and web development stack.",
  projects: "My featured projects include an AI Memory Assistant with RAG processing, a Document Intelligence Engine, the Edgyy web platform, and the IJRN research publishing platform.",
  contact: "You can reach me at raks061128@gmail.com, or connect on LinkedIn and GitHub. Let's build something extraordinary together!",
};

export const AnimatedGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [autoMode, setAutoMode] = useState(true);
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const lastSpokenSection = useRef<string | null>(null);
  const voiceLoaded = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      const closeTimer = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      return () => clearTimeout(closeTimer);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      if (voiceLoaded.current) return;
      const voices = window.speechSynthesis?.getVoices() || [];
      
      // Filter only English voices
      const englishVoices = voices.filter(v => v.lang.startsWith('en'));
      
      // Known female voice names (lowercase for comparison)
      const femaleNames = [
        'zira', 'hazel', 'samantha', 'karen', 'moira', 'tessa',
        'female', 'woman', 'girl', 'anna', 'helena', 'linda',
        'susan', 'sheena', 'kate', 'alice', 'Victoria'
      ];
      
      // Known male voice names (lowercase for comparison)
      const maleNames = [
        'david', 'mark', 'james', 'daniel', 'google uk english male',
        'google us male', 'microsoft david', 'microsoft mark',
        'microsoft james', 'microsoftaniel', 'alex', 'fred', 'ralph'
      ];
      
      let selectedVoice: SpeechSynthesisVoice | null = null;
      
      // First: Find voices with female names
      for (const voice of englishVoices) {
        const voiceName = voice.name.toLowerCase();
        if (femaleNames.some(name => voiceName.includes(name))) {
          selectedVoice = voice;
          break;
        }
      }
      
      // Second: Exclude known male voices
      if (!selectedVoice) {
        selectedVoice = englishVoices.find(v => {
          const voiceName = v.name.toLowerCase();
          return !maleNames.some(name => voiceName.includes(name));
        }) || null;
      }
      
      // Last resort: Use first English voice
      if (!selectedVoice && englishVoices.length > 0) {
        selectedVoice = englishVoices[0];
      }

      if (selectedVoice) {
        console.log('Selected voice:', selectedVoice.name, selectedVoice.lang);
        setFemaleVoice(selectedVoice);
        voiceLoaded.current = true;
      }
    };

    // Wait for voices to load
    loadVoices();
    window.speechSynthesis?.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis?.removeEventListener('voiceschanged', loadVoices);
  }, []);

  useEffect(() => {
    if (!autoMode) return;

    const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              if (lastSpokenSection.current !== section && !isSpeaking) {
                lastSpokenSection.current = section;
                speak(sectionText[section], section);
              }
            }
          });
        },
        { threshold: [0.4, 0.6] }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [autoMode, isSpeaking]);

  const speak = useCallback((text: string, section: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (femaleVoice) utterance.voice = femaleVoice;
      utterance.rate = 0.85;
      utterance.pitch = 1.3;
      utterance.volume = 0.9;
      utterance.onstart = () => { setIsSpeaking(true); setActiveSection(section); };
      utterance.onend = () => { setIsSpeaking(false); setActiveSection(null); };
      utterance.onerror = () => { setIsSpeaking(false); setActiveSection(null); };
      window.speechSynthesis.speak(utterance);
    }
  }, [femaleVoice]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveSection(null);
      lastSpokenSection.current = null;
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 w-64 border border-[#39FF14]/30 bg-[#0E0E18]/95 backdrop-blur-xl p-4 mb-2"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-[#39FF14] animate-pulse-glow' : 'bg-[#888]'}`} />
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#39FF14] uppercase">
                  {isSpeaking ? 'NARRATING...' : 'GUIDE READY'}
                </span>
              </div>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="text-[10px] font-mono text-[#FF4444] hover:text-[#FF6666] transition-colors"
                >
                  STOP
                </button>
              )}
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-[#39FF14]/50 via-[#00F0FF]/30 to-transparent mb-3" />

            {/* Auto Mode Toggle */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[9px] font-mono tracking-[0.15em] text-[#888] uppercase">AUTO SCROLL</span>
              <button
                onClick={() => { setAutoMode(!autoMode); if (autoMode) stopSpeaking(); }}
                className={`w-10 h-5 rounded-full transition-all duration-300 ${autoMode ? 'bg-[#39FF14]/30' : 'bg-[#333]'}`}
                style={{ boxShadow: autoMode ? '0 0 10px rgba(57, 255, 20, 0.3)' : 'none' }}
              >
                <div className={`w-4 h-4 rounded-full transition-all duration-300 ${autoMode ? 'translate-x-5 bg-[#39FF14]' : 'translate-x-0.5 bg-[#666]'}`} />
              </button>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-[#39FF14]/50 via-[#00F0FF]/30 to-transparent mb-3" />

            {/* Section Buttons */}
            <div className="space-y-1.5">
              {Object.keys(sectionText).map((key) => (
                <button
                  key={key}
                  onClick={() => { setAutoMode(false); speak(sectionText[key], key); }}
                  className={`w-full text-left px-3 py-2 text-[10px] font-mono tracking-[0.15em] uppercase transition-all duration-200 border ${
                    activeSection === key
                      ? 'border-[#39FF14] bg-[#39FF14]/10 text-[#39FF14]'
                      : 'border-[#39FF14]/15 text-[#888] hover:border-[#39FF14]/40 hover:text-[#39FF14] hover:bg-[#39FF14]/5'
                  }`}
                >
                  {key === 'hero' && '>> INTRO'}
                  {key === 'about' && '>> ABOUT'}
                  {key === 'experience' && '>> EXPERIENCE'}
                  {key === 'skills' && '>> SKILLS'}
                  {key === 'projects' && '>> PROJECTS'}
                  {key === 'contact' && '>> CONTACT'}
                </button>
              ))}
            </div>

            <div className="mt-3 text-[8px] font-mono text-[#888]/50 text-center">
              {autoMode ? 'SCROLL TO HEAR SECTIONS' : 'CLICK A SECTION TO HEAR IT'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => {
          if (isSpeaking) {
            stopSpeaking();
          } else {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setTimeout(() => {
                setIsOpen(false);
              }, 3000);
            }
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 flex items-center justify-center border border-[#39FF14]/40 bg-[#0E0E18]/90 backdrop-blur-xl hover:border-[#39FF14] hover:bg-[#39FF14]/10 transition-all duration-300 group"
        style={{
          boxShadow: isSpeaking
            ? '0 0 30px rgba(57, 255, 20, 0.3), 0 0 60px rgba(57, 255, 20, 0.1)'
            : '0 0 15px rgba(57, 255, 20, 0.1)',
        }}
      >
        {/* Animated character icon */}
        <div className="relative">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className={`transition-colors duration-300 ${isSpeaking ? 'text-[#39FF14]' : 'text-[#888] group-hover:text-[#39FF14]'}`}
          >
            {/* Head */}
            <circle cx="14" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Eyes */}
            <circle cx="11.5" cy="8.5" r="1" fill="currentColor" />
            <circle cx="16.5" cy="8.5" r="1" fill="currentColor" />
            {/* Mouth - changes when speaking */}
            {isSpeaking ? (
              <ellipse cx="14" cy="11.5" rx="2" ry="1.2" fill="currentColor" opacity="0.7" />
            ) : (
              <path d="M12 11 Q14 13 16 11" stroke="currentColor" strokeWidth="1" fill="none" />
            )}
            {/* Body */}
            <path d="M8 18 Q14 15 20 18 L22 26 L6 26 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            {/* Signal waves when speaking */}
            {isSpeaking && (
              <>
                <path d="M22 6 Q26 9 22 12" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M24 4 Q30 9 24 14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
              </>
            )}
          </svg>

          {/* Glow effect */}
          {isSpeaking && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 -m-2 bg-[#39FF14]/20 rounded-full blur-md"
            />
          )}
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#39FF14]/50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#39FF14]/50" />
      </motion.button>
    </div>
  );
};

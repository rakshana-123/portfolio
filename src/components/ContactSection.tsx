import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <footer id="contact" className="relative w-full font-heading pt-16 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex items-center space-x-4 mb-5">
                <span className="text-[11px] font-mono font-medium tracking-[0.35em] uppercase" style={{ color: 'var(--accent-green)' }}>05 / CONTACT</span>
                <div className="w-16 h-[1px]" style={{ backgroundImage: `linear-gradient(to right, var(--accent-green), var(--accent-cyan), transparent)`, opacity: 0.8 }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-8">
                <h2 className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none font-bold">
                  <span className="block" style={{ color: 'var(--accent-green)' }}>INITIALIZE</span>
                  <span className="block" style={{ color: 'var(--accent-cyan)' }}>CONNECTION.</span>
                </h2>
              </motion.div>

              <p className="text-xs sm:text-[13px] font-light leading-relaxed max-w-md mb-8" style={{ color: 'var(--text-secondary)' }}>
                Have a project in mind or want to collaborate? Send a signal and let's build something extraordinary together.
              </p>

              <div className="space-y-3">
                <a href="mailto:raks061128@gmail.com" className="flex items-center space-x-3 text-xs font-mono transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-green)' }} />
                  <span>raks061128@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/rakshana-jayagopal" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-xs font-mono transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-cyan)' }} />
                  <span>linkedin.com/in/rakshana-jayagopal</span>
                </a>
                <a href="https://github.com/rakshana-123" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-xs font-mono transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-purple)' }} />
                  <span>github.com/rakshana-123</span>
                </a>
              </div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className={`lg:col-span-7 relative w-full p-8 sm:p-10 overflow-hidden ${isLight ? 'glass-card' : ''}`}
            style={!isLight ? { border: '1px solid color-mix(in srgb, var(--accent-green) 30%, transparent)', backgroundColor: 'var(--bg-secondary)' } : {}}>
            {!isLight && <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundImage: `linear-gradient(to right, transparent, color-mix(in srgb, var(--accent-green) 60%, transparent), transparent)` }} />}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: isLight ? 'rgba(45, 58, 140, 0.2)' : 'color-mix(in srgb, var(--accent-green) 50%, transparent)' }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: isLight ? 'rgba(45, 58, 140, 0.2)' : 'color-mix(in srgb, var(--accent-green) 50%, transparent)' }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: isLight ? 'rgba(45, 58, 140, 0.2)' : 'color-mix(in srgb, var(--accent-green) 50%, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: isLight ? 'rgba(45, 58, 140, 0.2)' : 'color-mix(in srgb, var(--accent-green) 50%, transparent)' }} />

            {sent ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10" style={{ border: '1px solid var(--accent-green)', color: 'var(--accent-green)' }}>✓</div>
                <h3 className="text-3xl font-bold uppercase">SIGNAL TRANSMITTED</h3>
                <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>Connection established successfully. Awaiting response...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--accent-green)' }}>// SENDER ID</span>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your name"
                      className={`w-full text-xs px-4 py-3 outline-none transition-colors font-mono ${isLight ? 'glass-input' : ''}`}
                      style={!isLight ? { backgroundColor: 'var(--bg-primary)', border: '1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)', color: 'var(--text-primary)' } : { color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--accent-cyan)' }}>// CHANNEL</span>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter your email"
                      className={`w-full text-xs px-4 py-3 outline-none transition-colors font-mono ${isLight ? 'glass-input' : ''}`}
                      style={!isLight ? { backgroundColor: 'var(--bg-primary)', border: '1px solid color-mix(in srgb, var(--accent-cyan) 20%, transparent)', color: 'var(--text-primary)' } : { color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <div>
                  <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--accent-purple)' }}>// PAYLOAD</span>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Enter your message..."
                    className={`w-full text-xs p-4 outline-none transition-colors resize-none font-mono ${isLight ? 'glass-input' : ''}`}
                    style={!isLight ? { backgroundColor: 'var(--bg-primary)', border: '1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)', color: 'var(--text-primary)' } : { color: 'var(--text-primary)' }} />
                </div>
                <button type="submit"
                  className={isLight ? 'glass-btn w-full py-3.5 text-xs font-mono font-medium tracking-[0.25em] uppercase transition-all duration-300' : 'w-full py-3.5 text-xs font-mono font-medium tracking-[0.25em] uppercase transition-all duration-300'}
                  style={!isLight ? { border: '1px solid color-mix(in srgb, var(--accent-green) 50%, transparent)', backgroundColor: 'color-mix(in srgb, var(--accent-green) 5%, transparent)', color: 'var(--accent-green)' } : {}}>
                  TRANSMIT SIGNAL ↗
                </button>
              </form>
            )}
          </motion.div>
        </div>

        <div className="pt-16 mt-16 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4" style={{ borderTop: `1px solid ${isLight ? 'rgba(45, 58, 140, 0.1)' : 'color-mix(in srgb, var(--accent-green) 10%, transparent)'}` }}>
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>PORTFOLIO // EDITION 2026</span>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/rakshana-123" target="_blank" rel="noopener noreferrer" className="transition-colors text-xs hover:opacity-80" style={{ color: 'var(--accent-green)' }}>GH</a>
            <a href="https://linkedin.com/in/rakshana-jayagopal" target="_blank" rel="noopener noreferrer" className="transition-colors text-xs hover:opacity-80" style={{ color: 'var(--accent-cyan)' }}>LI</a>
            <a href="mailto:raks061128@gmail.com" className="transition-colors text-xs hover:opacity-80" style={{ color: 'var(--accent-purple)' }}>MAIL</a>
          </div>
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>© {new Date().getFullYear()} • ENGINEERED WITH PRECISION</span>
        </div>
      </div>
    </footer>
  );
};

import { ThemeProvider } from './context/ThemeContext';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';

function App() {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen grid-bg" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </ThemeProvider>
  );
}

export default App;

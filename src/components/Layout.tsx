import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Moon, Sun, Linkedin, Github, Instagram, Code, Monitor, Smartphone, Layers, Cpu, Gamepad2, Trophy, Dices, Puzzle, Joystick, Briefcase, ExternalLink, Info, Layout as LayoutIcon, Database, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const getFloatingIcons = () => {
    if (location.pathname === '/fun') {
      return (
        <>
          <Gamepad2 className="f-icon" />
          <Trophy className="f-icon" />
          <Dices className="f-icon" />
          <Puzzle className="f-icon" />
          <Joystick className="f-icon" />
        </>
      );
    } else if (location.pathname.startsWith('/projects')) {
      return (
        <>
          <Briefcase className="f-icon" />
          <ExternalLink className="f-icon" />
          <Info className="f-icon" />
          <LayoutIcon className="f-icon" />
          <Database className="f-icon" />
        </>
      );
    }
    return (
      <>
        <Code className="f-icon" />
        <Monitor className="f-icon" />
        <Smartphone className="f-icon" />
        <Layers className="f-icon" />
        <Cpu className="f-icon" />
      </>
    );
  };

  return (
    <div className="app-container">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      
      <div className="bg-animation">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
      </div>
      
      <div className="floating-icons">
        {getFloatingIcons()}
      </div>

      <header>
        <nav className="container">
          <Link to="/" className="logo">Sanoop Das M</Link>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/#hero" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/#about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/#experience" onClick={() => setIsMenuOpen(false)}>Experience</Link></li>
            <li><Link to="/#skills" onClick={() => setIsMenuOpen(false)}>Skills</Link></li>
            <li><Link to="/#projects" onClick={() => setIsMenuOpen(false)}>Projects</Link></li>
            <li><Link to="/fun" onClick={() => setIsMenuOpen(false)}>Fun</Link></li>
            <li><Link to="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {isDark ? <Sun className="sun-icon" /> : <Moon className="moon-icon" />}
            </button>
            <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? 'Close' : 'Menu'}
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <div className="container">
          <div className="social-links">
            <a href="https://www.linkedin.com/in/sanoopdas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/SD2B" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.instagram.com/_sanoop_das" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://medium.com/@sd2b" target="_blank" rel="noopener noreferrer" aria-label="Medium">
              <BookOpen size={20} />
            </a>
            <a href="mailto:msanoopdb1@gmail.com" aria-label="Email"><Mail size={20} /></a>
          </div>
          <p>&copy; {new Date().getFullYear()} Sanoop Das M. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

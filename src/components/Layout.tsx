import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Linkedin, Github, Instagram, Code, Monitor, Smartphone, Layers, Cpu, Briefcase, ExternalLink, Info, Layout as LayoutIcon, Database, BookOpen } from 'lucide-react';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Ensure clean single theme
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
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

  const getFloatingIcons = () => {
    if (location.pathname.startsWith('/projects')) {
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
          <Link to="/" className="logo" onClick={handleLogoClick}>
            SANOOP DAS M<span className="logo-dot">.</span>
          </Link>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/#hero" onClick={() => handleNavClick('hero')}>Home</Link></li>
            <li><Link to="/#about" onClick={() => handleNavClick('about')}>About</Link></li>
            <li><Link to="/#experience" onClick={() => handleNavClick('experience')}>Experience</Link></li>
            <li><Link to="/#skills" onClick={() => handleNavClick('skills')}>Skills</Link></li>
            <li><Link to="/#projects" onClick={() => handleNavClick('projects')}>Projects</Link></li>
            <li><Link to="/#blogs" onClick={() => handleNavClick('blogs')}>Blog</Link></li>
            <li><Link to="/#contact" onClick={() => handleNavClick('contact')}>Contact</Link></li>
          </ul>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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

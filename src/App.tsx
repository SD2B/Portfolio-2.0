import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';

const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();
  const scrollPositions = useRef<Record<string, number>>({});
  const isRestoring = useRef(false);

  // Set manual scroll restoration so the browser doesn't interfere with custom restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Track scroll position per pathname
  useEffect(() => {
    const handleScroll = () => {
      if (!isRestoring.current) {
        scrollPositions.current[pathname] = window.scrollY;
        try {
          sessionStorage.setItem(`scroll_${pathname}`, window.scrollY.toString());
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (!isRestoring.current) {
        scrollPositions.current[pathname] = window.scrollY;
        try {
          sessionStorage.setItem(`scroll_${pathname}`, window.scrollY.toString());
        } catch {
          // ignore
        }
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Handle route navigation: POP restores previous position, PUSH/hash handles instant scroll or in-page jump
  useLayoutEffect(() => {
    if (navType === 'POP') {
      // User pressed back/forward ("pop back")
      let savedY = scrollPositions.current[pathname];
      if (savedY === undefined) {
        try {
          const val = sessionStorage.getItem(`scroll_${pathname}`);
          if (val !== null) savedY = parseInt(val, 10);
        } catch {
          // ignore
        }
      }
      const targetY = savedY ?? 0;
      isRestoring.current = true;
      window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });

      // Secondary check next frame in case DOM content height expands
      const raf = requestAnimationFrame(() => {
        window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
        setTimeout(() => {
          isRestoring.current = false;
        }, 80);
      });
      return () => cancelAnimationFrame(raf);
    } else if (hash) {
      // In-page section link (e.g. clicking nav item)
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Normal page opening (PUSH) - immediately open at top without any animated gliding
      isRestoring.current = true;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const timer = setTimeout(() => {
        isRestoring.current = false;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash, navType]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollManager />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

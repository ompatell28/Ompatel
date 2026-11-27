import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Build from './pages/Build';
import Brand from './pages/Brand';
import AgentMode from './pages/AgentMode';

function getInitialRoute() {
  const hash = window.location.hash.replace('#', '');
  if (hash === '/agent') return { path: '/', mode: 'agent' };
  if (hash === '/build' || hash === '/brand') return { path: hash, mode: 'human' };
  return { path: '/', mode: 'human' };
}

export default function App() {
  const initial = getInitialRoute();
  const [currentPath, setCurrentPath] = useState(initial.path);
  const [mode, setMode] = useState(initial.mode);
  const [transitioningTo, setTransitioningTo] = useState(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(
    initial.path !== '/' || initial.mode === 'agent'
  );

  // Sync URL hash on Browser Back / Forward
  useEffect(() => {
    const onHashChange = () => {
      const next = getInitialRoute();
      setMode(next.mode);
      setCurrentPath(next.path);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (targetPath) => {
    if (targetPath === currentPath && mode === 'human') return;
    setTransitioningTo(targetPath);

    setTimeout(() => {
      setCurrentPath(targetPath);
      setHasLoadedOnce(true);
      window.location.hash = targetPath === '/' ? '' : `#${targetPath}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 280);

    setTimeout(() => {
      setTransitioningTo(null);
    }, 620);
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    if (nextMode === 'agent') {
      window.location.hash = '#/agent';
    } else {
      setHasLoadedOnce(true);
      window.location.hash = currentPath === '/' ? '' : `#${currentPath}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = mode === 'human' && currentPath === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F5F4]">
      <Navbar
        currentPath={currentPath}
        mode={mode}
        onNavigate={handleNavigate}
        onModeChange={handleModeChange}
      />

      <PageTransition transitioningTo={transitioningTo} />

      <main className="flex-1">
        {mode === 'agent' ? (
          <AgentMode
            onNavigate={(path) => {
              setMode('human');
              handleNavigate(path);
            }}
          />
        ) : (
          <>
            {currentPath === '/' && (
              <Home
                skipLoader={hasLoadedOnce}
                onNavigate={handleNavigate}
                onModeChange={handleModeChange}
              />
            )}
            {currentPath === '/build' && <Build />}
            {currentPath === '/brand' && <Brand />}
          </>
        )}
      </main>

      {/* Home page par Footer nahi dikhega */}
      {!isHome && <Footer onModeChange={handleModeChange} />}
    </div>
  );
}
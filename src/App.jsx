import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingPage from './pages/LoadingPage';
import HomePage from './pages/HomePage';
import CharacterSheet from './pages/CharacterSheet';
import PowerPage from './pages/PowerPage';
import StoryPage from './pages/StoryPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    const disableImageRightClick = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    const disableImageDrag = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableImageRightClick);
    document.addEventListener('dragstart', disableImageDrag);

    return () => {
      document.removeEventListener('contextmenu', disableImageRightClick);
      document.removeEventListener('dragstart', disableImageDrag);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character" element={<CharacterSheet />} />
          <Route path="/power" element={<PowerPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
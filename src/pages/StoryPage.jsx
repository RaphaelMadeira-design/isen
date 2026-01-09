import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, ArrowLeftCircle } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import { storyData } from '../data/storyData';
import '../styles/pages/StoryPage.scss';

const StoryPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [currentScene, setCurrentScene] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [history, setHistory] = useState([0]);

  const currentLang = i18n.language;
  const scenes = storyData[currentLang] || storyData.en;
  const scene = scenes[currentScene];

  useEffect(() => {
    if (!scene) return;
    
    setIsTyping(true);
    setDisplayedText('');
    
    let currentIndex = 0;
    const text = scene.text;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentScene, scene]);

  const handleNext = (nextId = null) => {
    if (isTyping) {
      setDisplayedText(scene.text);
      setIsTyping(false);
      return;
    }

    const nextIndex = nextId !== null 
      ? scenes.findIndex(s => s.id === nextId)
      : currentScene + 1;
    
    if (nextIndex < scenes.length && nextIndex !== -1) {
      setHistory([...history, nextIndex]);
      setCurrentScene(nextIndex);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousScene = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScene(previousScene);
    }
  };

  if (!scene) {
    return <div>Loading...</div>;
  }

  return (
    <div className="story-page">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          className="background-image"
          style={{ backgroundImage: `url(${scene.background})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      <div className="background-overlay" />
      
      <LanguageToggle />

      <motion.button
        className="back-button"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft size={24} />
      </motion.button>

      <div className="story-content">
        {scene.character === "Isen" && (
            <div className="character-avatar">
              <img
                src="/images/full.png"
                alt="Isen"
              />
            </div>
          )}
        <motion.div
          className="text-box"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="character-name">{scene.character}</div>

          <div className="dialogue-text">
            <span dangerouslySetInnerHTML={{ __html: displayedText }} />
            {isTyping && <span className="typing-cursor"></span>}
          </div>

          {!isTyping && scene.choices && (
            <motion.div
              className="choices-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {scene.choices.map((choice, index) => (
                <motion.button
                  key={index}
                  className="choice-button"
                  onClick={() => handleNext(choice.next)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="choice-bullet">▸</span>
                  {choice.text}
                </motion.button>
              ))}
            </motion.div>
          )}

          <div className="controls">
            {history.length > 1 && (
              <motion.button
                className="control-button"
                onClick={handleBack}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeftCircle size={20} />
                <span>{t('story.back')}</span>
              </motion.button>
            )}

            {!scene.choices && (
              <motion.button
                className="control-button next"
                onClick={() => handleNext()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={currentScene >= scenes.length - 1}
              >
                <span>{t('story.next')}</span>
                <ArrowRight size={20} />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryPage;
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import '../styles/pages/HomePage.scss';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    { key: 'character', path: '/character', label: t('menu.character') },
    { key: 'power', path: '/power', label: t('menu.power') },
    { key: 'story', path: '/story', label: t('menu.story') },
  ];

  return (
    <div className="home-page">
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="float-particle"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="corner-accent top-left" />
      <div className="corner-accent top-right" />
      <div className="corner-accent bottom-left" />
      <div className="corner-accent bottom-right" />
      
      <LanguageToggle />

      <motion.div
        className="home-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="logo-section"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="logo-wrapper">
          </div>
          
          <div className="title-container">
            <motion.div
              className="title-decoration"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <h1 className="main-title">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
              {t('character.cardName')}
              </motion.span>
            </h1>
            <motion.div
              className="title-decoration"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
          
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
          {t('character.roleplay')}
          </motion.p>
        </motion.div>

        <motion.div
          className="menu-section"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.key}
              className="menu-item"
              onClick={() => navigate(item.path)}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0}}
              whileTap={{ scale: 0.95 }}
            >
              <span className="menu-item-glow" />
              <span className="menu-item-border" />
              <div className="menu-item-content">
                <span className="menu-item-text">{item.label}</span>
                <ChevronRight className="menu-item-arrow" size={20} />
              </div>
              <div className="menu-item-shine" />
            </motion.button>
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="bottom-decoration"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="decoration-line" />
          <div className="decoration-text">BLUE RIVER UNIVERSITY</div>
          <div className="decoration-line" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
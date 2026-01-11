import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';
import HolographicCard from '../components/HolographicCard';
import '../styles/pages/PowerPage.scss';

const PowerPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(null);

  const spells = [
    { key: '1', image: '/images/spell-1.jpg', keyBind: '1', damage: 'N/A' },
    { key: '2', image: '/images/spell-2.jpg', keyBind: '2', damage: 'N/A' },
    { key: '3', image: '/images/spell-3-2.jpg', keyBind: '3', damage: 'N/A'},
    { key: '4', image: '/images/spell-4.jpg', keyBind: '4', damage: 'N/A'},
    { key: '5', image: '/images/spell-5.jpg', keyBind: '5', damage: 'N/A'},
    { key: '6', image: '/images/spell-6.jpg', keyBind: '6', damage: 'N/A', isUlt: true},
  ];

  return (
    <div className="character-sheet">
      <div className="background-effect" />
      <LanguageToggle />
      <motion.button
        className="back-button"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft size={24} />
      </motion.button>

      <div className="character-container">
        
        <motion.div
          className="character-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="character-image-wrapper">
            <HolographicCard />
        </div>
          <div className="section">
            <h3 className="section-title">{t('character.power.jinki.title')}</h3>

            <div
              className="jinki-image-wrapper"
            >
              <img
                src="/images/diapason.png"
                alt="Jinki Diapason"
                className="jinki-image"
                onMouseEnter={() => setHovered('jinki')}
                onMouseLeave={() => setHovered(null)}
              />

              <AnimatePresence>
                {hovered === 'jinki' && (
                  <motion.div
                    className="tooltip"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {t('character.power.jinki.explanation')}
                    <span className="tooltip-arrow" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="character-right"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="clip-section-2">
            <div className="clip-item">
              <span className="clip-label">{t('character.power.nameLabel')}</span>
              <span className="clip-value">{t('character.power.name')}</span>
            </div>
            <div className="clip-item">
              <span className="clip-label">{t('character.info.rank')}</span>
              <span className="clip-value">{t('character.info.rankValue')}</span>
            </div>
            <div className="clip-item">
              <span className="clip-label">{t('character.power.masteryLabel')}</span>
              <span className="clip-value">{t('character.power.mastery')}</span>
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">{t('character.power.intro.title')}</h3>
            <div className="section-text">
              {t('character.power.intro.content', { returnObjects: true }).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="limits-ability">
              <div className="limits-icon">
                <AlertTriangle size={32} color="black" />
              </div>
              <div className="limits-info">
                <div className="ability-desc">{t('character.power.limitsDesc')}</div>
              </div>
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">{t('character.abilities.title')}</h3>
            <div className="spells-grid">
              {spells.map((spell) => {
                return (
                  <motion.div
                    key={spell.key}
                    className={`spell-card ${spell.isUlt ? 'ultimate' : ''} ${spell.isPassive ? 'passive' : ''}`}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.05 }}
                    whileHover={{ scale: 1.025 }}
                  >
                    <div className="spell-content">
                      <div className="spell-icon">
                        <img
                          src={spell.image}
                          alt={t(`character.abilities.spells.${spell.key}.name`)}
                          className="spell-image"
                        />
                        <div className="spell-keybind">{spell.keyBind}</div>
                      </div>
                      <div className="spell-stats">
                        {spell.isUlt && (
                          <span className="spell-label spell-label--ultimate">
                            {t('character.abilities.spells.ultLabel', 'Ultime')}
                          </span>
                        )}
                        {spell.isPassive && (
                          <span className="spell-label spell-label--passive">
                            {t('character.abilities.spells.passiveLabel', 'Passif')}
                          </span>
                        )}
                        <span className="cost">
                          {t(`character.abilities.spells.${spell.key}.cost`)}
                        </span>
                        {spell.damage && (
                          <span className="damage">
                            {`${spell.damage} ${t('character.abilities.spells.damage')}`}
                          </span>
                        )}
                        {spell.statBuff && (
                          <span className="buff">
                            {`+${spell.statBuff.value} ${t(
                              `character.abilities.spells.${spell.statBuff.stat}`
                            )}`}
                          </span>
                        )}
                        {spell.statDebuff && (
                          <span className="debuff">
                            {`${spell.statDebuff.value} ${t(
                              `character.abilities.spells.${spell.statDebuff.stat}`
                            )}`}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="spell-info">
                      <div className="spell-name">
                        {t(`character.abilities.spells.${spell.key}.name`)}
                      </div>
                      <div className="spell-desc">
                        {t(`character.abilities.spells.${spell.key}.desc`)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PowerPage;
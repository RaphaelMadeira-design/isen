import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Heart, Zap, Swords, Brain, PersonStanding } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import LanguageToggle from '../components/LanguageToggle';
import InfoHover from '../components/InfoHover';
import '../styles/pages/CharacterSheet.scss';

const CharacterSheet = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [health] = useState(19);
  const [energy] = useState(14);
  const [damage] = useState('1d3');

  const stats = {
    power: 8,
    stamina: 4,
    mastery: 6,
    range: 5,
    speed: 4,
    defense: 7,
  };

  const statsData = [
    { stat: t('character.statistics.power'), value: stats.power },
    { stat: t('character.statistics.stamina'), value: stats.stamina },
    { stat: t('character.statistics.mastery'), value: stats.mastery },
    { stat: t('character.statistics.range'), value: stats.range },
    { stat: t('character.statistics.speed'), value: stats.speed },
    { stat: t('character.statistics.defense'), value: stats.defense },
  ];

  const likes = [
    {
      label: t('character.likes.1'),
    },
    {
      label: t('character.likes.2'),
    },
    {
      label: t('character.likes.3'),
    },
    {
      label: t('character.likes.4'),
    },
  ];
  const dislikes = [
    {
      label: t('character.dislikes.1'),
    },
    {
      label: t('character.dislikes.2'),
    },
    {
      label: t('character.dislikes.3'),
    },
    {
      label: t('character.dislikes.4'),
    },
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
            <img
              src="/images/full.png"
              alt="Kai Von Arkham"
              className="character-image"
            />
            <InfoHover
              position={{ top: '3%', left: '45%' }}
              title={t('character.psychological.title')}
              content={t('character.psychological.content', { returnObjects: true })}
              icon={Brain}
            />
            <InfoHover
              position={{ top: '35%', left: '41%' }}
              title={t('character.physical.title')}
              content={t('character.physical.content', { returnObjects: true })}
              icon={PersonStanding}
            />
          </div>
        </motion.div>
        <motion.div
          className="character-right"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="nameplate">
            <h1 className="character-name">{t('character.title')}</h1>
          </div>
          <div className="clip-section">
            <div className="clip-item">
              <span className="clip-label">{t('character.info.age')}</span>
              <span className="clip-value">{t('character.info.ageValue')}</span>
            </div>
            <div className="clip-item">
              <span className="clip-label">{t('character.info.origin')}</span>
              <span className="clip-value">{t('character.info.originValue')}</span>
            </div>
            <div className="clip-item">
              <span className="clip-label">{t('character.info.role')}</span>
              <span className="clip-value">{t('character.info.roleValue')}</span>
            </div>
            <div className="clip-item">
              <span className="clip-label">{t('character.info.rank')}</span>
              <span className="clip-value">{t('character.info.rankValue')}</span>
            </div>
          </div>
          <div className="section">
            <h3 className="section-title">{t('character.intro.title')}</h3>
            <div className="section-text">{t('character.intro.content', { returnObjects: true }).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="sectionSplit">
            <div className="split">
              <h3 className="split-title">{t('character.likes.title')}</h3>
              <table className="notation-table">
                <tbody>
                  {likes.map((item, i) => (
                    <motion.tr key={i}>
                      <motion.td
                        whileHover={{ backgroundColor: '#00ff40', color: '#000' }}
                        transition={{ duration: 0.25 }}
                        style={{ padding: '0.4rem 0.6rem' }}
                      >
                        {item.label}
                      </motion.td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="split"> 
              <h3 className="split-title">{t('character.dislikes.title')}</h3>
              <table className="notation-table">
                <tbody>
                  {dislikes.map((item, i) => (
                    <motion.tr key={i}>
                      <motion.td
                        whileHover={{ backgroundColor: '#00ff40', color: '#000' }}
                        transition={{ duration: 0.25 }}
                        style={{ padding: '0.4rem 0.6rem' }}
                      >
                        {item.label}
                      </motion.td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="section">
            <h3 className="section-title">{t('character.attributes.title')}</h3>
            <div className="attributes-statistics-grid">
              <div className="attributes-left">
                <div className="attribute-bar health-bar">
                  <div className="attribute-icon">
                    <Heart size={32} color="#EF4444" />
                  </div>
                  <div className="attribute-value">{health}</div>
                </div>
                <div className="attribute-bar energy-bar">
                  <div className="attribute-icon">
                    <Zap size={32} color="#3B82F6" />
                  </div>
                  <div className="attribute-value">{energy}</div>
                </div>
                <div className="attribute-bar damage-bar">
                  <div className="attribute-icon">
                    <Swords size={32} color="#3bf66dff" />
                  </div>
                  <div className="attribute-value">{damage}</div>
                </div>
              </div>
              <div className="statistics-right">
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart cx="50%" cy="50%" outerRadius="90%" data={statsData}>
                    <PolarGrid 
                      radialLines={true} 
                    />
                    <PolarAngleAxis 
                      dataKey="stat" 
                      tick={{ fill: 'var(--color-accent-lime)', fontSize: 15, fontWeight: 400 }} 
                    />
                    <PolarRadiusAxis 
                      tick={false}
                      axisLine={false}
                      ticks={[0, 2, 4, 6, 8, 10]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        border: '1px solid var(--color-accent-lime)',
                        borderRadius: '8px',
                        boxShadow: '0 0 12px rgba(0,255,64,0.3)',
                        fontSize: '0.85rem',
                      }}
                      labelStyle={{
                        color: 'var(--color-accent-lime)',
                        fontWeight: 400,
                      }}
                      itemStyle={{
                        color: 'var(--color-text-primary)',
                      }}
                      cursor={{ stroke: 'var(--color-accent-lime)', strokeDasharray: '3 3' }}
                    />
                    <Radar
                      dataKey="value"
                      stroke="darkgreen"
                      strokeWidth={3}
                      fill="var(--color-accent-lime)"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CharacterSheet;
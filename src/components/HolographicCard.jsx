import React, { useState, useRef } from 'react';
import { Zap, Heart, Swords } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/components/HolographicCard.scss';

const HolographicCard = ({ stats = { hp: 19, attack: '1d3', energy: 14, rarity: "SSR" }, cardImage = "/images/pose.png" }) => {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({ x: ((y - centerY) / centerY) * -12, y: ((x - centerX) / centerX) * 12 });
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
  };

  const handleClick = () => setIsFlipped(!isFlipped);

  const getRarityColor = (rarity) => {
    switch(rarity?.toLowerCase()) {
      case 'legendary': return 'from-amber-400 to-orange-500';
      case 'epic': return 'from-purple-400 to-pink-500';
      case 'rare': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="holographic-card-container">
      <div
        ref={cardRef}
        className={`holographic-card ${isFlipped ? 'flipped' : ''}`}
        style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >

        <div className="card-face card-front">
          <div className="character-portrait">
            <div className="character-portrait--glow" />
            <div className="character-portrait--frame" />
            <div className="character-portrait--foil" />
            <div className="character-portrait--sparkle" />
            <div className="character-portrait--shine" />
            <div className="character-portrait--prismatic"
                 style={{ '--mouse-x': `${glowPosition.x}%`, '--mouse-y': `${glowPosition.y}%` }}
            />
            <img src={cardImage} alt={t('character.title')} className="card-image" />
            <div className="energy-aura" />
          </div>

          <div className="holographic-shimmer"
               style={{ background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(0,255,255,0.4) 0%, transparent 50%)` }}
          />
          <div className="rainbow-shimmer" />

          <div className="card-border">
            <div className="border-corner border-corner--top-left" />
            <div className="border-corner border-corner--top-right" />
            <div className="border-corner border-corner--bottom-left" />
            <div className="border-corner border-corner--bottom-right" />
          </div>

          <div className="card-content">
            <div className="card-content--top">
              <div className={`rarity-badge bg-gradient-to-r ${getRarityColor(stats.rarity)}`}>
                <span>{stats.rarity}</span>
              </div>
            </div>

            <div className="card-content--bottom">
              <div className="stats-container">
                <div className="stat-item">
                  <Heart className="stat-item--icon" color="#ef4444" />
                  <div className="stat-item--content">
                    <span className="stat-item--content-label">{t('character.attributes.hp')}</span>
                    <span className="stat-item--content-value">{stats.hp}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Zap className="stat-item--icon" />
                  <div className="stat-item--content">
                    <span className="stat-item--content-label">{t('character.attributes.ep')}</span>
                    <span className="stat-item--content-value">{stats.energy}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Swords className="stat-item--icon" color="#44ef61ff" />
                  <div className="stat-item--content">
                    <span className="stat-item--content-label">{t('character.abilities.spells.damage')}</span>
                    <span className="stat-item--content-value">{stats.attack}</span>
                  </div>
                </div>
              </div>
              <div className="character-nameplate">
                <div className="character-nameplate--glow" />
                <h2 className="character-name">{t('character.cardName')}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card-face card-back">
          <div className="holographic-shimmer" />
          <div className="rainbow-shimmer" />
          <div className="character-portrait--foil" />
          <div className="character-portrait--sparkle" />
          <div className="character-portrait--shine" />
          <div className="character-portrait--prismatic" />

          <div className="card-border">
            <div className="border-corner border-corner--top-left" />
            <div className="border-corner border-corner--top-right" />
            <div className="border-corner border-corner--bottom-left" />
            <div className="border-corner border-corner--bottom-right" />
          </div>

          <div className="back-content">
            <h3 className="back-content--title">{t('character.title')}</h3>
            <div className="back-content--bio">
              <div className="back-content--header">{t('character.intro.resumeTitle')}</div>
              <p className="back-content--bio-text">{t('character.intro.resumeContent', { returnObjects: true }).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}</p>
            </div>
            <div className="flavor-text">{t('character.intro.resumeLine')}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HolographicCard;

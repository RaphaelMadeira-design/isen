import { useState, useEffect } from 'react'
import '../styles/CRTFrame.scss'

export default function CRTFrame({ children }) {
  const [powerOn, setPowerOn] = useState(true)
  const [brightness, setBrightness] = useState(100)

  return (
    <div className="crt-monitor" data-testid="crt-monitor">
      {/* Cadre extérieur du moniteur */}
      <div className="crt-monitor__frame">
        {/* Zone écran avec biseau */}
        <div className="crt-monitor__screen-area">
          {/* Biseau interne */}
          <div className="crt-monitor__bezel">
            {/* Écran CRT */}
            <div className={`crt-monitor__screen ${powerOn ? 'crt-monitor__screen--on' : ''}`}>
              {/* Effets CRT */}
              <div className="crt-monitor__scanlines" />
              <div className="crt-monitor__flicker" />
              <div className="crt-monitor__vignette" />
              <div className="crt-monitor__curvature" />
              
              {/* Contenu (Windows 98) */}
              <div className="crt-monitor__content" style={{ filter: `brightness(${brightness}%)` }}>
                {powerOn ? children : (
                  <div className="crt-monitor__off-screen">
                    <span>NO SIGNAL</span>
                  </div>
                )}
              </div>

              {/* Reflet sur l'écran */}
              <div className="crt-monitor__reflection" />
            </div>
          </div>
        </div>

        {/* Panneau de contrôle */}
        <div className="crt-monitor__controls">
          {/* Logo marque */}
          <div className="crt-monitor__brand">
            <span className="crt-monitor__brand-logo">Raphurst</span>
            <span className="crt-monitor__brand-model">MultiSync 98</span>
          </div>

          {/* Boutons de contrôle */}
          <div className="crt-monitor__buttons">
            <div className="crt-monitor__button-group">
              <button 
                className="crt-monitor__btn crt-monitor__btn--small"
                onClick={() => setBrightness(b => Math.max(50, b - 10))}
                title="Luminosité -"
              >
                <span>◐</span>
              </button>
              <button 
                className="crt-monitor__btn crt-monitor__btn--small"
                onClick={() => setBrightness(b => Math.min(120, b + 10))}
                title="Luminosité +"
              >
                <span>◑</span>
              </button>
            </div>
            <button 
              className="crt-monitor__btn crt-monitor__btn--menu"
              title="Menu"
            >
              <span>MENU</span>
            </button>
            <button 
              className={`crt-monitor__btn crt-monitor__btn--power ${powerOn ? 'crt-monitor__btn--power-on' : ''}`}
              onClick={() => setPowerOn(!powerOn)}
              title="Power"
            >
              <span>⏻</span>
              <div className="crt-monitor__led" />
            </button>
          </div>
        </div>

        {/* Pied du moniteur */}
        <div className="crt-monitor__stand">
          <div className="crt-monitor__stand-neck" />
          <div className="crt-monitor__stand-base" />
        </div>
      </div>
    </div>
  )
}
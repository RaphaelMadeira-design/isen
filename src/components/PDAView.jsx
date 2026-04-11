import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/PDA.scss'

import Pouvoirs from './Pouvoirs'
import FileExplorer from './FileExplorer'
import Snake from './Snake'
import JumpGame from './JumpGame'
import VisualNovel from './VisualNovel'
import MediaPlayer from './MediaPlayer'
import Notepad from './Notepad'

// Configuration des apps PDA
const PDA_APPS = [
  { id: 'home', label: 'Menu', icon: '🏠' },
  { id: 'powers', label: 'Stats', icon: '⚡' },
  { id: 'histoire', label: 'Docs', icon: '📁' },
  { id: 'vn', label: 'ISEN', icon: '📖' },
  { id: 'games', label: 'Jeux', icon: '🎮' },
]

const GAME_APPS = [
  { id: 'snake', label: 'Snake', icon: '🐍' },
  { id: 'jump', label: 'Jump', icon: '🦘' },
  { id: 'media', label: 'Media', icon: '🎵' },
]

export default function PDAView() {
  const [currentApp, setCurrentApp] = useState('home')
  const [setPrevApp] = useState(null)
  const [notepadData, setNotepadData] = useState(null)
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [battery] = useState(87)
  const [showBootScreen, setShowBootScreen] = useState(true)

  // Horloge
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
      setDate(`${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`)
    }
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])

  // Boot screen
  useEffect(() => {
    const timer = setTimeout(() => setShowBootScreen(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  const navigateTo = (appId) => {
    setPrevApp(currentApp)
    setCurrentApp(appId)
    setNotepadData(null)
  }

  const goBack = () => {
    if (notepadData) {
      setNotepadData(null)
      return
    }
    if (currentApp === 'snake' || currentApp === 'jump' || currentApp === 'media') {
      setCurrentApp('games')
    } else if (currentApp !== 'home') {
      setCurrentApp('home')
    }
  }

  const handleOpenNotepad = (data) => {
    setNotepadData(data)
  }

  const renderAppContent = () => {
    if (notepadData) {
      return <Notepad fileName={notepadData.name} content={notepadData.content} />
    }

    switch (currentApp) {
      case 'home':
        return <PDAHomeScreen apps={PDA_APPS.slice(1)} onAppSelect={navigateTo} />
      case 'powers':
        return <Pouvoirs />
      case 'histoire':
        return <FileExplorer onOpenNotepad={handleOpenNotepad} />
      case 'vn':
        return <VisualNovel />
      case 'games':
        return <PDAHomeScreen apps={GAME_APPS} onAppSelect={navigateTo} title="Jeux & Media" />
      case 'snake':
        return <Snake />
      case 'jump':
        return <JumpGame />
      case 'media':
        return <MediaPlayer />
      default:
        return null
    }
  }

  const getAppTitle = () => {
    if (notepadData) return notepadData.name
    const app = [...PDA_APPS, ...GAME_APPS].find(a => a.id === currentApp)
    return app?.label || 'PDA'
  }

  if (showBootScreen) {
    return <PDABootScreen />
  }

  return (
    <div className="pda" data-testid="pda-view">
      {/* Cadre PDA */}
      <div className="pda__frame">
        {/* Écran LCD */}
        <div className="pda__screen">
          {/* Scanlines LCD */}
          <div className="pda__scanlines" />
          
          {/* Status Bar */}
          <div className="pda__statusbar">
            <span className="pda__statusbar-title">{getAppTitle()}</span>
            <div className="pda__statusbar-right">
              <span className="pda__battery">
                <span className="pda__battery-icon" style={{ '--level': `${battery}%` }} />
                {battery}%
              </span>
              <span className="pda__time">{time}</span>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="pda__content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentApp + (notepadData?.id || '')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
                className="pda__app-container"
              >
                {renderAppContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Bar */}
          <div className="pda__navbar">
            <button
              className="pda__nav-btn"
              onClick={goBack}
              disabled={currentApp === 'home' && !notepadData}
              data-testid="pda-back"
            >
              ◀ Retour
            </button>
            <button
              className="pda__nav-btn pda__nav-btn--home"
              onClick={() => navigateTo('home')}
              data-testid="pda-home"
            >
              ● Menu
            </button>
            <span className="pda__nav-date">{date}</span>
          </div>
        </div>

        {/* Boutons physiques PDA */}
        <div className="pda__buttons">
          <div className="pda__button" onClick={() => navigateTo('powers')} title="Stats">
            <span>2</span>
          </div>
          <div className="pda__button" onClick={() => navigateTo('histoire')} title="Docs">
            <span>3</span>
          </div>
          <div className="pda__button" onClick={() => navigateTo('games')} title="Jeux">
            <span>4</span>
          </div>
        </div>

        {/* Logo PDA */}
        <div className="pda__brand">
          <span>ISEN</span>
          <small>PDA-98</small>
        </div>
      </div>
    </div>
  )
}

// Écran d'accueil du PDA
function PDAHomeScreen({ apps, onAppSelect, title = "ISEN PDA" }) {
  return (
    <div className="pda-home">
      <div className="pda-home__header">
        <h1>{title}</h1>
        <p>Sélectionnez une application</p>
      </div>
      <div className="pda-home__grid">
        {apps.map((app, index) => (
          <motion.button
            key={app.id}
            className="pda-home__app"
            onClick={() => onAppSelect(app.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            data-testid={`pda-app-${app.id}`}
          >
            <span className="pda-home__app-icon">{app.icon}</span>
            <span className="pda-home__app-label">{app.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Boot screen PDA
function PDABootScreen() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const id = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pda pda--boot">
      <div className="pda__frame">
        <div className="pda__screen pda__screen--boot">
          <div className="pda__scanlines" />
          <div className="pda-boot">
            <div className="pda-boot__logo">
              <span>ISEN</span>
              <small>Personal Digital Assistant</small>
            </div>
            <div className="pda-boot__text">
              <p>Initialisation système{dots}</p>
              <div className="pda-boot__progress">
                <motion.div
                  className="pda-boot__progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                />
              </div>
              <p className="pda-boot__version">v1.0 — © 2026 Academia no Shin'en</p>
            </div>
          </div>
        </div>
        <div className="pda__buttons">
          <div className="pda__button"><span>1</span></div>
          <div className="pda__button"><span>2</span></div>
          <div className="pda__button"><span>3</span></div>
          <div className="pda__button"><span>4</span></div>
        </div>
        <div className="pda__brand">
          <span>ISEN</span>
          <small>PDA-98</small>
        </div>
      </div>
    </div>
  )
}
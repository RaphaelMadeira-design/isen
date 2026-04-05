import { useState, useCallback } from 'react'
import './styles/Desktop.scss'

import DesktopIcon from './components/DesktopIcon'
import Win98Window from './components/Win98Window'
import Taskbar from './components/Taskbar'
import StartMenu from './components/StartMenu'
import FichePersonnage from './components/FichePersonnage'
import Pouvoirs from './components/Pouvoirs'
import FileExplorer from './components/FileExplorer'
import Notepad from './components/Notepad'
import BootScreen from './components/BootScreen'
import ShutdownDialog from './components/ShutdownDialog'
import Snake from './components/Snake'
import JumpGame from './components/JumpGame'
import Loading from './components/Loading'
import VisualNovel from './components/VisualNovel'

const CELL = 90

const INITIAL_ICONS = [
  { id: 'character', 
    label: 'Fiche de personnage',   
    icon: 'https://win98icons.alexmeub.com/icons/png/user_world-0.png',        
    x: 0, y: 0 
  },
  { id: 'powers',    
    label: 'Pouvoirs et techniques', 
    icon: 'https://win98icons.alexmeub.com/icons/png/executable_script-0.png',  
    x: 0, y: 1 
  },
  { id: 'histoire',  
    label: 'Histoire et Background', 
    icon: 'https://win98icons.alexmeub.com/icons/png/directory_closed-4.png',   
    x: 0, y: 2 
  },
  { id: 'snake',     
    label: 'SNAKE.exe',              
    icon: 'https://win98icons.alexmeub.com/icons/png/executable-0.png',           
    x: 2, y: 0 
  },
  { id: 'jump',      
    label: 'JUMP.exe',               
    icon: 'https://win98icons.alexmeub.com/icons/png/executable-0.png',            
    x: 2, y: 1
  },
  {
    id: 'vn',
    label: 'ISEN.exe',
    icon: 'https://win98icons.alexmeub.com/icons/png/executable-0.png',
    x: 0, y: 4,
  },
].map(icon => ({ ...icon, x: icon.x * CELL, y: icon.y * CELL }))

const WINDOW_CONFIGS = {
  character: {
    title: 'Fiche de personnage - Isen Hata',
    defaultSize: { width: '80%', height: '80%' },
    defaultPosition: { x: 40, y: 20 },
  },
  powers: {
    title: 'Pouvoirs et Techniques - POUVOIRS.exe',
    defaultSize: { width: '80%', height: '80%' },
    defaultPosition: { x: 60, y: 30 },
  },
  histoire: {
    title: 'Histoire et Background - Explorateur',
    defaultSize: { width: '82%', height: '80%' },
    defaultPosition: { x: 50, y: 25 },
  },
  snake: {
    title: 'Snake — SNAKE.exe',
    defaultSize: { width: 460, height: 520 },
    defaultPosition: { x: 80, y: 20 },
  },
  jump: {
    title: 'Jeu de saut — JUMP.exe',
    defaultSize: { width: 540, height: 320 },
    defaultPosition: { x: 100, y: 40 },
  },
  vn: {
    title: 'ISEN.exe — Visual Novel',
    defaultSize: { width: 640, height: 480 },
    defaultPosition: { x: 80, y: 40 },
  },
}

  const LOADING_LABELS = {
    character: 'Fiche de personnage',
    powers: 'POUVOIRS.exe',
    snake: 'SNAKE.exe',
    jump: 'JUMP.exe',
  }

// Crée une config de fenêtre Bloc-notes pour un fichier .txt
const makeNotepadConfig = (fileId, fileName) => ({
  title: `${fileName} - Bloc-notes`,
  defaultSize: { width: 540, height: 420 },
  defaultPosition: { x: 80 + Math.random() * 120, y: 40 + Math.random() * 80 },
  notepadFile: { id: fileId, name: fileName },
})

let zCounter = 100

function App() {
  const [booted, setBooted] = useState(false)
  const [windows, setWindows] = useState([])
  const [startOpen, setStartOpen] = useState(false)
  const [showShutdown, setShowShutdown] = useState(false)
  const [icons, setIcons] = useState(INITIAL_ICONS)
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [loading, setLoading] = useState(null) // { id, label }
  const handleIconDragEnd = useCallback((id, pos) => {
    setIcons(prev => {
      const others = prev.filter(ic => ic.id !== id)
      const isOccupied = (x, y) => others.some(ic => ic.x === x && ic.y === y)

      if (!isOccupied(pos.x, pos.y)) {
        return prev.map(ic => ic.id === id ? { ...ic, ...pos } : ic)
      }

      return prev // cellule occupée → on annule, l'icône revient à sa place
    })
  }, [])

  const openWindow = useCallback((id) => {
    // Pas de spinner pour histoire ni pour les fenêtres déjà ouvertes
    const skipLoading = id === 'histoire' || id.startsWith('notepad-')
    setWindows(prev => {
      const existing = prev.find(w => w.id === id)
      if (existing) {
        // Déjà ouverte → juste focus, pas de spinner
        return prev.map(w =>
          w.id === id
            ? { ...w, minimized: false, focused: true, zIndex: ++zCounter }
            : { ...w, focused: false }
        )
      }
      return prev
    })
    setStartOpen(false)

    setWindows(prev => {
      const existing = prev.find(w => w.id === id)
      if (existing) return prev // déjà traité ci-dessus

      if (skipLoading) {
        return [
          ...prev.map(w => ({ ...w, focused: false })),
          { id, ...WINDOW_CONFIGS[id], minimized: false, focused: true, zIndex: ++zCounter },
        ]
      }

      // Affiche le spinner puis ouvre après délai
      const delay = 1200 + Math.random() * 1000
      setLoading({ id, label: LOADING_LABELS[id] || id })
      setTimeout(() => {
        setLoading(null)
        setWindows(prev2 => {
          if (prev2.find(w => w.id === id)) return prev2
          return [
            ...prev2.map(w => ({ ...w, focused: false })),
            { id, ...WINDOW_CONFIGS[id], minimized: false, focused: true, zIndex: ++zCounter },
          ]
        })
      }, delay)

      return prev
    })
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: true, focused: false } : w
    ))
  }, [])

  const focusWindow = useCallback((id) => {
    setWindows(prev => prev.map(w =>
      w.id === id
        ? { ...w, focused: true, zIndex: ++zCounter }
        : { ...w, focused: false }
    ))
  }, [])

  const toggleWindow = useCallback((id) => {
    setWindows(prev => {
      const win = prev.find(w => w.id === id)
      if (!win) return prev
      if (win.minimized) {
        return prev.map(w =>
          w.id === id
            ? { ...w, minimized: false, focused: true, zIndex: ++zCounter }
            : { ...w, focused: false }
        )
      }
      if (win.focused) {
        return prev.map(w =>
          w.id === id ? { ...w, minimized: true, focused: false } : w
        )
      }
      return prev.map(w =>
        w.id === id
          ? { ...w, focused: true, zIndex: ++zCounter }
          : { ...w, focused: false }
      )
    })
  }, [])

    // Ouvre un fichier .txt dans un Bloc-notes (depuis FileExplorer)
  const openNotepad = useCallback(({ id, name, content }) => {
    const winId = `notepad-${id}`
    setWindows(prev => {
      const existing = prev.find(w => w.id === winId)
      if (existing) {
        return prev.map(w =>
          w.id === winId
            ? { ...w, minimized: false, focused: true, zIndex: ++zCounter }
            : { ...w, focused: false }
        )
      }
      return [
        ...prev.map(w => ({ ...w, focused: false })),
        {
          id: winId,
          ...makeNotepadConfig(id, name),
          notepadContent: content,
          minimized: false,
          focused: true,
          zIndex: ++zCounter,
        },
      ]
    })
  }, [])

  const renderWindowContent = (win) => {
    const { id } = win
    if (id === 'character') return <FichePersonnage />
    if (id === 'powers') return <Pouvoirs />
    if (id === 'snake') return <Snake />
    if (id === 'jump') return <JumpGame />
    if (id === 'histoire') return <FileExplorer onOpenNotepad={openNotepad} />
    if (id.startsWith('notepad-')) {
      return <Notepad fileName={win.notepadFile?.name} content={win.notepadContent} />
    }
    if (id === 'vn') return <VisualNovel />
    return null
  }

  return (
    <div className="desktop" data-testid="desktop" 
      onMouseDown={(e) => {
        if (!e.target.closest('.start-menu') && !e.target.closest('.taskbar')) {
          setStartOpen(false)
        }
        if (!e.target.closest('.desktop-icon')) {
          setSelectedIcon(null)
        }
      }}>
      {/* Boot screen - affiché par-dessus tout jusqu'à la fin du boot */}
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      {/* Wallpaper */}
      <div className="desktop__wallpaper" />

      {/* Scan lines overlay */}
      <div className="scanlines" />

      {/* Watermark */}
      <div className="desktop__watermark">
        <span>PC-98</span>
      </div>

      {/* Desktop Icons */}
      {icons.map(icon => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          label={icon.label}
          icon={icon.icon}
          position={{ x: icon.x, y: icon.y }}
          selected={selectedIcon === icon.id}
          onSelect={setSelectedIcon}
          onOpen={openWindow}
          onDragEnd={handleIconDragEnd}
        />
      ))}

      {/* Windows container */}
      <div className="desktop__content" style={{ position: 'absolute', inset: '0 0 32px 0' }}>
        {windows.map(win => (
          <Win98Window
            key={win.id}
            id={win.id}
            title={win.title}
            zIndex={win.zIndex}
            focused={win.focused}
            minimized={win.minimized}
            defaultSize={win.defaultSize}
            defaultPosition={win.defaultPosition}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={focusWindow}
          >
             {renderWindowContent(win)}
          </Win98Window>
        ))}
      </div>
      {/* Spinner de chargement */}
      {loading && <Loading label={loading.label} />}

      {/* Start Menu */}
      {startOpen && (
        <StartMenu
          onClose={() => setStartOpen(false)}
          onOpenWindow={openWindow}
          onShutdown={() => setShowShutdown(true)}
        />
      )}
      {/* Dialog Arrêt de Windows */}
      {showShutdown && (
        <ShutdownDialog onCancel={() => setShowShutdown(false)} />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowFocus={focusWindow}
        onWindowToggle={toggleWindow}
        onStartClick={(e) => { e.stopPropagation(); setStartOpen(prev => !prev); }}
        startOpen={startOpen}
      />
    </div>
  )
}

export default App
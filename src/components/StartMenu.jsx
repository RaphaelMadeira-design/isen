import { useState, useCallback } from 'react'

const ICONS = {
  start:     'https://win98icons.alexmeub.com/icons/png/windows-0.png',
  character: 'https://win98icons.alexmeub.com/icons/png/user_world-0.png',
  powers:    'https://win98icons.alexmeub.com/icons/png/executable_script-0.png',
  folder:    'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png',
  programs:  'https://win98icons.alexmeub.com/icons/png/programs_folder-0.png',
  shutdown:  'https://win98icons.alexmeub.com/icons/png/monitor_blue_grad-0.png',
  snake:     'https://win98icons.alexmeub.com/icons/png/executable-0.png',
  jump:      'https://win98icons.alexmeub.com/icons/png/executable-0.png',
  games:     'https://win98icons.alexmeub.com/icons/png/joystick-0.png',
}

export default function StartMenu({ onClose, onOpenWindow, onShutdown }) {
  const [gamesOpen, setGamesOpen] = useState(false)

  const handle = useCallback((id) => {
    onOpenWindow(id)
    onClose()
  }, [onOpenWindow, onClose])

  return (
    <>
      {/* Overlay */}
      <div className="start-menu__overlay" onClick={onClose} />

      <div className="start-menu" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
        {/* Sidebar */}
        <div className="start-menu__sidebar">
          <span><b>Windows</b> 98</span>
        </div>

        <div className="start-menu__content">

          <div className="start-menu__item" onClick={() => handle('character')} data-testid="start-menu-character">
            <img src={ICONS.character} alt="Fiche" />
            Fiche de personnage
          </div>

          <div className="start-menu__item" onClick={() => handle('powers')} data-testid="start-menu-powers">
            <img src={ICONS.powers} alt="Pouvoirs" />
            Pouvoirs & Techniques
          </div>

          <div className="start-menu__item" onClick={() => handle('histoire')} data-testid="start-menu-histoire">
            <img src={ICONS.folder} alt="Histoire" />
            Histoire & Background
          </div>

          {/* Onglet Jeux avec sous-menu */}
          <div
            className={`start-menu__item start-menu__item--has-sub${gamesOpen ? ' start-menu__item--sub-open' : ''}`}
            onMouseEnter={() => setGamesOpen(true)}
            onMouseLeave={() => setGamesOpen(false)}
            data-testid="start-menu-games"
          >
            <img src={ICONS.games} alt="Jeux" />
            Jeux
            <span className="start-menu__item__arrow">▶</span>

            {/* Sous-menu */}
            {gamesOpen && (
              <div className="start-menu__submenu">
                <div
                  className="start-menu__item"
                  onClick={() => handle('snake')}
                  data-testid="start-menu-snake"
                >
                  <img src={ICONS.snake} alt="Snake" />
                  SNAKE.exe
                </div>
                <div
                  className="start-menu__item"
                  onClick={() => handle('jump')}
                  data-testid="start-menu-jump"
                >
                  <img src={ICONS.jump} alt="Jump" />
                  JUMP.exe
                </div>
              </div>
            )}
          </div>

          {/* Séparateur */}
          <div className="start-menu__separator" />

          <div
            className="start-menu__item"
            onClick={() => { onShutdown(); onClose(); }}
            data-testid="start-menu-shutdown"
          >
            <img src={ICONS.shutdown} alt="Arrêt" />
            <b>Arrêter...</b>
          </div>

        </div>
      </div>
    </>
  )
}
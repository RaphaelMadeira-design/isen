import { useState, useCallback } from 'react';

const ICONS = {
  start: 'https://win98icons.alexmeub.com/icons/png/windows-0.png',
  character: 'https://win98icons.alexmeub.com/icons/png/user_world-0.png',
  powers: 'https://win98icons.alexmeub.com/icons/png/executable_script-0.png',
  folder: 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png',
  programs: 'https://win98icons.alexmeub.com/icons/png/programs_folder-0.png',
  shutdown: 'https://win98icons.alexmeub.com/icons/png/monitor_blue_grad-0.png',
};

export default function StartMenu({ onClose, onOpenWindow, onShutdown }) {
  const handle = useCallback((id) => {
    onOpenWindow(id);
    onClose();
  }, [onOpenWindow, onClose]);

  return (
    <>
      {/* Overlay pour fermer au clic extérieur */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 99998 }}
        onMouseDown={onClose}
      />
      {/* Le menu lui-même — stopPropagation pour éviter que le desktop ferme le menu
          avant que le onClick de l'item ne se déclenche */}
      <div
        className="start-menu"
        data-testid="start-menu"
        style={{ zIndex: 99999 }}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="start-menu__sidebar">
          <span><b>Windows</b>98</span>
        </div>
        <div className="start-menu__content">
          <div
            className="start-menu__item"
            onClick={() => handle('character')}
            data-testid="start-menu-character"
          >
            <img src={ICONS.character} alt="Fiche" />
            <span>Fiche de personnage</span>
          </div>
          <div
            className="start-menu__item"
            onClick={() => handle('powers')}
            data-testid="start-menu-powers"
          >
            <img src={ICONS.powers} alt="Pouvoirs" />
            <span>Pouvoirs & Techniques</span>
          </div>
          <div
            className="start-menu__item"
            onClick={() => handle('histoire')}
            data-testid="start-menu-histoire"
          >
            <img src={ICONS.folder} alt="Histoire" />
            <span>Histoire & Background</span>
          </div>

          <div className="start-menu__separator" />

          <div
            className="start-menu__item"
            onClick={() => { onShutdown(); onClose(); }}
            data-testid="start-menu-shutdown"
          >
            <img src={ICONS.shutdown} alt="Arrêt" />
            <span>Arrêter...</span>
          </div>
        </div>
      </div>
    </>
  );
}
import { useState } from 'react';

const FOLDER_ICON = 'https://win98icons.alexmeub.com/icons/png/directory_closed-4.png';
const FOLDER_OPEN_ICON = 'https://win98icons.alexmeub.com/icons/png/directory_open_cool-3.png';
const FILE_ICON = 'https://win98icons.alexmeub.com/icons/png/file_lines-0.png';

export const FILE_TREE = {
  root: {
    name: 'Histoire',
    children: ['chapitre1', 'chapitre2', 'chapitre3'],
  },
  chapitre1: {
    name: 'Chapitre I - Les Origines',
    parent: 'root',
    children: ['c1p1', 'c1p2', 'c1p3'],
  },
  chapitre2: {
    name: "Chapitre II - L'Éveil",
    parent: 'root',
    children: ['c2p1', 'c2p2'],
  },
  chapitre3: {
    name: 'Chapitre III - Le Chemin',
    parent: 'root',
    children: ['c3p1'],
  },
  c1p1: { name: 'Partie 1 - Naissance.txt',     parent: 'chapitre1', type: 'file', content: '[Contenu de la Partie 1 à remplir]' },
  c1p2: { name: 'Partie 2 - Enfance.txt',        parent: 'chapitre1', type: 'file', content: '[Contenu de la Partie 2 à remplir]' },
  c1p3: { name: 'Partie 3 - Premier éveil.txt',  parent: 'chapitre1', type: 'file', content: '[Contenu de la Partie 3 à remplir]' },
  c2p1: { name: 'Partie 1 - La Découverte.txt',  parent: 'chapitre2', type: 'file', content: '[Contenu à remplir]' },
  c2p2: { name: 'Partie 2 - Premier combat.txt', parent: 'chapitre2', type: 'file', content: '[Contenu à remplir]' },
  c3p1: { name: 'Partie 1 - En cours.txt',       parent: 'chapitre3', type: 'file', content: '[Contenu à venir]' },
};

export default function FileExplorer({ onOpenNotepad }) {
  const [currentFolder, setCurrentFolder] = useState('root');
  const [selectedItem, setSelectedItem] = useState(null);
  const [history, setHistory] = useState(['root']);

  // Reconstruit le chemin exact root → id en remontant les parents
  const getPathTo = (id) => {
    const path = [];
    let cur = id;
    while (cur) {
      path.unshift(cur);
      cur = FILE_TREE[cur]?.parent || null;
    }
    return path; // ex: ['root', 'chapitre2']
  };

  // Navigate vers un dossier : le chemin est toujours recalculé proprement
  const navigateFolder = (id) => {
    if (id === currentFolder) return;
    setHistory(getPathTo(id));
    setCurrentFolder(id);
    setSelectedItem(null);
  };

  // Ouvrir un fichier .txt → Bloc-notes
  const openFile = (id) => {
    const node = FILE_TREE[id];
    if (!node || node.type !== 'file') return;
    setSelectedItem(id);
    if (onOpenNotepad) {
      onOpenNotepad({ id, name: node.name, content: node.content });
    }
  };

  const goBack = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    setCurrentFolder(newHistory[newHistory.length - 1]);
    setSelectedItem(null);
  };

  const goToRoot = () => {
    setHistory(['root']);
    setCurrentFolder('root');
    setSelectedItem(null);
  };

  const current = FILE_TREE[currentFolder];
  const children = current?.children || [];

  const addressPath = history
  .map(id => FILE_TREE[id]?.name?.replace('\\', '') || id)
  .join('\\');

  return (
    <div className="file-explorer" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Menubar */}
      <div className="win98-window__menubar">
        <span>Fichier</span>
        <span>Édition</span>
        <span>Affichage</span>
        <span>Aide</span>
      </div>

      {/* Toolbar */}
      <div className="win98-window__toolbar">
        <button
          className={`win98-window__toolbar-btn ${history.length <= 1 ? 'win98-window__toolbar-btn--disabled' : ''}`}
          onClick={goBack}
          data-testid="explorer-back"
          disabled={history.length <= 1}
          style={{ gap: '4px' }}
        >
          <span style={{ fontSize: '13px', lineHeight: 1 }}>◄</span>
          Précédent
        </button>
      </div>

      {/* Barre d'adresse */}
      <div className="win98-window__address-bar">
        <label>Adresse</label>
        <input
          type="text"
          value={`C:\\Isen\\${addressPath}`}
          readOnly
          data-testid="explorer-address"
        />
      </div>

      {/* Panneaux */}
      <div className="file-explorer__panes" style={{ flex: 1, overflow: 'hidden' }}>

        {/* Arbre de navigation */}
        <div className="file-explorer__tree">
          <div
            className={`file-explorer__tree-item ${currentFolder === 'root' ? 'file-explorer__tree-item--selected' : ''}`}
            onClick={goToRoot}
            data-testid="tree-root"
          >
            <img src={FOLDER_OPEN_ICON} alt="Histoire" />
            Histoire
          </div>

          {['chapitre1', 'chapitre2', 'chapitre3'].map(chapId => {
            const isCurrentChap = currentFolder === chapId;
            const isChildOfChap = FILE_TREE[currentFolder]?.parent === chapId;
            const isExpanded = isCurrentChap || isChildOfChap;

            return (
              <div key={chapId}>
                <div
                  className={`file-explorer__tree-item ${isCurrentChap ? 'file-explorer__tree-item--selected' : ''}`}
                  onClick={() => navigateFolder(chapId)}
                  data-testid={`tree-${chapId}`}
                  style={{ paddingLeft: '20px' }}
                >
                  <img src={isExpanded ? FOLDER_OPEN_ICON : FOLDER_ICON} alt="\" />
                  {FILE_TREE[chapId].name}
                </div>

                {/* Affiche les fichiers du chapitre si on est dedans */}
                {isExpanded && FILE_TREE[chapId].children.map(fileId => (
                  <div
                    key={fileId}
                    className={`file-explorer__tree-item ${selectedItem === fileId ? 'file-explorer__tree-item--selected' : ''}`}
                    onClick={() => { setCurrentFolder(chapId); setSelectedItem(fileId); }}
                    onDoubleClick={() => openFile(fileId)}
                    data-testid={`tree-${fileId}`}
                    style={{ paddingLeft: '40px' }}
                  >
                    <img src={FILE_ICON} alt="\" />
                    {FILE_TREE[fileId].name}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Zone de contenu */}
        <div className="file-explorer__content">
          <div className="file-explorer__grid">
            {children.map(id => {
              const node = FILE_TREE[id];
              const isFolder = node.type !== 'file';
              return (
                <div
                  key={id}
                  className={`file-explorer__file-item ${selectedItem === id ? 'file-explorer__file-item--selected' : ''}`}
                  onClick={() => setSelectedItem(id)}
                  onDoubleClick={() => isFolder ? navigateFolder(id) : openFile(id)}
                  data-testid={`explorer-item-${id}`}
                >
                  <img src={isFolder ? FOLDER_ICON : FILE_ICON} alt="\" />
                  <span>{node.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Barre de statut */}
      <div className="win98-window__statusbar">
        <span>{children.length} objet(s)</span>
        <span>C:\Isen\Histoire</span>
      </div>
    </div>
  );
}
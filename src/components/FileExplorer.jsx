import { useState } from 'react'

const ICONS = {
  folderClosed: 'https://win98icons.alexmeub.com/icons/png/directory_closed-4.png',
  folderOpen:   'https://win98icons.alexmeub.com/icons/png/directory_open_cool-3.png',
  myDocs:       'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png',
  txt:          'https://win98icons.alexmeub.com/icons/png/file_lines-0.png',
  mp3:          'https://win98icons.alexmeub.com/icons/png/media_music_cd_audio-0.png',
  img:          'https://win98icons.alexmeub.com/icons/png/image_file-0.png',
}

const getFileIcon = (name = '') => {
  if (name.endsWith('.mp3')) return ICONS.mp3
  if (name.match(/.(jpg|jpeg|png|gif|bmp)$/i)) return ICONS.img
  return ICONS.txt
}

export const FILE_TREE = {
  root: {
    name: 'Mes Documents',
    children: ['histoire', 'musique', 'images'],
  },

  // --- Histoire ---
  histoire: {
    name: 'Histoire',
    parent: 'root',
    children: ['chapitre1', 'chapitre2', 'chapitre3'],
  },
  chapitre1: {
    name: 'Chapitre I - Les Origines',
    parent: 'histoire',
    children: ['c1p1', 'c1p2', 'c1p3'],
  },
  chapitre2: {
    name: "Chapitre II - L'Éveil",
    parent: 'histoire',
    children: ['c2p1', 'c2p2'],
  },
  chapitre3: {
    name: 'Chapitre III - Le Chemin',
    parent: 'histoire',
    children: ['c3p1'],
  },
  c1p1: { name: 'Partie 1 - Naissance.txt',     parent: 'chapitre1', type: 'file', content: '[Contenu de la Partie 1 à remplir]' },
  c1p2: { name: 'Partie 2 - Enfance.txt',        parent: 'chapitre1', type: 'file', content: '[Contenu de la Partie 2 à remplir]' },
  c1p3: { name: 'Partie 3 - Premier éveil.txt',  parent: 'chapitre1', type: 'file', content: '[Contenu de la Partie 3 à remplir]' },
  c2p1: { name: 'Partie 1 - La Découverte.txt',  parent: 'chapitre2', type: 'file', content: '[Contenu à remplir]' },
  c2p2: { name: 'Partie 2 - Premier combat.txt', parent: 'chapitre2', type: 'file', content: '[Contenu à remplir]' },
  c3p1: { name: 'Partie 1 - En cours.txt',       parent: 'chapitre3', type: 'file', content: '[Contenu à venir]' },

  // --- Musique ---
  musique: {
    name: 'Musique',
    parent: 'root',
    children: ['mus1', 'mus2'],
  },
  mus1: { name: 'Theme_principal.mp3', parent: 'musique', type: 'file', content: null },
  mus2: { name: 'Combat_theme.mp3',    parent: 'musique', type: 'file', content: null },

  // --- Images ---
  images: {
    name: 'Images',
    parent: 'root',
    children: [],
  },
}

// Remonte les ancêtres d'un nœud (root inclus)
const getAncestors = (id) => {
  const ancestors = new Set()
  let cur = FILE_TREE[id]?.parent
  while (cur) {
    ancestors.add(cur)
    cur = FILE_TREE[cur]?.parent
  }
  return ancestors
}

// Composant récursif pour l'arbre latéral
function TreeNode({ id, depth, currentFolder, selectedItem, onNavigate, onSelectFile }) {
  const node = FILE_TREE[id]
  if (!node) return null

  const isFolder = !node.type
  const isCurrentFolder = currentFolder === id
  const ancestors = getAncestors(currentFolder)
  const isExpanded = isCurrentFolder || ancestors.has(id)

  const icon = id === 'root'
    ? ICONS.myDocs
    : isFolder
      ? (isExpanded ? ICONS.folderOpen : ICONS.folderClosed)
      : getFileIcon(node.name)

  return (
    <div>
      <div
        className={`file-explorer__tree-item${isCurrentFolder ? ' file-explorer__tree-item--selected' : ''}`}
        style={{ paddingLeft: `${depth * 14 + 4}px` }}
        onClick={() => isFolder ? onNavigate(id) : onSelectFile(id)}
        onDoubleClick={() => !isFolder && onSelectFile(id)}
        data-testid={`tree-${id}`}
      >
        <img src={icon} alt="" />
        {node.name}
      </div>

      {/* Enfants affichés si le dossier est expanded */}
      {isFolder && isExpanded && node.children?.map(childId => (
        <TreeNode
          key={childId}
          id={childId}
          depth={depth + 1}
          currentFolder={currentFolder}
          selectedItem={selectedItem}
          onNavigate={onNavigate}
          onSelectFile={onSelectFile}
        />
      ))}
    </div>
  )
}

export default function FileExplorer({ onOpenNotepad }) {
  const [currentFolder, setCurrentFolder] = useState('root')
  const [selectedItem, setSelectedItem] = useState(null)
  const [history, setHistory] = useState(['root'])

  const getPathTo = (id) => {
    const path = []
    let cur = id
    while (cur) {
      path.unshift(cur)
      cur = FILE_TREE[cur]?.parent || null
    }
    return path
  }

  const navigateFolder = (id) => {
    if (id === currentFolder) return
    setHistory(getPathTo(id))
    setCurrentFolder(id)
    setSelectedItem(null)
  }

  const openFile = (id) => {
    const node = FILE_TREE[id]
    if (!node || node.type !== 'file') return
    setSelectedItem(id)
    if (node.name.endsWith('.txt') && onOpenNotepad) {
      onOpenNotepad({ id, name: node.name, content: node.content })
    }
  }

  const goBack = () => {
    if (history.length <= 1) return
    const newHistory = history.slice(0, -1)
    setHistory(newHistory)
    setCurrentFolder(newHistory[newHistory.length - 1])
    setSelectedItem(null)
  }

  const current = FILE_TREE[currentFolder]
  const children = current?.children || []
  const addressPath = history.map(id => FILE_TREE[id]?.name || id).join('')

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
          value={`C:Isen${addressPath}`}
          readOnly
          data-testid="explorer-address"
        />
      </div>

      {/* Panneaux */}
      <div className="file-explorer__panes" style={{ flex: 1, overflow: 'hidden' }}>

        {/* Arbre de navigation */}
        <div className="file-explorer__tree">
          <TreeNode
            id="root"
            depth={0}
            currentFolder={currentFolder}
            selectedItem={selectedItem}
            onNavigate={navigateFolder}
            onSelectFile={openFile}
          />
        </div>

        {/* Zone de contenu */}
        <div className="file-explorer__content">
          <div className="file-explorer__grid">
            {children.map(id => {
              const node = FILE_TREE[id]
              const isFolder = !node.type
              return (
                <div
                  key={id}
                  className={`file-explorer__file-item ${selectedItem === id ? 'file-explorer__file-item--selected' : ''}`}
                  onClick={() => setSelectedItem(id)}
                  onDoubleClick={() => isFolder ? navigateFolder(id) : openFile(id)}
                  data-testid={`explorer-item-${id}`}
                >
                  <img src={isFolder ? ICONS.folderClosed : getFileIcon(node.name)} alt="" />
                  <span>{node.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Barre de statut */}
      <div className="win98-window__statusbar">
        <span>{children.length} objet(s)</span>
        <span>{`C:\\Isen\\${addressPath}`}</span>
      </div>
    </div>
  )
}
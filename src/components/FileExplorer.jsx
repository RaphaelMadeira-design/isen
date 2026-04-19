import { useState } from 'react'
import Sounds from '../components/Sounds'

const ICONS = {
  folderClosed: 'https://win98icons.alexmeub.com/icons/png/directory_closed-4.png',
  folderOpen:   'https://win98icons.alexmeub.com/icons/png/directory_open_cool-3.png',
  myDocs:       'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png',
  txt:          'https://win98icons.alexmeub.com/icons/png/notepad_file-0.png',
  mp3:          'https://win98icons.alexmeub.com/icons/png/wm_file-5.png',
  img:          'https://win98icons.alexmeub.com/icons/png/kodak_imaging_file-0.png',
}

const getFileIcon = (name = '') => {
  if (name.endsWith('.mp3')) 
    return ICONS.mp3
  if (name.match(/.(jpg|jpeg|png|gif|bmp)$/i)) 
    return ICONS.img
  return ICONS.txt
}

export const FILE_TREE = {
  root: {
    name: 'Mes Documents',
    children: ['histoire', 'musique', 'images', 'important'],
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
  c1p1: { 
    name: 'Partie 1 - Naissance.txt',     
    parent: 'chapitre1', 
    type: 'file', 
    content: `CHAPITRE I — LES ORIGINES
    Partie 1 : Naissance
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    23 mai 6070. Quartier de Bunkyo, Tokyo.

    Kiba Igarashi voit le jour au sein de la famille Igarashi, une lignee mineure quasi oubliee, eclipsee par les branches superieures du clan Magaishi. Contrairement aux lignees principales, ou les heritiers sont formes des l'enfance pour occuper des fonctions strategiques, la branche dont il est issu occupe une position de second plan — souvent releguee a des roles d'execution ou de soutien.

    Ses parents, bien que membres du clan, n'ont jamais ete tres impliques dans les affaires internes. Ils ont laisse une grande liberte a leur fils, tant qu'il respectait les regles de base. Ce cote independant lui a permis d'explorer ses propres interets et de developper sa personnalite sans etre constamment compare a des figures plus prestigieuses de la famille.

    De ce fait, Kiba a grandi loin des projecteurs, dans une relative obscurite, sans les pressions et les attentes qui pesent sur les membres plus en vue du clan. Une enfance presque ordinaire, si l'on oublie le nom qu'il porte et le sang qui coule dans ses veines.

    Personne, a ce moment-la, ne soupconnait ce que cet enfant deviendrait.

    [FIN DE LA PARTIE 1]`
  },
  c1p2: { 
    name: 'Partie 2 - Enfance.txt',        
    parent: 'chapitre1', 
    type: 'file', 
    content: `CHAPITRE I — LES ORIGINES
    Partie 2 : Enfance
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Eleve dans le quartier de Bunkyo a Tokyo, Kiba n'a pas eu d'enfance particulierement dure, ni reellement privilegiee. Les ruelles etroites, les parcs bordes d'erables, les toits accessibles par les escaliers de secours — tout cela est devenu son terrain de jeu bien avant qu'il ne sache ce qu'etait le parkour.

    Il passait ses journees a vadrouiller dans les rues des differents quartiers de la capitale, sautant par-dessus les murets, grimpant aux facades des immeubles abandonnes, courant sur les toits des garages. Pas par rebellion — par instinct. Quelque chose en lui cherchait le mouvement, l'espace, la vitesse.

    A l'ecole, Kiba etait le genre de gamin qu'on ne remarque pas vraiment. Pas le meilleur, pas le pire. Sociable sans etre envahissant. Il savait ecouter, plaisanter, s'adapter. Mais il ne se livrait jamais completement. Meme enfant, il gardait une distance — comme si une partie de lui observait le monde plutot que d'y participer pleinement.

    Ses parents ne posaient pas de questions. La liberte qu'ils lui accordaient n'etait pas de l'indifference — c'etait une forme de confiance silencieuse. Tant qu'il rentrait avant la nuit, tant qu'il ne deshonorait pas le nom des Igarashi, il pouvait faire ce qu'il voulait.

    Et ce qu'il voulait, c'etait courir.

    [FIN DE LA PARTIE 2]` 
  },
  c1p3: { 
    name: 'Partie 3 - Premier éveil.txt',  
    parent: 'chapitre1', 
    type: 'file', 
    content: `CHAPITRE I — LES ORIGINES
    Partie 3 : Premier eveil
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    C'est au college que tout a bascule.

    Ses journees passees a profiter de cette liberte en vadrouillant dans les rues l'amenent a faire la rencontre de Ryohei Nishikawa, un camarade de classe qui deviendra rapidement son meilleur ami. Ryohei est le leader naturel d'un petit groupe cherchant a former un club de parkour au sein du college.

    Il recrute Kiba afin de permettre la creation officielle du club, qui est complete par Takumi Kurogane, un garcon sur de lui, ambitieux, et cherchant a surpasser Ryohei ; ainsi que Aoi Kanzaki, une adolescente silencieuse, analytique, et qui est le veritable cerveau strategique de l'equipe.

    Les Ura Ura Kidz etaient nes.

    Pour Kiba, c'etait la premiere fois qu'il ressentait ca — un sentiment d'appartenance. Pas lie au clan, pas lie au sang. Juste quatre gamins qui couraient ensemble, qui se poussaient mutuellement, qui revaient de devenir les meilleurs traceurs de Tokyo.

    Ryohei avait cette energie contagieuse. Il voyait en chaque toit un chemin, en chaque mur une possibilite. Il disait toujours : \"Le parkour, c'est pas sauter — c'est choisir de ne pas s'arreter.\"

    Kiba ne le savait pas encore, mais cette phrase allait definir le reste de sa vie.

    [FIN DE LA PARTIE 3]`
  },
  c2p1: { 
    name: 'Partie 1 - La Découverte.txt',  
    parent: 'chapitre2', 
    type: 'file', 
    content: `CHAPITRE II — L'EVEIL
    Partie 1 : La Decouverte
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Sous le nom des Ura Ura Kidz, ils participent a des courses clandestines contre d'autres equipes des colleges de l'arrondissement de Bunkyo. Leur progression est rapide. Leur cohesion, leur creativite et leur style attirent l'attention des Tenku Striders, une equipe de lyceens reputee dans tout Tokyo.

    Un tournoi final est organise. Les meilleures equipes des colleges environnants s'affrontent. Une seule equipe sera choisie et aura le privilege de porter le nom de Tenku Striders.

    Les Ura Ura Kidz parviennent jusqu'en finale sans trop de mal. Mais lors de cette course decisive, tout bascule.

    Alors que la victoire semble a leur portee, Takumi revele ses veritables intentions et trahit le groupe. Au moment d'un saut critique, il pousse volontairement Ryohei dans le vide.

    La chute est violente. Malgre les tentatives desesperees de Kiba et Aoi pour le rattraper, Ryohei s'ecrase lourdement apres plusieurs metres de chute libre. Graves blessures aux jambes. La course est perdue. Les Tenku Striders recrutent l'equipe adverse, avec Takumi a leur tete.

    Ce jour-la, quelque chose s'est brise chez Kiba. Pas sa determination — sa naivete. Il a compris que le monde ne recompensait pas toujours les meilleurs. Parfois, il recompensait les plus cruels.

    [FIN DE LA PARTIE 1]` 
  },
  c2p2: { 
    name: 'Partie 2 - Premier combat.txt', 
    parent: 'chapitre2', 
    type: 'file', 
    content: `CHAPITRE II — L'EVEIL
    Partie 2 : Premier combat
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Apres une longue reeducation, Ryohei parvient a remarcher mais ne peut plus pratiquer le parkour au meme niveau. A leur entree au lycee, il choisit d'abandonner son reve d'etre le meilleur traceur du Japon et se tourne vers la gestion.

    Avant de tourner la page, il confie ses dernieres instructions a son meilleur ami : \"Continue. Avance. Ne laisse pas cette trahison etre la fin de notre histoire.\"

    Encourages par leur ami, Kiba et Aoi fondent leur propre equipe : les Bunkyo City Bolts. Leur approche change drastiquement. Moins naive, plus directe, ancree dans la performance plutot que dans le reve.

    Ils sont rejoints par Hidemichi Oyama, un lyceen a la carrure impressionnante, et Daigo Kawamura, considere comme l'un des traceurs les plus rapides du nord de Tokyo.

    Les Bolts se font rapidement un nom. Rapides, agressifs, imprevisibles — et surtout, chaque membre detient un Shokan. C'est ainsi qu'ils integrent la Tokyo Skyrunner League, une competition officieuse mais extremement influente, ou l'utilisation de Shokan est autorisee.

    C'est la que Kiba decouvre son propre Shokan pour la premiere fois. Au milieu d'une course, pris entre deux immeubles, sans prise, sans issue — une main spectrale jaillit de nulle part et le rattrape. Une main qui n'appartenait a personne d'autre qu'a lui-meme.

    Echo de l'ame venait de s'eveiller.

    [FIN DE LA PARTIE 2]` 
  },
  c3p1: { 
    name: 'Partie 1 - En cours.txt',       
    parent: 'chapitre3', 
    type: 'file', 
    content: `CHAPITRE III — LE CHEMIN
    Partie 1 : Disparition
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ryohei commence a s'interesser a ce qui entoure reellement la Tokyo Skyrunner League. Il repere un schema : des Chevaliers de rang faible, aux Shokans instables ou atypiques, qui disparaissent du circuit du jour au lendemain. Les organisateurs n'en parlent pas.

    Et puis il y a les silhouettes. Des figures immobiles, yeux ambres luisants, postees en hauteur tout au long des parcours. Elles observent toujours les memes participants. La majorite les ignore. Ceux qui les pointent publiquement du doigt finissent rarement par les revoir.

    Lors de leurs derniers echanges, Ryohei confie a Kiba une intuition troublante : quelqu'un observe la ligue et selectionne. Ceux qui possedent un Shokan particulierement instable, atypique ou prometteur.

    Puis, quelques mois apres leur diplome, Ryohei cesse de repondre. Un dernier message : \"Je m'absente un moment. Inutile de me chercher.\"

    Les messages restent sans reponse. Les appels tombent dans le vide. Les lieux qu'il frequentait sont deserts. Comme s'il avait simplement disparu au bon moment.

    Aujourd'hui, plus de 2 mois apres, Kiba poursuit les recherches. Chaque course est devenue une analyse. Chaque adversaire, une piste. Chaque disparition, une repetition du meme schema.

    La question reste ouverte :
    Saura-t-il percer le secret de la disparition de son meilleur ami ?

    [...A SUIVRE...]`  
  },

  // --- Musique ---
  musique: {
    name: 'Musique',
    parent: 'root',
    children: ['mus1', 'mus2', 'mus3', 'mus4', 'mus5'],
  },
  mus1: { 
    name: 'M.O.O.N. - Dust.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track01.mp3' 
  },
  mus2: { 
    name: '憂鬱 - Sun.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track02.mp3' 
  },
  mus3: { 
    name: 'Lonely Lies, GOLDKID$ - Interlinked.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track03.mp3' 
  },
  mus4: { 
    name: 'Visitor - RnB.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track04.mp3' 
  },
  mus5: { 
    name: 'ILLENIUM - Fractures.mp3', 
    parent: 'musique', 
    type: 'file', 
    content: null, 
    musicFile: '/music/track05.mp3' 
  },

  // --- Images ---
  images: {
    name: 'Images',
    parent: 'root',
    children: ['img1', 'img2', 'img3', 'img4'],
  },
  img1: { 
    name: '1.jpg', 
    parent: 'images', 
    type: 'file', 
    content: null, 
    imageFile: '/images/1.jpg' 
  },
  img2: { 
    name: '2.jpg', 
    parent: 'images', 
    type: 'file', 
    content: null, 
    imageFile: '/images/2.jpg' 
  },
  img3: { 
    name: '3.jpg', 
    parent: 'images', 
    type: 'file', 
    content: null, 
    imageFile: '/images/3.jpg' 
  },
  img4: { 
    name: '4.jpg', 
    parent: 'images', 
    type: 'file', 
    content: null, 
    imageFile: '/images/4.jpg' 
  },
  // --- Autre ---
  important: {
    name: 'Important',
    parent: 'root',
    children: ['mdp'],
  },
  mdp: {
    name: 'Mots de passe.txt',
    parent: 'important',
    type: 'file',
    content: `MOTS DE PASSE — NE PAS PARTAGER
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ordinateur      : kiba2024
    Wi-Fi maison    : Magaishi#BunkyoCity
    MSN Messenger   : kiba.igarashi@hotmail.fr / kyoto1999
    Forum parkour   : CrocEcarlate / ********
    Compte banque   : [demander a maman]

    NOTE : Ryohei, si tu lis ca,
    rappelle-moi de changer mes mots de passe.
    Tu sais que je les oublie toujours.

    ... Ryo, reponds-moi.`
  }
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

export default function FileExplorer({ onOpenNotepad, onPlayMusic, onOpenImage, initialFolder = 'root' }) {
  const [currentFolder, setCurrentFolder] = useState(initialFolder)
  const [selectedItem, setSelectedItem] = useState(null)
  const [history, setHistory] = useState(() => {
    const path = []
    let cur = initialFolder
    while (cur) { path.unshift(cur); cur = FILE_TREE[cur]?.parent || null }
    return path
  })

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
    Sounds.navigate()
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
    if (node.name.endsWith('.mp3') && onPlayMusic) {
      onPlayMusic({ file: node.musicFile, title: node.name.replace('.mp3', '') })
    }
    if (node.name.match(/\.(png|jpg|jpeg|gif|bmp)$/i) && onOpenImage) {
      onOpenImage({ file: node.imageFile, name: node.name })
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
  const addressPath = history.map(id => FILE_TREE[id]?.name || id).join('\\')

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
          value={`C:\\Kiba\\${addressPath}`}
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
        <span>{`C:\\Kiba\\${addressPath}`}</span>
      </div>
    </div>
  )
}
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/PDA.scss'

import Snake from './Snake'
import JumpGame from './JumpGame'
import MediaPlayer from './MediaPlayer'

// ─── CONFIGURATION DES APPS PDA ──────────────────────────────────
const PDA_APPS = [
  { id: 'identite', label: 'Identité', icon: '◉' },
  { id: 'stats',    label: 'Pouvoir',  icon: '◆' },
  { id: 'histoire', label: 'Histoire', icon: '▤' },
  { id: 'contacts', label: 'Contacts', icon: '☰' },
]

const GAME_APPS = [
  { id: 'snake', label: 'Snake', icon: '§' },
  { id: 'jump',  label: 'Jump',  icon: '^' },
  { id: 'media', label: 'Media', icon: '♪' },
]

const PAGE_ORDER = ['identite', 'stats', 'histoire', 'contacts']

// ─── IDENTITÉ ────────────────────────────────────────────────────
const IDENTITY = {
  codename: 'KŌGA',
  fullName: 'Kiba Igarashi',
  alias: 'Croc Écarlate',
  age: 25,
  birth: '1999 • Kyoto',
  origin: 'Japon / Tokyo',
  clan: 'Magaishi (souche inférieure)',
  team: 'Bunkyo City Bolts',
  league: 'Tokyo Skyrunner League',
  rank: 'E',
  shokan: "Écho de l'âme",
  weight: '68 kg',
  height: '178 cm',
  blood: 'B+',
  handle: 'kiba.samurai99',
  email: 'kiba.igarashi@hotmail.fr',
}

// ─── DESCRIPTION PHYSIQUE (wiki) ──────────────────────────────────
const PHYSICAL = {
  intro: "Silhouette longiligne, sèche et nerveuse, taillée par des années de parkour et de rue. Plus rapide que fort, plus endurant qu'imposant.",
  traits: [
    ['CHEVEUX',  "Noir corbeau, mi-longs, mèches devant les yeux. Jamais coiffés."],
    ['YEUX',     "Brun foncé, presque noirs. Regard fixe, peu cligné."],
    ['PEAU',     "Mate, légèrement hâlée. Taches de poussière sur les avant-bras."],
    ['CARRURE',  "Épaules larges, torse étroit, jambes sèches. Mains calleuses."],
    ['VOIX',     "Grave, traînante, souvent basse. Rit rarement — ça surprend."],
    ['CICATRICES', "Arcade sourcilière gauche fendue. Phalanges abîmées. Brûlure ancienne sous la clavicule droite."],
    ['MARQUES',  "Tatouage du clan Magaishi sur l'omoplate droite. Le cache en permanence."],
    ['STYLE',    "Hoodies oversize, baggy, sneakers défoncées, bandana au cou. Téléphone toujours en main."],
  ],
}

// ─── PROFIL PSYCHOLOGIQUE (wiki) ──────────────────────────────────
const PSYCHO = {
  intro: "Classé froid par ceux qui le connaissent mal, loyal à en crever par ceux qui l'approchent vraiment. Méfiance apprise, pas innée.",
  traits: [
    ['TEMPÉRAMENT', "Laconique, sarcastique, distant. Préfère observer avant de parler."],
    ['QUALITÉS',    "Loyal, protecteur, ne ment pas aux siens. Courage calme sous pression."],
    ['DÉFAUTS',     "Rancunier, auto-destructeur, incapable d'accepter l'aide. Refuse toute autorité."],
    ['PEURS',       "Révéler ce qu'est vraiment son Shokan. Qu'il arrive quelque chose à Naoto ou Yuki."],
    ['MOTIVATION',  "Prouver que le rang E ne définit pas la puissance. Retrouver Ry0."],
    ['MBTI',        "ISTP — « virtuose » : pragmatique, indépendant, bon en situation de crise."],
    ['ALIGN.',      "Chaotique Neutre — propres règles, pas de bannière."],
  ],
}

const STATS_LIST = [
  { name: 'Perception', value: 94 },
  { name: 'Dextérité',  value: 85 },
  { name: 'Endurance',  value: 71 },
  { name: 'Force',      value: 62 },
  { name: 'Résistance', value: 68 },
  { name: 'Shokan',     value: 55 },
]

const VITALS = {
  level:  23,
  hp:     { cur: 847,  max: 1200  },
  energy: { cur: 340,  max: 500   },
  xp:     { cur: 7850, max: 10000 },
}

const ABILITIES = [
  { key: 'Q', name: 'Écho Fracturé',          cost: 45,  dur: '3s',
    desc: 'Onde résonnante en cône frontal. Fracture la cohérence des objets ciblés.' },
  { key: 'W', name: 'Vague de Syntonisation', cost: 80,  dur: '8s',
    desc: "Lien télépathique bref avec la cible ; ralentit ses réflexes." },
  { key: 'E', name: 'Résonance Sismique',     cost: 120, dur: '5s',
    desc: "Décharge ondulatoire circulaire : déstabilise et repousse les ennemis proches." },
  { key: 'R', name: 'Fréquence 528',          cost: 200, dur: '12s', ult: true,
    desc: "ULT — État de résonance pure. Perception amplifiée. Activable sous 40% PV." },
]

const HISTORY_CHAPTERS = [
  { id: 1, year: '1999 — KYOTO',      title: 'Naissance du Croc',
    body: "Kiba Igarashi naît à Kyoto, fils cadet de la branche subalterne du clan Magaishi. Dès l'enfance, on lui répète que son sang porte un Shokan faible, à peine digne du registre. Il apprend à se battre avant d'apprendre à parler." },
  { id: 2, year: '2012 — EXIL',       title: 'Départ du clan',
    body: "Refusant l'union arrangée imposée par les anciens, il quitte Kyoto à treize ans. Il rejoint Tokyo en stop et passe deux hivers dans les bas-fonds d'Ikebukuro, à voler, dormir et survivre. C'est là qu'il croise Ryo pour la première fois." },
  { id: 3, year: '2018 — LES BOLTS',  title: 'Bunkyo City Bolts',
    body: "Kiba intègre l'équipe de parkour des Bunkyo City Bolts, menée par Naoto. Son style hybride — boxe, lutte, taekwondo, capoeira — fait la réputation du crew. Il est repéré par la Tokyo Skyrunner League, mais reste classé rang E." },
  { id: 4, year: "2024 — L'ÉCHO",     title: "Écho de l'âme",
    body: "Son Shokan se révèle enfin : de son téléphone émergent des fragments éphémères — une main, un bras, une jambe — qui prolongent son intention dans un rayon de 3m. Quelque chose écoute, à travers lui. Et depuis, Yuki voit des ombres." },
  { id: 5, year: "AUJOURD'HUI",       title: 'Run de Toshima',
    body: "Course clandestine près d'Ikebukuro. De nouveaux crews cherchent à forcer la Ligue. Naoto a besoin de lui sur le pont de Maruyama à 23h. Kagami prévient : « Ne te retourne pas. »" },
]

// ─── CONTACTS & CONVERSATIONS (repris de MSN.jsx) ─────────────────
const CONTACTS_LIST = [
  { id: 'naoto',    name: 'naoto_07',      status: 'online',  role: 'BUNKYO CITY BOLTS',
    msg: 'Bunkyo City Bolts on TOP !',       note: "Journaliste indé. Leader du crew. Ami d'enfance." },
  { id: 'yuki',     name: 'YukiChan',      status: 'online',  role: 'MÉDIUM',
    msg: "j'en ai marre des exams...",       note: "Voyante. Camarade de lycée. Visions étranges autour de Kiba." },
  { id: 'kagami',   name: 'KagamiSpirit',  status: 'away',    role: 'INCONNU',
    msg: 'Le reflet ne ment jamais.',        note: "Contact non ajouté. Apparu seul. À surveiller." },
  { id: 'masahiro', name: 'MasaMasa',      status: 'offline', role: 'GROUPE DE MUSIQUE',
    msg: "Concert bientôt — Let's go !",     note: "Guitariste du groupe. Kiba y tient la batterie." },
  { id: 'ryo',      name: 'Ry0',           status: 'offline', role: 'DISPARU',
    msg: "[ne plus chercher]",               note: "Disparu depuis 2 mois. Dernier message : « ne me cherche pas »." },
]

const SELF = 'kiba.samurai99'

const CONVERSATIONS = {
  naoto: {
    date: "Aujourd'hui — 20:45",
    messages: [
      { from: 'naoto_07', text: "kiba !! t'as vu les nouvelles de ce soir ?", time: '20:45' },
      { from: SELF,       text: 'non, quoi encore',                            time: '20:46' },
      { from: 'naoto_07', text: 'ya une nouvelle course clandestine',          time: '20:46' },
      { from: 'naoto_07', text: 'et de nouveaux crews foutent le bordel pour entrer dans la ligue', time: '20:47' },
      { from: 'naoto_07', text: 'tu devrais lire mes articles de temps en temps -_-', time: '20:47' },
      { from: SELF,       text: 'je regarde sur ton site',                      time: '20:49' },
      { from: 'naoto_07', text: "j'ai besoin de toi sur ce coup",              time: '20:49' },
      { from: SELF,       text: 'laisse les se faire choper par les flics ou les clans', time: '20:50' },
      { from: 'naoto_07', text: "c'est ça... ^^",                               time: '20:50' },
      { from: 'naoto_07', text: "tu sais très bien qu'ils vont rien faire",     time: '20:51' },
      { from: SELF,       text: "j'avoue",                                      time: '20:51' },
      { from: 'naoto_07', text: "le run se passe à toshima, près d'ikebukuro", time: '20:52' },
      { from: SELF,       text: 'je me prépare',                                time: '20:52' },
      { from: 'naoto_07', text: 'je pars mtn ^^ rendez-vous au pont de maruyama. 23h.', time: '20:54' },
      { from: SELF,       text: 'ok',                                           time: '20:54' },
    ],
  },
  yuki: {
    date: "Aujourd'hui — 21:12",
    messages: [
      { from: 'YukiChan_☆', text: "KIBA !!! j'ai eu une vision ce matin omg", time: '21:12' },
      { from: 'YukiChan_☆', text: "c'était bizarre... tu étais là mais pas toi en même temps ??", time: '21:12' },
      { from: SELF,         text: 'une vision de quoi exactement',              time: '21:14' },
      { from: 'YukiChan_☆', text: 'une silhouette derrière toi. noire. mais familière', time: '21:15' },
      { from: SELF,         text: "qu'est-ce que tu racontes",                  time: '21:16' },
      { from: SELF,         text: "t'es chelou avec tes histoires de visions",  time: '21:17' },
      { from: 'YukiChan_☆', text: "dis moi que c'est rien ;_;",                 time: '21:18' },
      { from: SELF,         text: "c'est rien. oublie cette vision.",           time: '21:18' },
      { from: 'YukiChan_☆', text: '... :/ tu mens très mal tu sais xD',         time: '21:19' },
      { from: SELF,         text: 'passe une bonne nuit yuki',                  time: '21:20' },
      { from: 'YukiChan_☆', text: 'toi aussi... fais attention à toi stp ;_;',  time: '21:20' },
    ],
  },
  kagami: {
    date: 'Hier — 22:01',
    messages: [
      { from: 'KagamiSpirit', text: 'Le reflet ne ment jamais.',                time: '22:01' },
      { from: SELF,           text: "t'es qui toi",                             time: '22:01' },
      { from: 'KagamiSpirit', text: 'Ce que tu portes... il le sent aussi.',    time: '22:02' },
      { from: 'KagamiSpirit', text: 'Méfie-toi de ton ombre.',                  time: '22:02' },
      { from: SELF,           text: "de quoi tu parles. je t'ai jamais ajouté", time: '22:03' },
      { from: 'KagamiSpirit', text: 'Bientôt. Le voile est fin cette nuit.',    time: '22:03' },
      { from: 'KagamiSpirit', text: 'Ne te retourne pas.',                      time: '22:04', italic: true },
      { from: 'system',       text: '[KagamiSpirit est injoignable]',           time: '22:04' },
    ],
  },
  masahiro: {
    date: "Aujourd'hui — 21:01",
    messages: [
      { from: '♫-MasaMasa-♫', text: 'Hello mon batteur préféré~~',              time: '21:01' },
      { from: SELF,           text: 'yo',                                       time: '21:01' },
      { from: '♫-MasaMasa-♫', text: "On organise une répét' jeudi avec le groupe", time: '21:02' },
      { from: '♫-MasaMasa-♫', text: 'Ça te dit de jouer avec nous ?',           time: '21:02' },
      { from: SELF,           text: 'wakatsuru est encore malade ?',            time: '21:06' },
      { from: '♫-MasaMasa-♫', text: 'Non pas cette fois',                       time: '21:08' },
      { from: '♫-MasaMasa-♫', text: "Depuis qu'il sort avec Reina-chan, il vient plus trop", time: '21:08' },
      { from: SELF,           text: "c'est con",                                time: '21:10' },
      { from: SELF,           text: 'quelle heure',                             time: '21:10' },
      { from: '♫-MasaMasa-♫', text: 'On sait pas encore',                       time: '21:11' },
      { from: '♫-MasaMasa-♫', text: 'Je te dis ça demain, ok ?',                time: '21:11' },
      { from: SELF,           text: 'ok mais je promets rien',                  time: '21:12' },
      { from: '♫-MasaMasa-♫', text: 'Je compte sur toi~ à demain',              time: '21:12' },
      { from: SELF,           text: 'a+',                                       time: '21:15' },
      { from: 'system',       text: '[♫-MasaMasa-♫ est déconnecté]' },
    ],
  },
  ryo: {
    date: 'Il y a 2 mois',
    messages: [
      { from: 'Ry0',    text: 'ya un truc bizarre qui se prepare',              time: '14:22' },
      { from: 'Ry0',    text: 'je dois disparaître un moment',                  time: '14:23' },
      { from: SELF,     text: 'quoi ? pourquoi',                                time: '14:23' },
      { from: 'Ry0',    text: 'tu comprendras plus tard.',                      time: '14:24' },
      { from: 'Ry0',    text: 'ne me cherche pas.',                             time: '14:24' },
      { from: SELF,     text: "ryo. qu'est-ce qui se passe vraiment",           time: '14:25' },
      { from: 'system', text: '[CONNEXION PERDUE]',                             time: '14:25' },
      { from: 'system', text: "Ry0 n'est plus en ligne depuis 2 mois." },
    ],
  },
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────
export default function PDAView() {
  const [currentApp, setCurrentApp] = useState('home')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [battery] = useState(48)
  // États d'alimentation : 'off' (éteint) → 'booting' (démarre) → 'on' (allumé)
  const [powerState, setPowerState] = useState('off')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
      setDate(`${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`)
    }
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (powerState !== 'booting') return
    const timer = setTimeout(() => setPowerState('on'), 2500)
    return () => clearTimeout(timer)
   }, [powerState])

  const handlePowerToggle = () => {
    if (powerState === 'off')      setPowerState('booting')
    else if (powerState === 'on')  { setPowerState('off'); setCurrentApp('home') }
    // Si 'booting' → ignore
  }

  const navigateTo = (appId) => setCurrentApp(appId)

  const cycleOffset = (offset) => {
    const idx = PAGE_ORDER.indexOf(currentApp)
    if (idx === -1) return
    const next = (idx + offset + PAGE_ORDER.length) % PAGE_ORDER.length
    setCurrentApp(PAGE_ORDER[next])
  }
  const isCyclable = PAGE_ORDER.includes(currentApp)

  const renderAppContent = () => {
    switch (currentApp) {
      case 'home':     return <PDAHomeScreen apps={PDA_APPS} onAppSelect={navigateTo} date={date} />
      case 'identite': return <PDAIdentity />
      case 'stats':    return <PDAStats />
      case 'histoire': return <PDAHistoire />
      case 'contacts': return <PDAContacts />
      case 'games':    return <PDAHomeScreen apps={GAME_APPS} onAppSelect={navigateTo} title="Jeux & Media" subtitle="// DIVERTISSEMENT" date={date} />
      case 'snake':    return <Snake />
      case 'jump':     return <JumpGame />
      case 'media':    return <MediaPlayer />
      default:         return null
    }
  }

  const getAppTitle = () => {
    const app = [...PDA_APPS, ...GAME_APPS].find(a => a.id === currentApp)
    if (currentApp === 'games') return 'Jeux'
    return app?.label || 'KIBA.PDA'
  }

  if (powerState === 'off') {
    return (
      <PDAShell
        powerState="off"
        onPower={handlePowerToggle}
        currentApp={currentApp}
        navigateTo={navigateTo}
      />
    )
  }

  if (powerState === 'booting') {
    return (
      <PDAShell
        powerState="booting"
        onPower={handlePowerToggle}
        currentApp={currentApp}
        navigateTo={navigateTo}
      />
    )
  }

  return (
    <div className="pda" data-testid="pda-view">
      <div className="pda__frame">
        <div className="pda__screen">
          <div key="on" className="pda__screen-inner">
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

            {/* Contenu */}
            <div className="pda__content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentApp}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.18 }}
                  className="pda__app-container"
                >
                  {renderAppContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav Bar : ◂ gauche | ● Menu centre | ▸ droite */}
            <div className="pda__navbar">
              <button
                className="pda__nav-arrow"
                onClick={() => cycleOffset(-1)}
                disabled={!isCyclable}
                data-testid="pda-prev"
                title="Page précédente"
              >◂</button>

              <button
                className="pda__nav-btn pda__nav-btn--home"
                onClick={() => navigateTo('home')}
                data-testid="pda-home"
              >● Menu</button>

              <button
                className="pda__nav-arrow"
                onClick={() => cycleOffset(1)}
                disabled={!isCyclable}
                data-testid="pda-next"
                title="Page suivante"
              >▸</button>
            </div>
          </div>
        </div>

        {/* Boutons physiques : 2 raccourcis | POWER | 2 raccourcis */}
        <PDAButtonsRow
          currentApp={currentApp}
          navigateTo={navigateTo}
          onPower={handlePowerToggle}
          powerOn
        />

        <div className="pda__brand">
          <span>PYR//TECH</span>
          <small>PDA-98</small>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ROW DE BOUTONS PHYSIQUES (2 raccourcis + POWER + 2 raccourcis)
// ═══════════════════════════════════════════════════════════════════
function PDAButtonsRow({ currentApp, navigateTo, onPower, powerOn = false }) {
  return (
    <div className="pda__buttons">
      {PDA_APPS.slice(0, 2).map((app, i) => (
        <div
          key={app.id}
          className={`pda__button ${currentApp === app.id ? 'pda__button--active' : ''}`}
          onClick={() => navigateTo && navigateTo(app.id)}
          title={app.label}
          data-testid={`pda-hw-btn-${app.id}`}
        >
          <span>{i + 1}</span>
        </div>
      ))}

      <button
        type="button"
        className={`pda__button pda__button--power ${powerOn ? 'pda__button--power-on' : ''}`}
        onClick={onPower}
        title={powerOn ? 'Éteindre' : 'Allumer'}
        aria-label="Bouton d'alimentation"
        data-testid="pda-hw-btn-power"
      >
        <span className="pda__power-glyph">⏻</span>
      </button>

      {PDA_APPS.slice(2).map((app, i) => (
        <div
          key={app.id}
          className={`pda__button ${currentApp === app.id ? 'pda__button--active' : ''}`}
          onClick={() => navigateTo && navigateTo(app.id)}
          title={app.label}
          data-testid={`pda-hw-btn-${app.id}`}
        >
          <span>{i + 3}</span>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ÉCRAN D'ACCUEIL
// ═══════════════════════════════════════════════════════════════════
function PDAHomeScreen({ apps, onAppSelect, title = 'KIBA.PDA', subtitle = '// MENU PRINCIPAL', date }) {
  return (
    <div className="pda-home">
      <div className="pda-home__header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
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
      <div className="pda-home__footer" data-testid="pda-home-date">
        <span className="pda-home__date-label">DATE SYSTÈME</span>
        <span className="pda-home__date-val">{date}</span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// IMAGE VERTE (canvas + dithering Floyd-Steinberg, palette LCD 4 niveaux)
// ═══════════════════════════════════════════════════════════════════
function PDAGreenImage({ src, width = 132, height = 150 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      ctx.imageSmoothingEnabled = false
      // Remplit d'abord en fond sombre
      ctx.fillStyle = '#0a1a0a'
      ctx.fillRect(0, 0, width, height)

      // Dessine l'image en "cover"
      const ratio = Math.max(width / img.width, height / img.height)
      const w = img.width * ratio
      const h = img.height * ratio
      ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h)

      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      // Palette LCD (4 niveaux de vert, du sombre au clair)
      const palette = [
        [10, 26, 10],    // lcd-shadow
        [26, 136, 51],   // lcd-text-dim
        [51, 255, 102],  // lcd-text
        [68, 255, 119],  // lcd-highlight
      ]

      // Grayscale buffer
      const gray = new Float32Array(width * height)
      for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      }

      // Floyd-Steinberg → 4 levels
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x
          const oldV = gray[idx]
          const level = Math.max(0, Math.min(3, Math.round((oldV / 255) * 3)))
          const newV = (level / 3) * 255
          const err = oldV - newV

          if (x + 1 < width)                       gray[idx + 1]         += err * 7 / 16
          if (y + 1 < height) {
            if (x > 0)         gray[idx + width - 1] += err * 3 / 16
                               gray[idx + width]     += err * 5 / 16
            if (x + 1 < width) gray[idx + width + 1] += err * 1 / 16
          }

          const color = palette[level]
          const p = idx * 4
          data[p]     = color[0]
          data[p + 1] = color[1]
          data[p + 2] = color[2]
          data[p + 3] = 255
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }

    img.onerror = () => {
      // Fallback : trame verte si l'image ne charge pas
      ctx.fillStyle = '#1a2b1a'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = '#1a8833'
      ctx.font = '10px "Pixelify Sans", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('[NO IMG]', width / 2, height / 2)
    }

    img.src = src
  }, [src, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="pda-img"
      data-testid="pda-portrait"
    />
  )
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : IDENTITÉ
// ═══════════════════════════════════════════════════════════════════
function PDAIdentity() {
  const rows = [
    ['NOM',     IDENTITY.fullName],
    ['ALIAS',   `"${IDENTITY.alias}"`],
    ['ÂGE',     `${IDENTITY.age} ans`],
    ['NAISS.',  IDENTITY.birth],
    ['ORIGINE', IDENTITY.origin],
    ['CLAN',    IDENTITY.clan],
    ['ÉQUIPE',  IDENTITY.team],
    ['LIGUE',   IDENTITY.league],
    ['RANG',    `${IDENTITY.rank}  (shokan faible)`],
    ['SHOKAN',  IDENTITY.shokan],
    ['TAILLE',  IDENTITY.height],
    ['POIDS',   IDENTITY.weight],
    ['SANG',    IDENTITY.blood],
    ['@',       IDENTITY.handle],
    ['MAIL',    IDENTITY.email],
  ]

  return (
    <div className="pda-page" data-testid="pda-page-identite">
      <div className="pda-page__title">&gt; IDENTITE.DAT</div>

      <div className="pda-id__head">
        <div className="pda-id__avatar">
          <PDAGreenImage src="/images/4.jpg" width={132} height={150} />
          <div className="pda-id__codename">// {IDENTITY.codename}</div>
        </div>
        <div className="pda-id__tag">
          <div className="pda-id__label">REGISTRE SHOKAN</div>
          <div className="pda-id__value">#MAG-0482-E</div>
          <div className="pda-id__label" style={{ marginTop: 8 }}>STATUT</div>
          <div className="pda-id__value pda-id__value--ok">▣ ACTIF</div>
        </div>
      </div>

      <div className="pda-page__section">[ FICHE SUJET ]</div>
      <table className="pda-table">
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <td className="pda-table__k">{k}</td>
              <td className="pda-table__sep">:</td>
              <td className="pda-table__v">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pda-page__note">
        &gt; Évaluation clan : « puissance négligeable ».
        <br />&gt; Évaluation terrain : <strong>à reconsidérer.</strong>
      </div>

      {/* ── DESCRIPTION PHYSIQUE ─────────────────── */}
      <div className="pda-page__section">[ DESCRIPTION PHYSIQUE ]</div>
      <p className="pda-wiki__intro">{PHYSICAL.intro}</p>
      <dl className="pda-wiki">
        {PHYSICAL.traits.map(([k, v]) => (
          <div key={k} className="pda-wiki__row">
            <dt className="pda-wiki__k">{k}</dt>
            <dd className="pda-wiki__v">{v}</dd>
          </div>
        ))}
      </dl>

      {/* ── PROFIL PSYCHOLOGIQUE ─────────────────── */}
      <div className="pda-page__section">[ PROFIL PSYCHOLOGIQUE ]</div>
      <p className="pda-wiki__intro">{PSYCHO.intro}</p>
      <dl className="pda-wiki">
        {PSYCHO.traits.map(([k, v]) => (
          <div key={k} className="pda-wiki__row">
            <dt className="pda-wiki__k">{k}</dt>
            <dd className="pda-wiki__v">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : STATS / POUVOIR
// ═══════════════════════════════════════════════════════════════════
function PDAStats() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const pct = (v, m) => Math.round((v / m) * 100)

  return (
    <div className="pda-page" data-testid="pda-page-stats">
      <div className="pda-page__title">&gt; POWER.SYS</div>

      <div className="pda-page__section">[ VITALS ]</div>
      <div className="pda-vitals">
        <VitalRow label="LVL" value={VITALS.level} pctValue={0} hideBar />
        <VitalRow label="PV"  value={VITALS.hp.cur}     max={VITALS.hp.max}     pctValue={mounted ? pct(VITALS.hp.cur,     VITALS.hp.max)     : 0} />
        <VitalRow label="EN"  value={VITALS.energy.cur} max={VITALS.energy.max} pctValue={mounted ? pct(VITALS.energy.cur, VITALS.energy.max) : 0} />
        <VitalRow label="XP"  value={VITALS.xp.cur}     max={VITALS.xp.max}     pctValue={mounted ? pct(VITALS.xp.cur,     VITALS.xp.max)     : 0} />
      </div>

      <div className="pda-page__section">[ STATISTIQUES ]</div>
      <div className="pda-stats">
        {STATS_LIST.map(s => (
          <div key={s.name} className="pda-stat">
            <span className="pda-stat__name">{s.name.toUpperCase()}</span>
            <span className="pda-stat__bar">
              <BlockBar value={mounted ? s.value : 0} />
            </span>
            <span className="pda-stat__val">{s.value.toString().padStart(3, '0')}</span>
          </div>
        ))}
      </div>

      <div className="pda-page__section">[ SHOKAN // ÉCHO DE L'ÂME ]</div>
      <div className="pda-shokan">
        <p>
          Manifestation éphémère de fragments — main, bras, jambe —
          dans un rayon de <strong>3 m</strong>. Durée : <strong>1–2 s</strong>.
          Frappe égale à celle du porteur. Pas d'amplification.
        </p>
      </div>

      <div className="pda-page__section">[ CAPACITÉS ]</div>
      <div className="pda-abilities">
        {ABILITIES.map(a => (
          <div key={a.key} className={`pda-ab ${a.ult ? 'pda-ab--ult' : ''}`} data-testid={`pda-ability-${a.key}`}>
            <div className="pda-ab__key">{a.key}</div>
            <div className="pda-ab__body">
              <div className="pda-ab__head">
                <span className="pda-ab__name">{a.name}</span>
                <span className="pda-ab__meta">EN:{a.cost} · {a.dur}</span>
              </div>
              <p className="pda-ab__desc">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VitalRow({ label, value, max, pctValue = 0, hideBar = false }) {
  return (
    <div className="pda-vital">
      <span className="pda-vital__label">{label}</span>
      {!hideBar && (
        <span className="pda-vital__bar">
          <BlockBar value={pctValue} />
        </span>
      )}
      <span className={`pda-vital__val ${hideBar ? 'pda-vital__val--big' : ''}`}>
        {value}{max ? <span className="pda-vital__max">/{max}</span> : ''}
      </span>
    </div>
  )
}

function BlockBar({ value = 0, total = 20 }) {
  const filled = Math.round((value / 100) * total)
  return (
    <span className="pda-blockbar" aria-label={`${value}%`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`pda-blockbar__cell ${i < filled ? 'pda-blockbar__cell--on' : ''}`}
        />
      ))}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : HISTOIRE
// ═══════════════════════════════════════════════════════════════════
function PDAHistoire() {
  const [openId, setOpenId] = useState(1)

  return (
    <div className="pda-page" data-testid="pda-page-histoire">
      <div className="pda-page__title">&gt; HISTORY.LOG</div>
      <div className="pda-page__subtitle">5 entrées — tri chronologique</div>

      <ul className="pda-history">
        {HISTORY_CHAPTERS.map(ch => {
          const open = openId === ch.id
          return (
            <li key={ch.id} className={`pda-chap ${open ? 'pda-chap--open' : ''}`}>
              <button
                className="pda-chap__head"
                onClick={() => setOpenId(open ? null : ch.id)}
                data-testid={`pda-chap-${ch.id}`}
              >
                <span className="pda-chap__marker">{open ? '▼' : '▶'}</span>
                <span className="pda-chap__year">{ch.year}</span>
                <span className="pda-chap__title">{ch.title}</span>
              </button>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className="pda-chap__body"
                >
                  <p>{ch.body}</p>
                </motion.div>
              )}
            </li>
          )
        })}
      </ul>

      <div className="pda-page__note">&gt; Fin du journal — EOF_</div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : CONTACTS
// ═══════════════════════════════════════════════════════════════════
function PDAContacts() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return <PDAContactDetail contact={selected} onBack={() => setSelected(null)} />
  }

  const online  = CONTACTS_LIST.filter(c => c.status === 'online' || c.status === 'away')
  const offline = CONTACTS_LIST.filter(c => c.status === 'offline')

  return (
    <div className="pda-page" data-testid="pda-page-contacts">
      <div className="pda-page__title">&gt; CONTACTS.ADB</div>
      <div className="pda-page__subtitle">
        {CONTACTS_LIST.length} entrée(s) — {online.length} en ligne
      </div>

      <div className="pda-page__section">[ EN LIGNE ]</div>
      <ul className="pda-contacts">
        {online.map(c => (
          <ContactRow key={c.id} contact={c} onClick={() => setSelected(c)} />
        ))}
      </ul>

      <div className="pda-page__section">[ HORS LIGNE ]</div>
      <ul className="pda-contacts">
        {offline.map(c => (
          <ContactRow key={c.id} contact={c} onClick={() => setSelected(c)} />
        ))}
      </ul>
    </div>
  )
}

function ContactRow({ contact, onClick }) {
  const icon = contact.status === 'online' ? '●'
             : contact.status === 'away'   ? '◐'
             : '○'
  return (
    <li
      className={`pda-contact pda-contact--${contact.status}`}
      onClick={onClick}
      data-testid={`pda-contact-${contact.id}`}
    >
      <span className="pda-contact__dot">{icon}</span>
      <span className="pda-contact__body">
        <span className="pda-contact__name">{contact.name}</span>
        <span className="pda-contact__msg">{contact.msg || '—'}</span>
      </span>
      <span className="pda-contact__chev">▸</span>
    </li>
  )
}

function PDAContactDetail({ contact, onBack }) {
  const statusLabel = {
    online:  'EN LIGNE',
    away:    'ABSENT',
    offline: 'HORS LIGNE',
  }[contact.status]

  const conv = CONVERSATIONS[contact.id]

  return (
    <div className="pda-page" data-testid={`pda-contact-detail-${contact.id}`}>
      <div className="pda-page__title">&gt; {contact.name.toUpperCase()}.VCF</div>

      <div className="pda-detail">
        <div className="pda-detail__row">
          <span className="pda-detail__k">STATUT</span>
          <span className={`pda-detail__v pda-detail__v--${contact.status}`}>
            ● {statusLabel}
          </span>
        </div>
        <div className="pda-detail__row">
          <span className="pda-detail__k">RÔLE</span>
          <span className="pda-detail__v">{contact.role}</span>
        </div>
        <div className="pda-detail__row">
          <span className="pda-detail__k">PSEUDO</span>
          <span className="pda-detail__v">{contact.name}</span>
        </div>
        <div className="pda-detail__row">
          <span className="pda-detail__k">MESSAGE</span>
          <span className="pda-detail__v">{contact.msg || '—'}</span>
        </div>

        <div className="pda-page__section" style={{ marginTop: 14 }}>[ NOTE ]</div>
        <p className="pda-detail__note">{contact.note}</p>

        {/* Conversation */}
        {conv && (
          <>
            <div className="pda-page__section" style={{ marginTop: 14 }}>
              [ CONVERSATION ]
            </div>
            <div className="pda-conv" data-testid={`pda-conv-${contact.id}`}>
              {conv.date && <div className="pda-conv__date">— {conv.date} —</div>}
              {conv.messages.map((m, i) => {
                if (m.from === 'system') {
                  return (
                    <div key={i} className="pda-conv__sys">{m.text}</div>
                  )
                }
                const isSelf = m.from === SELF
                return (
                  <div key={i} className={`pda-conv__msg ${isSelf ? 'pda-conv__msg--self' : ''}`}>
                    <div className="pda-conv__head">
                      <span className="pda-conv__from">
                        {isSelf ? 'kiba' : contact.name}
                      </span>
                      {m.time && <span className="pda-conv__time">{m.time}</span>}
                    </div>
                    <div className={`pda-conv__text ${m.italic ? 'pda-conv__text--italic' : ''}`}>
                      &gt; {m.text}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        <button className="pda-btn" onClick={onBack} data-testid="pda-contact-back">
          ◀ Liste des contacts
        </button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// SHELL (écran éteint OU boot) — même frame + même bouton power
// ═══════════════════════════════════════════════════════════════════
function PDAShell({ powerState, onPower, currentApp, navigateTo }) {
  return (
    <div className={`pda ${powerState === 'booting' ? 'pda--boot' : 'pda--off'}`} data-testid={`pda-${powerState}`}>
      <div className="pda__frame">
        <div className={`pda__screen ${powerState === 'booting' ? 'pda__screen--boot' : 'pda__screen--off'}`}>
          <div key={powerState} className="pda__screen-inner">
            {powerState === 'booting' && <div className="pda__scanlines" />}
            {powerState === 'off' && (
              <div className="pda-off" data-testid="pda-off-screen">
                {/* Reflet diagonal sur écran éteint */}
                <div className="pda-off__reflect" />
                <div className="pda-off__hint">
                  <div className="pda-off__hint-text">
                    — appuyer sur ⏻ pour allumer —
                  </div>
                </div>
              </div>
            )}
            {powerState === 'booting' && <PDABootScreen />}
          </div>
        </div>

        <PDAButtonsRow
          currentApp={currentApp}
          navigateTo={navigateTo}
          onPower={onPower}
          powerOn={powerState !== 'off'}
        />

        <div className="pda__brand">
          <span>PYR//TECH</span>
          <small>PDA-98</small>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// BOOT SCREEN
// ═══════════════════════════════════════════════════════════════════
function PDABootScreen() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const id = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pda-boot">
      <div className="pda-boot__logo">
        <span>PYR//</span>
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
        <p className="pda-boot__version">v2.5b — © 2000 Shokan no Kishi</p>  
      </div>
    </div>
  )
}
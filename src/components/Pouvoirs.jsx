import { useState, useEffect, useRef } from 'react'
import '../styles/Pouvoirs.scss'

// ─── TYPEWRITER HOOK ──────────────────────────────────────────────
function useTypewriter(text, speed = 22, startDelay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(intervalRef.current)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeoutRef.current)
      clearInterval(intervalRef.current)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

// ─── DATA ─────────────────────────────────────────────────────────
const STATS = [
  { 
    name: 'Perception', 
    value: 94, 
    color: '#bfff44' 
  },
  { 
    name: 'Dextérité',  
    value: 85, 
    color: '#44d4ff' 
  },
  { 
    name: 'Endurance',  
    value: 71, 
    color: '#ff9944' 
  },
  { 
    name: 'Force',      
    value: 62, 
    color: '#ff4466' 
  },
  { 
    name: 'Résistance', 
    value: 68, 
    color: '#cc44ff' 
  },
  { 
    name: 'Shokan',     
    value: 55, 
    color: '#44ffb0' 
  },
]

const HP     = { current: 847,  max: 1200 }
const ENERGY = { current: 340,  max: 500  }
const XP     = { current: 7850, max: 10000 }
const LEVEL  = 23

const SPELLS = [
  {
    id: 1, key: 'Q',
    name: 'Écho Fracturé',
    icon: '/images/spell-1.jpg',
    cost: 45, duration: '3s',
    desc: "Projette une onde de résonance concentrée qui fracture la cohérence des objets ciblés dans un cône frontal.",
  },
  {
    id: 2, key: 'W',
    name: 'Vague de Syntonisation',
    icon: '/images/spell-2.jpg',
    cost: 80, duration: '8s',
    desc: "Harmonise les fréquences d'Isen avec sa cible, créant un lien télépathique temporaire et ralentissant ses réflexes.",
  },
  {
    id: 3, key: 'E',
    name: 'Résonance Sismique',
    icon: '/images/spell-3.jpg',
    cost: 120, duration: '5s',
    desc: "Libère une décharge d'énergie ondulatoire en zone circulaire, déstabilisant et repoussant tous les ennemis proches.",
  },
  {
    id: 4, key: 'R',
    name: 'Fréquence 528',
    icon: '/images/spell-4.jpg',
    cost: 200, duration: '12s',
    ultimate: true,
    desc: "ULTIME — Isen entre en état de résonance pure à 528 Hz. Toutes ses capacités sont amplifiées et elle perçoit les failles cachées du réel. Ne peut être activé qu'en dessous de 40% PV.",
  },
]

const HEADER_TEXT = '// ISEN PROJECT :: REGISTRE DE COMBAT //  CLIENT v2.4.1 — PATCH 0.9.7'

// ─── RADAR GEOMETRY ───────────────────────────────────────────────
const CX = 110, CY = 108, R = 72
const ANGLES   = STATS.map((_, i) => -Math.PI / 2 + (2 * Math.PI * i) / 6)
const OUTER_PTS = ANGLES.map(a => ({ x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }))
const DATA_PTS  = STATS.map((s, i) => ({
  x: CX + R * (s.value / 100) * Math.cos(ANGLES[i]),
  y: CY + R * (s.value / 100) * Math.sin(ANGLES[i]),
}))
const RINGS  = [0.25, 0.5, 0.75, 1.0]
const toPoly = pts => pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function Pouvoirs() {
  const [mounted, setMounted] = useState(false)
  const [barsOn,  setBarsOn]  = useState(false)

  const { displayed: headerText, done: headerDone } = useTypewriter(HEADER_TEXT, 20, 80)

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 60)
    const t2 = setTimeout(() => setBarsOn(true),  420)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const animCls = (cls) => mounted ? cls : 'pv-hidden'

  return (
    <div className="pouvoirs" data-testid="pouvoirs">

      {/* ── Header typewriter ─────────────────── */}
      <div className={`gp__header ${animCls('pv-fade-down')}`} data-testid="pouvoirs-header">
        <span className="gp__header-title">
          {headerText}
          {!headerDone && <span className="pouvoirs__cursor">_</span>}
        </span>
        <span className="gp__header-ver">
          SESSION: {new Date().toLocaleDateString('fr-FR')}
        </span>
      </div>

      {/* ── Body ─────────────────────────────── */}
      <div className="gp__body">

        {/* ── Left column ───────────────────── */}
        <div className={`gp__left ${animCls('pv-slide-left')}`}>

          {/* Portrait */}
          <div className={`gp__portrait-frame ${animCls('pv-portrait-in')}`}>
            <span className="gp__lvl-badge">NIV.{LEVEL}</span>
            <img src="/images/pose.png" alt="Isen Hata" className="gp__portrait" />
            <div className="gp__char-name">ISEN HATA</div>
            <div className="gp__char-class">Classe : Combattant ★★★</div>
          </div>

          {/* Barres PV / EN / XP */}
          <div className="gp__bars">
            {[
              { label: 'PV', cur: HP.current,     max: HP.max,     mod: 'hp'     },
              { label: 'EN', cur: ENERGY.current,  max: ENERGY.max, mod: 'energy' },
              { label: 'XP', cur: XP.current,      max: XP.max,     mod: 'xp'     },
            ].map(b => (
              <div key={b.label} className="gp__bar-row">
                <span className="gp__bar-label">{b.label}</span>
                <div className="gp__bar-track">
                  <div
                    className={`gp__bar-fill gp__bar-fill--${b.mod}`}
                    style={{
                      width: barsOn ? `${(b.cur / b.max) * 100}%` : '0%',
                      transition: 'width 1.3s cubic-bezier(0.08, 0.92, 0.3, 1)',
                    }}
                  />
                </div>
                <span className="gp__bar-nums">
                  {b.cur}<span className="gp__bar-max">/{b.max}</span>
                </span>
              </div>
            ))}
          </div>

          {/* ── Radar + stats (déplacé ici) ─── */}
          <div className="gp__panel">
            <div className="gp__section-lbl">[ STATISTIQUES DE COMBAT ]</div>
            <div className="gp__radar-row">
              <svg className={`gp__radar-svg ${animCls('pv-radar')}`} viewBox="0 0 220 216">
                {/* Grille */}
                {RINGS.map((s, ri) => (
                  <polygon
                    key={ri}
                    points={toPoly(OUTER_PTS.map(p => ({
                      x: CX + (p.x - CX) * s,
                      y: CY + (p.y - CY) * s,
                    })))}
                    fill="none"
                    stroke={s === 1 ? '#e8c147' : '#23243a'}
                    strokeWidth={s === 1 ? 1.2 : 0.6}
                  />
                ))}
                {/* Axes */}
                {OUTER_PTS.map((p, i) => (
                  <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#23243a" strokeWidth="0.6" />
                ))}
                {/* Polygone de données */}
                <polygon
                  points={toPoly(DATA_PTS)}
                  fill="rgba(76,200,255,0.12)"
                  stroke="#4cc8ff"
                  strokeWidth="1.2"
                />
                {/* Points */}
                {DATA_PTS.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={STATS[i].color} />
                ))}
                {/* Labels */}
                {STATS.map((s, i) => {
                  const lx = CX + (R + 17) * Math.cos(ANGLES[i])
                  const ly = CY + (R + 17) * Math.sin(ANGLES[i])
                  return (
                    <text
                      key={i}
                      x={lx.toFixed(1)} y={ly.toFixed(1)}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="#e8c147" fontSize="8" fontFamily="Courier New"
                    >
                      {s.name}
                    </text>
                  )
                })}
              </svg>
            </div>
          </div>

        </div>

        {/* ── Right column ──────────────────── */}
        <div className={`gp__right ${animCls('pv-slide-right')}`}>

          {/* ── Dossier sujet (déplacé ici) ─── */}
          <div className="gp__dossier">
            <div className="gp__section-lbl">[ DOSSIER SUJET ]</div>

            <p className={`gp__dossier-p ${animCls('pv-para-1')}`}>
              Isen Hata est une <strong>Résonante de classe 3</strong> — une rare
              catégorie d'individus capables d'interagir directement avec les fréquences
              ondulatoires du monde. Son pouvoir, la{' '}
              <strong>Résonance Active</strong>, lui permet d'émettre, percevoir et
              moduler des ondes invisibles à 528 Hz, affectant matière, perception et
              conscience à distance variable.
            </p>

            <p className={`gp__dossier-p ${animCls('pv-para-2')}`}>
              <strong>Limites :</strong> chaque activation consomme de l'énergie
              biologique. À court d'énergie, ses sens se retournent contre elle —
              surcharge sensorielle, douleur aiguë, désorientation. Ses sorts de zone la
              rendent temporairement <em>aveugle aux fréquences</em>, l'exposant aux
              contre-attaques.
            </p>

            <p className={`gp__dossier-p ${animCls('pv-para-3')}`}>
              <strong>Subtilité :</strong> son ultime <em>Fréquence 528</em> ne peut
              être activé que lorsque ses PV sont inférieurs à 40 %. Plus elle est
              fragilisée, plus son amplitude de résonance est puissante — un état que
              certains adversaires apprennent à redouter.
            </p>
          </div>

          {/* Sorts / Capacités */}
          <div className="gp__panel gp__panel--spells">
            <div className="gp__section-lbl">[ CAPACITÉS ]</div>
            <div className="gp__spells">
              {SPELLS.map((sp, i) => (
                <div
                  key={sp.id}
                  className={`gp__spell ${sp.ultimate ? 'gp__spell--ult' : ''} ${animCls(`pv-spell-${i}`)}`}
                  data-testid={`pouvoirs-spell-${sp.id}`}
                >
                  <div className="gp__spell-ico-wrap">
                    <img
                      src={sp.icon}
                      alt={sp.name}
                      className="gp__spell-ico"
                      onError={e => { e.target.style.opacity = '0' }}
                    />
                    <span className="gp__spell-key">{sp.key}</span>
                  </div>
                  <div className="gp__spell-body">
                    <div className="gp__spell-name">{sp.name}</div>
                    <div className="gp__spell-meta">
                      <span className="gp__spell-cost">EN : {sp.cost}</span>
                      <span className="gp__spell-dur">{sp.duration}</span>
                    </div>
                    <p className="gp__spell-desc">{sp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
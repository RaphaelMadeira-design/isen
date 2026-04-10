import { useState, useEffect, useCallback } from 'react'
import '../styles/Browser.scss'

const IE_ICON = 'https://win98icons.alexmeub.com/icons/png/search_web-0.png'
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const SECRET_SEARCHES = ['isen', 'résonance', 'resonance', 'éveil', 'eveil', 'mémoire', 'memoire', 'fréquence', 'frequence', '528', 'hata', 'raphurst', 'academia']
const SECRET_URLS = ['isen://core', 'isen://secret', 'about:isen', 'isen://memories']

// ── Pages secrètes ───────────────────────────────────────────────

const FRAGMENTS = [
  { text: '> CONNEXION ÉTABLIE — PROTOCOLE ISEN v0.0.1', cmd: true, delay: 0 },
  { text: '> Chargement CORE_DUMP.exe...', cmd: true, delay: 280 },
  { text: '> Lecture des fragments mémoire...', cmd: true, delay: 560 },
  { text: '', delay: 840 },
  { text: ' [FRAGMENT #001] ████████████████████ [CORROMPU]', frag: true, delay: 1120 },
  { text: ' [FRAGMENT #002] "...ils ne savent pas ce que j\'ai perçu ce soir-là."', frag: true, delay: 1400 },
  { text: ' [FRAGMENT #003] ████████████ [DATE EFFACÉE]', frag: true, delay: 1680 },
  { text: ' [FRAGMENT #004] "la résonance était là avant moi. avant nous tous."', frag: true, delay: 1960 },
  { text: ' [FRAGMENT #005] ████ [ACCÈS REFUSÉ — NIVEAU 5]', frag: true, delay: 2240 },
  { text: ' [FRAGMENT #006] "528 Hz. Pas une fréquence. Une signature."', frag: true, delay: 2520 },
  { text: '', delay: 2800 },
  { text: '> COORDONNÉES : 34.9876° N, 135.7553° E', cmd: true, delay: 3080 },
  { text: '> FRÉQUENCE DE BASE : 528 Hz [NON DOCUMENTÉE]', cmd: true, delay: 3360 },
  { text: '> STATUT ACTUEL : ACTIF / [INDÉTERMINÉ]', cmd: true, delay: 3640 },
  { text: '', delay: 3920 },
  { text: '> Fin du dump. Connexion fermée.', cmd: true, delay: 4200 },
  { text: '> Tu n\'aurais pas dû trouver ça.', cmd: true, warn: true, delay: 4480 },
]

function SecretPage() {
  const [visible, setVisible] = useState([])
  useEffect(() => {
    setVisible([])
    const timers = FRAGMENTS.map((f, i) =>
      setTimeout(() => setVisible(p => [...p, i]), f.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="browser__secret">
      <div className="browser__secret-scanlines" />
      <div className="browser__secret-content">
        {FRAGMENTS.map((f, i) =>
          visible.includes(i) ? (
            <div
              key={i}
              className={[
                'browser__secret-line',
                f.cmd ? 'browser__secret-line--cmd' : '',
                f.frag ? 'browser__secret-line--frag' : '',
                f.warn ? 'browser__secret-line--warn' : '',
              ].filter(Boolean).join(' ')}
            >
              {f.text || 'u00A0'}
            </div>
          ) : null
        )}
        {visible.length >= FRAGMENTS.length && (
          <div className="browser__secret-cursor">_</div>
        )}
      </div>
    </div>
  )
}

function GlitchSearch({ query }) {
  return (
    <div className="browser__glitch-search">
      <div className="browser__glitch-header">
        <span className="browser__glitch-logo">
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </span>
        <div className="browser__glitch-query-bar">
          <span>{query}</span>
        </div>
      </div>
      <div className="browser__glitch-count">
        Environ <b>██████</b> résultats (<b>█.██</b> secondes)
      </div>
      <div className="browser__glitch-results">
        <div className="browser__glitch-result">
          <span className="browser__glitch-result-title browser-glitch-text" data-text="isen-hata.████ — Dossier [CLASSIFIÉ]">
            isen-hata.████ — Dossier [CLASSIFIÉ]
          </span>
          <div className="browser__glitch-result-url">http://www.isen-hata.██████.fr/core</div>
          <p className="browser__glitch-result-desc">
            Sujet actif. Classe ??? détectée. Fréquence d'émission : 528 Hz. Rapport incident #00x7 — [suite inaccessible]. Ne pas distribuer.
          </p>
        </div>
        <div className="browser__glitch-result">
          <span className="browser__glitch-result-title browser-glitch-text" data-text="Archives de l'Éveil — Incident #00x7">
            Archives de l'Éveil — Incident #00x7
          </span>
          <div className="browser__glitch-result-url">http://archives-████████.gouv.fr/7</div>
          <p className="browser__glitch-result-desc">
            ...sujet a manifesté une résonance active sans précédent... données corrompues à 23h47... connexion perdue... ne pas approcher sans équipement...
          </p>
        </div>
        <div className="browser__glitch-result browser__glitch-result--blocked">
          <span className="browser__glitch-result-title">████████████ — [ACCÈS REFUSÉ]</span>
          <div className="browser__glitch-result-url">isen://core</div>
          <p className="browser__glitch-result-desc">
            █████ ██ ████████ ████ ██████. Tu sais ce que tu cherches vraiment.
          </p>
        </div>
      </div>
    </div>
  )
}

function Page404({ url }) {
  return (
    <div className="browser__404">
      <div className="browser__404-header">
        <img src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png" alt="" />
        <h1>Impossible d'afficher la page</h1>
      </div>
      <div className="browser__404-body">
        <p>Internet Explorer ne peut pas afficher la page demandée.</p>
        <ul>
          <li>Vérifiez l'adresse saisie : <em>{url}</em></li>
          <li>Contactez l'administrateur réseau.</li>
        </ul>
        <div className="browser__404-code">Erreur HTTP 404 — Page introuvable</div>
      </div>
      <details className="browser__404-details">
        <summary>Informations techniques</summary>
        <pre className="browser__404-hidden">
          {`// Accès non autorisé détecté.n// Vous n'étiez pas censé trouver cette page.n// Coordonnées archivées : 34.9876° N, 135.7553° En// Fréquence de résonance : 528 Hzn// Ils savent que tu cherches.`}
        </pre>
      </details>
    </div>
  )
}

function FakeGoogle({ onSecretSearch }) {
  const [query, setQuery] = useState('')
  const handleSearch = () => {
    const q = query.trim().toLowerCase()
    if (q && SECRET_SEARCHES.some(s => q.includes(s))) {
      onSecretSearch(query)
    }
  }

  return (
    <div className="browser__google">
      <div className="browser__google-logo">
        <img src="/images/Google_logo.png" alt="Google" />
      </div>
      <div className="browser__google-search">
        <input
          type="text"
          className="browser__google-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder=""
        />
        <div className="browser__google-btns">
          <button className="browser__google-btn" onClick={handleSearch}>Recherche Google</button>
          <button className="browser__google-btn" onClick={handleSearch}>J'ai de la chance</button>
        </div>
      </div>
      <div className="browser__google-footer">
        <span>Web</span>
        <span>Images</span>
        <span>Groupes</span>
        <span>Annuaire</span>
        <span>Actualités</span>
      </div>
    </div>
  )
}

function FakeWikipedia({ onLogoClick }) {
  return (
    <div className="browser__wiki">
      <div className="browser__wiki-header">
        <div className="browser__wiki-logo" onClick={onLogoClick} title="Wikipédia ???">
          <div className="browser__wiki-logo-ball">
            <img src="/images/Wikipedia_logo.png" alt="Wikipedia" />
          </div>
          <div className="browser__wiki-logo-text">
            <strong>Wikipédia</strong>
            <small>L'encyclopédie libre</small>
          </div>
        </div>
        <div className="browser__wiki-nav">
          <span>Discussion</span>
          <span>Modifier</span>
          <span>Historique</span>
        </div>
      </div>
      <div className="browser__wiki-body">
        <div className="browser__wiki-sidebar">
          <div className="browser__wiki-sidebar-section">
            <strong>Navigation</strong>
            <ul>
              <li>Accueil</li>
              <li>Portails thématiques</li>
              <li>Article au hasard</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="browser__wiki-sidebar-section">
            <strong>Contribuer</strong>
            <ul>
              <li>Débuter sur Wikipédia</li>
              <li>Aide</li>
              <li>Communauté</li>
            </ul>
          </div>
          <div className="browser__wiki-sidebar-section">
            <strong>Outils</strong>
            <ul>
              <li>Pages liées</li>
              <li>Suivi des pages liées</li>
              <li>Importer un fichier</li>
            </ul>
          </div>
        </div>
        <div className="browser__wiki-content">
          <h1 className="browser__wiki-title">Isen Hata</h1>
          <div className="browser__wiki-subtitle">
            <em>Cet article traite du personnage fictif. Pour d'autres usages, voir <span className="browser__wiki-link">Hata (homonymie)</span>.</em>
          </div>
          <div className="browser__wiki-notice">
            <strong>Cet article est une ébauche concernant un personnage fictif.</strong> Vous pouvez partager vos connaissances en l'améliorant.
          </div>
          <div className="browser__wiki-infobox">
            <div className="browser__wiki-infobox-title">Isen Hata</div>
            <div className="browser__wiki-infobox-img">
              <img src="/images/full.png" alt="Isen Hata" onError={e => { e.target.style.display = 'none' }} />
              <small>Illustration officielle d'Isen Hata</small>
            </div>
            <table className="browser__wiki-infobox-table">
              <tbody>
                <tr><th>Univers</th><td>ISEN Project</td></tr>
                <tr><th>Première apparition</th><td><em>ISEN.exe</em> (2026)</td></tr>
                <tr><th>Créé par</th><td>Raphurst</td></tr>
                <tr><th>Espèce</th><td>Humaine (modifiée)</td></tr>
                <tr><th>Sexe</th><td>Féminin</td></tr>
                <tr><th>Capacités</th><td>Résonance ondulatoire, Perception étendue</td></tr>
                <tr><th>Affiliation</th><td>Indépendante</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Isen Hata</strong> (畑 イセン, <em>Hata Isen</em>) est un personnage fictif issu de l'univers narratif <em>ISEN Project</em>. Protagoniste principale du visual novel éponyme, elle est décrite comme une jeune femme aux capacités sensorielles hors du commun, capable de percevoir et d'interagir avec des fréquences imperceptibles à l'œil humain.
          </p>
          <div className="browser__wiki-toc">
            <div className="browser__wiki-toc-title">Sommaire</div>
            <ol>
              <li><span className="browser__wiki-link">Biographie fictive</span></li>
              <li><span className="browser__wiki-link">Personnalité</span></li>
              <li><span className="browser__wiki-link">Capacités et techniques</span></li>
              <li><span className="browser__wiki-link">Apparitions</span></li>
              <li><span className="browser__wiki-link">Réception</span></li>
              <li><span className="browser__wiki-link">Références</span></li>
            </ol>
          </div>
          <h2 className="browser__wiki-h2">1. Biographie fictive</h2>
          <p>
            Isen Hata grandit dans une ville côtière anonyme, loin des centres urbains. Dès l'enfance, elle manifeste une sensibilité inhabituelle aux sons et aux vibrations ambiantes. C'est à l'adolescence que ses capacités se révèlent dans leur véritable étendue, lors d'un incident qualifié dans les archives de <em>l'Éveil</em>.
          </p>
          <p>
            Après cet événement, Isen choisit de vivre en marge des institutions. Elle développe seule sa maîtrise de la <em>résonance ondulatoire</em>, discipline qu'elle définit comme « écouter ce que le monde ne dit pas à voix haute ».
          </p>
          <h2 className="browser__wiki-h2">2. Personnalité</h2>
          <p>
            Isen est généralement décrite comme <strong>introvertie et observatrice</strong>. Elle parle peu mais avec précision, et manifeste une forme d'ironie douce que ses interlocuteurs perçoivent parfois comme de la distance.
          </p>
          <h2 className="browser__wiki-h2">3. Capacités et techniques</h2>
          <ul className="browser__wiki-list">
            <li><strong>Perception ondulatoire</strong> — détection des fréquences sonores et électromagnétiques à longue portée.</li>
            <li><strong>Résonance active</strong> — émission contrôlée d'ondes capables d'affecter l'environnement immédiat.</li>
            <li><strong>Syntonisation</strong> — harmonisation avec un être vivant ou un objet, permettant une forme de communication non-verbale.</li>
          </ul>
          <h2 className="browser__wiki-h2">4. Apparitions</h2>
          <p>
            Isen apparaît pour la première fois dans le visual novel <em>ISEN.exe</em> (2026), disponible sur PC-98 émulé. Elle est également mentionnée dans les notes de l'EP <em>Raphurst — Prelude</em>.
          </p>
          <h2 className="browser__wiki-h2">5. Réception</h2>
          <p>
            Le personnage a été bien accueilli pour sa <strong>profondeur psychologique</strong> et son design visuel inspiré de l'esthétique PC-98.
          </p>
          <div className="browser__wiki-references">
            <h2 className="browser__wiki-h2">6. Références</h2>
            <ol className="browser__wiki-ref-list">
              <li>Raphurst, <em>Notes de production — Prelude EP</em>, 2026.</li>
              <li>« ISEN Project — Présentation officielle », <em>isen-hata.vercel.app</em>, consulté le 7 avril 2026.</li>
              <li>Archives de l'Éveil, document interne, non daté.</li>
            </ol>
          </div>
          <div className="browser__wiki-categories">
            <strong>Catégories :</strong>
            <span className="browser__wiki-link">Personnage fictif</span> •
            <span className="browser__wiki-link">Visual novel</span> •
            <span className="browser__wiki-link">Personnage féminin</span> •
            <span className="browser__wiki-link">ISEN Project</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page de jeu — Fiche de personnage ────────────────────────────

function FakeGamePage() {
  const stats = [
    { name: 'Perception', value: 94 },
    { name: 'Dextérité',  value: 85 },
    { name: 'Endurance',  value: 71 },
    { name: 'Force',      value: 62 },
    { name: 'Résistance', value: 68 },
    { name: 'Shokan',     value: 55 },
  ]

  const hp     = { current: 847,  max: 1200 }
  const energy = { current: 340,  max: 500  }
  const xp     = { current: 7850, max: 10000 }
  const level  = 23

  const spells = [
    {
      id: 1, key: 'Q',
      name: 'Écho Fracturé',
      icon: '/images/spell-1.jpg',
      cost: 45, duration: '3s',
      desc: 'Projette une onde de résonance concentrée qui fracture la cohérence des objets ciblés dans un cône frontal.',
    },
    {
      id: 2, key: 'W',
      name: 'Vague de Syntonisation',
      icon: '/images/spell-2.jpg',
      cost: 80, duration: '8s',
      desc: 'Harmonise les fréquences d\'Isen avec sa cible, créant un lien télépathique temporaire et ralentissant ses réflexes.',
    },
    {
      id: 3, key: 'E',
      name: 'Résonance Sismique',
      icon: '/images/spell-3.jpg',
      cost: 120, duration: '5s',
      desc: 'Libère une décharge d\'énergie ondulatoire en zone circulaire, déstabilisant et repoussant tous les ennemis proches.',
    },
    {
      id: 4, key: 'R',
      name: 'Fréquence 528',
      icon: '/images/spell-4.jpg',
      cost: 200, duration: '12s',
      ultimate: true,
      desc: 'ULTIME — Isen entre en état de résonance pure à 528 Hz. Toutes ses capacités sont amplifiées et elle perçoit les failles cachées du réel. Ne peut être activé qu\'en dessous de 40% PV.',
    },
  ]

  // Radar chart — hexagone, sens horaire depuis le haut
  const cx = 110, cy = 108, r = 72
  const angles = stats.map((_, i) => -Math.PI / 2 + (2 * Math.PI * i) / 6)
  const outerPts = angles.map(a => ({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }))
  const dataPts  = stats.map((s, i) => ({
    x: cx + r * (s.value / 100) * Math.cos(angles[i]),
    y: cy + r * (s.value / 100) * Math.sin(angles[i]),
  }))
  const rings = [0.25, 0.5, 0.75, 1.0]

  const toPolygon = pts => pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  return (
    <div className="gp" data-testid="game-page">
      {/* En-tête */}
      <div className="gp__header">
        <span className="gp__header-title">// ISEN PROJECT :: REGISTRE DE COMBAT //</span>
        <span className="gp__header-ver">CLIENT v2.4.1 — PATCH 0.9.7</span>
      </div>

      <div className="gp__body">
        {/* ─── Colonne gauche ─────────────────────────── */}
        <div className="gp__left">

          {/* Portrait */}
          <div className="gp__portrait-frame">
            <div className="gp__lvl-badge" data-testid="level-badge">NIV.{level}</div>
            <img src="/images/pose.png" alt="Isen Hata" className="gp__portrait" />
            <div className="gp__char-name">ISEN HATA</div>
            <div className="gp__char-class">Classe : Résonante ★★★</div>
          </div>

          {/* Barres */}
          <div className="gp__bars" data-testid="stat-bars">
            {[
              { label: 'PV', cur: hp.current,     max: hp.max,     mod: 'hp'     },
              { label: 'EN', cur: energy.current, max: energy.max, mod: 'energy' },
              { label: 'XP', cur: xp.current,     max: xp.max,     mod: 'xp'     },
            ].map(b => (
              <div className="gp__bar-row" key={b.label}>
                <span className="gp__bar-label">{b.label}</span>
                <div className="gp__bar-track">
                  <div
                    className={`gp__bar-fill gp__bar-fill--${b.mod}`}
                    style={{ width: `${(b.cur / b.max) * 100}%` }}
                  />
                </div>
                <span className="gp__bar-nums" data-testid={`bar-${b.mod}`}>
                  {b.cur}<span className="gp__bar-max">/{b.max}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Dossier sujet */}
          <div className="gp__dossier">
            <div className="gp__section-lbl">[ DOSSIER SUJET ]</div>
            <p>
              Isen Hata est une <strong>Résonante de classe 3</strong> — une rare catégorie
              d'individus capables d'interagir directement avec les fréquences ondulatoires
              du monde. Son pouvoir, la <strong>Résonance Active</strong>, lui permet d'émettre,
              percevoir et moduler des ondes invisibles à 528 Hz, affectant matière, perception
              et conscience à distance variable.
            </p>
            <p>
              <strong>Limites :</strong> chaque activation consomme de l'énergie biologique.
              À court d'énergie, ses sens se retournent contre elle — surcharge sensorielle,
              douleur aiguë, désorientation. Ses sorts de zone la rendent temporairement{' '}
              <em>aveugle aux fréquences</em>, l'exposant aux contre-attaques.
            </p>
            <p>
              <strong>Subtilité :</strong> son ultime <em>Fréquence 528</em> ne peut être
              activé que lorsque ses PV sont inférieurs à 40 %. Plus elle est fragilisée,
              plus son amplitude de résonance est puissante — un état que certains adversaires
              apprennent à redouter.
            </p>
          </div>
        </div>

        {/* ─── Colonne droite ──────────────────────────── */}
        <div className="gp__right">

          {/* Radar + stats */}
          <div className="gp__panel" data-testid="radar-panel">
            <div className="gp__section-lbl">[ STATISTIQUES DE COMBAT ]</div>
            <div className="gp__radar-row">

              {/* SVG Radar */}
              <svg viewBox="0 0 220 216" className="gp__radar-svg" data-testid="radar-chart">
                {/* Grille */}
                {rings.map((s, ri) => (
                  <polygon
                    key={ri}
                    points={toPolygon(outerPts.map(p => ({
                      x: cx + (p.x - cx) * s,
                      y: cy + (p.y - cy) * s,
                    })))}
                    fill="none"
                    stroke={s === 1 ? '#e8c147' : '#23243a'}
                    strokeWidth={s === 1 ? 1.2 : 0.6}
                  />
                ))}
                {/* Axes */}
                {outerPts.map((p, i) => (
                  <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#23243a" strokeWidth="0.6" />
                ))}
                {/* Zone de données */}
                <polygon
                  points={toPolygon(dataPts)}
                  fill="rgba(76,200,255,0.18)"
                  stroke="#4cc8ff"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                {/* Points */}
                {dataPts.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="2.8" fill="#4cc8ff" stroke="#0a0b10" strokeWidth="1" />
                ))}
                {/* Labels */}
                {stats.map((s, i) => {
                  const lx = cx + (r + 17) * Math.cos(angles[i])
                  const ly = cy + (r + 17) * Math.sin(angles[i])
                  return (
                    <text
                      key={i} x={lx.toFixed(1)} y={ly.toFixed(1)}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="7.5" fill="#e8c147"
                      fontFamily="'Courier New', monospace" fontWeight="bold"
                    >{s.name}</text>
                  )
                })}
              </svg>

              {/* Liste de stats */}
              <div className="gp__stat-list">
                {stats.map(s => (
                  <div className="gp__stat-row" key={s.name} data-testid={`stat-${s.name}`}>
                    <span className="gp__stat-name">{s.name}</span>
                    <div className="gp__stat-mini-track">
                      <div className="gp__stat-mini-fill" style={{ width: `${s.value}%` }} />
                    </div>
                    <span className="gp__stat-val">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sorts */}
          <div className="gp__panel gp__panel--spells" data-testid="spells-panel">
            <div className="gp__section-lbl">[ CAPACITÉS ]</div>
            <div className="gp__spells">
              {spells.map(sp => (
                <div
                  key={sp.id}
                  className={`gp__spell${sp.ultimate ? ' gp__spell--ult' : ''}`}
                  data-testid={`spell-${sp.id}`}
                >
                  <div className="gp__spell-ico-wrap">
                    <img src={sp.icon} alt={sp.name} className="gp__spell-ico" />
                    <span className="gp__spell-key">{sp.key}</span>
                  </div>
                  <div className="gp__spell-body">
                    <div className="gp__spell-name">{sp.name}</div>
                    <div className="gp__spell-meta">
                      <span className="gp__spell-cost" data-testid={`spell-cost-${sp.id}`}>EN : {sp.cost}</span>
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

function KonamiOverlay({ onDismiss }) {
  return (
    <div className="browser__konami" onClick={onDismiss}>
      <div className="browser__konami-static" />
      <div className="browser__konami-content">
        <div className="browser__konami-glitch" data-text="INTRUSION DÉTECTÉE">
          INTRUSION DÉTECTÉE
        </div>
        <div className="browser__konami-body">
          <p>PROTOCOLE DE CONFINEMENT ACTIVÉ</p>
          <p>SUJET : <span className="browser__konami-hi">ISEN HATA</span></p>
          <p>FRÉQUENCE ÉMISE : <span className="browser__konami-hi">██████ Hz</span></p>
          <p>NIVEAU DE MENACE : <span className="browser__konami-red">INDÉTERMINÉ</span></p>
          <p>ACCÈS SYSTÈME : <span className="browser__konami-red">COMPROMIS</span></p>
          <p className="browser__konami-dismiss">[ Cliquez pour fermer ]</p>
        </div>
      </div>
    </div>
  )
}

// ── TABS ─────────────────────────────────────────────────────────

const BASE_TABS = [
  {
    id: 'google',
    label: 'Google',
    url: 'http://www.google.fr/',
    icon: 'https://win98icons.alexmeub.com/icons/png/search_web-1.png',
  },
  {
    id: 'wiki',
    label: 'Isen Hata — Wikipédia',
    url: 'https://fr.wikipedia.org/wiki/Isen_Hata',
    icon: 'https://win98icons.alexmeub.com/icons/png/web_file-0.png',
  },
  {
    id: 'game',
    label: 'Isen :: Fiche de Combat',
    url: 'http://isen-project.net/personnages/isen-hata',
    icon: 'https://win98icons.alexmeub.com/icons/png/joystick-0.png',
  },
]

// ── Browser ──────────────────────────────────────────────────────

export default function Browser() {
  const [activeTab, setActiveTab] = useState('google')
  const [secretTabVisible, setSecretTabVisible] = useState(false)
  const [addressValue, setAddressValue] = useState(BASE_TABS[0].url)
  const [glitching, setGlitching] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const [konamiIdx, setKonamiIdx] = useState(0)
  const [showKonami, setShowKonami] = useState(false)
  const [contentMode, setContentMode] = useState('normal')
  const [glitchQuery, setGlitchQuery] = useState('')
  const [notFoundUrl, setNotFoundUrl] = useState('')
  const [status, setStatus] = useState('Terminé')

  const tabs = secretTabVisible
    ? [...BASE_TABS, { id: 'secret', label: '????', url: 'isen://core', icon: '⚠' }]
    : BASE_TABS

  // ── Konami ─────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === KONAMI[konamiIdx]) {
        const next = konamiIdx + 1
        if (next === KONAMI.length) {
          setShowKonami(true)
          setKonamiIdx(0)
        } else {
          setKonamiIdx(next)
        }
      } else {
        setKonamiIdx(e.key === KONAMI[0] ? 1 : 0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [konamiIdx])

  // ── Glitch helper ──────────────────────────────────────────────
  const triggerGlitch = useCallback((cb) => {
    setGlitching(true)
    setStatus('Chargement...')
    setTimeout(() => {
      setGlitching(false)
      setStatus('Terminé')
      cb()
    }, 650)
  }, [])

  // ── Navigation barre d'adresse ─────────────────────────────────
  const navigate = useCallback((url) => {
    const trimmed = url.trim().toLowerCase()
    triggerGlitch(() => {
      if (SECRET_URLS.includes(trimmed)) {
        setSecretTabVisible(true)
        setActiveTab('secret')
        setAddressValue('isen://core')
        setContentMode('normal')
      } else if (trimmed.includes('google')) {
        setActiveTab('google')
        setContentMode('normal')
        setAddressValue('http://www.google.fr/')
      } else if (trimmed.includes('wikipedia') || trimmed.includes('wiki')) {
        setActiveTab('wiki')
        setContentMode('normal')
        setAddressValue('https://fr.wikipedia.org/wiki/Isen_Hata')
      } else if (trimmed.includes('isen-project') || trimmed.includes('personnages')) {
        setActiveTab('game')
        setContentMode('normal')
        setAddressValue('http://isen-project.net/personnages/isen-hata')
      } else {
        setNotFoundUrl(url)
        setContentMode('404')
        setAddressValue(url)
      }
    })
  }, [triggerGlitch])

  // ── Logo ⊙ clics (×3 = onglet secret) ─────────────────────────
  const handleLogoClick = () => {
    const count = logoClicks + 1
    setLogoClicks(count)
    if (count >= 3) {
      setLogoClicks(0)
      triggerGlitch(() => {
        setSecretTabVisible(true)
        setActiveTab('secret')
        setAddressValue('isen://core')
        setContentMode('normal')
      })
    }
  }

  // ── Recherche secrète Google ───────────────────────────────────
  const handleSecretSearch = (query) => {
    triggerGlitch(() => {
      setGlitchQuery(query)
      setContentMode('glitch-search')
    })
  }

  // ── Changement d'onglet ────────────────────────────────────────
  const handleTabChange = (id) => {
    const tab = tabs.find(t => t.id === id)
    if (!tab) return
    setActiveTab(id)
    setAddressValue(tab.url)
    setContentMode('normal')
  }

  // ── Rendu contenu ──────────────────────────────────────────────
  const renderContent = () => {
    if (contentMode === '404') return <Page404 url={notFoundUrl} />
    if (contentMode === 'glitch-search') return <GlitchSearch query={glitchQuery} />
    if (activeTab === 'secret') return <SecretPage />
    if (activeTab === 'wiki')   return <FakeWikipedia onLogoClick={handleLogoClick} />
    if (activeTab === 'game')   return <FakeGamePage />
    return <FakeGoogle onSecretSearch={handleSecretSearch} />
  }

  return (
    <div className={`browser${glitching ? ' browser--glitching' : ''}`}>
      {showKonami && <KonamiOverlay onDismiss={() => setShowKonami(false)} />}

      {/* Barre de navigation */}
      <div className="browser__navbar">
        <div className="browser__nav-btns">
          <button className="browser__nav-btn" title="Précédent"
            onClick={() => { setContentMode('normal'); setActiveTab('google'); setAddressValue(BASE_TABS[0].url) }}>◄</button>
          <button className="browser__nav-btn" title="Suivant">►</button>
          <button className="browser__nav-btn browser__nav-btn--stop" title="Arrêter">✕</button>
          <button className="browser__nav-btn" title="Actualiser" onClick={() => navigate(addressValue)}>↺</button>
          <button className="browser__nav-btn" title="Accueil" onClick={() => handleTabChange('google')}>🏠</button>
        </div>
        <div className="browser__address-bar">
          <span className="browser__address-label">Adresse</span>
          <div className="browser__address-input">
            <img src={IE_ICON} alt="" className="browser__address-icon" />
            <input
              type="text"
              className="browser__address-text"
              value={addressValue}
              onChange={e => setAddressValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate(addressValue)}
              spellCheck={false}
            />
          </div>
          <button className="browser__address-go" onClick={() => navigate(addressValue)}>OK</button>
        </div>
      </div>

      {/* Onglets */}
      <div className="browser__tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={[
              'browser__tab',
              activeTab === tab.id && contentMode === 'normal' ? 'browser__tab--active' : '',
              tab.id === 'secret' ? 'browser__tab--secret' : '',
              tab.id === 'game'   ? 'browser__tab--game'   : '',
            ].filter(Boolean).join(' ')}
            onClick={() => handleTabChange(tab.id)}
            data-testid={`tab-${tab.id}`}
          >
            <span className="browser__tab-icon"><img src={tab.icon} alt="" /></span>
            <span className="browser__tab-label">{tab.label}</span>
          </button>
        ))}
        <div className="browser__tabs-fill" />
      </div>

      {/* Contenu */}
      <div className={`browser__content${glitching ? ' browser__content--glitch' : ''}`}>
        {renderContent()}
      </div>

      {/* Barre de statut */}
      <div className="browser__statusbar">
        <span>{status}</span>
        <div className="browser__statusbar-right">
          <img src={IE_ICON} alt="IE" style={{ width: 14, height: 14 }} />
          <span>Zone Internet</span>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect, useCallback } from 'react'
import '../styles/Browser.scss'

const IE_ICON = 'https://win98icons.alexmeub.com/icons/png/search_web-0.png'
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const SECRET_SEARCHES = ['kiba', 'résonance', 'resonance', 'éveil', 'eveil', 'mémoire', 'memoire', 'fréquence', 'frequence', '528', 'igarashi', 'raphurst', 'academia']
const SECRET_URLS = ['kiba://core', 'kiba://secret', 'about:kiba', 'kiba://memories']

// ── Pages secrètes ───────────────────────────────────────────────

const FRAGMENTS = [
  { text: '> CONNEXION ÉTABLIE — PROTOCOLE ISEN v0.0.1', cmd: true, delay: 0 },
  { text: '> Chargement CORE_DUMP.exe...', cmd: true, delay: 280 },
  { text: '> Lecture des fragments mémoire...', cmd: true, delay: 560 },
  { text: '', delay: 840 },
  { text: ' [FRAGMENT #001] ████████████████████ [CORROMPU]', frag: true, delay: 1120 },
  { text: ' [FRAGMENT #002] "...ils ne savent pas ce que j\'ai perçu ce soir-là.', frag: true, delay: 1400 },
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
          <span className="browser__glitch-result-title browser-glitch-text" data-text="kiba-igarashi.████ — Dossier [CLASSIFIÉ]">
            kiba-igarashi.████ — Dossier [CLASSIFIÉ]
          </span>
          <div className="browser__glitch-result-url">http://www.kiba-igarashi.██████.fr/core</div>
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
          <div className="browser__glitch-result-url">kiba://core</div>
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
          <h1 className="browser__wiki-title">Kiba Igarashi</h1>
          <div className="browser__wiki-subtitle">
            <em>Cet article traite du personnage fictif. Pour d'autres usages, voir <span className="browser__wiki-link">Igarashi (homonymie)</span>.</em>
          </div>
          <div className="browser__wiki-notice">
            <strong>Cet article est une ébauche concernant un personnage fictif.</strong> Vous pouvez partager vos connaissances en l'améliorant.
          </div>
          <div className="browser__wiki-infobox">
            <div className="browser__wiki-infobox-title">Kiba Igarashi</div>
            <div className="browser__wiki-infobox-img">
              <img src="/images/4.jpg" alt="Kiba Igarashi" onError={e => { e.target.style.display = 'none' }} />
              <small>Illustration par Pyr</small>
            </div>
            <table className="browser__wiki-infobox-table">
              <tbody>
                <tr><th>Nom complet</th><td>Kiba Igarashi</td></tr>
                <tr><th>Surnoms</th><td>Croc Écarlate, Kōga</td></tr>
                <tr><th>Naissance</th><td>23 juillet 6070 (19 ans)</td></tr>
                <tr><th>Sexe</th><td>Masculin ♂</td></tr>
                <tr><th>Clan</th><td>Magaishi</td></tr>
                <tr><th>Shokan</th><td>Résonance</td></tr>
                <tr><th>Type</th><td>Élémentaire</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Kiba Igarashi</strong> (五十嵐 牙, <em>Igarashi Kiba</em>) est un personnage fictif issu de l'univers narratif <em>ISEN Project</em>. Protagoniste principal du visual novel éponyme, il est décrit comme un jeune homme aux capacités sensorielles hors du commun, capable de percevoir et d'interagir avec des fréquences imperceptibles à l'œil humain.
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
            Kiba Igarashi grandit dans une ville côtière anonyme, loin des centres urbains. Dès l'enfance, il manifeste une sensibilité inhabituelle aux sons et aux vibrations ambiantes. C'est à l'adolescence que ses capacités se révèlent dans leur véritable étendue, lors d'un incident qualifié dans les archives de <em>l'Éveil</em>.
          </p>
          <p>
            Après cet événement, Kiba choisit de vivre en marge des institutions. Il développe seule sa maîtrise de la <em>résonance ondulatoire</em>, discipline qu'il définit comme « écouter ce que le monde ne dit pas à voix haute ».
          </p>
          <h2 className="browser__wiki-h2">2. Personnalité</h2>
          <p>
            Kiba est généralement décrit comme <strong>introverti et observateur</strong>. Il parle peu mais avec précision, et manifeste une forme d'ironie douce que ses interlocuteurs perçoivent parfois comme de la distance.
          </p>
          <h2 className="browser__wiki-h2">3. Capacités et techniques</h2>
          <ul className="browser__wiki-list">
            <li><strong>Perception ondulatoire</strong> — détection des fréquences sonores et électromagnétiques à longue portée.</li>
            <li><strong>Résonance active</strong> — émission contrôlée d'ondes capables d'affecter l'environnement immédiat.</li>
            <li><strong>Syntonisation</strong> — harmonisation avec un être vivant ou un objet, permettant une forme de communication non-verbale.</li>
          </ul>
          <h2 className="browser__wiki-h2">4. Apparitions</h2>
          <p>
            Kiba apparaît pour la première fois dans le visual novel <em>ISEN.exe</em> (2026), disponible sur PC-98 émulé. Il est également mentionné dans les notes de l'EP <em>Raphurst — Prelude</em>.
          </p>
          <h2 className="browser__wiki-h2">5. Réception</h2>
          <p>
            Le personnage a été bien accueilli pour sa <strong>profondeur psychologique</strong> et son design visuel inspiré de l'esthétique PC-98.
          </p>
          <div className="browser__wiki-references">
            <h2 className="browser__wiki-h2">6. Références</h2>
            <ol className="browser__wiki-ref-list">
              <li>Raphurst, <em>Notes de production — Prelude EP</em>, 2026.</li>
              <li>« ISEN Project — Présentation officielle », <em>kiba-igarashi.vercel.app</em>, consulté le 7 avril 2026.</li>
              <li>Archives de l'Éveil, document interne, non daté.</li>
            </ol>
          </div>
          <div className="browser__wiki-categories">
            <strong>Catégories :</strong>
            <span className="browser__wiki-link">Personnage fictif</span> •
            <span className="browser__wiki-link">Visual novel</span> •
            <span className="browser__wiki-link">Personnage masculin</span> •
            <span className="browser__wiki-link">ISEN Project</span>
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
          <p>SUJET : <span className="browser__konami-hi">KIBA IGARASHI</span></p>
          <p>FRÉQUENCE ÉMISE : <span className="browser__konami-hi">██████ Hz</span></p>
          <p>NIVEAU DE MENACE : <span className="browser__konami-red">INDÉTERMINÉ</span></p>
          <p>ACCÈS SYSTÈME : <span className="browser__konami-red">COMPROMIS</span></p>
          <p className="browser__konami-dismiss">[ Cliquez pour fermer ]</p>
        </div>
      </div>
    </div>
  )
}

// ── ActuNet News ──────────────────────────────────────────────────

const NEWS_DATE = 'Lundi 17 janvier 2000'

const TICKER_ITEMS = [
  "FLASH : Séisme majeur au Salvador — bilan provisoire de 700 victimes",
  "KYOTO : Aucun commentaire officiel sur l'incident de vendredi",
  "EURO : La monnaie unique à 1,03 dollar",
  "L'ACADÉMIE maintient le silence sur le rapport #00x7",
  "MÉTÉO KYOTO : Brouillard inexpliqué dans Fushimi et Gion",
  "BOURSE DE TOKYO : Nikkei en hausse de 1,2 %",
  "SCIENCES : 528 Hz, une fréquence qui divise les chercheurs",
  "CONCORDE : Les enquêtes de sécurité se poursuivent",
]

const NEWS_ARTICLES = [
  {
    id: 1,
    category: "Monde",
    catColor: '#990000',
    date: "Sam. 15 Jan. 2000  |  14:32 JST",
    headline: "KYOTO — Une ruelle scellée après un « incident d'ombre anormale »",
    summary: "Trois riverains signalent des ombres se déplaçant indépendamment de leur source lumineuse. Une silhouette juvénile aperçue sur les lieux. Enquête préliminaire ouverte.",
    paragraphs: [
      "La préfecture de police de Kyoto a confirmé vendredi l'ouverture d'une enquête préliminaire suite à trois témoignages concordants dans le quartier de Fushimi. Les appels ont été enregistrés à 23h14 heure locale.",
      "L'un des témoins, ayant requis l'anonymat, a déclaré à un correspondant local : « Il y avait un jeune individu au centre de la ruelle. Les ombres autour de lui ne lui appartenaient pas. Elles reproduisaient des gestes qu'il n'était pas en train de faire — comme un double. »",
      "La ruelle Nakamura-dori a été scellée pendant soixante-douze heures. L'Institut national des sciences anomales (INSA) aurait été dépêché sur place. Aucune conclusion publique n'a été rendue à ce jour.",
      "Le suspect principal, décrit comme un jeune individu de vingt ans environ, vêtements sombres, n'a pas encore été formellement identifié. Une source préfectorale a simplement indiqué : « Nous savons qui chercher. »",
    ],
  },
  {
    id: 2,
    category: "Sciences",
    catColor: '#004499',
    date: "Mer. 12 Jan. 2000  |  09:17 CET",
    headline: "Un document Raphurst sur les « Sujets Résonants » circule sur les forums",
    summary: "Un rapport interne décrivant des individus à « propriétés électromagnétiques atypiques » a brièvement circulé avant d'être retiré. Il mentionne un certain « Sujet R-003 ».",
    paragraphs: [
      "Plusieurs utilisateurs de forums scientifiques indépendants ont signalé mercredi la mise en ligne d'un document portant l'en-tête confidentiel de l'Institut Raphurst, organisation de recherche privée japonaise dont les travaux restent peu documentés.",
      "Le texte décrirait une catégorie d'individus désignés sous le terme « Sujets Résonants » — des personnes émettant des fréquences biologiques concentrées autour de 528 Hz.",
      "Un « Sujet R-003 » serait mentionné de manière répétée, avec la note : « mesures dépassant significativement les seuils connus — statut actif, non localisé ». L'Institut Raphurst n'a donné aucune réponse aux demandes de commentaire.",
      "« J'ai eu le fichier pendant dix minutes avant que le lien soit coupé, » témoigne un utilisateur contacté par e-mail. « Il y avait des coordonnées GPS et une seule ligne en bas de page : \"Ne pas approcher sans équipement de confinement fréquentiel.\" »",
    ],
  },
  {
    id: 3,
    category: "Faits divers",
    catColor: '#336600',
    date: "Lun. 10 Jan. 2000  |  11:04 JST",
    headline: "Disparue depuis le 23 novembre — Un message codé avant de s'évanouir",
    summary: "Une lycéenne de Kyoto portée disparue. Sa famille avait reçu un court message : « 528 — je perçois tout maintenant — ne cherchez pas. »",
    paragraphs: [
      "La famille d'une lycéenne de Kyoto, identifiée uniquement par ses initiales I.H., a relancé l'appel à témoins ce lundi, plus de six semaines après sa disparition le 23 novembre dernier.",
      "Quelques heures avant les faits, la famille avait reçu depuis son téléphone un message ne contenant que ces mots : « 528 — je perçois tout maintenant — ne cherchez pas. »",
      "La police de Kyoto a classé l'affaire sans suite après trois semaines, invoquant un départ volontaire. Ses proches contestent cette conclusion. « Elle n'aurait jamais fait ça. Quelque chose lui est arrivé cette nuit-là, dans cette ruelle. »",
      "Fait troublant : la date de disparition — le 23 novembre — coïncide exactement avec l'incident référencé sous le code #00x7 dans les registres municipaux, dont l'accès public a depuis été restreint.",
    ],
  },
  {
    id: 4,
    category: "Sciences",
    catColor: '#004499',
    date: "Jeu. 6 Jan. 2000  |  16:55 CET",
    headline: "528 Hz : entre fréquence cicatrisante et anomalie mesurable",
    summary: "Plusieurs laboratoires signalent des relevés inexplicables à exactement 528 Hz sans source identifiable. Une organisation non nommée collecte ces données depuis 1997.",
    paragraphs: [
      "Ce que les adeptes de médecine alternative appellent la « fréquence de guérison » commence à attirer l'attention de chercheurs sérieux — non pour ses vertus supposées, mais pour des mesures que certains qualifient d'anomalies.",
      "« Nous avons d'abord cru à une erreur de calibrage, » confie un ingénieur japonais ayant requis l'anonymat. « Puis nous avons réalisé que les émissions à 528 Hz ne se produisaient que lorsqu'un certain membre de l'équipe était dans la pièce. Quand il partait, la lecture tombait à zéro. »",
      "Au moins quatre laboratoires en Europe et au Japon auraient observé des phénomènes similaires sans jamais les publier officiellement, par crainte de ne pas être pris au sérieux.",
      "Une organisation privée dont le siège serait à Osaka, et dont le nom n'a pas été communiqué, collecterait ces données depuis 1997. Leurs chercheurs parleraient désormais de « signatures biologiques uniques » — une empreinte fréquentielle propre à chaque individu dit « actif ».",
    ],
  },
  {
    id: 5,
    category: "Monde",
    catColor: '#990000',
    date: "Ven. 7 Jan. 2000  |  08:30 JST",
    headline: "L'Académie refuse de répondre — Rapport #00x7 toujours classifié",
    summary: "L'organisation désignée sous le nom « L'Académie » maintient le silence total sur l'incident du 23 novembre à Kyoto.",
    paragraphs: [
      "Deux journalistes d'investigation qui ont tenté d'accéder au rapport incident #00x7 — référencé dans les documents administratifs de la ville de Kyoto — se sont heurtés à un mur de silence. L'organisation qui en aurait la garde, connue sous le seul nom « L'Académie », n'a répondu à aucune sollicitation.",
      "Un fonctionnaire municipal, s'exprimant sous couvert d'anonymat total, a accepté de livrer quelques mots : « Ce que nous avons vu cette nuit-là ne rentrait dans aucune case. Ce n'était pas une lumière. Ce n'était pas une explosion. C'était une absence — une ombre sans corps, et au centre, quelqu'un qui semblait parfaitement calme. »",
      "Le rapport, s'il existe, serait l'un des rares documents classifiés au niveau municipal au Japon depuis l'après-guerre.",
      "L'Académie est liée à au moins trois affaires non résolues de « phénomènes perceptifs anormaux » entre 1997 et 2000. Ses membres, ses financements et ses objectifs demeurent inconnus du grand public.",
    ],
  },
]

const NEWS_BRIEFS = [
  "MÉTÉO — Kyoto : brouillard d'origine inconnue dans Fushimi et Gion (16/01)",
  "SCIENCES — Un chercheur américain revendique l'enregistrement d'une \"signature fréquentielle humaine\" (04/01)",
  "DIVERS — La ruelle Nakamura-dori rouverte au public après expertise (17/01)",
  "JAPON — L'INSA nie avoir envoyé une équipe à Kyoto le 15 janvier (16/01)",
]

const TICKER_STR = TICKER_ITEMS.join('  ◆  ') + '  ◆  '

function FakeNewsPortal() {
  const [activeArticle, setActiveArticle] = useState(null)

  if (activeArticle) {
    return (
      <div className="browser__news-art">
        <div className="browser__news-art-bar">
          <button className="browser__news-back" onClick={() => setActiveArticle(null)}>
            « Retour aux actualités
          </button>
          <span className="browser__news-art-cat" style={{ color: activeArticle.catColor }}>
            {activeArticle.category}
          </span>
        </div>
        <div className="browser__news-art-body">
          <div className="browser__news-art-meta">
            {activeArticle.date} &nbsp;|&nbsp; ActuNet Actualités
          </div>
          <h1 className="browser__news-art-title">{activeArticle.headline}</h1>
          <p className="browser__news-art-lead">{activeArticle.summary}</p>
          <hr className="browser__news-hr" />
          {activeArticle.paragraphs.map((p, i) => (
            <p key={i} className="browser__news-art-p">{p}</p>
          ))}
          <div className="browser__news-art-foot">
            © 2000 ActuNet Actualités &nbsp;|&nbsp;
            <span className="browser__news-link">Envoyer cet article</span> &nbsp;|&nbsp;
            <span className="browser__news-link">Imprimer</span> &nbsp;|&nbsp;
            <span className="browser__news-link">Signaler une erreur</span>
          </div>
        </div>
      </div>
    )
  }

  const featured  = NEWS_ARTICLES[0]
  const secondary = NEWS_ARTICLES.slice(1, 3)
  const rest      = NEWS_ARTICLES.slice(3)

  return (
    <div className="browser__news">
      {/* ── Header ── */}
      <div className="browser__news-header">
        <div className="browser__news-logo">
          <span className="browser__news-logo-a">Actu</span>
          <span className="browser__news-logo-b">Net</span>
          <span className="browser__news-logo-tag">Actualités</span>
        </div>
        <div className="browser__news-header-r">
          <span className="browser__news-datestr">{NEWS_DATE}</span>
          <div className="browser__news-search">
            <input className="browser__news-search-input" placeholder="Rechercher…" readOnly />
            <button className="browser__news-search-btn">OK</button>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <div className="browser__news-nav">
        {['Accueil','Monde','Japon','Sciences','Technologie','Faits divers','Sports','Météo','Finance'].map((c, i) => (
          <span key={c} className="browser__news-nav-item">
            {i > 0 && <span className="browser__news-nav-sep">|</span>}
            {c}
          </span>
        ))}
      </div>

      {/* ── Ticker ── */}
      <div className="browser__news-ticker">
        <span className="browser__news-ticker-label">FLASH</span>
        <div className="browser__news-ticker-wrap">
          <span className="browser__news-ticker-track">
            {TICKER_STR}{TICKER_STR}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="browser__news-body">

        {/* Sidebar */}
        <div className="browser__news-sidebar">
          <div className="browser__news-sb-section">
            <div className="browser__news-sb-title">RUBRIQUES</div>
            {['Monde','Japon','Sciences','Technologie','Faits divers','Sports','Culture','Météo'].map(c => (
              <div key={c} className="browser__news-sb-link">{c}</div>
            ))}
          </div>
          <div className="browser__news-sb-section">
            <div className="browser__news-sb-title">MÉTÉO</div>
            <div className="browser__news-weather">
              <div className="browser__news-weather-city">Kyoto, JP</div>
              <div className="browser__news-weather-temp">9°C</div>
              <div className="browser__news-weather-desc">Brouillard</div>
            </div>
          </div>
          <div className="browser__news-sb-section">
            <div className="browser__news-sb-title">EN BREF</div>
            {NEWS_BRIEFS.map((b, i) => (
              <div key={i} className="browser__news-brief">{b}</div>
            ))}
          </div>
          <div className="browser__news-ad">
            <div>PUBLICITÉ</div>
            <strong>ActuNet Pro</strong>
            <div>Hébergement web</div>
            <div>dès 2000¥/mois</div>
          </div>
        </div>

        {/* Main */}
        <div className="browser__news-main">
          {/* Featured */}
          <div className="browser__news-featured">
            <span className="browser__news-catbadge" style={{ background: featured.catColor }}>
              {featured.category}
            </span>
            <h2
              className="browser__news-feat-title browser__news-link"
              onClick={() => setActiveArticle(featured)}
            >
              {featured.headline}
            </h2>
            <div className="browser__news-feat-meta">{featured.date}</div>
            <p className="browser__news-feat-summary">{featured.summary}</p>
            <span className="browser__news-readmore browser__news-link" onClick={() => setActiveArticle(featured)}>
              Lire la suite ›
            </span>
          </div>

          <hr className="browser__news-hr" />
          <div className="browser__news-section-hd">ACTUALITÉS RÉCENTES</div>

          <div className="browser__news-grid">
            {secondary.map(art => (
              <div key={art.id} className="browser__news-card">
                <div className="browser__news-card-cat" style={{ color: art.catColor }}>
                  [{art.category}]
                </div>
                <div
                  className="browser__news-card-title browser__news-link"
                  onClick={() => setActiveArticle(art)}
                >
                  {art.headline}
                </div>
                <div className="browser__news-card-meta">{art.date}</div>
                <p className="browser__news-card-sum">{art.summary}</p>
                <span className="browser__news-readmore browser__news-link" onClick={() => setActiveArticle(art)}>
                  Lire ›
                </span>
              </div>
            ))}
          </div>

          <hr className="browser__news-hr" />
          <div className="browser__news-section-hd">AUTRES ARTICLES</div>

          <div className="browser__news-list">
            {rest.map(art => (
              <div key={art.id} className="browser__news-listitem">
                <span className="browser__news-card-cat" style={{ color: art.catColor }}>
                  [{art.category}]
                </span>{' '}
                <span
                  className="browser__news-link"
                  onClick={() => setActiveArticle(art)}
                >
                  {art.headline}
                </span>
                <span className="browser__news-listitem-date"> — {art.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="browser__news-footer">
        © 2000 ActuNet Actualités — Publicité — Aide — Contact — Conditions d'utilisation
        <br />
        <small>Ce site est optimisé pour Netscape Navigator 4.0 et Internet Explorer 5.0 · Résolution recommandée : 800×600</small>
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
    label: 'Kiba Igarashi — Wikipédia',
    url: 'https://fr.wikipedia.org/wiki/Kiba_Igarashi',
    icon: 'https://win98icons.alexmeub.com/icons/png/web_file-0.png',
  },
  {
    id: 'news',
    label: 'ActuNet Actualités',
    url: 'http://www.actunet-news.fr/',
    icon: 'https://win98icons.alexmeub.com/icons/png/web_file-0.png',
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
    ? [...BASE_TABS, { id: 'secret', label: '????', url: 'kiba://core', icon: '⚠' }]
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
        setAddressValue('kiba://core')
        setContentMode('normal')
      } else if (trimmed.includes('google')) {
        setActiveTab('google')
        setContentMode('normal')
        setAddressValue('http://www.google.fr/')
      } else if (trimmed.includes('wikipedia') || trimmed.includes('wiki')) {
        setActiveTab('wiki')
        setContentMode('normal')
        setAddressValue('https://fr.wikipedia.org/wiki/Kiba_Igarashi')
      } else if (trimmed.includes('actunet') || trimmed.includes('actualites') || trimmed.includes('news')) {
        setActiveTab('news')
        setContentMode('normal')
        setAddressValue('http://www.actunet-news.fr/')
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
        setAddressValue('kiba://core')
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
    if (contentMode === '404') 
      return <Page404 url={notFoundUrl} />
    if (contentMode === 'glitch-search') 
      return <GlitchSearch query={glitchQuery} />
    if (activeTab === 'secret') 
      return <SecretPage />
    if (activeTab === 'wiki') 
      return <FakeWikipedia onLogoClick={handleLogoClick} />
    if (activeTab === 'news') 
      return <FakeNewsPortal />
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
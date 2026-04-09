import { useState } from 'react'
import '../styles/Browser.scss'

const IE_ICON = 'https://win98icons.alexmeub.com/icons/png/msie1-2.png'

function FakeGoogle() {
  const [query, setQuery] = useState('')
  return (
    <div className="browser__google">
      <div className="browser__google-logo">
        <span style={{ color: '#4285F4' }}>G</span>
        <span style={{ color: '#EA4335' }}>o</span>
        <span style={{ color: '#FBBC05' }}>o</span>
        <span style={{ color: '#4285F4' }}>g</span>
        <span style={{ color: '#34A853' }}>l</span>
        <span style={{ color: '#EA4335' }}>e</span>
      </div>
      <div className="browser__google-search">
        <input
          type="text"
          className="browser__google-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder=""
        />
        <div className="browser__google-btns">
          <button className="browser__google-btn">Recherche Google</button>
          <button className="browser__google-btn">J'ai de la chance</button>
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

function FakeWikipedia() {
  return (
    <div className="browser__wiki">
      {/* Header Wikipedia */}
      <div className="browser__wiki-header">
        <div className="browser__wiki-logo">
          <div className="browser__wiki-logo-ball">⊙</div>
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
        {/* Sidebar */}
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

        {/* Contenu principal */}
        <div className="browser__wiki-content">
          <h1 className="browser__wiki-title">Isen Hata</h1>
          <div className="browser__wiki-subtitle">
            <em>Cet article traite du personnage fictif. Pour d'autres usages, voir <span className="browser__wiki-link">Hata (homonymie)</span>.</em>
          </div>
          <div className="browser__wiki-notice">
            <strong>Cet article est une ébauche concernant un personnage fictif.</strong> Vous pouvez partager vos connaissances en l'améliorant.
          </div>

          {/* Infobox */}
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
            Isen Hata grandit dans une ville côtière anonyme, loin des centres urbains. Dès l'enfance, elle manifeste une sensibilité inhabituelle aux sons et aux vibrations ambiantes — phénomène longtemps attribué à une hypersensibilité sensorielle ordinaire. C'est à l'adolescence que ses capacités se révèlent dans leur véritable étendue, lors d'un incident qualifié dans les archives de <em>l'Éveil</em>.
          </p>
          <p>
            Après cet événement, Isen choisit de vivre en marge des institutions, refusant toute affiliation formelle. Elle développe seule sa maîtrise de la <em>résonance ondulatoire</em>, discipline qu'elle définit elle-même comme « écouter ce que le monde ne dit pas à voix haute ».
          </p>

          <h2 className="browser__wiki-h2">2. Personnalité</h2>
          <p>
            Isen est généralement décrite comme <strong>introvertie et observatrice</strong>. Elle parle peu mais avec précision, et manifeste une forme d'ironie douce que ses interlocuteurs perçoivent parfois comme de la distance. Sous cette apparente froideur se trouve une empathie profonde, qu'elle exprime principalement à travers l'action plutôt que les mots.
          </p>
          <p>
            Elle entretient un rapport particulier à la <strong>musique</strong>, qu'elle considère comme le seul langage universel exempt d'ambiguïté.
          </p>

          <h2 className="browser__wiki-h2">3. Capacités et techniques</h2>
          <p>
            Ses capacités sont regroupées sous le terme générique de <em>résonance</em>. Elles comprennent notamment :
          </p>
          <ul className="browser__wiki-list">
            <li><strong>Perception ondulatoire</strong> — détection des fréquences sonores et électromagnétiques à longue portée.</li>
            <li><strong>Résonance active</strong> — émission contrôlée d'ondes capables d'affecter l'environnement immédiat.</li>
            <li><strong>Syntonisation</strong> — harmonisation avec un être vivant ou un objet, permettant une forme de communication non-verbale.</li>
          </ul>

          <h2 className="browser__wiki-h2">4. Apparitions</h2>
          <p>
            Isen apparaît pour la première fois dans le visual novel <em>ISEN.exe</em> (2026), disponible sur PC-98 émulé. Elle est également mentionnée dans les notes de production musicale de l'EP <em>Raphurst — Prelude</em>, où le compositeur décrit le personnage comme la « source d'inspiration centrale » de l'œuvre.
          </p>

          <h2 className="browser__wiki-h2">5. Réception</h2>
          <p>
            Le personnage a été bien accueilli au sein de la communauté de fans, notamment pour sa <strong>profondeur psychologique</strong> et son design visuel inspiré de l'esthétique PC-98. Plusieurs analyses en ligne soulignent le parallèle entre ses capacités de résonance et les thèmes musicaux récurrents dans l'univers ISEN.
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

const TABS = [
  { id: 'google', label: 'Google', url: 'http://www.google.fr/', icon: '🌐' },
  { id: 'wiki',   label: 'Isen Hata — Wikipédia', url: 'https://fr.wikipedia.org/wiki/Isen_Hata', icon: '📄' },
]

export default function Browser() {
  const [activeTab, setActiveTab] = useState('google')

  const currentTab = TABS.find(t => t.id === activeTab)

  return (
    <div className="browser">
      {/* Barre de navigation */}
      <div className="browser__navbar">
        <div className="browser__nav-btns">
          <button className="browser__nav-btn" title="Précédent">◄</button>
          <button className="browser__nav-btn" title="Suivant">►</button>
          <button className="browser__nav-btn browser__nav-btn--stop" title="Arrêter">✕</button>
          <button className="browser__nav-btn" title="Actualiser">↺</button>
          <button className="browser__nav-btn" title="Accueil">🏠</button>
        </div>
        <div className="browser__address-bar">
          <span className="browser__address-label">Adresse</span>
          <div className="browser__address-input">
            <img src={IE_ICON} alt="" className="browser__address-icon" />
            <span>{currentTab.url}</span>
          </div>
          <button className="browser__address-go">OK</button>
        </div>
      </div>

      {/* Onglets */}
      <div className="browser__tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`browser__tab ${activeTab === tab.id ? 'browser__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="browser__tab-icon">{tab.icon}</span>
            <span className="browser__tab-label">{tab.label}</span>
          </button>
        ))}
        <div className="browser__tabs-fill" />
      </div>

      {/* Contenu */}
      <div className="browser__content">
        {activeTab === 'google' && <FakeGoogle />}
        {activeTab === 'wiki'   && <FakeWikipedia />}
      </div>

      {/* Barre de statut */}
      <div className="browser__statusbar">
        <span>Terminé</span>
        <div className="browser__statusbar-right">
          <img src={IE_ICON} alt="IE" style={{ width: 14, height: 14 }} />
          <span>Zone Internet</span>
        </div>
      </div>
    </div>
  )
}
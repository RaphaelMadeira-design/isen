import { useState, useEffect, useCallback } from 'react'
import '../styles/Browser.scss'

const IE_ICON = 'https://win98icons.alexmeub.com/icons/png/search_web-0.png'
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
// ── Recherches "secrètes" (glitch) — kiba/igarashi retirés pour laisser place à la recherche normale
const SECRET_SEARCHES = ['résonance', 'resonance', 'éveil', 'eveil', 'mémoire', 'memoire', 'fréquence', 'frequence', '528', 'raphurst', 'academia', 'académie']
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

// ── Résultats de recherche Google « vintage » (fin 90's / 2000) ─────────

const WIKI_URL = 'https://fr.wikipedia.org/wiki/Kiba_Igarashi'
const NEWS_URL = 'http://www.actunet-news.fr/'

const SEARCH_TOPICS = [
  {
    keys: ['kiba igarashi', 'kiba', 'igarashi', 'kōga', 'koga', 'croc écarlate', 'croc ecarlate'],
    displayQuery: 'Kiba Igarashi',
    resultsCount: '2 340',
    seconds: '0,24',
    real: {
      title: 'Kiba Igarashi — Wikipédia, l\'encyclopédie libre',
      url: 'fr.wikipedia.org/wiki/Kiba_Igarashi',
      target: WIKI_URL,
      desc: "Kiba Igarashi (五十嵐 牙), aussi appelé Kōga ou « Croc Écarlate », est un chevalier de rang E issu de la souche inférieure du clan Magaishi. Membre des Bunkyo City Bolts ...",
    },
    fakes: [
      { title: 'Kiba_Koga (@kiba_koga) — photos & messages', url: 'www.photoroll.jp/kiba_koga', desc: 'Profil public — 412 photos, 89 abonnés. Dernier post : "training session, Bunkyo, 03h22". Aucun message depuis 11 jours.' },
      { title: 'Registre municipal de Tokyo — Igarashi, K.', url: 'www.tokyo.metro.jp/registre/igarashi-k', desc: 'Inscrit branche secondaire Magaishi. Dernière mise à jour partielle. Certaines lignes du recensement sont marquées « données retirées ».' },
      { title: 'Forum ParkourJP :: [Topic] Qui est vraiment "Kōga" ?', url: 'www.parkourjp.net/forum/viewtopic?t=88471', desc: '— …il apparaît de nulle part sur les courses Bolts et il court comme s\'il connaissait le circuit depuis toujours. Perso, je ne crois pas une seconde au rang E.  |  34 réponses.' },
      { title: 'Shokan Index — "Écho de l\'âme" [rang E]', url: 'shokan-index.org/E/echo-de-l-ame', desc: 'Manifestation semi-indépendante d\'énergie, déclenchée via téléphone. Portée ≈ 4 m. Durée ≈ 1–2 s. Peu de données fiables.' },
      { title: 'Tokyo Skyrunner League — Classement 6089', url: 'skyrunner-league.jp/classement/6089', desc: '01. Bunkyo City Bolts — 112 pts  |  02. White Sparrows — 98 pts  |  03. Kanda Ravens — 74 pts ... Ligue officieuse, non affiliée à la fédération.' },
      { title: 'Igarashi (homonymie) — Wikipédia', url: 'fr.wikipedia.org/wiki/Igarashi_(homonymie)', desc: 'Page d\'homonymie : Igarashi peut désigner un patronyme japonais, une lignée du clan Magaishi, ou une région montagneuse de la préfecture de Niigata...' },
      { title: 'Recrutez un "Kiba Igarashi" — AnnuairePro', url: 'www.annuairepro.jp/prestataire/kiba-igarashi', desc: 'Plombier à Osaka, 41 ans. Aucun lien connu avec l\'athlète du même nom. Note clients : 3,8 / 5.' },
      { title: 'Magaishi — Souches inférieures, liste indicative', url: 'www.clans-japon.fr/magaishi/souches-inferieures', desc: 'Ce document recense les lignées mineures rattachées au clan Magaishi. La ligne « Igarashi » y figure, bien que plusieurs entrées soient datées « [retirée] ».' },
    ],
  },
  {
    keys: ['actunet', 'actualités', 'actualites', 'actunet news'],
    displayQuery: 'ActuNet',
    resultsCount: '5 710',
    seconds: '0,18',
    real: {
      title: 'ActuNet Actualités — Toutes les dépêches en direct',
      url: 'www.actunet-news.fr',
      target: NEWS_URL,
      desc: "Portail d'information francophone : Monde, Japon, Faits divers, Sports, Sciences. Édition quotidienne depuis 1998. Ticker en continu, édition du jour...",
    },
    fakes: [
      { title: 'ActuNet — Pages Jaunes Internet', url: 'www.pj-internet.fr/annuaire/a/actunet', desc: 'Référencement officiel du portail ActuNet. Catégorie : Presse en ligne / Information générale. Siège : Paris 11e.' },
      { title: 'ActuNet Pro — hébergement web dès 2000¥/mois', url: 'www.actunet-pro.jp/hebergement', desc: 'Offres d\'hébergement mutualisé, nom de domaine .jp inclus, support FTP. Ne concerne pas le portail ActuNet Actualités.' },
      { title: 'Fédération de presse numérique — membre : ActuNet', url: 'www.fpn.fr/membres/actunet', desc: 'Fiche associative — ActuNet Actualités (FR). Rédacteur en chef : [données protégées].' },
      { title: '"Pourquoi ActuNet a retiré son article ?" — Forum Médias', url: 'www.forum-medias.fr/sujet/23418', desc: '— Quelqu\'un a sauvegardé l\'article sur le rapport #00x7 avant qu\'ils le suppriment ? Je le trouve plus nulle part.  |  12 réponses.' },
      { title: 'ActuNet : archives hebdomadaires (1999–2000)', url: 'archives.actunet-news.fr/1999-2000', desc: 'Accès aux numéros archivés. Certaines éditions de novembre 1999 sont manquantes : « édition non distribuée pour raisons indépendantes de notre volonté ».' },
      { title: 'ActuNet contre-attaque après une plainte anonyme', url: 'www.pressewatch.fr/actunet-plainte-anonyme', desc: 'Le portail d\'actualités maintient ses publications sur la Tokyo Skyrunner League, malgré une demande de retrait reçue début janvier 6090.' },
      { title: 'Webring ActuNet — sites partenaires', url: 'webring.actunet-news.fr/partenaires', desc: 'Liste des sites frères : Météo-Express, Sports-JP, Tech1999. Optimisé pour Internet Explorer 5.0 et Netscape Navigator 4.0.' },
      { title: 'ActuNet (animatrice TV) — fiche biographique', url: 'www.stars-tv.fr/fiche/actunet-dubois', desc: 'Homonymie : Actunet Dubois, animatrice d\'une émission régionale. Aucun lien avec le portail d\'information.' },
    ],
  },
  {
    keys: ['clan magaishi', 'magaishi', 'souche magaishi'],
    displayQuery: 'Clan Magaishi',
    resultsCount: '918',
    seconds: '0,31',
    real: {
      title: 'Clan Magaishi — mentionné sur la fiche Kiba Igarashi (Wikipédia)',
      url: 'fr.wikipedia.org/wiki/Kiba_Igarashi#Clan_Magaishi',
      target: WIKI_URL,
      desc: "Le clan Magaishi contrôle une grande partie de la métropole de Tokyo. La souche inférieure, dont est issue la branche Igarashi, est reléguée à des rôles de second plan...",
    },
    fakes: [
      { title: 'Clans de Tokyo — fiche administrative MAGAISHI', url: 'www.tokyo.metro.jp/clans/magaishi', desc: 'Fiche officielle — Territoire : wards de Bunkyo, Toshima, partie de Shinjuku. Porte-parole : [non divulgué]. Statut juridique : reconnu.' },
      { title: 'Magaishi — Pages Jaunes des grandes familles', url: 'www.pj-familles.fr/magaishi', desc: 'Siège principal : immeuble Magaishi, Bunkyo, Tokyo. Téléphone : [masqué sur demande du déclarant].' },
      { title: 'Le blog de Ko — "J\'ai travaillé chez les Magaishi"', url: 'www.leblogdeko.fr/post/chez-les-magaishi', desc: '— On dit plein de choses, mais la vérité c\'est surtout un énorme système de clientèle. Les "souches inférieures" existent bien, elles ramassent la poussière.' },
      { title: 'Rumeurs et "purges" dans la branche Igarashi', url: 'www.forum-medias.fr/sujet/24011', desc: '— Trois noms qui ne figurent plus au recensement. Le clan parle de "mutations". Personne n\'y croit.  |  45 réponses.' },
      { title: 'Magaishi (clan fictif) — fandom encyclopédique', url: 'fandom-clans.fr/wiki/Magaishi', desc: 'Article de fandom : hiérarchie, branches, symboles. Attention, nombreuses sections sont contestées / non sourcées.' },
      { title: 'Yakuza ou clan moderne ? Le cas Magaishi', url: 'www.sociologie-japon.fr/essai/magaishi-moderne', desc: 'Essai universitaire (2000) comparant l\'organisation Magaishi aux structures yakuza traditionnelles. Conclusion : modèle hybride, post-moderne.' },
      { title: 'Magaishi Corp. — dépôt de marque 6087', url: 'www.inpi-jp.jp/marques/magaishi-corp', desc: 'Dépôt classes 9, 35, 41, 45. Statut : enregistrée. Signe distinctif associé : un cercle brisé.' },
      { title: 'Magaishi Shoten — boutique de thés traditionnels', url: 'www.magaishi-shoten.jp', desc: 'Homonymie : boutique de thé située à Kyoto, fondée en 1924. Aucun lien officiel connu avec le clan Magaishi de Tokyo.' },
    ],
  },
  {
    keys: ['tokyo skyrunner league', 'skyrunner league', 'skyrunner', 'skyrunner tokyo'],
    displayQuery: 'Tokyo Skyrunner League',
    resultsCount: '1 487',
    seconds: '0,27',
    real: {
      title: 'Tokyo Skyrunner League — couverture complète (ActuNet)',
      url: 'www.actunet-news.fr/dossiers/tokyo-skyrunner-league',
      target: NEWS_URL,
      desc: "Dossier sportif d'ActuNet : résultats, participants, rumeurs sur la ligue officieuse de parkour urbain de Tokyo. Articles sur les Bunkyo City Bolts et le Rapport #00x7.",
    },
    fakes: [
      { title: 'Skyrunner League — communiqué FFP (fédération)', url: 'www.ffparkour.fr/communique/skyrunner', desc: 'La Fédération Française de Parkour rappelle qu\'elle ne reconnaît aucune compétition appelée "Skyrunner League". Avis aux pratiquants.' },
      { title: 'Classement Tokyo Skyrunner League — 6089', url: 'skyrunner-league.jp/classement/6089', desc: '01. Bunkyo City Bolts  |  02. White Sparrows  |  03. Kanda Ravens  |  04. Tenku Striders  |  ... liste des 16 crews.' },
      { title: 'Parcours Nakano-Kōenji (vidéo amateur)', url: 'video-share.jp/v/82417', desc: 'Durée 04:12 — course de la 3ᵉ manche, vue d\'un toit voisin. Commentaires désactivés sur cette vidéo.' },
      { title: '"Silhouettes aux yeux ambrés" — on a vu la même chose', url: 'www.forum-medias.fr/sujet/24198', desc: '— Pas juste à Bunkyo. Ikebukuro aussi. Toujours en hauteur, toujours immobiles. Personne ne veut en parler officiellement.  |  88 réponses.' },
      { title: 'Ligue Skyrunner (Osaka) — à ne pas confondre', url: 'www.skyrunner-osaka.jp', desc: 'Championnat régional de course en montagne. Rien à voir avec la ligue de parkour de Tokyo. Calendrier 2000 disponible en ligne.' },
      { title: 'Skyrunner — définition (Larousse en ligne)', url: 'www.larousse.fr/dictionnaires/skyrunner', desc: 'Anglicisme : coureur s\'adonnant à la course verticale, urbaine ou montagnarde. Forme féminine : skyrunneuse.' },
      { title: 'Tokyo Skyrunner League — site officiel', url: 'skyrunner-league.jp', desc: 'Dates des prochaines manches, liste officielle des crews. Avertissement en pied de page : "la ligue décline toute responsabilité en cas d\'incident lors des courses".' },
      { title: 'Tokyo SKY Runner — marathon annuel (homonymie)', url: 'www.tokyo-sky-runner.jp', desc: 'Course caritative longue distance. Homonymie fréquente avec la ligue officieuse. Inscriptions ouvertes.' },
    ],
  },
  {
    keys: ['tenku striders', 'tenku', 'striders', 'takumi kurogane'],
    displayQuery: 'Tenku Striders',
    resultsCount: '746',
    seconds: '0,22',
    real: {
      title: 'Tenku Striders — rivalité et dossier sportif (ActuNet)',
      url: 'www.actunet-news.fr/sports/tenku-striders',
      target: NEWS_URL,
      desc: "Portrait du crew lycéen Tenku Striders, mené par Takumi Kurogane. Articles récents : esquive des questions de la presse, rivalité avec les Bunkyo City Bolts.",
    },
    fakes: [
      { title: 'Tenku Striders — classement Skyrunner League', url: 'skyrunner-league.jp/crew/tenku-striders', desc: 'Position actuelle : 4ᵉ. Capitaine : T. Kurogane. Bilan saison : 2 victoires, 5 podiums, 1 disqualification.' },
      { title: 'Takumi Kurogane — interview exclusive (parkourjp.net)', url: 'www.parkourjp.net/interviews/takumi-kurogane', desc: '"Je ne lis pas les articles d\'ActuNet. Ce qui s\'est passé au tournoi des Ura Ura Kidz ne regarde personne." — T. Kurogane, mars 6090.' },
      { title: 'Forum ParkourJP :: Tenku Striders, vrais champions ?', url: 'www.parkourjp.net/forum/viewtopic?t=90112', desc: '— Depuis qu\'ils ont recruté Takumi, ils n\'ont plus gagné une seule fois contre les Bolts. Coïncidence ?  |  61 réponses.' },
      { title: 'Tenku Striders (manga) — tome 3 en librairie', url: 'www.librairie-manga.fr/tenku-striders-t3', desc: 'Manga en 5 tomes publié chez Éditions Tōkai. Aucun lien avec le crew réel, selon l\'éditeur.' },
      { title: 'Ura Ura Kidz → Tenku Striders : la bascule', url: 'archives.actunet-news.fr/sports/uraura-tenku', desc: 'Retour sur le tournoi décisif opposant les Ura Ura Kidz à la relève Tenku Striders. L\'article évoque la chute de Ryohei Nishikawa.' },
      { title: 'Skyrunner League — vidéo : Tenku vs Bolts, manche 2', url: 'video-share.jp/v/81006', desc: 'Durée 06:44 — passage au ralenti du virage contesté du 4ᵉ checkpoint. Vidéo signalée puis réactivée.' },
      { title: 'Tenku Striders — t-shirts & goodies officiels', url: 'www.shop-skyrunner.jp/tenku-striders', desc: 'Merchandising officiel : maillots (éditions printemps), casquettes, pochettes. Expédition Japon uniquement.' },
      { title: 'Pourquoi Takumi esquive les interviews ?', url: 'www.forum-medias.fr/sujet/24350', desc: '— Il pète la forme sur les courses mais dès qu\'un micro arrive, il est pressé. Quelqu\'un a une théorie ?  |  39 réponses.' },
    ],
  },
  {
    keys: ['bunkyo city bolts', 'bunkyo bolts', 'bunkyo', 'city bolts', 'aoi kanzaki', 'hidemichi oyama', 'daigo kawamura'],
    displayQuery: 'Bunkyo City Bolts',
    resultsCount: '1 093',
    seconds: '0,19',
    real: {
      title: 'Bunkyo City Bolts — composition du crew (Wikipédia / fiche Kiba Igarashi)',
      url: 'fr.wikipedia.org/wiki/Kiba_Igarashi#Bunkyo_City_Bolts',
      target: WIKI_URL,
      desc: "Crew de parkour de l'arrondissement de Bunkyo. Membres : Kiba Igarashi (Kōga), Aoi Kanzaki, Hidemichi Ōyama, Daigo Kawamura. Rivaux historiques des Tenku Striders.",
    },
    fakes: [
      { title: 'Bunkyo City Bolts — fiche crew officielle', url: 'skyrunner-league.jp/crew/bunkyo-city-bolts', desc: 'Leader : K. Igarashi. Palmarès 6089 : 1er au classement saison. Style : rapide, agressif, imprévisible. 4 titulaires + 0 remplaçants.' },
      { title: 'Bunkyo — quartier parkour par excellence (JP-Trip)', url: 'www.jp-trip.fr/guides/bunkyo-parkour', desc: 'Guide touristique : spots légaux, cafés fréquentés par les traceurs, meilleurs toits pour observer les courses nocturnes (à vos risques).' },
      { title: 'Aoi Kanzaki — "le cerveau des Bolts" (portrait)', url: 'www.actunet-news.fr/sports/aoi-kanzaki-portrait', desc: 'Portrait d\'Aoi Kanzaki, stratège du crew. Silencieuse en course, redoutable sur le tableau. Peu d\'apparitions publiques.' },
      { title: 'Hidemichi Ōyama — fiche physique / Skyrunner', url: 'skyrunner-league.jp/athlete/hidemichi-oyama', desc: 'Taille 1m94, 94 kg. Style : puissance, franchissement. Ne possède pas de Shokan documenté mais plusieurs témoignages contraires existent.' },
      { title: 'Daigo Kawamura — le plus rapide du nord de Tokyo', url: 'www.parkourjp.net/profils/daigo-kawamura', desc: 'Profil athlète : temps records sur checkpoints droits. Réputation sulfureuse : 2 disqualifications, 1 accrochage avec les White Sparrows.' },
      { title: 'Bunkyo City — mairie d\'arrondissement', url: 'www.city.bunkyo.lg.jp', desc: 'Site officiel de la mairie de Bunkyo. Nous ne commentons pas les événements liés à la "Tokyo Skyrunner League" (communiqué du 15/01/6090).' },
      { title: 'Bunkyo Bolts (équipe de football) — à ne pas confondre', url: 'www.foot-amateur-jp.fr/clubs/bunkyo-bolts', desc: 'Club amateur de football, division régionale. Saison 2000 : 3 victoires, 4 nuls, 2 défaites.' },
      { title: 'Bolts — agence de pub (homonymie)', url: 'www.bolts-agency.com', desc: 'Agence de communication numérique basée à Londres. Aucun rapport avec le crew de parkour japonais.' },
    ],
  },
  {
    keys: ['ryohei nishikawa', 'ryohei', 'nishikawa', 'disparition ryohei'],
    displayQuery: 'Ryohei Nishikawa',
    resultsCount: '3 821',
    seconds: '0,26',
    real: {
      title: 'Disparition de Ryohei Nishikawa — dossier à la une (ActuNet)',
      url: 'www.actunet-news.fr/dossiers/ryohei-nishikawa',
      target: NEWS_URL,
      desc: "Article principal d'ActuNet : plus de deux mois sans la moindre trace. Dernier message : « je m'absente, ne me cherche pas. » L'enquête reste ouverte à la préfecture.",
    },
    fakes: [
      { title: 'Ryohei Nishikawa — appel à témoins (police de Tokyo)', url: 'www.keishicho.metro.tokyo.jp/appel/nishikawa-r', desc: 'Homme, 20 ans, 1m78, dernier signalement : Bunkyo, 07/11/6089 vers 23h. Toute information peut être communiquée à la préfecture.' },
      { title: 'Ryohei Nishikawa (@ryo_nishi) — profil archivé', url: 'www.photoroll.jp/ryo_nishi', desc: 'Profil inactif depuis 68 jours. Dernier post : photo floue d\'un toit, légende "ils sont là, encore une fois". Commentaires désactivés.' },
      { title: 'Ura Ura Kidz — l\'ancien leader disparu', url: 'archives.actunet-news.fr/sports/uraura-leader', desc: 'Retour sur la carrière de Ryohei : meilleur traceur du tournoi, blessure aux jambes, reconversion en gestionnaire, disparition.' },
      { title: 'Famille Nishikawa : "Nous n\'avons plus aucune nouvelle"', url: 'www.actunet-news.fr/faits-divers/famille-nishikawa', desc: 'Entretien avec les parents de Ryohei. Témoignage poignant, refus de commenter les hypothèses liées à la Tokyo Skyrunner League.' },
      { title: 'Nishikawa (homonymie) — Wikipédia', url: 'fr.wikipedia.org/wiki/Nishikawa', desc: 'Page d\'homonymie : Nishikawa, patronyme japonais répandu. Pour la disparition du traceur, voir Affaire Ryohei Nishikawa (6090).' },
      { title: 'Forum Médias :: L\'affaire Nishikawa est-elle étouffée ?', url: 'www.forum-medias.fr/sujet/24457', desc: '— ActuNet est le seul média qui publie encore sur cette affaire. Les autres ont arrêté du jour au lendemain. Hasard ?  |  72 réponses.' },
      { title: 'Ryohei Nishikawa (judoka) — à ne pas confondre', url: 'www.judojp.fr/athletes/ryohei-nishikawa', desc: 'Judoka vétéran de Nagoya, ceinture noire 5ᵉ dan. Aucun lien avec le traceur disparu de Bunkyo.' },
      { title: 'Pétition en ligne — Rouvrez l\'enquête Nishikawa', url: 'www.petition-web.jp/nishikawa-rouvrir-enquete', desc: '14 218 signataires. Objectif : 20 000. Adressée à la préfecture de police de Tokyo et au bureau d\'enquêtes spéciales.' },
    ],
  },
]

function matchTopic(query) {
  const q = query.trim().toLowerCase()
  if (!q) return null
  for (const t of SEARCH_TOPICS) {
    if (t.keys.some(k => q.includes(k))) return t
  }
  return null
}

function FakeGoogleResults({ topic, query, onResultClick }) {
  return (
    <div className="browser__gresults">
      <div className="browser__gresults-header">
        <div className="browser__gresults-logo">
          <span style={{ color: '#0000cc' }}>G</span>
          <span style={{ color: '#cc0000' }}>o</span>
          <span style={{ color: '#cc9900' }}>o</span>
          <span style={{ color: '#0000cc' }}>g</span>
          <span style={{ color: '#339900' }}>l</span>
          <span style={{ color: '#cc0000' }}>e</span>
        </div>
        <div className="browser__gresults-searchline">
          <input
            className="browser__gresults-input"
            value={query}
            readOnly
          />
          <button className="browser__gresults-btn">Recherche Google</button>
        </div>
      </div>
      <div className="browser__gresults-tabs">
        <span className="browser__gresults-tab browser__gresults-tab--active">Web</span>
        <span className="browser__gresults-tab">Images</span>
        <span className="browser__gresults-tab">Groupes</span>
        <span className="browser__gresults-tab">Annuaire</span>
        <span className="browser__gresults-tab">Actualités</span>
      </div>
      <div className="browser__gresults-count">
        Résultats <b>1 - {topic.fakes.length + 1}</b> sur environ <b>{topic.resultsCount}</b> pour <b>{query}</b>. ({topic.seconds} secondes)
      </div>

      <ol className="browser__gresults-list">
        {/* PREMIER résultat = LE vrai, cliquable */}
        <li className="browser__gresults-item browser__gresults-item--real">
          <a
            className="browser__gresults-title"
            href="#"
            onClick={(e) => { e.preventDefault(); onResultClick(topic.real.target) }}
          >
            {topic.real.title}
          </a>
          <p className="browser__gresults-desc">{topic.real.desc}</p>
          <div className="browser__gresults-url">
            {topic.real.url} - <span className="browser__gresults-cache">Cache</span> - <span className="browser__gresults-cache">Pages similaires</span>
          </div>
        </li>

        {/* Faux résultats, non cliquables */}
        {topic.fakes.map((r, i) => (
          <li className="browser__gresults-item" key={i}>
            <span className="browser__gresults-title browser__gresults-title--dead">
              {r.title}
            </span>
            <p className="browser__gresults-desc">{r.desc}</p>
            <div className="browser__gresults-url">
              {r.url} - <span className="browser__gresults-cache">Cache</span> - <span className="browser__gresults-cache">Pages similaires</span>
            </div>
          </li>
        ))}
      </ol>

      <div className="browser__gresults-pager">
        <span className="browser__gresults-gooogle">
          <span style={{ color: '#0000cc' }}>G</span>
          <span style={{ color: '#cc0000' }}>o</span>
          <span style={{ color: '#cc9900' }}>o</span>
          <span style={{ color: '#cc9900' }}>o</span>
          <span style={{ color: '#0000cc' }}>o</span>
          <span style={{ color: '#339900' }}>o</span>
          <span style={{ color: '#cc0000' }}>o</span>
          <span style={{ color: '#0000cc' }}>g</span>
          <span style={{ color: '#339900' }}>l</span>
          <span style={{ color: '#cc0000' }}>e</span>
        </span>
        <div className="browser__gresults-pages">
          <b>1</b>
          <span className="browser__gresults-page-link">2</span>
          <span className="browser__gresults-page-link">3</span>
          <span className="browser__gresults-page-link">4</span>
          <span className="browser__gresults-page-link">5</span>
          <span className="browser__gresults-page-link">Suivant ›</span>
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

function FakeGoogle({ onNormalSearch, onSecretSearch }) {
  const [query, setQuery] = useState('')
  const handleSearch = () => {
    const q = query.trim()
    if (!q) return
    const topic = matchTopic(q)
    if (topic) {
      onNormalSearch(q, topic)
      return
    }
    const lower = q.toLowerCase()
    if (SECRET_SEARCHES.some(s => lower.includes(s))) {
      onSecretSearch(q)
    } else {
      // Recherche non reconnue : on affiche quand même une page vide-ish
      onNormalSearch(q, null)
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
          data-testid="google-search-input"
        />
        <div className="browser__google-btns">
          <button className="browser__google-btn" onClick={handleSearch} data-testid="google-search-btn">Recherche Google</button>
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

function FakeGoogleNoResult({ query }) {
  return (
    <div className="browser__gresults">
      <div className="browser__gresults-header">
        <div className="browser__gresults-logo">
          <span style={{ color: '#0000cc' }}>G</span>
          <span style={{ color: '#cc0000' }}>o</span>
          <span style={{ color: '#cc9900' }}>o</span>
          <span style={{ color: '#0000cc' }}>g</span>
          <span style={{ color: '#339900' }}>l</span>
          <span style={{ color: '#cc0000' }}>e</span>
        </div>
        <div className="browser__gresults-searchline">
          <input className="browser__gresults-input" value={query} readOnly />
          <button className="browser__gresults-btn">Recherche Google</button>
        </div>
      </div>
      <div className="browser__gresults-count">
        Votre recherche - <b>{query}</b> - n'a produit aucun document.
      </div>
      <div className="browser__gresults-empty">
        <p>Suggestions :</p>
        <ul>
          <li>Vérifiez l'orthographe des termes recherchés.</li>
          <li>Essayez des mots-clés différents.</li>
          <li>Essayez des mots-clés plus généraux.</li>
        </ul>
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
            <em>Cet article traite d'une personnalité publique. Pour d'autres usages, voir <span className="browser__wiki-link">Igarashi (homonymie)</span>.</em>
          </div>
          <div className="browser__wiki-notice">
            <strong>Cet article est une ébauche concernant une personne physique.</strong> Vous pouvez partager vos connaissances en l'améliorant.
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
                <tr><th>Naissance</th><td>23 mai 6070 (19 ans) (♊︎)</td></tr>
                <tr><th>Sexe</th><td>Masculin ♂</td></tr>
                <tr><th>Alignement</th><td>Neutre - Bon</td></tr>
                <tr><th>Clan</th><td>Magaishi</td></tr>
                <tr><th>Rôle</th><td>Membre</td></tr>
                <tr><th>Shokan</th><td>Écho de l'âme</td></tr>
                <tr><th>Type</th><td>???</td></tr>
                <tr><th>Rang</th><td>E</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Kiba Igarashi</strong> (五十嵐 牙, <em>Igarashi Kiba</em>), aussi appelé <strong>Kōga</strong> ou <strong>Croc Écarlate</strong>, est un <em>chevalier</em> de rang E. C'est un membre issu de la souche inférieure du clan <strong>Magaishi</strong>, qui contrôle une grande partie de la <em>métropole de Tokyo</em>. Affilié de second plan du fait de son jeune âge et de sa position au sein de la hiérarchie, il est peu impliqué dans les affaires officielles du clan et apparaît rarement dans les registres gouvernementaux qui y sont liés.
          </p>
          <p>Il est membre des <strong>Bunkyo City Bolts</strong>, un groupe de <em>parkour</em> très présent sur la scène locale et participant à de nombreuses compétitions dans la capitale, qu'ils ont remportées à plusieurs reprises. Ils alimentent une rivalité avec le fameux crew <strong>Tenku Striders</strong>.</p>
          <div className="browser__wiki-toc">
            <div className="browser__wiki-toc-title">Sommaire</div>
            <ol>
              <li>
                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-apparence')?.scrollIntoView({ behavior: 'smooth' })}>Apparence</span>
                <ol>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-physique')?.scrollIntoView({ behavior: 'smooth' })}>Physique</span></li>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-style')?.scrollIntoView({ behavior: 'smooth' })}>Style vestimentaire</span></li>
                </ol>
              </li>
              <li>
                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-personnalite')?.scrollIntoView({ behavior: 'smooth' })}>Personnalité</span>
                <ol>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-temperament')?.scrollIntoView({ behavior: 'smooth' })}>Tempérament</span></li>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-qualites')?.scrollIntoView({ behavior: 'smooth' })}>Qualités et Défauts</span></li>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-desirs')?.scrollIntoView({ behavior: 'smooth' })}>Désirs et craintes</span></li>
                </ol>
              </li>
              <li>
                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-biographie')?.scrollIntoView({ behavior: 'smooth' })}>Biographie</span>
                <ol>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-origine')?.scrollIntoView({ behavior: 'smooth' })}>Origine et famille</span></li>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-parkour')?.scrollIntoView({ behavior: 'smooth' })}>Découverte du parkour et les <em>Ura Ura Kidz</em></span></li>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-bunkyo')?.scrollIntoView({ behavior: 'smooth' })}><em>Bunkyo City Bolts</em> et la <em>Skyrunner League</em></span></li>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-disparition')?.scrollIntoView({ behavior: 'smooth' })}>Premier contact et disparition de Ryohei Nishikawa</span></li>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-present')?.scrollIntoView({ behavior: 'smooth' })}>Présent</span></li>
                </ol>
              </li>
              <li>
                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-aptitudes')?.scrollIntoView({ behavior: 'smooth' })}>Aptitudes et compétences</span>
                <ol>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-competences')?.scrollIntoView({ behavior: 'smooth' })}>Compétences générales</span></li>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-combat')?.scrollIntoView({ behavior: 'smooth' })}>Style de combat</span></li>
                  <li><span className="browser__wiki-link" onClick={() => document.getElementById('wiki-shokan')?.scrollIntoView({ behavior: 'smooth' })}>Shokan</span></li>
                </ol>
              </li>
              <li>
                <span className="browser__wiki-link" onClick={() => document.getElementById('wiki-references')?.scrollIntoView({ behavior: 'smooth' })}>Références</span>
              </li>
            </ol>
          </div>
          <h2 id="wiki-apparence" className="browser__wiki-h2">Apparence</h2>
          <h3 id="wiki-physique" className="browser__wiki-h3">Physique</h3>
          <p>
            Du haut de son mètre quatre-vingt (<em>1m80</em>) et pesant soixante-et-onze kilogrammes (<em>71kg</em>), Kiba est un homme qui possède un physique plutôt banal. Ses cheveux carmins tirent légèrement vers un rouge brun et sont coiffés de manière naturelle, presque négligée avec des mèches désordonnées qui retombent sur son front sans jamais vraiment masquer ses yeux. Son visage est équilibré, aux traits nets mais assez doux. Ses yeux sont violets et dessinés en amande. Le grain de beauté sous son œil gauche attire subtilement l’attention et ajoute une petite signature visuelle qui casse la symétrie de son visage. Kiba ne possède aucun tatouage ni piercing, et son corps ne présente aucune cicatrice visible ou importante.
          </p>
          <h3 id="wiki-style" className="browser__wiki-h3">Style vestimentaire</h3>
          <p>
            Côté style vestimentaire, Kiba privilégie l’essentiel. Des vêtements simples, confortables mais toujours pratiques. Son style penche vers le streetwear, sans extravagance et fonctionnel avant tout, sans jamais être négligé. Son accoutrement de prédilection est un sweat à capuche beige et ample, un pantalon chino bleu nuit bien ajusté, des sneakers basses blanches délavées à scratch et un blouson type bomber vert foncé. Il ne porte pas d'accessoires particuliers, préférant garder une apparence épurée et sans fioritures, à l’image de sa personnalité.
          </p>
          <h2 id="wiki-personnalite" className="browser__wiki-h2">Personnalité</h2>
          <h3 id="wiki-temperament" className="browser__wiki-h3">Tempérament</h3>
          <p>
            Kiba est quelqu’un d’ouvert, avenant et facile à approcher. Il engage la conversation sans difficulté et met naturellement les autres à l’aise, sans effort particulier. Son attitude détendue et son sens du contact lui permettent de s’intégrer rapidement, quel que soit le contexte. Il possède une énergie plutôt tranquille, sans jamais devenir envahissant, ce qui rend sa présence agréable. Il trouve instinctivement sa place parmi les autres, sans chercher à s’imposer. Sociable sans être dépendant, Kiba apprécie les échanges simples et sincères, mais garde toujours une certaine maîtrise de lui-même. Il sait écouter, répondre, plaisanter, mais choisit avec soin ce qu’il révèle réellement de lui. En effet, derrière cette facilité apparente se cache quelqu’un de plus mesuré, qui ne se livre jamais complètement, même dans des relations proches.
          </p>
          <h3 id="wiki-qualites" className="browser__wiki-h3">Qualités et Défauts</h3>
          <p>
            Kiba possède un excellent sens du relationnel. Il comprend rapidement les dynamiques sociales et sait adapter son comportement en fonction des personnes qu’il a en face de lui, sans jamais paraître artificiel. Il est aussi constant dans ses efforts. Peu importe les circonstances, il maintient un rythme stable et fiable, ce qui fait de lui quelqu’un sur qui l’on peut compter dans la durée. Il n'est pas du genre à trop réfléchir et vouloir tout analyser avant de se lancer, préférant prendre des risques au risque d'échouer.Enfin, Kiba est assez pragmatique et ne s’attarde pas inutilement sur ce qui ne peut pas être changé car il préfère se concentrer sur ce qui dépend réellement de lui.
          </p>
          <p>
            Mais à l'inverse, Kiba peut donner l’illusion d’être plus proche des autres qu’il ne l’est réellement. Sa facilité sociale masque une sorte de distance émotionnelle, qui peut créer un décalage entre ce que les autres ressentent et ce qu’il est prêt à offrir. Il a tendance à éviter les confrontations importantes en les désamorçant par le dialogue ou l’humour. Mais si cela fonctionne dans des situations légères, cela devient problématique lorsque les enjeux sont plus sérieux. Finalement, Kiba est parfois trop spontané dans ses décisions, au point de ne pas toujours peser le pour et le contre.
          </p>
          <h3 id="wiki-desirs" className="browser__wiki-h3">Désirs et craintes</h3>
          <p>
            Au fond, Kiba aspire à une forme de liberté simple et honnête. Il ne cherche ni la gloire ni le pouvoir, mais souhaite avancer selon ses propres règles, sans être défini par son nom ou son appartenance au clan Magaishi. À travers le parkour, il cherche un espace où il peut exister pleinement, sans contrainte ni attente extérieure. C’est dans ces moments qu’il se sent le plus proche de ce qu’il veut être. Bien qu’il ne l’exprime pas ouvertement, Kiba aspire à créer des liens sincères, des relations basées sur la confiance et le respect mutuel, loin des hiérarchies et des intérêts du clan.
          </p>
          <p>
            L'une des plus grandes craintes de Kiba est la stagnation. L’idée de rester au même point et de ne pas évoluer malgré ses efforts, est quelque chose qu’il perçoit comme un échec profond. Il redoute aussi de ne pas être à la hauteur. Non pas aux yeux des autres, mais face à ses propres attentes et c'est cette peur alimente son besoin constant de progresser.
          </p>
          <h2 id="wiki-biographie" className="browser__wiki-h2">Biographie</h2>
          <h3 id="wiki-origine" className="browser__wiki-h3">Origine et famille</h3>
          <p>
            Kiba est issu de la famille <strong>Igarashi</strong>, une lignée mineure quasiment oubliée et éclipsée par les branches supérieures du clan <strong>Magaishi</strong>. Contrairement aux lignées principales, où les héritiers sont formés dès l’enfance pour occuper des fonctions stratégiques, la branche dont il est issu occupe une position de second plan et est souvent reléguée à des rôles d’exécution ou de soutien. De ce fait, il a grandi loin des projecteurs, dans une relative obscurité, sans les pressions et les attentes qui pèsent sur les membres plus en vue du clan.
          </p>
          <p>
            Élevé dans le quartier de <em>Bunkyo</em> à Tokyo, Kiba n'a pas eu d'enfance particulièrement dure, ni réellement privilégiée. Ses parents, bien que membres du clan, n'ont jamais été très impliqués dans les affaires internes et ont laissé une grande liberté à leur fils, tant qu'il respectait les règles de base. Ce côté indépendant lui a permis d explorer ses propres intérêts et de développer sa personnalité sans être constamment comparé à des figures plus prestigieuses de la famille.
          </p>
          <h3 id="wiki-parkour" className="browser__wiki-h3">Découverte du parkour et les <em>Ura Ura Kidz</em></h3>
          <p>
            Ses journées passées à profiter de cette liberté en vadrouillant dans les rues des différents quartiers de la capitale l'amènent à faire la rencontre de <strong>Ryohei Nishikawa</strong>, un camarade de collège qui deviendra rapidement son meilleur ami. Ryohei est le leader naturel d’un petit groupe cherchant à former un club de parkour au sein du collège. Il recrute Kiba afin de permettre la création officielle du club, qui est complété par <strong>Takumi Kurogane</strong>, un garçon sûr de lui, ambitieux, et cherchant à surpasser Ryohei ; ainsi que <strong>Aoi Kanzaki</strong>, une adolescente silencieuse, analytique, et qui est le véritable cerveau stratégique de l'équipe.
          </p>
          <p>
            Sous le nom des <em>Ura Ura Kidz</em>, ils participent à des courses clandestines contre d’autres équipes des collèges de l’arrondissement de Bunkyo. Leur progression est rapide et ils sont bientôt invités à participer à des runs organisées. Leur cohésion, leur créativité et leur style attirent l’attention des <em>Tenku Striders</em>, une équipe de lycéens réputée dans tout Tokyo, qui cherchent à recruter une nouvelle génération pour reprendre leur place avant d'obtenir leur diplôme de fin d'études. Un tournoi final est organisé et oppose les meilleures équipes des collèges environnants. Mais une seule équipe sera choisie et aura le privilège de porter le nom de <em>Tenku Striders</em>.
          </p>
          <p>
            Les <em>Ura Ura Kidz</em> parviennent jusqu'en finale sans trop de mal. Mais lors de cette course décisive, tout bascule. Alors que la victoire semble à leur portée, Takumi révèle ses véritables intentions et finit par trahir le groupe. Au moment d’un saut critique, il pousse volontairement le leader des <em>Ura Ura Kidz</em> dans le vide. La chute est violente et malgré les tentatives désespérées de Kiba et Aoi pour le rattraper, Ryohei, considéré comme le meilleur <em>traceur</em> du tournoi, s’écrase lourdement après plusieurs mètres de chute libre et subit de graves blessures aux jambes. La course est perdue et les <em>Tenku Striders</em> recrutent l’équipe adverse, avec Takumi à leur tête.
          </p>
          <h3 id="wiki-bunkyo" className="browser__wiki-h3"><em>Bunkyo City Bolts</em> et la <em>Tokyo Skyrunner League</em></h3>
          <p>
            Après une longue rééducation, Ryohei parvient à remarcher mais ne peut plus pratiquer le parkour au même niveau. À leur entrée au lycée, il choisit d’abandonner son rêve d'être le meilleur traceur du Japon et se tourne vers une autre passion liée à cette pratique qu'il aime tant, la gestion. Il espère voir la pratique se démocratiser et il est prêt à tout pour que cela arrive. Cependant, avant de tourner la page, il confie ses dernières instructions à son meilleur ami. Continuer, avancer et ne pas laisser cette trahison être la fin de leur histoire. Encouragés par leur ami, Kiba et Aoi fondent leur propre équipe au club de parkour du lycée. Les <em>Bunkyo City Bolts</em> sont nés. Contrairement aux <em>Ura Ura Kidz</em>, leur approche de la course change drastiquement. Moins naïve, plus directe et ancrée dans la performance plutôt que dans le rêve. Ils sont rejoints par <strong>Hidemichi Ōyama</strong>, un lycéen à la carrure impressionnante qui respire la puissance ainsi que <strong>Daigo Kawamura</strong>, considéré comme l'un des traceurs les plus rapides du nord de Tokyo, mais qui manque de discipline.
          </p>
          <p>
            Les <em>Bunkyo City Bolts</em> se font rapidement un nom dans la scène underground de Tokyo grâce à leur style reconnaissable. Ils sont rapides, agressifs et imprévisibles mais surtout, chaque membre détient un <em>Shokan</em>. C'est donc tout naturellement que le crew finit par intégrer la <strong>Tokyo Skyrunner League</strong>, une compétition officieuse mais extrêmement influente, où s’affrontent les meilleures équipes de parkour urbain avec un twist : l'utilisation de <em>Shokan</em> est autorisée et (presque) tous les coups sont permis. Mais tout sport populaire possède son lot de sombres secrets, surtout quand ils touchent aux <em>Chevaliers</em>, et les jeux de pouvoirs sont comme un poison inévitable qui corrompt tout ce qu'il touche.
          </p>
          <h3 id="wiki-disparition" className="browser__wiki-h3">Premier contact et disparition de Ryohei Nishikawa</h3>
          <p>
            Alors que les <em>Bunkyo City Bolts</em> s’imposent progressivement dans la <em>Tokyo Skyrunner League</em>, Kiba et le crew maintiennent un lien régulier avec Ryohei. Contrairement à ce que l’on pourrait attendre, leur relation ne s’est jamais brisée. Ryohei suit attentivement les performances des Bolts, commente leurs courses, corrige certains choix, à la manière d'un coach qui fait encore partie de l’équipe. Mais quelque chose a changé. Depuis leur entrée dans la ligue, Ryohei se montre plus attentif à certains détails, comme les équipes qui utilisent des <em>Shokans</em>, les comportements anormaux en course, ou même certains participants qui disparaissent du circuit du jour au lendemain. Au début, cela ressemble à de simples observations mais progressivement au fil des ans, ses remarques deviennent plus précises. Il évoque des schémas, des absences répétées et des noms qui cessent d’apparaître sans explication. Plusieurs crews remarquent aussi la présence d'une ou plusieurs silhouettes placées à plusieurs endroits de la course, qui observent de leurs yeux ambrés et brillants, les membres les plus éminents. Phénomène qui devient systématique au fil des ans, mais ignoré par la grande majorité. En dernière année au lycée, Ryohei commence à s’intéresser à ce qui entoure réellement la <em>Tokyo Skyrunner League</em> et surtout aux <em>Chevaliers</em> qui participent.
          </p>
          <p>
            Lors de leurs derniers échanges, Ryohei confie à Kiba une intuition troublante. Selon lui, certains participants ne sont pas simplement éliminés ou blessés, ils sont ciblés. Ceux qui possèdent un <em>Shokan</em> particulièrement instable, atypique ou prometteur. Bien sûr, il n’a aucune preuve concrète mais se décide de mener l'enquête, avec un sentiment persistant : quelqu’un observe la ligue et sélectionne. Parce que malgré sa blessure, Ryohei reste un cas à part. Son talent n’a jamais réellement disparu, il s’est transformé. Moins explosif, mais plus précis. Moins rapide, mais plus efficace. Et surtout, lui aussi est détenteur d'un <em>Shokan</em>, que personne, pas même Kiba, n'a eu l'occasion d'observer.
          </p>
          <p>
            Puis quelques mois après avoir obtenu leur diplôme de fin d'études, Ryohei cesse de répondre. Il envoie une dernière instruction à son meilleur ami, pour le prévenir qu'il s'absente et qu'il est inutile de partir à sa recherche. Les messages restent sans réponse, les appels tombent dans le vide. Les lieux qu’il fréquentait sont déserts et ses habitudes s’arrêtent net. Comme s’il avait simplement disparu au bon moment.
          </p>
          <h3 id="wiki-present" className="browser__wiki-h3">Présent</h3>
          <p>
            Aujourd'hui encore, plus de 2 mois après la disparition de son meilleur ami, Kiba poursuit les recherches. Officiellement, rien n’a changé. Il continue d’évoluer avec les <em>Bunkyo City Bolts</em>, d’enchaîner les courses dans la <em>Tokyo Skyrunner League</em>, et de participer aux compétitions comme n’importe quel autre traceur. Sauf qu'en réalité, tout a changé. Chaque course est devenue une analyse. Chaque adversaire, une piste potentielle. Chaque disparition, une répétition du même schéma. Et ces mystérieuses silhouettes, toujours présentes pour les observer, mais toujours assez loin pour être inaccessibles... La majorité des participants les ignore et les organisateurs n’en parlent pas. Mais ceux qui les pointent publiquement du doigt, finissent rarement par les revoir une deuxième fois.
          </p>
          <p>
            Kiba est face à un mystère qui dépasse largement le cadre de son petit monde, du parkour. Un système qui semble intimement lié aux <em>Chevaliers</em> et aux <em>Shokans</em>. Ce n'est pas la ligue qu'il observent mais certains participants. Une question se pose alors : 
          </p>
          <p>
            <strong>Saura-t-il percer le secret de la disparition de son meilleur ami ?</strong>
          </p>
          <h2 id="wiki-aptitudes" className="browser__wiki-h2">Aptitudes et compétences</h2>
          <h3 id="wiki-competences" className="browser__wiki-h3">Compétences générales</h3>
          <ul className="browser__wiki-list">
            <li><strong>Motricité</strong> — Kiba est ambidextre depuis son plus jeune âge et possède une excellente coordination œil-main et œil-pied.</li>
            <li><strong>Ouïe surdéveloppée</strong> — Il perçoit les sons avec une acuité exceptionnelle, ce qui lui permet de détecter des bruits subtils.</li>
            <li><strong>Langues</strong> — En plus du japonais, sa langue maternelle, Kiba parle aussi couramment l'anglais, le mandarin et le cantonais.</li>
            <li><strong>Technologie</strong> — Kiba est familier avec les dernières avancées technologiques et connaît plusieurs langages de programmation.</li>
          </ul>
          <h3 id="wiki-combat" className="browser__wiki-h3">Style de combat</h3>
            <p>
              Kiba ne possède pas de style de combat à proprement parler. Sa manière de combattre se rapproche plus du <em>street fighting</em> que des arts martiaux traditionnels. Il emprunte des techniques de <strong>boxe anglaise</strong>, de <strong>lutte libre</strong>, de <strong>taekwondo</strong> et de <strong>capoeira</strong> qu'il adapte à sa propre manière de bouger. Bien qu'il reste amateur, son style est fluide, imprévisible et chaotique, basé sur les feintes, les changements de rythme mais aussi sur son environnement immédiat.
            </p>
          <h3 id="wiki-shokan" className="browser__wiki-h3">Shokan</h3>
          <p>
            Le <em>Shokan</em> de Kiba lui permet, via son téléphone, de matérialiser sa volonté sous la forme d'une entité semi-indépendante, baptisée <strong>Écho de l'âme</strong>, qui combat à ses côtés. Plutôt que d’invoquer une arme ou une forme fixe, Kiba génère des manifestations éphémères d’énergie qui sont directement liées à son intention au moment de l’action. Il peut faire apparaître un bras, une jambe ou juste une main pour attraper, frapper, bloquer ou plus généralement l'aider dans ses mouvements.
          </p>
          <p>
            Ce <em>Shokan</em> présente plusieurs contraintes qui limitent grandement son efficacité, expliquant son rang au plus bas dans la hiérarchie. D'abord, ses manifestations sont brèves, <strong>1 à 2 secondes</strong> tout au plus, et ne peuvent surgir que dans un <strong>rayon de 4 mètres</strong> autour de Kiba. Ensuite, leur puissance de frappe est équivalente à celle de l'utilisateur, comme s'il s'agissait d'une extension de son propre corps, bien qu'elles ne partagent pas de sensations.
          </p>
          <div className="browser__wiki-references">
            <h2 id="wiki-references" className="browser__wiki-h2">Références</h2>
            <ol className="browser__wiki-ref-list">
              <li>Mairie de Tokyo, <em>Recensement des membres de clan</em>, 6089.</li>
              <li>« Registre gouvernemental des Shokans », <em>Grand Lexique du Japon</em>, consulté le 7 avril 6089.</li>
              <li>Archives Magaishi, document interne, non daté.</li>
            </ol>
          </div>
          <div className="browser__wiki-categories">
            <strong>Catégories :</strong>
            <span className="browser__wiki-link">Homme</span> •
            <span className="browser__wiki-link">Magaishi</span> •
            <span className="browser__wiki-link">Souche inférieure</span> •
            <span className="browser__wiki-link">Shokan</span>
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

const NEWS_DATE = 'Vendredi 17 avril 6089'

const TICKER_ITEMS = [
  "FLASH : Tokyo Skyrunner League — 4ᵉ course de la saison ce week-end à Shinjuku",
  "BUNKYO : La mairie ne commente toujours pas les « silhouettes aux yeux ambrés »",
  "DISPARITION : Ryohei Nishikawa, ex-capitaine des Ura Ura Kidz, toujours introuvable",
  "CLAN : Le porte-parole Magaishi nie toute implication dans l'affaire N.",
  "SPORTS : Les Bunkyo City Bolts installent leur domination sur la ligue",
  "SHOKANS : L'Ordre exige une meilleure classification des Chevaliers de rang E",
  "FAIT DIVERS : Nouvelle « observation ambre » signalée à Ikebukuro",
  "TENKU STRIDERS : Takumi Kurogane esquive les questions de la presse",
]

const NEWS_ARTICLES = [
  {
    id: 1,
    category: "Faits divers",
    catColor: '#336600',
    date: "Jeu. 16 Avr. 6089  |  08:12 JST",
    headline: "Disparition de Ryohei Nishikawa : deux mois sans la moindre trace",
    summary: "Ancien traceur prodige des Ura Ura Kidz devenu gestionnaire, Ryohei Nishikawa reste introuvable. Dernier message à un proche : « je m'absente, ne me cherche pas. »",
    paragraphs: [
      "Plus de deux mois après son dernier signe de vie, le jeune manager et ex-traceur Ryohei Nishikawa demeure officiellement porté disparu. La préfecture de police de Tokyo confirme ce lundi que l'enquête reste ouverte, sans indiquer de piste privilégiée.",
      "Selon plusieurs sources proches du crew des Bunkyo City Bolts, Ryohei était devenu, depuis sa blessure aux jambes lors du tournoi opposant les Ura Ura Kidz aux Tenku Striders, un fin observateur de la scène parkour de la capitale. Il s'intéressait particulièrement aux disparitions à bas bruit de concurrents « atypiques » dans la Tokyo Skyrunner League.",
      "Un membre de son entourage, sous couvert d'anonymat, a livré au correspondant d'ActuNet un témoignage troublant : « Il avait repéré un schéma. Des Chevaliers de rang faible, mais aux Shokans instables — et qui, du jour au lendemain, ne courent plus. Il voulait comprendre. Aujourd'hui, c'est lui qui n'est plus là. »",
      "Le dernier message reçu par son meilleur ami est limpide : « Je m'absente un moment. Inutile de me chercher. » Un courrier au ton posé, mais dont l'implacable brièveté ne cesse d'interroger.",
    ],
  },
  {
    id: 2,
    category: "Sport",
    catColor: '#990000',
    date: "Jeu. 16 Avr. 6089  |  23:48 JST",
    headline: "TOKYO SKYRUNNER LEAGUE — Les Bunkyo City Bolts écrasent la 3ᵉ manche",
    summary: "Menés par un Kiba Igarashi en état de grâce, les Bolts s'imposent sur le parcours de Nakano. Fait notable : plusieurs participants rapportent avoir aperçu « des silhouettes aux yeux ambrés » perchées sur les toits.",
    paragraphs: [
      "Sur un parcours urbain particulièrement exigeant reliant Nakano à Kōenji, les Bunkyo City Bolts ont confirmé dimanche soir leur statut de favoris. Leur crew, composé de Kiba Igarashi dit « Kōga », Aoi Kanzaki, Hidemichi Ōyama et Daigo Kawamura, termine avec plus de onze secondes d'avance sur les White Sparrows de Setagaya.",
      "Le numéro 1 du crew, surnommé « Croc Écarlate » par la scène underground, s'est illustré par une manœuvre saluée par les commentateurs comme « techniquement incompréhensible » : une relance en plein vide entre deux immeubles du quartier commerçant. Son Shokan, classé au rang E et peu documenté, n'a, selon la ligue, rien d'officiel dans cette performance.",
      "Plus discret, mais répété par au moins quatre crews concurrents ce soir-là : la présence de silhouettes immobiles, yeux ambrés luisants, postées en hauteur tout au long du parcours. « On ne sait pas qui c'est. On sait juste qu'ils regardent toujours les mêmes personnes », glisse un traceur des Kanda Ravens.",
      "Interrogés, les organisateurs de la Tokyo Skyrunner League n'ont pas souhaité répondre. La fédération officielle rappelle pour sa part qu'elle ne reconnaît aucun événement appelé « Skyrunner League ».",
    ],
  },
  {
    id: 3,
    category: "Monde",
    catColor: '#004499',
    date: "Sam. 15 Jan. 6090  |  19:05 JST",
    headline: "Clan Magaishi : silence officiel, rumeurs persistantes",
    summary: "Plusieurs noms liés à la souche inférieure du clan Magaishi auraient disparu ces derniers mois des registres municipaux. Le clan nie, la mairie de Tokyo botte en touche.",
    paragraphs: [
      "Le clan Magaishi, qui contrôle une partie de la métropole de Tokyo, est de nouveau cité dans une série de rumeurs concernant la disparition discrète de plusieurs jeunes Chevaliers rattachés à ses branches secondaires. Notre rédaction a pu croiser trois noms cités par des sources indépendantes — aucun ne figure plus dans le dernier recensement municipal.",
      "Officiellement, le porte-parole du clan dément toute forme de « purge », évoquant des « mutations internes ordinaires ». Officieusement, plusieurs observateurs pointent une corrélation gênante : tous les disparus avaient, à un moment ou à un autre, participé à des courses de la Tokyo Skyrunner League.",
      "Un fonctionnaire de la mairie, s'exprimant sous anonymat total, résume l'atmosphère : « Tant que cela concerne les souches inférieures, personne en haut du clan ne bougera. C'est exactement pour ça que ça continue. »",
      "Contactée, l'organisation désignée uniquement comme « L'Académie » — accusée par certains forums de ficher discrètement les Chevaliers au Shokan atypique — n'a pas répondu à nos sollicitations.",
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
  "SPORTS — 4ᵉ manche de la Tokyo Skyrunner League ce samedi à Shinjuku (17/01)",
  "BUNKYO — Nouvelle « observation ambre » signalée près du parc Rikugien (16/01)",
  "CLANS — La mairie de Tokyo confirme deux « mutations » dans la souche Igarashi (15/01)",
  "TECHNOLOGIE — Une mise à jour des Shokans synchronisés par téléphone à l'étude (12/01)",
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

// ── TABS (définitions) ──────────────────────────────────────────

const TAB_DEFS = {
  google: {
    id: 'google',
    label: 'Google',
    url: 'http://www.google.fr/',
    icon: 'https://win98icons.alexmeub.com/icons/png/search_web-1.png',
  },
  wiki: {
    id: 'wiki',
    label: 'Kiba Igarashi — Wikipédia',
    url: 'https://fr.wikipedia.org/wiki/Kiba_Igarashi',
    icon: 'https://win98icons.alexmeub.com/icons/png/web_file-0.png',
  },
  news: {
    id: 'news',
    label: 'ActuNet Actualités',
    url: 'http://www.actunet-news.fr/',
    icon: 'https://win98icons.alexmeub.com/icons/png/web_file-0.png',
  },
}

// ── Browser ──────────────────────────────────────────────────────

export default function Browser() {
  // Au démarrage : SEUL l'onglet Google est ouvert.
  const [openedTabs, setOpenedTabs] = useState(['google'])
  const [activeTab, setActiveTab] = useState('google')
  const [secretTabVisible, setSecretTabVisible] = useState(false)
  const [addressValue, setAddressValue] = useState(TAB_DEFS.google.url)
  const [glitching, setGlitching] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)
  const [konamiIdx, setKonamiIdx] = useState(0)
  const [showKonami, setShowKonami] = useState(false)
  const [contentMode, setContentMode] = useState('normal')
  const [glitchQuery, setGlitchQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTopic, setSearchTopic] = useState(null)
  const [notFoundUrl, setNotFoundUrl] = useState('')
  const [status, setStatus] = useState('Terminé')

  const tabs = [
    ...openedTabs.map(id => TAB_DEFS[id]),
    ...(secretTabVisible ? [{ id: 'secret', label: '????', url: 'kiba://core', icon: '⚠' }] : []),
  ]

  const openTab = useCallback((id) => {
    setOpenedTabs(prev => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

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
        openTab('google')
        setActiveTab('google')
        setContentMode('normal')
        setAddressValue(TAB_DEFS.google.url)
      } else if (trimmed.includes('wikipedia') || trimmed.includes('wiki') || trimmed.includes('kiba_igarashi') || trimmed.includes('kiba-igarashi')) {
        openTab('wiki')
        setActiveTab('wiki')
        setContentMode('normal')
        setAddressValue(TAB_DEFS.wiki.url)
      } else if (trimmed.includes('actunet') || trimmed.includes('actualites') || trimmed.includes('actualités') || trimmed.includes('news')) {
        openTab('news')
        setActiveTab('news')
        setContentMode('normal')
        setAddressValue(TAB_DEFS.news.url)
      } else {
        setNotFoundUrl(url)
        setContentMode('404')
        setAddressValue(url)
      }
    })
  }, [triggerGlitch, openTab])

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

  // ── Recherche "normale" Google ─────────────────────────────────
  const handleNormalSearch = (query, topic) => {
    triggerGlitch(() => {
      setSearchQuery(query)
      setSearchTopic(topic)
      setContentMode(topic ? 'google-results' : 'google-noresult')
    })
  }

  // ── Recherche secrète Google ───────────────────────────────────
  const handleSecretSearch = (query) => {
    triggerGlitch(() => {
      setGlitchQuery(query)
      setContentMode('glitch-search')
    })
  }

  // ── Clic sur un résultat réel ──────────────────────────────────
  const handleResultClick = (targetUrl) => {
    navigate(targetUrl)
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
    if (contentMode === 'google-results' && searchTopic)
      return <FakeGoogleResults topic={searchTopic} query={searchQuery} onResultClick={handleResultClick} />
    if (contentMode === 'google-noresult')
      return <FakeGoogleNoResult query={searchQuery} />
    if (activeTab === 'secret')
      return <SecretPage />
    if (activeTab === 'wiki')
      return <FakeWikipedia onLogoClick={handleLogoClick} />
    if (activeTab === 'news')
      return <FakeNewsPortal />
    return <FakeGoogle onNormalSearch={handleNormalSearch} onSecretSearch={handleSecretSearch} />
  }

  return (
    <div className={`browser${glitching ? ' browser--glitching' : ''}`}>
      {showKonami && <KonamiOverlay onDismiss={() => setShowKonami(false)} />}

      {/* Barre de navigation */}
      <div className="browser__navbar">
        <div className="browser__nav-btns">
          <button className="browser__nav-btn" title="Précédent"
            onClick={() => { setContentMode('normal'); setActiveTab('google'); setAddressValue(TAB_DEFS.google.url) }}>◄</button>
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
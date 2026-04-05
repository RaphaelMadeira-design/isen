import { useState, useEffect, useRef } from 'react'
import '../styles/VisualNovel.scss'

// ─── SCRIPT ───────────────────────────────────────────────
const SCRIPT = [
  {
    id: 'intro',
    bg: 'https://64.media.tumblr.com/b699ce7fecf31bc69a6dc8012fa63f56/tumblr_inline_ph6fwuUDdF1r4yh9t_1280.png',
    sprite: null,
    speaker: null,
    text: 'Une ruelle de Kyoto, minuit. La pluie tombe sans bruit sur les pavés anciens.',
    next: 'scene1',
  },
  {
    id: 'scene1',
    bg: 'https://64.media.tumblr.com/b699ce7fecf31bc69a6dc8012fa63f56/tumblr_inline_ph6fwuUDdF1r4yh9t_1280.png',
    sprite: 'https://68.media.tumblr.com/avatar_8d8e7a2b4a39_128.png',
    speaker: 'Isen Hata',
    text: '...Tu n\'aurais pas dû venir ici. Cet endroit n\'est pas sûr pour les humains ordinaires.',
    next: 'choice1',
  },
  {
    id: 'choice1',
    bg: 'https://64.media.tumblr.com/b699ce7fecf31bc69a6dc8012fa63f56/tumblr_inline_ph6fwuUDdF1r4yh9t_1280.png',
    sprite: 'https://68.media.tumblr.com/avatar_8d8e7a2b4a39_128.png',
    speaker: null,
    text: 'Comment réagis-tu ?',
    choices: [
      { label: '"Je ne suis pas ordinaire."', next: 'brave' },
      { label: '"Qu\'est-ce que tu es ?"',    next: 'curious' },
      { label: '[Rester silencieux]',          next: 'silent' },
    ],
  },
  {
    id: 'brave',
    bg: 'https://64.media.tumblr.com/b699ce7fecf31bc69a6dc8012fa63f56/tumblr_inline_ph6fwuUDdF1r4yh9t_1280.png',
    sprite: 'https://68.media.tumblr.com/avatar_8d8e7a2b4a39_128.png',
    speaker: 'Isen Hata',
    text: '...*Un sourire imperceptible.* Intéressant. Peu de gens ont le courage de dire ça devant moi.',
    next: 'end_brave',
  },
  {
    id: 'curious',
    bg: 'https://64.media.tumblr.com/b699ce7fecf31bc69a6dc8012fa63f56/tumblr_inline_ph6fwuUDdF1r4yh9t_1280.png',
    sprite: 'https://68.media.tumblr.com/avatar_8d8e7a2b4a39_128.png',
    speaker: 'Isen Hata',
    text: 'Ce que je suis ? *Il lève les yeux vers toi.* Quelque chose que tu n\'as pas encore de mot pour définir.',
    next: 'end_curious',
  },
  {
    id: 'silent',
    bg: 'https://64.media.tumblr.com/b699ce7fecf31bc69a6dc8012fa63f56/tumblr_inline_ph6fwuUDdF1r4yh9t_1280.png',
    sprite: 'https://68.media.tumblr.com/avatar_8d8e7a2b4a39_128.png',
    speaker: 'Isen Hata',
    text: '*Il observe ton silence avec une attention froide.* Sage décision. Les mots imprudents coûtent cher ici.',
    next: 'end_silent',
  },
  {
    id: 'end_brave',
    bg: 'https://64.media.tumblr.com/b699ce7fecf31bc69a6dc8012fa63f56/tumblr_inline_ph6fwuUDdF1r4yh9t_1280.png',
    sprite: null,
    speaker: null,
    text: 'Il disparaît dans l\'ombre, laissant derrière lui une odeur d\'encens et quelque chose d\'indéfinissable.',
    next: null,
  },
  {
    id: 'end_curious',
    bg: 'https://64.media.tumblr.com/b699ce7fecf31bc69a6dc8012fa63f56/tumblr_inline_ph6fwuUDdF1r4yh9t_1280.png',
    sprite: null,
    speaker: null,
    text: 'La question reste en suspens. Il est déjà loin, fondu dans la nuit de Kyoto.',
    next: null,
  },
  {
    id: 'end_silent',
    bg: 'https://64.media.tumblr.com/b699ce7fecf31bc69a6dc8012fa63f56/tumblr_inline_ph6fwuUDdF1r4yh9t_1280.png',
    sprite: null,
    speaker: null,
    text: 'Il acquiesce légèrement, puis s\'évanouit comme s\'il n\'avait jamais été là.',
    next: null,
  },
]

const SCENE_MAP = Object.fromEntries(SCRIPT.map(s => [s.id, s]))

// ─── TYPEWRITER ───────────────────────────────────────────
function useTypewriter(text, speed = 30) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    ref.current = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(ref.current)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(ref.current)
  }, [text, speed])

  const skip = () => {
    clearInterval(ref.current)
    setDisplayed(text)
    setDone(true)
  }

  return { displayed, done, skip }
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────
export default function VisualNovel() {
  const [sceneId, setSceneId] = useState('intro')
  const [finished, setFinished] = useState(false)
  const scene = SCENE_MAP[sceneId]
  const { displayed, done, skip } = useTypewriter(scene?.text ?? '', 28)

  const advance = () => {
    if (!done) { skip(); return }
    if (scene.choices) return
    if (scene.next) setSceneId(scene.next)
    else setFinished(true)
  }

  const choose = (next) => setSceneId(next)
  const restart = () => { setSceneId('intro'); setFinished(false) }

  if (!scene) return null

  return (
    <div className="vn">
      {/* Background */}
      <div
        className="vn__bg"
        style={{ backgroundImage: `url(${scene.bg})` }}
      />
      <div className="vn__scanlines" />

      {/* Sprite */}
      {scene.sprite && (
        <div className="vn__sprite-wrap">
          <img className="vn__sprite" src={scene.sprite} alt="Isen Hata" />
        </div>
      )}

      {/* Fin */}
      {finished ? (
        <div className="vn__end">
          <p>— FIN —</p>
          <button className="vn__end-btn" onClick={restart}>
            Recommencer
          </button>
        </div>
      ) : (
        <>
          {/* Boîte de dialogue */}
          <div className="vn__textbox" onClick={advance}>
            {scene.speaker && (
              <div className="vn__speaker">{scene.speaker}</div>
            )}
            <p className="vn__text">{displayed}</p>
            {done && !scene.choices && (
              <span className="vn__arrow">▼</span>
            )}
          </div>

          {/* Choix */}
          {done && scene.choices && (
            <div className="vn__choices">
              {scene.choices.map((c, i) => (
                <button
                  key={i}
                  className="vn__choice-btn"
                  onClick={() => choose(c.next)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
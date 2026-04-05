import { useState, useEffect, useRef } from 'react'
import '../styles/Loading.scss'

export default function Loading({ label }) {
  const [setProgress] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    const steps = [8, 18, 30, 42, 54, 63, 72, 81, 89, 95, 100]
    let i = 0
    const tick = () => {
      if (i >= steps.length) return
      setProgress(steps[i])
      i++
      timerRef.current = setTimeout(tick, 200 + Math.random() * 180)
    }
    timerRef.current = setTimeout(tick, 300)
    return () => clearTimeout(timerRef.current)
  }, [])

  

  return (
    <div className="loading-overlay">
      <div className="loading-dialog">
        <div className="loading-dialog__titlebar">Veuillez patienter...</div>
        <img
          className="loading-dialog__icon"
          src="https://win98icons.alexmeub.com/icons/png/application_hourglass_small-2.png"
          alt="chargement"
        />
        <div className="loading-dialog__label">
          Chargement de <strong>{label}</strong>
        </div>
      </div>
    </div>
  )
}
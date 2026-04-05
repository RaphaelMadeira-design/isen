import '../styles/LoadingSpinner.scss'

export default function LoadingSpinner({ label }) {
  return (
    <div className="loading-overlay">
      <div className="loading-dialog">
        <div className="loading-dialog__titlebar">Veuillez patienter...</div>
        <img
          className="loading-dialog__icon"
          src="https://win98icons.alexmeub.com/icons/png/hourglass-0.png"
          alt="chargement"
        />
        <span className="loading-dialog__label">
          Chargement de <b>{label}</b>
        </span>
        <div className="loading-dialog__progress-wrap">
          <div className="loading-dialog__progress-fill" />
        </div>
      </div>
    </div>
  )
}
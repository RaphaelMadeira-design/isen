import '../styles/Loading.scss'

export default function Loading({ label }) {
  return (
    <div className="loading-overlay">
      <div className="loading-dialog">
        <div className="loading-dialog__titlebar">Veuillez patienter...</div>
        <img
          className="loading-dialog__icon"
          src="https://win98icons.alexmeub.com/icons/png/application_hourglass_small-2.png"
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
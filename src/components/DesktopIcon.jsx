import { useState, useCallback, useRef } from 'react';

export default function DesktopIcon({ id, label, icon, onOpen }) {
  const [selected, setSelected] = useState(false);
  const clickTimer = useRef(null);

  const handleClick = useCallback(() => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setSelected(true);
      onOpen(id);
    } else {
      setSelected(true);
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
      }, 300);
    }
  }, [id, onOpen]);

  return (
    <div
      className={`desktop-icon ${selected ? 'desktop-icon--selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={() => { onOpen(id); }}
      onBlur={() => setSelected(false)}
      tabIndex={0}
      data-testid={`desktop-icon-${id}`}
      title={`Ouvrir ${label}`}
    >
      <img src={icon} alt={label} className="desktop-icon__img" />
      <span className="desktop-icon__label">{label}</span>
    </div>
  );
}
import { useRef, useCallback } from 'react';

const CELL = 90; // taille de la cellule de grille

const snapToGrid = (x, y) => ({
  x: Math.round(x / CELL) * CELL,
  y: Math.round(y / CELL) * CELL,
});

export default function DesktopIcon({ id, label, icon, onOpen, onSelect, selected, position, onDragEnd }) {
  const dragRef   = useRef(null);
  const movedRef  = useRef(false);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();

    const startX  = e.clientX - position.x;
    const startY  = e.clientY - position.y;
    movedRef.current = false;

    const onMouseMove = (ev) => {
      const dx = Math.abs(ev.clientX - e.clientX);
      const dy = Math.abs(ev.clientY - e.clientY);
      if (dx > 4 || dy > 4) movedRef.current = true;

      if (dragRef.current) {
        const snapped = snapToGrid(
          Math.max(0, ev.clientX - startX),
          Math.max(0, ev.clientY - startY),
        );
        dragRef.current.style.left = `${snapped.x}px`;
        dragRef.current.style.top  = `${snapped.y}px`;
        dragRef.current.style.opacity = '0.7';
      }
    };

    const onMouseUp = (ev) => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (dragRef.current) dragRef.current.style.opacity = '1';

      if (movedRef.current) {
        const rawX = ev.clientX - startX;
        const rawY = ev.clientY - startY;
        const snapped = snapToGrid(
          Math.max(0, rawX),
          Math.max(0, rawY),
        );
        onDragEnd(id, snapped);
      } else {
        onSelect(id);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [id, position, onOpen, onDragEnd]);

  return (
    <div
      ref={dragRef}
      className={`desktop-icon${selected ? ' desktop-icon--selected' : ''}`}
      style={{ position: 'absolute', left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => onOpen(id)}
      tabIndex={0}
      data-testid={`desktop-icon-${id}`}
      title={`Ouvrir ${label}`}
    >
      <img className="desktop-icon__img" src={icon} alt={label} draggable={false} />
      <span className="desktop-icon__label">{label}</span>
    </div>
  );
}
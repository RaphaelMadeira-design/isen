import { useRef, useCallback } from 'react'

const CELL = 90

const snapToGrid = (x, y) => ({
  x: Math.round(x / CELL) * CELL,
  y: Math.round(y / CELL) * CELL,
})

export default function DesktopIcon({ id, label, icon, onOpen, onSelect, selected, position, onDragEnd }) {
  const dragRef   = useRef(null)
  const movedRef  = useRef(false)

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault()

    const startX  = e.clientX - position.x
    const startY  = e.clientY - position.y
    movedRef.current = false

    const onMouseMove = (ev) => {
      const dx = Math.abs(ev.clientX - e.clientX)
      const dy = Math.abs(ev.clientY - e.clientY)
      if (dx > 4 || dy > 4) movedRef.current = true

      if (dragRef.current) {
        const snapped = snapToGrid(
          Math.max(0, ev.clientX - startX),
          Math.max(0, ev.clientY - startY),
        );
        dragRef.current.style.left = `${snapped.x}px`
        dragRef.current.style.top  = `${snapped.y}px`
        dragRef.current.style.opacity = '0.7'
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      if (dragRef.current) {
        dragRef.current.style.opacity = '1'

        if (movedRef.current) {
          const x = parseInt(dragRef.current.style.left, 10)
          const y = parseInt(dragRef.current.style.top, 10)
          onDragEnd(id, { x, y })
        } else {
          onSelect(id)
        }
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [id, position, onSelect, onDragEnd])

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
  )
}
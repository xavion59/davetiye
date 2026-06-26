import { useState, useRef, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'hero-layout'

const DEFAULT_POSITIONS = {
  davetlisiniz: { x: 50, y: 10 },
  hazal: { x: 5, y: 25 },
  ampersand: { x: 50, y: 42 },
  oguz: { x: 65, y: 55 },
  message: { x: 50, y: 72 },
  date: { x: 50, y: 82 },
  countdown: { x: 50, y: 88 },
  familyGroom: { x: 25, y: 98 },
  familyBride: { x: 75, y: 98 },
}

function loadPositions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...DEFAULT_POSITIONS, ...JSON.parse(saved) }
  } catch {}
  return DEFAULT_POSITIONS
}

function savePositions(pos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pos))
}

function Draggable({ id, positions, setPositions, editing, children }) {
  const ref = useRef(null)
  const dragStart = useRef({ x: 0, y: 0, startX: 0, startY: 0 })

  const pos = positions[id] || { x: 50, y: 50 }

  const onPointerDown = useCallback((e) => {
    if (!editing) return
    e.preventDefault()
    e.stopPropagation()
    const el = ref.current
    if (!el) return
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      startX: pos.x,
      startY: pos.y,
    }
    el.setPointerCapture(e.pointerId)
  }, [editing, pos.x, pos.y])

  const onPointerMove = useCallback((e) => {
    if (!editing) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    const newX = Math.max(0, Math.min(100, dragStart.current.startX + (dx / window.innerWidth) * 100))
    const newY = Math.max(0, Math.min(100, dragStart.current.startY + (dy / window.innerHeight) * 100))
    setPositions(prev => ({ ...prev, [id]: { x: newX, y: newY } }))
  }, [editing, id, setPositions])

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      className={`absolute ${editing ? 'cursor-grab active:cursor-grabbing ring-2 ring-white/40 rounded-lg' : ''}`}
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
        touchAction: editing ? 'none' : 'auto',
        zIndex: editing ? 50 : 10,
      }}
    >
      {children}
    </div>
  )
}

export { Draggable, DEFAULT_POSITIONS, loadPositions, savePositions }

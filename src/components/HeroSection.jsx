import { useState, useCallback } from 'react'
import CountdownTimer from './CountdownTimer'
import { Draggable, DEFAULT_POSITIONS, loadPositions, savePositions } from './Draggable'

export default function HeroSection() {
  const [editing, setEditing] = useState(false)
  const [positions, setPositions] = useState(loadPositions)

  const handleSave = useCallback(() => {
    savePositions(positions)
    setEditing(false)
    window.location.reload()
  }, [positions])

  const handleReset = useCallback(() => {
    setPositions(DEFAULT_POSITIONS)
    savePositions(DEFAULT_POSITIONS)
    window.location.reload()
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #4a6e50 0%, #6b8f71 25%, #8fb996 50%, #6b8f71 75%, #4a6e50 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientXY 15s ease infinite'
      }} />
      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-blob" style={{ borderRadius: '50% 50% 50% 50%/60% 60% 40% 40%' }} />
      <div className="absolute bottom-32 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s', borderRadius: '60% 40% 50% 50%/50% 60% 40% 50%' }} />

      {/* Draggable content */}
      <div className="absolute inset-0 z-10">
        <Draggable id="davetlisiniz" positions={positions} setPositions={setPositions} editing={editing}>
          <p className="text-gold text-xl sm:text-2xl md:text-3xl tracking-[0.3em] font-semibold uppercase whitespace-nowrap"
            style={{ fontFamily: "'Lucida Calligraphy', 'Segoe Script', 'Apple Chancery', cursive" }}>
            Davetlisiniz
          </p>
        </Draggable>

        <Draggable id="hazal" positions={positions} setPositions={setPositions} editing={editing}>
          <h1 className="font-[family-name:var(--font-alex)] text-6xl sm:text-7xl md:text-8xl text-white drop-shadow-2xl animate-float-slow whitespace-nowrap">
            Hazal
          </h1>
        </Draggable>

        <Draggable id="ampersand" positions={positions} setPositions={setPositions} editing={editing}>
          <span className="font-[family-name:var(--font-alex)] text-3xl sm:text-4xl text-gold drop-shadow-lg animate-pulse-heart">
            &amp;
          </span>
        </Draggable>

        <Draggable id="oguz" positions={positions} setPositions={setPositions} editing={editing}>
          <h1 className="font-[family-name:var(--font-alex)] text-6xl sm:text-7xl md:text-8xl text-white drop-shadow-2xl animate-float-slow whitespace-nowrap" style={{ animationDelay: '1s' }}>
            Oğuz
          </h1>
        </Draggable>

        <Draggable id="message" positions={positions} setPositions={setPositions} editing={editing}>
          <p className="text-lg sm:text-xl text-gold max-w-sm leading-relaxed drop-shadow-lg whitespace-nowrap"
            style={{ fontFamily: "'Lucida Calligraphy', 'Segoe Script', 'Apple Chancery', cursive" }}>
            Bu güzel günde sevincimize ortak olmanız bizi çok mutlu eder.
          </p>
        </Draggable>

        <Draggable id="date" positions={positions} setPositions={setPositions} editing={editing}>
          <p className="text-sm sm:text-base text-white/80 tracking-[0.2em] font-light whitespace-nowrap">
            05 / 09 / 2026
          </p>
        </Draggable>

        <Draggable id="countdown" positions={positions} setPositions={setPositions} editing={editing}>
          <CountdownTimer targetDate="2026-09-05T19:00:00" />
        </Draggable>
      </div>

      {/* Edit controls */}
      <div className="fixed top-4 right-4 z-[100] flex gap-2">
        {!editing ? (
          <button onClick={() => setEditing(true)}
            className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all border border-white/10"
            aria-label="Ayarlar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>
        ) : (
          <>
            <button onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all shadow-lg">
              ✓ Kaydet
            </button>
            <button onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-red-500/80 text-white text-sm font-medium hover:bg-red-600 transition-all shadow-lg">
              ↺ Sıfırla
            </button>
            <button onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm text-white/80 text-sm font-medium hover:bg-black/60 transition-all border border-white/10">
              ✕ İptal
            </button>
          </>
        )}
      </div>

      {editing && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm text-white/70 text-xs">
          Elemanları sürükle, sonra Kaydet'e bas
        </div>
      )}
    </section>
  )
}

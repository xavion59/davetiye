import { useState } from 'react'

export default function EnvelopeIntro({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const [done, setDone] = useState(false)

  const handleClick = () => {
    if (opening || done) return
    setOpening(true)
    setTimeout(() => setDone(true), 2200)
    setTimeout(() => onOpen(), 3000)
  }

  if (done) return null

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1000 ${opening ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: 'radial-gradient(ellipse at center, #1a3a2a 0%, #0d1f15 50%, #060f0a 100%)',
        cursor: opening ? 'default' : 'pointer',
      }}
    >
      {/* Velvet texture overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
      }} />

      <div className={`relative transition-all duration-1000 ${opening ? 'scale-150 -translate-y-32 opacity-0' : 'scale-100 hover:scale-[1.03]'}`}>

        {/* Shadow under envelope */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-8 rounded-[50%] bg-black/40 blur-xl" />

        {/* Main envelope */}
        <div className="relative" style={{ width: 'min(85vw, 480px)', aspectRatio: '4/3' }}>

          {/* Envelope body - cream/beige */}
          <div className="absolute inset-0 rounded-sm" style={{
            background: 'linear-gradient(165deg, #f8f4ea 0%, #f0e8d8 30%, #e8dece 70%, #e0d5c4 100%)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 5px 20px rgba(0,0,0,0.3)',
          }} />

          {/* Gold outer border */}
          <div className="absolute inset-0 rounded-sm" style={{
            border: '2.5px solid #c9a96e',
            boxShadow: 'inset 0 0 0 4px rgba(201,169,110,0.15)',
          }} />

          {/* Inner gold line */}
          <div className="absolute rounded-sm" style={{
            inset: '8px',
            border: '1px solid rgba(201,169,110,0.4)',
          }} />

          {/* Corner ornaments */}
          <svg className="absolute top-3 left-3 w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 60 60" fill="none">
            <path d="M5 55 C5 30, 30 5, 55 5" stroke="#c9a96e" strokeWidth="1.2" fill="none" opacity="0.7"/>
            <path d="M5 45 C5 25, 25 5, 45 5" stroke="#c9a96e" strokeWidth="0.8" fill="none" opacity="0.5"/>
            <circle cx="8" cy="8" r="2" fill="#c9a96e" opacity="0.6"/>
            <path d="M12 5 Q8 8 5 12" stroke="#c9a96e" strokeWidth="0.6" fill="none" opacity="0.4"/>
            <path d="M5 20 Q10 15 20 10" stroke="#c9a96e" strokeWidth="0.6" fill="none" opacity="0.3"/>
            {/* Floral curl */}
            <path d="M5 35 C5 20, 15 10, 35 5" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <path d="M15 5 C10 10, 5 15, 5 25" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <circle cx="10" cy="10" r="1.5" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.4"/>
          </svg>

          <svg className="absolute top-3 right-3 w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 60 60" fill="none" style={{ transform: 'scaleX(-1)' }}>
            <path d="M5 55 C5 30, 30 5, 55 5" stroke="#c9a96e" strokeWidth="1.2" fill="none" opacity="0.7"/>
            <path d="M5 45 C5 25, 25 5, 45 5" stroke="#c9a96e" strokeWidth="0.8" fill="none" opacity="0.5"/>
            <circle cx="8" cy="8" r="2" fill="#c9a96e" opacity="0.6"/>
            <path d="M12 5 Q8 8 5 12" stroke="#c9a96e" strokeWidth="0.6" fill="none" opacity="0.4"/>
            <path d="M5 20 Q10 15 20 10" stroke="#c9a96e" strokeWidth="0.6" fill="none" opacity="0.3"/>
            <path d="M5 35 C5 20, 15 10, 35 5" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <path d="M15 5 C10 10, 5 15, 5 25" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.3"/>
            <circle cx="10" cy="10" r="1.5" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.4"/>
          </svg>

          <svg className="absolute bottom-3 left-3 w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 60 60" fill="none" style={{ transform: 'scaleY(-1)' }}>
            <path d="M5 55 C5 30, 30 5, 55 5" stroke="#c9a96e" strokeWidth="1.2" fill="none" opacity="0.7"/>
            <path d="M5 45 C5 25, 25 5, 45 5" stroke="#c9a96e" strokeWidth="0.8" fill="none" opacity="0.5"/>
            <circle cx="8" cy="8" r="2" fill="#c9a96e" opacity="0.6"/>
            <path d="M12 5 Q8 8 5 12" stroke="#c9a96e" strokeWidth="0.6" fill="none" opacity="0.4"/>
            <path d="M5 20 Q10 15 20 10" stroke="#c9a96e" strokeWidth="0.6" fill="none" opacity="0.3"/>
          </svg>

          <svg className="absolute bottom-3 right-3 w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 60 60" fill="none" style={{ transform: 'scale(-1)' }}>
            <path d="M5 55 C5 30, 30 5, 55 5" stroke="#c9a96e" strokeWidth="1.2" fill="none" opacity="0.7"/>
            <path d="M5 45 C5 25, 25 5, 45 5" stroke="#c9a96e" strokeWidth="0.8" fill="none" opacity="0.5"/>
            <circle cx="8" cy="8" r="2" fill="#c9a96e" opacity="0.6"/>
            <path d="M12 5 Q8 8 5 12" stroke="#c9a96e" strokeWidth="0.6" fill="none" opacity="0.4"/>
            <path d="M5 20 Q10 15 20 10" stroke="#c9a96e" strokeWidth="0.6" fill="none" opacity="0.3"/>
          </svg>

          {/* Envelope flap - green triangle */}
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '52%',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg, #3d5c43 0%, #4a6e50 20%, #5a7f60 60%, #4a6e50 100%)',
              transformOrigin: 'top center',
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: opening ? 'perspective(800px) rotateX(180deg)' : 'none',
              zIndex: 5,
            }}
          />

          {/* Gold border on flap */}
          <div
            className="absolute top-0 left-0 w-full pointer-events-none"
            style={{
              height: '52%',
              clipPath: 'polygon(1% 1%, 99% 1%, 50% 98%)',
              border: '1px solid rgba(201,169,110,0.5)',
              zIndex: 6,
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transformOrigin: 'top center',
              transform: opening ? 'perspective(800px) rotateX(180deg)' : 'none',
            }}
          />

          {/* Scroll ornament on flap */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '6%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 7,
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s',
              transformOrigin: 'top center',
              transform: opening ? 'translateX(-50%) perspective(800px) rotateX(180deg)' : 'translateX(-50%)',
              opacity: opening ? 0 : 1,
            }}
          >
            <svg width="160" height="40" viewBox="0 0 160 40" fill="none" className="sm:w-[200px]">
              {/* Central ornament */}
              <path d="M80 5 L80 35" stroke="#c9a96e" strokeWidth="0.8" opacity="0.6"/>
              <path d="M75 8 C75 5, 80 2, 85 8" stroke="#c9a96e" strokeWidth="0.8" fill="none" opacity="0.7"/>
              <path d="M72 12 C72 6, 80 0, 88 12" stroke="#c9a96e" strokeWidth="0.6" fill="none" opacity="0.5"/>
              {/* Left swirl */}
              <path d="M70 20 C55 20, 45 15, 30 20 C20 23, 15 18, 10 20" stroke="#c9a96e" strokeWidth="0.8" fill="none" opacity="0.6"/>
              <path d="M30 20 C35 15, 40 18, 45 15" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.4"/>
              <path d="M50 18 C48 12, 55 10, 55 16" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.3"/>
              {/* Right swirl */}
              <path d="M90 20 C105 20, 115 15, 130 20 C140 23, 145 18, 150 20" stroke="#c9a96e" strokeWidth="0.8" fill="none" opacity="0.6"/>
              <path d="M130 20 C125 15, 120 18, 115 15" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.4"/>
              <path d="M110 18 C112 12, 105 10, 105 16" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.3"/>
              {/* Dots */}
              <circle cx="10" cy="20" r="1.5" fill="#c9a96e" opacity="0.5"/>
              <circle cx="150" cy="20" r="1.5" fill="#c9a96e" opacity="0.5"/>
              <circle cx="80" cy="3" r="1" fill="#c9a96e" opacity="0.4"/>
            </svg>
          </div>

          {/* Wax Seal */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '38%', zIndex: 10 }}>
            <div
              className={`relative transition-all duration-600 ${opening ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
              style={{ transition: 'transform 0.5s ease-out, opacity 0.4s ease' }}
            >
              {/* Outer ring */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full relative" style={{
                background: 'radial-gradient(circle at 35% 30%, #e8d5a0 0%, #d4bc8e 20%, #c9a96e 45%, #a8884d 75%, #8a6e3a 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3), inset 0 2px 6px rgba(255,255,255,0.3), inset 0 -3px 8px rgba(0,0,0,0.2)',
              }}>
                {/* Scalloped edge */}
                <div className="absolute inset-[3px] rounded-full" style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                }} />

                {/* Inner circle */}
                <div className="absolute inset-[6px] sm:inset-[7px] rounded-full flex items-center justify-center" style={{
                  background: 'radial-gradient(circle at 40% 35%, #c9a96e 0%, #a8884d 60%, #8a6e3a 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>
                  {/* Decorative dots around the seal */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/20"
                      style={{
                        top: `${50 + 42 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                        left: `${50 + 42 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  ))}

                  {/* H & O text */}
                  <div className="text-center" style={{ marginTop: '2px' }}>
                    <div style={{
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                      fontWeight: 'bold',
                      color: '#f0e8d8',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3), 0 -1px 1px rgba(255,255,255,0.15)',
                      letterSpacing: '2px',
                      lineHeight: 1,
                    }}>
                      H &amp; O
                    </div>
                    {/* Small decorative lines */}
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className="w-3 h-px bg-white/30" />
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M4 0 L5.5 3 L4 2 L2.5 3 Z" fill="rgba(255,255,255,0.3)" />
                      </svg>
                      <div className="w-3 h-px bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Letter paper inside (rises up when opening) */}
          <div
            className="absolute rounded-sm overflow-hidden"
            style={{
              top: '12%',
              left: '10%',
              width: '80%',
              height: '70%',
              background: 'linear-gradient(180deg, #fffef9 0%, #faf8f4 100%)',
              boxShadow: '0 -2px 10px rgba(0,0,0,0.08)',
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s, opacity 0.5s ease 0.4s',
              transform: opening ? 'translateY(-30%)' : 'translateY(10%)',
              opacity: opening ? 1 : 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <p className="text-[9px] sm:text-[11px] tracking-[0.25em] uppercase mb-1" style={{ color: '#c9a96e' }}>Davetlisiniz</p>
            <p className="text-2xl sm:text-4xl" style={{ fontFamily: "'Alex Brush', cursive", color: '#6b8f71' }}>Hazal &amp; Oğuz</p>
            <div className="w-12 h-px bg-[#c9a96e]/40 my-2" />
            <p className="text-[8px] sm:text-[10px] tracking-[0.15em] uppercase" style={{ color: '#7a6b5d' }}>05 / 09 / 2026</p>
          </div>
        </div>

        {/* Click hint */}
        {!opening && (
          <p className="text-center mt-8 text-sm animate-pulse" style={{ color: 'rgba(201,169,110,0.6)' }}>
            Tıklayarak açın
          </p>
        )}
      </div>
    </div>
  )
}

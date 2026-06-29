import { useState } from 'react'

export default function EnvelopeIntro({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const [done, setDone] = useState(false)

  const handleClick = () => {
    if (opening || done) return
    setOpening(true)
    setTimeout(() => setDone(true), 2000)
    setTimeout(() => onOpen(), 2800)
  }

  if (done) return null

  return (
    <div
      onClick={handleClick}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-700 ${opening ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ cursor: opening ? 'default' : 'pointer' }}
    >
      <div className={`relative transition-all duration-1000 ${opening ? 'scale-110 -translate-y-20' : 'scale-100 hover:scale-105'}`}>

        {/* Envelope body */}
        <div className="relative w-[320px] h-[220px] sm:w-[420px] sm:h-[280px]">
          {/* Back of envelope */}
          <div className="absolute inset-0 rounded-lg shadow-2xl" style={{
            background: 'linear-gradient(135deg, #f5f0e4 0%, #ebe3d4 100%)',
            border: '3px solid #c9a96e',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 0 30px rgba(201,169,110,0.1)'
          }} />

          {/* Envelope flap (triangle) */}
          <div
            className="absolute top-0 left-0 w-full origin-top"
            style={{
              height: '55%',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg, #4a6e50 0%, #6b8f71 100%)',
              borderBottom: '2px solid #c9a96e',
              transition: 'transform 0.8s ease-in-out',
              transform: opening ? 'rotateX(180deg)' : 'rotateX(0deg)',
              zIndex: 3,
              backfaceVisibility: 'hidden',
            }}
          />

          {/* Gold trim on flap */}
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '55%',
              clipPath: 'polygon(2% 2%, 98% 2%, 50% 96%)',
              border: '1px solid rgba(201,169,110,0.3)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />

          {/* Wax seal */}
          <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '42%' }}>
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 ${opening ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`}
              style={{
                background: 'radial-gradient(circle at 35% 35%, #d4bc8e, #c9a96e 40%, #a8884d 100%)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
                border: '2px solid #a8884d',
              }}
            >
              <div className="text-center">
                <div className="text-[10px] sm:text-xs text-white/80 font-semibold tracking-widest" style={{ fontFamily: "'Alex Brush', cursive", fontSize: '0.9rem' }}>H & O</div>
              </div>
            </div>
          </div>

          {/* Inner fold lines */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            <div className="absolute" style={{
              top: '0', left: '0', width: '50%', height: '55%',
              borderRight: '1px solid rgba(201,169,110,0.2)',
              borderBottom: '1px solid rgba(201,169,110,0.2)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transform: 'scaleX(-1)',
              transformOrigin: 'right',
            }} />
          </div>

          {/* Gold corner ornaments */}
          {['top-2 left-2', 'top-2 right-2 rotate-90', 'bottom-2 left-2 -rotate-90', 'bottom-2 right-2 rotate-180'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-6 h-6 sm:w-8 sm:h-8 pointer-events-none`} style={{ zIndex: 2 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1" className="w-full h-full opacity-50">
                <path d="M2 2C2 12 12 22 22 22" />
                <path d="M2 8C8 8 8 2 14 2" />
              </svg>
            </div>
          ))}

          {/* Letter paper inside (visible when opening) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded"
            style={{
              top: '10%',
              width: '80%',
              height: '75%',
              background: 'linear-gradient(180deg, #fff 0%, #faf8f4 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.8s ease-out 0.3s, opacity 0.5s ease 0.3s',
              transform: opening ? 'translateY(-60%)' : 'translateY(0)',
              opacity: opening ? 1 : 0,
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <p className="text-[10px] sm:text-xs text-[#7a6b5d] tracking-[0.2em] uppercase mb-1">Davetlisiniz</p>
            <p className="text-2xl sm:text-3xl text-[#6b8f71]" style={{ fontFamily: "'Alex Brush', cursive" }}>Hazal & Oğuz</p>
          </div>
        </div>

        {/* Click hint */}
        {!opening && (
          <p className="text-center mt-6 text-white/70 text-sm animate-pulse">
            Tıklayarak açın
          </p>
        )}
      </div>
    </div>
  )
}

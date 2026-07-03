import { useState } from 'react'

// The wax-seal fold line sits at ~52% of the image height
const FLAP_APEX = '52%'
// Triangle that IS the flap
const FLAP_CLIP = `polygon(0% 0%, 100% 0%, 50% ${FLAP_APEX})`
// Everything EXCEPT the flap triangle (envelope body)
const BODY_CLIP = `polygon(0% 0%, 50% ${FLAP_APEX}, 100% 0%, 100% 100%, 0% 100%)`

export default function EnvelopeIntro({ onOpen }) {
  const [opening,      setOpening     ] = useState(false)
  const [letterRising, setLetterRising] = useState(false)
  const [fading,       setFading      ] = useState(false)
  const [done,         setDone        ] = useState(false)

  const handleClick = () => {
    if (opening || done) return
    setOpening(true)
    // flap animation finishes ~1.15 s → letter starts rising
    setTimeout(() => setLetterRising(true), 1200)
    // letter has cleared the top → fade-out overlay
    setTimeout(() => setFading(true),       2500)
    setTimeout(() => setDone(true),         3100)
    setTimeout(() => onOpen(),              3100)
  }

  if (done) return null

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, #1a3a2a 0%, #0d1f15 50%, #060f0a 100%)',
        cursor: opening ? 'default' : 'pointer',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
      }}
    >
      {/* velvet texture */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.03) 2px,rgba(255,255,255,0.03) 4px)',
      }} />
      {/* warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)',
      }} />

      {/* ─── outer wrapper ─── */}
      <div
        className={!opening ? 'transition-transform duration-300 hover:scale-[1.02]' : ''}
        style={{
          width: 'min(88vw, 520px)',
          filter: 'drop-shadow(0 32px 80px rgba(0,0,0,0.75)) drop-shadow(0 6px 20px rgba(0,0,0,0.5))',
        }}
      >
        <div className="relative">

          {/* ── 1. BACK FLAP (green inside-of-lid) ──
               Starts at rotateX(-90deg) = edge-on (invisible).
               Rotates to -170° when opening.
               z-index 1 ensures it stays BEHIND the letter when it points UP. */}
          <div
            style={{
              position: 'absolute', inset: 0,
              clipPath: FLAP_CLIP,
              transformOrigin: 'top center',
              transform: opening
                ? 'perspective(1200px) rotateX(-170deg)'
                : 'perspective(1200px) rotateX(-90deg)',
              transition: opening
                ? 'transform 0.65s cubic-bezier(0, 0, 0.4, 1) 0.5s'
                : 'none',
              zIndex: 1,
              background: 'linear-gradient(170deg, #1e3327 0%, #2e4a35 40%, #3a5740 70%, #4a6e50 100%)',
            }}
          >
            {/* subtle woven texture on inside of lid */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.3,
              backgroundImage: 'repeating-linear-gradient(135deg,transparent,transparent 5px,rgba(0,0,0,0.06) 5px,rgba(0,0,0,0.06) 10px)',
            }} />
          </div>

          {/* ── 2. GREEN INTERIOR ──
               Fills the triangular flap gap.
               Visible once the front flap rotates away.
               z-index 2 so the letter card sits on top of it. */}
          <div
            style={{
              position: 'absolute', inset: 0,
              clipPath: FLAP_CLIP,
              zIndex: 2,
              background: 'linear-gradient(160deg, #1a2d21 0%, #243b2b 60%, #2a4332 100%)',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.2,
              backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.02) 3px,rgba(0,0,0,0.02) 6px)',
            }} />
          </div>

          {/* ── 3. LETTER CARD ──
               z-index 3 so it's behind the body image (z-index 4) but in front of
               the back flap (z-index 1) and interior (z-index 2). */}
          <div
            style={{
              position: 'absolute',
              left: '9%', width: '82%',
              bottom: letterRising ? '110%' : '54%',
              opacity: opening ? 1 : 0,
              transition: [
                'opacity 0.35s ease 0s',
                letterRising
                  ? 'bottom 1.0s cubic-bezier(0.22, 0, 0.2, 1) 0s'
                  : '',
              ].filter(Boolean).join(', '),
              zIndex: 3,
              borderRadius: '2px',
              background: 'linear-gradient(180deg, #fffef9 0%, #faf8f4 100%)',
              boxShadow: '0 -8px 28px rgba(0,0,0,0.22), 0 2px 10px rgba(0,0,0,0.12)',
              padding: '22px 20px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '7px',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1.5px', background: 'linear-gradient(90deg,transparent,#c9a96e 35%,#c9a96e 65%,transparent)' }} />
            <p style={{ fontSize: 'clamp(8px,1.8vw,11px)', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#c9a96e', margin: 0 }}>
              Davetlisiniz
            </p>
            <p style={{ fontFamily: "'Alex Brush', cursive", fontSize: 'clamp(1.4rem,5vw,2.2rem)', color: '#4a6e50', margin: 0, lineHeight: 1.1 }}>
              Hazal &amp; Oğuz
            </p>
            <div style={{ width: '48px', height: '1px', background: 'rgba(201,169,110,0.45)' }} />
            <p style={{ fontSize: 'clamp(7px,1.6vw,10px)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7a6b5d', margin: 0 }}>
              05 / 09 / 2026
            </p>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1.5px', background: 'linear-gradient(90deg,transparent,#c9a96e 35%,#c9a96e 65%,transparent)' }} />
          </div>

          {/* ── 4. BODY IMAGE (flap triangle excluded) ──
               z-index 4 hides the letter card until it rises above the body. */}
          <img
            src="/zarf.jpg"
            alt="Düğün davetiyesi zarfı"
            draggable={false}
            style={{
              display: 'block', width: '100%',
              clipPath: BODY_CLIP,
              position: 'relative',
              zIndex: 4,
            }}
          />

          {/* ── 5. FRONT FLAP (photo, rotates 0° → -90°, then disappears) ── */}
          <img
            src="/zarf.jpg"
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%',
              clipPath: FLAP_CLIP,
              transformOrigin: 'top center',
              transform: opening
                ? 'perspective(1200px) rotateX(-90deg)'
                : 'perspective(1200px) rotateX(0deg)',
              transition: 'transform 0.58s cubic-bezier(0.4, 0, 1, 1) 0s',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              zIndex: 5,
            }}
          />

          {/* fold-line shadow (fades as flap lifts) */}
          <div
            style={{
              position: 'absolute', left: 0,
              top: FLAP_APEX,
              width: '100%', height: '5px',
              transform: 'translateY(-100%)',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
              zIndex: 6,
              opacity: opening ? 0 : 0.6,
              transition: 'opacity 0.4s ease 0.2s',
              pointerEvents: 'none',
            }}
          />

        </div>{/* /relative */}

        {!opening && (
          <p
            className="text-center mt-5 text-sm animate-pulse"
            style={{ color: 'rgba(201,169,110,0.65)', letterSpacing: '0.14em' }}
          >
            ✦&nbsp;&nbsp;Tıklayarak açın&nbsp;&nbsp;✦
          </p>
        )}
      </div>
    </div>
  )
}

import CountdownTimer from './CountdownTimer'
import MusicPlayer from './MusicPlayer'
import ScrollIndicator from './ScrollIndicator'

function FlowerWreath() {
  const flowers = [
    { emoji: '🌸', angle: 0, size: 1.4, delay: 0 },
    { emoji: '🌼', angle: 30, size: 1.2, delay: 0.3 },
    { emoji: '🌿', angle: 60, size: 1.1, delay: 0.6 },
    { emoji: '🌷', angle: 90, size: 1.3, delay: 0.9 },
    { emoji: '🍃', angle: 120, size: 1.0, delay: 1.2 },
    { emoji: '🌺', angle: 150, size: 1.4, delay: 1.5 },
    { emoji: '🌼', angle: 180, size: 1.2, delay: 1.8 },
    { emoji: '🌿', angle: 210, size: 1.1, delay: 2.1 },
    { emoji: '🌸', angle: 240, size: 1.3, delay: 2.4 },
    { emoji: '🍃', angle: 270, size: 1.0, delay: 2.7 },
    { emoji: '🌷', angle: 300, size: 1.4, delay: 3.0 },
    { emoji: '🌺', angle: 330, size: 1.2, delay: 3.3 },
  ]

  const radius = 180

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative" style={{ width: radius * 2 + 60, height: radius * 2 + 60 }}>
        {flowers.map((f, i) => {
          const rad = (f.angle * Math.PI) / 180
          const x = Math.cos(rad) * radius
          const y = Math.sin(rad) * radius
          return (
            <span
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                fontSize: `${f.size}rem`,
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${f.angle + 90}deg)`,
                animation: `swaySlow ${3 + (i % 3)}s ease-in-out infinite ${f.delay}s`,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }}
            >
              {f.emoji}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #4a6e50 0%, #6b8f71 25%, #8fb996 50%, #6b8f71 75%, #4a6e50 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientXY 15s ease infinite'
      }} />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Animated blobs */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-blob" style={{ borderRadius: '50% 50% 50% 50%/60% 60% 40% 40%' }} />
      <div className="absolute bottom-32 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s', borderRadius: '60% 40% 50% 50%/50% 60% 40% 50%' }} />

      {/* Flower wreath */}
      <FlowerWreath />

      {/* Content inside wreath */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="font-[family-name:var(--font-alex)] text-6xl sm:text-7xl md:text-8xl text-white mb-1 drop-shadow-2xl animate-float-slow" style={{ transform: 'translateX(-15px)' }}>
          Hazal
        </h1>

        <div className="flex items-center gap-3 sm:gap-5 my-1">
          <div className="w-10 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="font-[family-name:var(--font-alex)] text-3xl sm:text-4xl text-gold animate-pulse-heart drop-shadow-lg">&</span>
          <div className="w-10 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        <h1 className="font-[family-name:var(--font-alex)] text-6xl sm:text-7xl md:text-8xl text-white mb-6 drop-shadow-2xl animate-float-slow" style={{ animationDelay: '1s', transform: 'translateX(15px)' }}>
          Oğuz
        </h1>

        <p className="text-white/80 text-base sm:text-lg tracking-[0.2em] mb-8 font-light">
          05 / 09 / 2026
        </p>

        <CountdownTimer targetDate="2026-09-05T19:00:00" />
      </div>

      {/* Music player */}
      <div className="absolute bottom-24 left-4 sm:left-8 z-10">
        <MusicPlayer />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <ScrollIndicator />
      </div>
    </section>
  )
}

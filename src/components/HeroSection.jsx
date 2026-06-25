import CountdownTimer from './CountdownTimer'

const HERO = {
  paddingTop: 120,
  paddingTopSm: 100,
  paddingBottom: 80,
  namesSize: 'text-7xl sm:text-8xl md:text-9xl',
  namesOffsetX: 15,
  gapAfterNames: 50,
  gapAfterMessage: 30,
  gapAfterDate: 40,
  messageSize: 'text-xl sm:text-2xl',
  dateSize: 'text-base sm:text-lg',
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
      <div className="absolute inset-0 bg-black/25" />

      <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-blob" style={{ borderRadius: '50% 50% 50% 50%/60% 60% 40% 40%' }} />
      <div className="absolute bottom-32 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s', borderRadius: '60% 40% 50% 50%/50% 60% 40% 50%' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div style={{ marginBottom: `${HERO.gapAfterNames}px` }}>
          <h1 className={`font-[family-name:var(--font-alex)] ${HERO.namesSize} text-white drop-shadow-2xl animate-float-slow`}
            style={{ transform: `translateX(-${HERO.namesOffsetX}px)` }}>
            Hazal
          </h1>
          <div className="flex items-center gap-3 sm:gap-5 my-1">
            <div className="w-10 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <span className="font-[family-name:var(--font-alex)] text-3xl sm:text-4xl text-gold animate-pulse-heart drop-shadow-lg">&</span>
            <div className="w-10 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          <h1 className={`font-[family-name:var(--font-alex)] ${HERO.namesSize} text-white drop-shadow-2xl animate-float-slow`}
            style={{ animationDelay: '1s', transform: `translateX(${HERO.namesOffsetX}px)` }}>
            Oğuz
          </h1>
        </div>

        <div style={{ marginBottom: `${HERO.gapAfterMessage}px` }}>
          <p className={`${HERO.messageSize} text-gold max-w-md leading-relaxed drop-shadow-lg`}
            style={{ fontFamily: "'Lucida Calligraphy', 'Segoe Script', 'Apple Chancery', cursive" }}>
            Bu güzel günde sevincimize ortak olmanız bizi çok mutlu eder.
          </p>
        </div>

        <div style={{ marginBottom: `${HERO.gapAfterDate}px` }}>
          <p className={`${HERO.dateSize} text-white/80 tracking-[0.2em] font-light`}>
            05 / 09 / 2026
          </p>
        </div>

        <CountdownTimer targetDate="2026-09-05T19:00:00" />
      </div>
    </section>
  )
}

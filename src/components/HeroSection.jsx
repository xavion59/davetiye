import CountdownTimer from './CountdownTimer'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 py-12">
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
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-xl">

        {/* DAVETLİSİNİZ */}
        <p className="text-gold text-xl sm:text-2xl md:text-3xl tracking-[0.3em] font-semibold uppercase mb-6"
          style={{ fontFamily: "'Lucida Calligraphy', 'Segoe Script', 'Apple Chancery', cursive" }}>
          Davetlisiniz
        </p>

        {/* Names */}
        <div className="relative w-full max-w-sm mb-8" style={{ height: '180px' }}>
          {/* Hazal - left, higher */}
          <h1 className="font-[family-name:var(--font-alex)] text-6xl sm:text-7xl md:text-8xl text-white drop-shadow-2xl absolute left-0 animate-float-slow" style={{ top: '0' }}>
            Hazal
          </h1>
          {/* & - center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <span className="font-[family-name:var(--font-alex)] text-3xl sm:text-4xl text-gold drop-shadow-lg animate-pulse-heart">&</span>
          </div>
          {/* Oğuz - right, lower */}
          <h1 className="font-[family-name:var(--font-alex)] text-6xl sm:text-7xl md:text-8xl text-white drop-shadow-2xl absolute right-0 animate-float-slow" style={{ bottom: '0', animationDelay: '1s' }}>
            Oğuz
          </h1>
        </div>

        {/* Message */}
        <p className="text-lg sm:text-xl text-gold max-w-sm leading-relaxed drop-shadow-lg mb-4"
          style={{ fontFamily: "'Lucida Calligraphy', 'Segoe Script', 'Apple Chancery', cursive" }}>
          Bu güzel günde sevincimize ortak olmanız bizi çok mutlu eder.
        </p>

        {/* Date */}
        <p className="text-sm sm:text-base text-white/80 tracking-[0.2em] font-light mb-6">
          05 / 09 / 2026
        </p>

        {/* Countdown */}
        <CountdownTimer targetDate="2026-09-05T19:00:00" />
      </div>
    </section>
  )
}

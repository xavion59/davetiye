import CountdownTimer from './CountdownTimer'

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
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl">

        {/* DAVETLİSİNİZ */}
        <p className="text-gold text-2xl sm:text-3xl md:text-4xl tracking-[0.35em] font-semibold mb-6 uppercase"
          style={{ fontFamily: "'Lucida Calligraphy', 'Segoe Script', 'Apple Chancery', cursive" }}>
          Davetlisiniz
        </p>

        {/* Names - diagonal layout */}
        <div className="relative w-full max-w-sm mb-12">
          <h1 className="font-[family-name:var(--font-alex)] text-7xl sm:text-8xl md:text-9xl text-white drop-shadow-2xl absolute left-2 top-0 animate-float-slow">
            Hazal
          </h1>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <span className="font-[family-name:var(--font-alex)] text-4xl sm:text-5xl text-gold drop-shadow-lg animate-pulse-heart">&</span>
          </div>
          <h1 className="font-[family-name:var(--font-alex)] text-7xl sm:text-8xl md:text-9xl text-white drop-shadow-2xl absolute right-2 bottom-0 animate-float-slow" style={{ animationDelay: '1s' }}>
            Oğuz
          </h1>
          {/* Spacer for layout */}
          <div className="w-full h-40 sm:h-48 md:h-56" />
        </div>

        {/* Message */}
        <p className="text-xl sm:text-2xl text-gold max-w-md leading-relaxed drop-shadow-lg mb-10"
          style={{ fontFamily: "'Lucida Calligraphy', 'Segoe Script', 'Apple Chancery', cursive" }}>
          Bu güzel günde sevincimize ortak olmanız bizi çok mutlu eder.
        </p>

        {/* Date */}
        <p className="text-base sm:text-lg text-white/80 tracking-[0.2em] font-light mb-10">
          05 / 09 / 2026
        </p>

        <CountdownTimer targetDate="2026-09-05T19:00:00" />
      </div>
    </section>
  )
}

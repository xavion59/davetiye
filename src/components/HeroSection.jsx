import CountdownTimer from './CountdownTimer'
import MusicPlayer from './MusicPlayer'
import ScrollIndicator from './ScrollIndicator'

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary/60 to-primary-dark/90" />

      {/* Decorative floating circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gold/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Decorative SVG ornaments */}
      <svg className="absolute top-10 left-10 w-24 h-24 text-white/10 animate-float" viewBox="0 0 100 100" style={{ animationDelay: '0.5s' }}>
        <path d="M50 10 Q60 30 80 30 Q60 40 60 60 Q50 40 30 50 Q50 40 50 10Z" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-20 right-10 w-20 h-20 text-white/10 animate-float" viewBox="0 0 100 100" style={{ animationDelay: '1.5s' }}>
        <path d="M50 10 Q60 30 80 30 Q60 40 60 60 Q50 40 30 50 Q50 40 50 10Z" fill="currentColor" />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-fade-in">
        {/* Pre-title */}
        <p className="text-white/70 text-sm sm:text-base tracking-[0.3em] uppercase mb-4 font-light">
          Nikah Davetiyemiz
        </p>

        {/* Couple names */}
        <h1 className="font-[family-name:var(--font-alex)] text-6xl sm:text-8xl md:text-9xl text-white mb-2 drop-shadow-lg">
          Hazal
        </h1>
        <div className="flex items-center gap-4 mb-2">
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="font-[family-name:var(--font-alex)] text-3xl sm:text-4xl text-gold">&</span>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
        <h1 className="font-[family-name:var(--font-alex)] text-6xl sm:text-8xl md:text-9xl text-white mb-6 drop-shadow-lg">
          Oğuz
        </h1>

        {/* Date */}
        <p className="text-white/80 text-lg sm:text-xl tracking-widest mb-8 font-light">
          05 / 09 / 2026
        </p>

        {/* Countdown */}
        <div className="mb-8">
          <CountdownTimer targetDate="2026-09-05T16:00:00" />
        </div>
      </div>

      {/* Music player - bottom left */}
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

import CountdownTimer from './CountdownTimer'
import MusicPlayer from './MusicPlayer'
import ScrollIndicator from './ScrollIndicator'

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
      <div className="absolute inset-0 bg-black/30" />

      {/* Animated blobs */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-blob" style={{ borderRadius: '50% 50% 50% 50%/60% 60% 40% 40%' }} />
      <div className="absolute bottom-32 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s', borderRadius: '60% 40% 50% 50%/50% 60% 40% 50%' }} />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-blob" style={{ animationDelay: '4s', borderRadius: '40% 60% 50% 50%/60% 40% 50% 50%' }} />

      {/* Decorative floating SVG ornaments */}
      <svg className="absolute top-16 left-8 w-20 h-20 text-white/10 animate-sway" viewBox="0 0 100 100">
        <path d="M50 5 Q65 25 85 25 Q65 35 65 55 Q50 35 25 45 Q50 35 50 5Z" fill="currentColor" />
      </svg>
      <svg className="absolute top-24 right-12 w-16 h-16 text-white/8 animate-sway-reverse" viewBox="0 0 100 100">
        <path d="M50 5 Q65 25 85 25 Q65 35 65 55 Q50 35 25 45 Q50 35 50 5Z" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-32 left-16 w-14 h-14 text-gold/15 animate-sway-delayed" viewBox="0 0 100 100">
        <path d="M50 10 Q60 30 80 30 Q60 40 60 60 Q50 40 30 50 Q50 40 50 10Z" fill="currentColor" />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fade-in-up">
        <p className="text-white/70 text-sm sm:text-base tracking-[0.35em] uppercase mb-6 font-light">
          Nikah Davetiyemiz
        </p>

        <h1 className="font-[family-name:var(--font-alex)] text-7xl sm:text-8xl md:text-[10rem] text-white mb-2 drop-shadow-2xl animate-float-slow">
          Hazal
        </h1>

        <div className="flex items-center gap-4 sm:gap-6 my-2">
          <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <span className="font-[family-name:var(--font-alex)] text-4xl sm:text-5xl text-gold animate-pulse-heart drop-shadow-lg">&</span>
          <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        <h1 className="font-[family-name:var(--font-alex)] text-7xl sm:text-8xl md:text-[10rem] text-white mb-8 drop-shadow-2xl animate-float-slow" style={{ animationDelay: '1s' }}>
          Oğuz
        </h1>

        <p className="text-white/80 text-lg sm:text-xl tracking-[0.25em] mb-10 font-light">
          05 / 09 / 2026
        </p>

        <div className="mb-10">
          <CountdownTimer targetDate="2026-09-05T19:00:00" />
        </div>
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

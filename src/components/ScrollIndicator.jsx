export default function ScrollIndicator() {
  const scrollDown = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button onClick={scrollDown} className="flex flex-col items-center gap-2 cursor-pointer group">
      <span className="text-sm text-white/60 font-medium tracking-wider">
        Aşağı kaydır
      </span>
      <div className="animate-scroll-bounce">
        <svg className="w-8 h-8 text-white/60 group-hover:text-gold transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </button>
  )
}

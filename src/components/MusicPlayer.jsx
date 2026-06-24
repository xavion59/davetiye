import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/music.mp3')
    audioRef.current.loop = true
    audioRef.current.preload = 'auto'
    return () => { audioRef.current?.pause() }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={togglePlay}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
          isPlaying ? 'animate-pulse-glow' : ''
        }`}
        aria-label={isPlaying ? 'Müziği Durdur' : 'Müziği Başlat'}
      >
        {isPlaying && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-gold/30 animate-rotate-gradient" />
        )}
        <div className="relative z-10 w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </button>
      <span className="text-xs text-white/60 font-medium tracking-wider">
        {isPlaying ? 'Müzik Çalıyor' : 'Müzik'}
      </span>
    </div>
  )
}

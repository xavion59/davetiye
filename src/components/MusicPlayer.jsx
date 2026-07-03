import { useState, useEffect } from 'react'

export default function MusicPlayer({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (audioRef.current) {
        setIsPlaying(!audioRef.current.paused)
      }
    }, 500)
    return () => clearInterval(checkInterval)
  }, [audioRef])

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
    <button
      onClick={togglePlay}
      className="w-12 h-12 rounded-full bg-gray-800 border border-white/20 flex items-center justify-center shadow-lg"
      aria-label={isPlaying ? 'Müziği Durdur' : 'Müziği Başlat'}
    >
      {isPlaying ? (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  )
}

import { useState, useRef, useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import DetailsPage from './components/DetailsPage'
import LetterSection from './components/LetterSection'
import PhotoUpload from './components/PhotoUpload'
import ContactSection from './components/ContactSection'
import FallingLeaves from './components/FallingLeaves'
import MusicPlayer from './components/MusicPlayer'
import AdminDashboard from './components/AdminDashboard'

const PAGES = [
  { id: 'hero', label: 'Ana Sayfa' },
  { id: 'details', label: 'Detaylar' },
  { id: 'letter', label: 'Mektup' },
  { id: 'photo', label: 'Fotoğraf' },
  { id: 'contact', label: 'İletişim' },
]

function InvitationPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const lastWheel = useRef(0)

  const goToPage = useCallback((page) => {
    const now = Date.now()
    if (now - lastWheel.current < 800) return
    lastWheel.current = now
    const clamped = Math.max(0, Math.min(page, PAGES.length - 1))
    setCurrentPage(clamped)
  }, [])

  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 20) return
      if (e.deltaY > 0) goToPage(currentPage + 1)
      else goToPage(currentPage - 1)
    }
    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentPage, goToPage])

  useEffect(() => {
    let touchStart = 0
    const handleStart = (e) => { touchStart = e.touches[0].clientY }
    const handleEnd = (e) => {
      const diff = touchStart - e.changedTouches[0].clientY
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToPage(currentPage + 1)
        else goToPage(currentPage - 1)
      }
    }
    window.addEventListener('touchstart', handleStart, { passive: true })
    window.addEventListener('touchend', handleEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleStart)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [currentPage, goToPage])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goToPage(currentPage + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPage(currentPage - 1)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentPage, goToPage])

  const pageComponents = [
    <HeroSection />,
    <DetailsPage />,
    <LetterSection />,
    <PhotoUpload />,
    <ContactSection />,
  ]

  return (
    <div className="h-screen overflow-hidden relative bg-cream"
      onTouchStart={(e) => e.stopPropagation()}>
      <FallingLeaves />

      {/* Pages container */}
      <div className="h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentPage * 100}vh)` }}>
        {pageComponents.map((comp, i) => (
          <div key={PAGES[i].id} className="h-screen">{comp}</div>
        ))}
      </div>

      {/* Music player - visible on hero page */}
      {currentPage === 0 && (
        <div className="absolute bottom-24 left-4 sm:left-8 z-50">
          <MusicPlayer />
        </div>
      )}

      {/* Pagination dots */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-2.5 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
        {PAGES.map((page, i) => (
          <button
            key={page.id}
            onClick={() => setCurrentPage(i)}
            className={`transition-all duration-400 rounded-full ${
              i === currentPage
                ? 'bg-white w-7 h-2.5 shadow-lg'
                : 'bg-white/40 w-2.5 h-2.5 hover:bg-white/60'
            }`}
            title={page.label}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      {currentPage > 0 && (
        <button onClick={() => goToPage(currentPage - 1)}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/30 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
      {currentPage < PAGES.length - 1 && (
        <button onClick={() => goToPage(currentPage + 1)}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/30 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

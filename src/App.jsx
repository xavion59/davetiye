import { useState, useRef, useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import DetailsPage from './components/DetailsPage'
import FallingLeaves from './components/FallingLeaves'
import MusicPlayer from './components/MusicPlayer'
import AdminDashboard from './components/AdminDashboard'

const TOTAL_PAGES = 2

function InvitationPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const isScrolling = useRef(false)

  const goToPage = useCallback((page) => {
    if (page >= 0 && page < TOTAL_PAGES) setCurrentPage(page)
  }, [])

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY
    touchStartX.current = e.touches[0].clientX
    isScrolling.current = false
  }, [])

  const handleTouchEnd = useCallback((e) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    const deltaX = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
      if (deltaY > 0) goToPage(currentPage + 1)
      else goToPage(currentPage - 1)
    }
  }, [currentPage, goToPage])

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling.current) return
      isScrolling.current = true
      setTimeout(() => { isScrolling.current = false }, 1000)
      if (e.deltaY > 30) goToPage(currentPage + 1)
      else if (e.deltaY < -30) goToPage(currentPage - 1)
    }
    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentPage, goToPage])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goToPage(currentPage + 1)
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goToPage(currentPage - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentPage, goToPage])

  return (
    <div className="min-h-screen overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
      <FallingLeaves />

      {/* Pages */}
      <div className="transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentPage * 100}vh)` }}>
        <div className="h-screen"><HeroSection /></div>
        <div className="h-screen"><DetailsPage /></div>
      </div>

      {/* Music player */}
      <div className="fixed bottom-24 left-4 sm:left-8 z-50">
        <MusicPlayer />
      </div>

      {/* Pagination dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-3">
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i === currentPage
                ? 'bg-white w-8 shadow-lg shadow-white/30'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      {currentPage === 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-scroll-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
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

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

const PAGE_COUNT = 5

function InvitationPage() {
  const [page, setPage] = useState(0)
  const pageRef = useRef(0)
  const busy = useRef(false)

  const goTo = useCallback((target) => {
    const next = Math.max(0, Math.min(target, PAGE_COUNT - 1))
    if (next === pageRef.current || busy.current) return
    busy.current = true
    pageRef.current = next
    setPage(next)
    setTimeout(() => { busy.current = false }, 750)
  }, [])

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      if (e.deltaY > 15) goTo(pageRef.current + 1)
      else if (e.deltaY < -15) goTo(pageRef.current - 1)
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goTo])

  useEffect(() => {
    let sy = 0
    const onStart = (e) => { sy = e.touches[0].clientY }
    const onEnd = (e) => {
      const dy = sy - e.changedTouches[0].clientY
      if (dy > 40) goTo(pageRef.current + 1)
      else if (dy < -40) goTo(pageRef.current - 1)
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [goTo])

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowDown', 'ArrowRight', ' ', 'PageDown'].includes(e.key)) {
        e.preventDefault(); goTo(pageRef.current + 1)
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault(); goTo(pageRef.current - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-cream">
      <FallingLeaves />

      <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateY(-${page * 100}vh)` }}>
        <div className="h-screen w-screen"><HeroSection /></div>
        <div className="h-screen w-screen"><DetailsPage /></div>
        <div className="h-screen w-screen"><LetterSection /></div>
        <div className="h-screen w-screen"><PhotoUpload /></div>
        <div className="h-screen w-screen"><ContactSection /></div>
      </div>

      {page === 0 && (
        <div className="absolute bottom-24 left-4 sm:left-8 z-50">
          <MusicPlayer />
        </div>
      )}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-2.5 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
        {[0,1,2,3,4].map((i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === page ? 'bg-white w-7 h-2.5 shadow-lg' : 'bg-white/40 w-2.5 h-2.5 hover:bg-white/60'
            }`} />
        ))}
      </div>

      {page > 0 && (
        <button onClick={() => goTo(page - 1)}
          className="fixed right-4 top-20 z-50 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
      {page < 4 && (
        <button onClick={() => goTo(page + 1)}
          className="fixed right-4 bottom-20 z-50 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-all">
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

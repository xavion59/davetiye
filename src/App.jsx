import { useState, useRef, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import DetailsPage from './components/DetailsPage'
import NikahSection from './components/NikahSection'
import RsvpSection from './components/RsvpSection'
import PhotoUpload from './components/PhotoUpload'
import ContactSection from './components/ContactSection'
import FallingLeaves from './components/FallingLeaves'
import EnvelopeIntro from './components/EnvelopeIntro'
import AdminDashboard from './components/AdminDashboard'

function InvitationPage() {
  const [envelopeDone, setEnvelopeDone] = useState(false)
  const audioRef = useRef(null)

  const handleEnvelopeClick = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music.mp3')
      audioRef.current.loop = true
      audioRef.current.preload = 'auto'
    }
    audioRef.current.play().catch(() => {})
    setTimeout(() => setEnvelopeDone(true), 3100)
  }, [])

  return (
    <div className="min-h-screen relative bg-cream overflow-x-hidden">
      {!envelopeDone && <EnvelopeIntro onOpen={handleEnvelopeClick} />}

      <FallingLeaves />

      <HeroSection audioRef={audioRef} />

      <div className="py-8 sm:py-12" />
      <NikahSection />
      <div className="py-8 sm:py-12" />
      <DetailsPage />
      <div className="py-8 sm:py-12" />
      <RsvpSection />
      <div className="py-8 sm:py-12" />
      <PhotoUpload />
      <ContactSection />

      <footer className="py-8 text-center text-text-light text-sm border-t border-border">
        <p>Hazal & Oğuz — 05 Eylül 2026</p>
      </footer>
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

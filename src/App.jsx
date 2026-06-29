import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import DetailsPage from './components/DetailsPage'
import RsvpSection from './components/RsvpSection'
import PhotoUpload from './components/PhotoUpload'
import ContactSection from './components/ContactSection'
import FallingLeaves from './components/FallingLeaves'
import AdminDashboard from './components/AdminDashboard'

function InvitationPage() {
  return (
    <div className="min-h-screen relative bg-cream">
      <FallingLeaves />

      <HeroSection />

      <DetailsPage />
      <RsvpSection />
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

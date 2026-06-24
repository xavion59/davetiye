import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import DetailsSection from './components/DetailsSection'
import LetterSection from './components/LetterSection'
import PhotoUpload from './components/PhotoUpload'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'
import FallingLeaves from './components/FallingLeaves'
import AdminDashboard from './components/AdminDashboard'
import useScrollReveal from './hooks/useScrollReveal'

function InvitationPage() {
  useScrollReveal()

  return (
    <div className="min-h-screen">
      <FallingLeaves />
      <HeroSection />
      <SectionDivider />
      <DetailsSection />
      <SectionDivider />
      <LetterSection />
      <SectionDivider />
      <PhotoUpload />
      <SectionDivider />
      <ContactSection />
      <Footer />
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

import { useState } from 'react'
import jsPDF from 'jspdf'

export default function LetterSection() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [downloading, setDownloading] = useState(false)

  const today = new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })

  const downloadPDF = async () => {
    if (!name.trim()) { alert('Lütfen isminizi girin.'); return }
    setDownloading(true)
    try {
      const doc = new jsPDF('p', 'mm', 'a4')
      const pw = doc.internal.pageSize.getWidth()
      doc.setFillColor(250, 248, 244); doc.rect(0, 0, pw, 297, 'F')
      doc.setDrawColor(201, 169, 110); doc.setLineWidth(0.5); doc.rect(15, 15, pw - 30, 267)
      doc.setDrawColor(226, 216, 200); doc.setLineWidth(0.3); doc.rect(20, 20, pw - 40, 257)
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(122, 107, 93)
      doc.text(today, pw / 2, 40, { align: 'center' })
      doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.setTextColor(61, 50, 40)
      doc.text('Sevgili Hazal & Oğuz,', 30, 60)
      doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.setTextColor(61, 50, 40)
      const lines = doc.splitTextToSize(message || '...', pw - 60)
      doc.text(lines, 30, 80)
      const cy = 80 + lines.length * 7 + 20
      doc.setFont('helvetica', 'italic'); doc.setFontSize(11); doc.text('Sevgi ve saygılarımla...', 30, cy)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text(name, 30, cy + 20)
      doc.setDrawColor(201, 169, 110); doc.setLineWidth(0.3); doc.line(30, cy + 23, 90, cy + 23)
      doc.setFontSize(7); doc.setTextColor(180, 170, 160)
      doc.text('Hazal & Oğuz Nikah Davetiyesi', pw / 2, 280, { align: 'center' })
      doc.save(`Hazal_Oğuz_Mektup_${name.replace(/\s+/g, '_')}.pdf`)
    } catch { alert('PDF oluşturulurken hata oluştu.') }
    finally { setDownloading(false) }
  }

  return (
    <section className="w-full px-6 sm:px-8 py-16 sm:py-20 bg-cream-dark relative">
      <div className="absolute top-10 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-blob" style={{ borderRadius: '50% 50% 50% 50%/60% 60% 40% 40%' }} />

      <div className="w-full max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gold" />
              <svg className="w-6 h-6 text-gold animate-sway" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <div className="w-12 h-px bg-gold" />
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-alex)] text-5xl sm:text-6xl text-primary mb-4">
            Dileklerinizi Yazın
          </h2>
          <p className="text-text-light text-sm">
            Güzel dileklerinizi bir mektup olarak bırakabilirsiniz
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/5 to-gold/5 p-6 border-b border-border">
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-gold/30 animate-float-slow" viewBox="0 0 100 100">
                <path d="M50 10 Q60 30 80 30 Q60 40 60 60 Q50 40 30 50 Q50 40 50 10Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <p className="text-right text-sm text-text-light mb-6">{today}</p>
            <p className="font-[family-name:var(--font-dancing)] text-xl text-text mb-6">Sevgili Hazal & Oğuz,</p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-text mb-2">Mesajınız</label>
              <textarea
                value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder="Mutluluklar dilerim..." rows={6}
                className="w-full p-4 rounded-2xl border border-border bg-cream/50 text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all letter-lines resize-none font-[family-name:var(--font-dancing)] text-lg"
              />
            </div>
            <p className="font-[family-name:var(--font-dancing)] text-lg text-text-light mb-4">Sevgi ve saygılarımla...</p>
            <div className="mb-8">
              <label className="block text-sm font-medium text-text-light mb-2">İmza</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
                className="w-full p-3 rounded-2xl border border-border bg-cream/50 text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-[family-name:var(--font-dancing)] text-xl"
              />
            </div>
            <button onClick={downloadPDF} disabled={downloading}
              className="w-full gradient-btn text-white py-4 px-6 rounded-2xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {downloading ? 'İndiriliyor...' : 'Mektubu İndir (PDF)'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

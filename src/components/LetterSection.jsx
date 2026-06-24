import { useState } from 'react'
import jsPDF from 'jspdf'

export default function LetterSection() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [downloading, setDownloading] = useState(false)

  const today = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const downloadPDF = async () => {
    if (!name.trim()) {
      alert('Lütfen isminizi girin.')
      return
    }
    setDownloading(true)
    try {
      const doc = new jsPDF('p', 'mm', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()

      doc.setFillColor(253, 252, 248)
      doc.rect(0, 0, pageWidth, 297, 'F')

      doc.setDrawColor(201, 169, 110)
      doc.setLineWidth(0.5)
      doc.rect(15, 15, pageWidth - 30, 267)

      doc.setDrawColor(232, 220, 192)
      doc.setLineWidth(0.3)
      doc.rect(20, 20, pageWidth - 40, 257)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(139, 111, 97)
      doc.text(today, pageWidth / 2, 40, { align: 'center' })

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.setTextColor(109, 88, 82)
      doc.text('Sevgili Hazal & Oğuz,', 30, 60)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(11)
      doc.setTextColor(109, 88, 82)

      const lines = doc.splitTextToSize(message || '...', pageWidth - 60)
      doc.text(lines, 30, 80)

      const closingY = 80 + lines.length * 7 + 20
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(11)
      doc.text('Sevgi ve saygılarımla...', 30, closingY)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.text(name, 30, closingY + 20)

      doc.setDrawColor(201, 169, 110)
      doc.setLineWidth(0.3)
      doc.line(30, closingY + 23, 90, closingY + 23)

      doc.setFontSize(7)
      doc.setTextColor(180, 170, 160)
      doc.text('Hazal & Oğuz Nikah Davetiyesi', pageWidth / 2, 280, { align: 'center' })

      doc.save(`Hazal_Oğuz_Mektup_${name.replace(/\s+/g, '_')}.pdf`)
    } catch {
      alert('PDF oluşturulurken bir hata oluştu.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-gold" />
            <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <div className="w-12 h-px bg-gold" />
          </div>
        </div>

        <h2 className="text-center font-[family-name:var(--font-alex)] text-4xl sm:text-5xl text-primary mb-2">
          Dileklerinizi Yazın
        </h2>
        <p className="text-center text-text-light mb-12 text-sm">
          Güzel dileklerinizi bir mektup olarak bırakabilirsiniz
        </p>

        {/* Letter template */}
        <div className="bg-white rounded-2xl border border-border shadow-xl overflow-hidden">
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-primary/5 to-gold/5 p-6 border-b border-border">
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-gold/40" viewBox="0 0 100 100">
                <path d="M50 10 Q60 30 80 30 Q60 40 60 60 Q50 40 30 50 Q50 40 50 10Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Letter body */}
          <div className="p-8">
            <p className="text-right text-sm text-text-light mb-6">{today}</p>

            <p className="font-[family-name:var(--font-dancing)] text-xl text-text mb-6">
              Sevgili Hazal & Oğuz,
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text mb-2">Mesajınız</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mutluluklar dilerim..."
                rows={6}
                className="w-full p-4 rounded-xl border border-border bg-cream/50 text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all letter-lines resize-none font-[family-name:var(--font-dancing)] text-lg"
              />
            </div>

            <p className="font-[family-name:var(--font-dancing)] text-lg text-text-light mb-4">
              Sevgi ve saygılarımla...
            </p>

            <div className="mb-8">
              <label className="block text-sm font-medium text-text-light mb-2">İmza</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
                className="w-full p-3 rounded-xl border border-border bg-cream/50 text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-[family-name:var(--font-dancing)] text-xl"
              />
            </div>

            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="w-full gradient-btn text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
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

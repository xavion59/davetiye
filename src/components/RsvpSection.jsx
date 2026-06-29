import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function RsvpSection() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [guests, setGuests] = useState(1)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim()) { alert('Lütfen adınızı girin.'); return }
    if (!status) { alert('Lütfen katılım durumunuzu seçin.'); return }
    setSaving(true)
    try {
      const { error } = await supabase.from('rsvps').insert({
        name: name.trim(),
        status,
        guests: Number(guests),
        note: note.trim() || null,
      })
      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      alert('Kayıt sırasında hata oluştu: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (submitted) {
    return (
      <section className="w-full px-6 sm:px-8 py-16 sm:py-20 bg-cream-dark">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white rounded-3xl border-4 border-primary p-10 shadow-2xl">
            <svg className="w-16 h-16 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="font-[family-name:var(--font-alex)] text-3xl text-primary mb-2">Teşekkürler!</h3>
            <p className="text-text-light">Katılım bilginiz başarıyla kaydedildi.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-6 sm:px-8 py-16 sm:py-20 bg-cream-dark">
      <div className="max-w-xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gold" />
              <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 14l2 2 4-4" />
              </svg>
              <div className="w-12 h-px bg-gold" />
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-alex)] text-4xl sm:text-5xl text-primary mb-3">
            Katılım Durumu
          </h2>
          <p className="text-text-light text-sm">Katılımınızı ve hatıra notunuzu bırakabilirsiniz</p>
        </div>

        <div className="bg-white rounded-3xl border-4 border-primary shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-10 space-y-6">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Adınız Soyadınız</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
                className="w-full p-3 rounded-2xl border border-border bg-cream/50 text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Katılım Durumu</label>
              <select
                value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 rounded-2xl border border-border bg-cream/50 text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
              >
                <option value="">Seçiniz...</option>
                <option value="katilacagim">Katılacağım</option>
                <option value="net-degil">Net Değil</option>
                <option value="katilamayacagim">Üzülerek Katılamayacağım</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Toplam Katılımcı Sayısı</label>
              <input
                type="number" min="1" max="10" value={guests} onChange={(e) => setGuests(e.target.value)}
                className="w-full p-3 rounded-2xl border border-border bg-cream/50 text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Hatıra Notunuz</label>
              <textarea
                value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="Bizimle paylaşmak istediğiniz bir not varsa yazabilirsiniz..."
                rows={4}
                className="w-full p-4 rounded-2xl border border-border bg-cream/50 text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none text-base"
              />
            </div>

            <button onClick={handleSubmit} disabled={saving}
              className="w-full gradient-btn text-white py-4 px-6 rounded-2xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {saving ? 'Kaydediliyor...' : 'Gönder'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

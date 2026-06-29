import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function RsvpSection() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [guests, setGuests] = useState('')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim()) { alert('Lütfen adınızı girin.'); return }
    if (!status) { alert('Lütfen katılım durumunuzu seçin.'); return }
    if (!guests) { alert('Lütfen katılımcı sayısını seçin.'); return }
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
      <section className="w-full min-h-screen flex items-center justify-center px-6 sm:px-10 py-16 bg-cream-dark">
        <div className="w-full max-w-xl border-[5px] border-primary rounded-3xl p-10 sm:p-14 bg-white/60 shadow-xl text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-[family-name:var(--font-alex)] text-5xl text-primary mb-4">Teşekkürler!</h3>
          <p className="text-text-light text-xl">Katılım bilginiz başarıyla kaydedildi.</p>
          <p className="text-text-light text-base mt-3">Sizi aramızda görmek bizi çok mutlu edecek.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 sm:px-10 py-16 bg-cream-dark">
      <div className="w-full max-w-xl border-[5px] border-primary rounded-3xl p-8 sm:p-12 bg-white/60 shadow-xl">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-alex)] text-4xl sm:text-5xl text-primary mb-3">
            Katılım Durumu
          </h2>
          <p className="text-text-light text-base">Katılımınızı ve hatıra notunuzu bırakabilirsiniz</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Ad Soyad</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Ad Soyad"
              className="w-full p-4 rounded-xl border-2 border-border bg-white text-text placeholder-text-light/40 focus:outline-none focus:border-primary transition-all text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">Katılım Durumu</label>
            <div className="relative">
              <select
                value={status} onChange={(e) => setStatus(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-border bg-white text-text focus:outline-none focus:border-primary transition-all text-base appearance-none"
              >
                <option value="">Seçiniz</option>
                <option value="katilacagim">Katılacağım</option>
                <option value="net-degil">Net Değil</option>
                <option value="katilamayacagim">Üzülerek Katılamayacağım</option>
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">Toplam Katılımcı Sayısı</label>
            <div className="relative">
              <select
                value={guests} onChange={(e) => setGuests(e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-border bg-white text-text focus:outline-none focus:border-primary transition-all text-base appearance-none"
              >
                <option value="">Seçiniz</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} kişi</option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">Hatıra Notunuz</label>
            <textarea
              value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="Hatıra notunuz"
              rows={4}
              className="w-full p-4 rounded-xl border-2 border-border bg-white text-text placeholder-text-light/40 focus:outline-none focus:border-primary transition-all resize-none text-base"
            />
          </div>

          <button onClick={handleSubmit} disabled={saving}
            className="w-full gradient-btn text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg text-lg mt-2">
            {saving ? 'Kaydediliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </section>
  )
}

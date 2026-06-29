import { useState } from 'react'
import { supabase } from '../lib/supabase'

const STATUS_OPTIONS = [
  { value: 'katilacagim', label: 'Katılacağım', icon: 'M5 13l4 4L19 7' },
  { value: 'net-degil', label: 'Net Değil', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { value: 'katilamayacagim', label: 'Üzülerek Katılamayacağım', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
]

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
      <section className="w-full min-h-screen flex items-center justify-center px-6 sm:px-10 py-16 bg-cream-dark">
        <div className="w-full max-w-3xl border-4 border-primary rounded-3xl p-8 sm:p-12 bg-white/60 shadow-xl text-center">
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
      <div className="w-full max-w-3xl border-4 border-primary rounded-3xl p-8 sm:p-12 bg-white/60 shadow-xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-px bg-gold" />
              <svg className="w-7 h-7 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 14l2 2 4-4" />
              </svg>
              <div className="w-16 h-px bg-gold" />
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-alex)] text-5xl sm:text-6xl text-primary mb-4">
            Katılım Durumu
          </h2>
          <p className="text-text-light text-lg">Katılımınızı ve hatıra notunuzu bırakabilirsiniz</p>
        </div>

        <div className="max-w-xl mx-auto space-y-8">
          <div>
            <label className="block text-base font-medium text-text mb-3">Adınız Soyadınız</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Adınız Soyadınız"
              className="w-full p-4 rounded-2xl border-2 border-border bg-white text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-lg"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-text mb-4">Katılım Durumu</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                    status === opt.value
                      ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                      : 'border-border bg-white hover:border-primary/40 hover:bg-cream/30'
                  }`}
                >
                  <svg className={`w-8 h-8 ${status === opt.value ? 'text-primary' : 'text-text-light'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={opt.icon} />
                  </svg>
                  <span className={`text-sm font-medium ${status === opt.value ? 'text-primary' : 'text-text'}`}>
                    {opt.label}
                  </span>
                  {status === opt.value && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-text mb-3">Toplam Katılımcı Sayısı</label>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-14 h-14 rounded-full border-2 border-border bg-white flex items-center justify-center text-2xl font-bold text-text hover:border-primary/40 transition-all"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-bold text-primary">{guests}</span>
                <p className="text-sm text-text-light mt-1">kişi</p>
              </div>
              <button
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="w-14 h-14 rounded-full border-2 border-border bg-white flex items-center justify-center text-2xl font-bold text-text hover:border-primary/40 transition-all"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-text mb-3">Hatıra Notunuz</label>
            <textarea
              value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="Bizimle paylaşmak istediğiniz bir not varsa yazabilirsiniz..."
              rows={5}
              className="w-full p-5 rounded-2xl border-2 border-border bg-white text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none text-lg"
            />
          </div>

          <button onClick={handleSubmit} disabled={saving}
            className="w-full gradient-btn text-white py-5 px-6 rounded-2xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg text-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {saving ? 'Kaydediliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </section>
  )
}

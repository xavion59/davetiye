import { useState } from 'react'
import { supabase } from '../lib/supabase'

const STATUS_OPTIONS = [
  { value: 'katilacagim', label: 'Katılacağım', icon: '🎉', color: 'from-primary to-primary-light' },
  { value: 'net-degil', label: 'Net Değil', icon: '🤔', color: 'from-gold to-gold-light' },
  { value: 'katilamayacagim', label: 'Üzülerek Katılamayacağım', icon: '😢', color: 'from-red-400 to-red-500' },
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
      <section className="w-full px-6 sm:px-8 py-16 sm:py-20 bg-cream-dark">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white rounded-3xl border-4 border-primary p-10 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-alex)] text-4xl text-primary mb-3">Teşekkürler!</h3>
            <p className="text-text-light text-lg">Katılım bilginiz başarıyla kaydedildi.</p>
            <p className="text-text-light text-sm mt-2">Sizi aramızda görmek bizi çok mutlu edecek.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full px-6 sm:px-8 py-16 sm:py-20 bg-cream-dark">
      <div className="max-w-2xl mx-auto relative z-10">
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
          <p className="text-text-light text-base">Katılımınızı ve hatıra notunuzu bırakabilirsiniz</p>
        </div>

        <div className="bg-white rounded-3xl border-4 border-primary shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary/5 to-gold/5 p-6 border-b border-border">
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-gold/30" viewBox="0 0 100 100">
                <path d="M50 10 Q60 30 80 30 Q60 40 60 60 Q50 40 30 50 Q50 40 50 10Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="p-8 sm:p-10 space-y-8">
            <div>
              <label className="block text-sm font-medium text-text mb-3">Adınız Soyadınız</label>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
                className="w-full p-4 rounded-2xl border-2 border-border bg-cream/50 text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-4">Katılım Durumu</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setStatus(opt.value)}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                      status === opt.value
                        ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                        : 'border-border bg-cream/30 hover:border-primary/40 hover:bg-cream/50'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
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
              <label className="block text-sm font-medium text-text mb-3">Toplam Katılımcı Sayısı</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-12 h-12 rounded-full border-2 border-border bg-cream/50 flex items-center justify-center text-xl font-bold text-text hover:border-primary/40 transition-all"
                >
                  −
                </button>
                <div className="flex-1 text-center">
                  <span className="text-3xl font-bold text-primary">{guests}</span>
                  <p className="text-xs text-text-light mt-1">kişi</p>
                </div>
                <button
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="w-12 h-12 rounded-full border-2 border-border bg-cream/50 flex items-center justify-center text-xl font-bold text-text hover:border-primary/40 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-3">Hatıra Notunuz</label>
              <textarea
                value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="Bizimle paylaşmak istediğiniz bir not varsa yazabilirsiniz..."
                rows={4}
                className="w-full p-4 rounded-2xl border-2 border-border bg-cream/50 text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none text-base"
              />
            </div>

            <button onClick={handleSubmit} disabled={saving}
              className="w-full gradient-btn text-white py-4 px-6 rounded-2xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg text-lg">
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

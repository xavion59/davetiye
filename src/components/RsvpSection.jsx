import { useState } from 'react'
import { supabase } from '../lib/supabase'

const STATUS_OPTIONS = [
  { value: 'katilacagim', label: 'Katılacağım' },
  { value: 'net-degil', label: 'Net Değil' },
  { value: 'katilamayacagim', label: 'Üzülerek Katılamayacağım' },
]

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
      <section className="bg-cream-dark overflow-hidden" style={{ width: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px' }}>
        <div className="border-primary rounded-3xl bg-white/60 shadow-xl text-center" style={{ width: '100%', maxWidth: '480px', border: '5px solid #6b8f71', padding: '60px 48px' }}>
          <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: 'rgba(107,143,113,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <svg width="48" height="48" fill="none" stroke="#6b8f71" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-[family-name:var(--font-alex)]" style={{ fontSize: '2.5rem', color: '#6b8f71', marginBottom: '16px' }}>Teşekkürler!</h3>
          <p style={{ color: '#7a6b5d', fontSize: '1.1rem', lineHeight: 1.6 }}>Katılım bilginiz başarıyla kaydedildi.</p>
          <p style={{ color: '#7a6b5d', fontSize: '0.9rem', marginTop: '12px' }}>Sizi aramızda görmek bizi çok mutlu edecek.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream-dark overflow-hidden" style={{ width: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px' }}>
      <div className="border-primary rounded-3xl shadow-xl" style={{ width: '100%', maxWidth: '480px', border: '5px solid #6b8f71', padding: '56px 48px', backgroundColor: 'rgba(255,255,255,0.6)' }}>
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h2 className="font-[family-name:var(--font-alex)]" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: '#6b8f71', marginBottom: '8px' }}>
            Katılım Durumu
          </h2>
          <p style={{ color: '#7a6b5d', fontSize: '0.9rem' }}>Katılımınızı ve hatıra notunuzu bırakabilirsiniz</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <label className="font-semibold" style={{ display: 'block', fontSize: '0.85rem', color: '#3d3228', marginBottom: '10px' }}>Ad Soyad</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Ad Soyad"
              className="border-border focus:border-primary"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e2d8c8', backgroundColor: 'white', fontSize: '0.95rem', color: '#3d3228', outline: 'none', transition: 'border-color 0.2s' }}
            />
          </div>

          <div>
            <label className="font-semibold" style={{ display: 'block', fontSize: '0.85rem', color: '#3d3228', marginBottom: '10px' }}>Katılım Durumu</label>
            <div style={{ position: 'relative' }}>
              <select
                value={status} onChange={(e) => setStatus(e.target.value)}
                className="border-border focus:border-primary"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e2d8c8', backgroundColor: 'white', fontSize: '0.95rem', color: '#3d3228', outline: 'none', appearance: 'none', transition: 'border-color 0.2s' }}
              >
                <option value="">Seçiniz</option>
                {STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#7a6b5d', pointerEvents: 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div>
            <label className="font-semibold" style={{ display: 'block', fontSize: '0.85rem', color: '#3d3228', marginBottom: '10px' }}>Toplam Katılımcı Sayısı</label>
            <div style={{ position: 'relative' }}>
              <select
                value={guests} onChange={(e) => setGuests(e.target.value)}
                className="border-border focus:border-primary"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e2d8c8', backgroundColor: 'white', fontSize: '0.95rem', color: '#3d3228', outline: 'none', appearance: 'none', transition: 'border-color 0.2s' }}
              >
                <option value="">Seçiniz</option>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} kişi</option>
                ))}
              </select>
              <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#7a6b5d', pointerEvents: 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div>
            <label className="font-semibold" style={{ display: 'block', fontSize: '0.85rem', color: '#3d3228', marginBottom: '10px' }}>Hatıra Notunuz</label>
            <textarea
              value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="Hatıra notunuz"
              rows={4}
              className="border-border focus:border-primary"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e2d8c8', backgroundColor: 'white', fontSize: '0.95rem', color: '#3d3228', outline: 'none', resize: 'none', transition: 'border-color 0.2s' }}
            />
          </div>

          <button onClick={handleSubmit} disabled={saving}
            className="gradient-btn"
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', color: 'white', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', opacity: saving ? 0.5 : 1, marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {saving ? 'Kaydediliyor...' : 'Gönder'}
          </button>
        </div>
      </div>
    </section>
  )
}

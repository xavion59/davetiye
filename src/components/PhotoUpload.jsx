import { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function PhotoUpload() {
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const s = e.target.files?.[0]
    if (!s) return
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(s.type)) { setMessage({ text: 'Sadece PNG, JPG desteklenir.', type: 'error' }); return }
    if (s.size > 5 * 1024 * 1024) { setMessage({ text: 'Dosya boyutu 5MB\'dan küçük olmalı.', type: 'error' }); return }
    setFile(s); setPreview(URL.createObjectURL(s)); setMessage({ text: '', type: '' })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const df = e.dataTransfer.files?.[0]
    if (df && fileInputRef.current) {
      const dt = new DataTransfer(); dt.items.add(df); fileInputRef.current.files = dt.files
      handleFileChange({ target: fileInputRef.current })
    }
  }

  const handleSubmit = async () => {
    if (!name.trim()) { setMessage({ text: 'Lütfen isminizi girin.', type: 'error' }); return }
    if (!file) { setMessage({ text: 'Lütfen bir fotoğraf seçin.', type: 'error' }); return }
    setUploading(true); setMessage({ text: '', type: '' })
    try {
      const ext = file.name.split('.').pop()
      const fn = `${Date.now()}_${name.replace(/\s+/g, '_')}.${ext}`
      const { error: ue } = await supabase.storage.from('guest-photos').upload(fn, file)
      if (ue) throw ue
      const { error: de } = await supabase.from('uploads').insert([{ uploader_name: name, photo_url: fn }])
      if (de) throw de
      setSubmitted(true)
    } catch (err) { setMessage({ text: `Yükleme hatası: ${err.message}`, type: 'error' }) }
    finally { setUploading(false) }
  }

  if (submitted) {
    return (
      <section style={{ width: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', backgroundColor: '#faf8f4' }}>
        <div style={{ width: '100%', maxWidth: '480px', border: '5px solid #6b8f71', borderRadius: '24px', padding: '60px 48px', backgroundColor: 'rgba(255,255,255,0.6)', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: 'rgba(107,143,113,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
            <svg width="48" height="48" fill="none" stroke="#6b8f71" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 style={{ fontFamily: 'var(--font-alex)', fontSize: '40px', color: '#6b8f71', marginBottom: '16px' }}>Teşekkürler!</h3>
          <p style={{ color: '#7a6b5d', fontSize: '17px', lineHeight: 1.6 }}>Fotoğrafınız başarıyla yüklendi.</p>
          <p style={{ color: '#7a6b5d', fontSize: '14px', marginTop: '12px' }}>Anılarınızı bizimle paylaştığınız için teşekkür ederiz.</p>
        </div>
      </section>
    )
  }

  return (
    <section style={{ width: '100%', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', backgroundColor: '#faf8f4' }}>
      <div style={{ width: '100%', maxWidth: '480px', border: '5px solid #6b8f71', borderRadius: '24px', padding: '56px 48px', backgroundColor: 'rgba(255,255,255,0.6)', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-alex)', fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: '#6b8f71', marginBottom: '8px' }}>
            Anılarınızı Paylaşın
          </h2>
          <p style={{ color: '#7a6b5d', fontSize: '0.9rem' }}>Düğünümüzden kareleri bizimle paylaşabilirsiniz</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#3d3228', marginBottom: '10px' }}>Adınız Soyadınız</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınız Soyadınız"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #e2d8c8', backgroundColor: 'white', fontSize: '0.95rem', color: '#3d3228', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#3d3228', marginBottom: '10px' }}>Fotoğraf Seçin</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{
                border: `2px dashed ${preview ? '#6b8f71' : '#e2d8c8'}`,
                borderRadius: '12px',
                padding: preview ? '16px' : '40px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: preview ? 'rgba(107,143,113,0.05)' : 'white'
              }}
            >
              <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg" onChange={handleFileChange} style={{ display: 'none' }} />
              {preview ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <img src={preview} alt="Önizleme" style={{ maxHeight: '180px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <p style={{ fontSize: '13px', color: '#6b8f71', fontWeight: 500 }}>Değiştirmek için tıklayın</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <svg width="48" height="48" fill="none" stroke="#bfb8ae" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p style={{ color: '#9a8e80', fontSize: '14px' }}>Fotoğraf yüklemek için tıklayın</p>
                  <p style={{ color: '#bfb8ae', fontSize: '12px' }}>PNG, JPG (Maks. 5MB)</p>
                </div>
              )}
            </div>
          </div>

          {message.text && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '13px',
              backgroundColor: message.type === 'success' ? 'rgba(107,143,113,0.1)' : '#fef2f2',
              border: `1px solid ${message.type === 'success' ? 'rgba(107,143,113,0.2)' : '#fecaca'}`,
              color: message.type === 'success' ? '#6b8f71' : '#dc2626'
            }}>
              {message.text}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="gradient-btn"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              color: 'white',
              fontSize: '1.05rem',
              fontWeight: 600,
              cursor: 'pointer',
              opacity: uploading ? 0.5 : 1,
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {uploading ? 'Yükleniyor...' : 'Fotoğrafı Gönder'}
          </button>
        </div>
      </div>
    </section>
  )
}

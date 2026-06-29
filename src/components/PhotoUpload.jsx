import { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function PhotoUpload() {
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const s = e.target.files?.[0]
    if (!s) return
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(s.type)) { setMessage({ text: 'Sadece PNG, JPG desteklenir.', type: 'error' }); return }
    if (s.size > 5 * 1024 * 1024) { setMessage({ text: 'Dosya boyutu 5MB\'dan küçük olmalı.', type: 'error' }); return }
    setFile(s); setPreview(URL.createObjectURL(s)); setMessage({ text: 'Fotoğraf seçildi!', type: 'success' })
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
      setMessage({ text: 'Fotoğrafınız başarıyla yüklendi!', type: 'success' })
      setName(''); setFile(null); setPreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) { setMessage({ text: `Yükleme hatası: ${err.message}`, type: 'error' }) }
    finally { setUploading(false) }
  }

  return (
    <section className="w-full min-h-[85vh] flex items-center justify-center px-6 sm:px-10 py-16 bg-cream relative">
      <div className="absolute bottom-10 right-0 w-56 h-56 bg-gold/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-2xl mx-auto border-[5px] border-primary rounded-3xl p-8 sm:p-12 bg-white/60 shadow-xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gold" />
              <svg className="w-6 h-6 text-gold animate-sway-reverse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              <div className="w-12 h-px bg-gold" />
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-alex)] text-5xl sm:text-6xl text-primary mb-4">
            Anılarınızı Paylaşın
          </h2>
          <p className="text-text-light text-sm">
            Düğünümüzden kareleri bizimle paylaşabilirsiniz
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-2xl p-8 sm:p-10">
          <div className="mb-6">
            <label className="block text-sm font-medium text-text mb-2">Adınız Soyadınız</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınız Soyadınız"
              className="w-full p-4 rounded-2xl border border-border bg-cream/50 text-text placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
          </div>

          <div className={`mb-6 border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${preview ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-cream/50'}`}
            onClick={() => fileInputRef.current?.click()} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg" onChange={handleFileChange} className="hidden" />
            {preview ? (
              <div className="space-y-3">
                <img src={preview} alt="Önizleme" className="max-h-48 mx-auto rounded-xl shadow-lg" />
                <p className="text-sm text-primary font-medium">Fotoğraf seçildi! Değiştirmek için tıklayın.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <svg className="w-14 h-14 mx-auto text-text-light/30 animate-float-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-text-light">Fotoğraf yüklemek için tıklayın veya sürükleyin</p>
                <p className="text-xs text-text-light/60">PNG, JPG (Maks. 5MB)</p>
              </div>
            )}
          </div>

          {message.text && (
            <div className={`mb-4 p-4 rounded-2xl text-sm ${message.type === 'success' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-50 text-red-600 border border-red-200'}`}>
              {message.text}
            </div>
          )}

          <button onClick={handleSubmit} disabled={uploading}
            className="w-full gradient-btn text-white py-4 px-6 rounded-2xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {uploading ? 'Yükleniyor...' : 'Fotoğrafı Gönder'}
          </button>
        </div>
      </div>
    </section>
  )
}

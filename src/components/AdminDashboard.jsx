import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [photos, setPhotos] = useState([])
  const [photosLoading, setPhotosLoading] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [sortBy, setSortBy] = useState('newest')
  const [searchTerm, setSearchTerm] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser(session.user)
    })
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      setUser(data.user)
    } catch (err) {
      setLoginError(err.message || 'Giriş başarısız')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setPhotos([])
    setSelectedIds([])
  }

  const loadPhotos = async () => {
    setPhotosLoading(true)
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .order('created_at', { ascending: sortBy === 'oldest' })
      if (error) throw error
      setPhotos(data || [])
    } catch (err) {
      alert('Fotoğraflar yüklenirken hata: ' + err.message)
    } finally {
      setPhotosLoading(false)
    }
  }

  useEffect(() => {
    if (user) loadPhotos()
  }, [user, sortBy])

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedIds(filteredPhotos.map((p) => p.id))
  }

  const deselectAll = () => setSelectedIds([])

  const deleteSelected = async () => {
    if (!confirm(`${selectedIds.length} fotoğrafı silmek istediğinize emin misiniz?`)) return
    setActionLoading(true)
    try {
      for (const id of selectedIds) {
        const photo = photos.find((p) => p.id === id)
        if (photo) {
          await supabase.storage.from('guest-photos').remove([photo.photo_url])
          await supabase.from('uploads').delete().eq('id', id)
        }
      }
      setPhotos((prev) => prev.filter((p) => !selectedIds.includes(p.id)))
      setSelectedIds([])
    } catch (err) {
      alert('Silme hatası: ' + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const downloadSelected = async () => {
    setActionLoading(true)
    try {
      for (const id of selectedIds) {
        const photo = photos.find((p) => p.id === id)
        if (photo) {
          const { data } = await supabase.storage.from('guest-photos').download(photo.photo_url)
          const url = URL.createObjectURL(data)
          const a = document.createElement('a')
          a.href = url
          a.download = photo.photo_url
          a.click()
          URL.revokeObjectURL(url)
        }
      }
    } catch (err) {
      alert('İndirme hatası: ' + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cream px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-border shadow-xl p-8">
          <h2 className="font-[family-name:var(--font-alex)] text-3xl text-primary text-center mb-6">Yönetim Paneli</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-cream/50 text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-cream/50 text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full gradient-btn text-white py-3 rounded-xl font-medium disabled:opacity-50"
            >
              {loginLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </section>
    )
  }

  const filteredPhotos = photos.filter((p) =>
    p.uploader_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="min-h-screen bg-cream px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[family-name:var(--font-alex)] text-3xl text-primary">Fotoğraf Yönetimi</h2>
          <button onClick={handleLogout} className="text-sm text-text-light hover:text-red-500 transition-colors">
            Çıkış Yap
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-border p-4 mb-6 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="İsme göre ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg border border-border text-sm flex-1 min-w-[150px]"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded-lg border border-border text-sm"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
          </select>
          <div className="flex gap-2 flex-wrap">
            <button onClick={selectAll} className="px-3 py-1.5 text-xs rounded-lg bg-primary/10 text-primary hover:bg-primary/20">Tümünü Seç</button>
            <button onClick={deselectAll} className="px-3 py-1.5 text-xs rounded-lg bg-cream text-text-light hover:bg-cream-dark">Seçimi Kaldır</button>
            {selectedIds.length > 0 && (
              <>
                <button onClick={downloadSelected} disabled={actionLoading} className="px-3 py-1.5 text-xs rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-50">
                  İndir ({selectedIds.length})
                </button>
                <button onClick={deleteSelected} disabled={actionLoading} className="px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50">
                  Sil ({selectedIds.length})
                </button>
              </>
            )}
          </div>
        </div>

        {/* Photo grid */}
        {photosLoading ? (
          <p className="text-center text-text-light py-12">Yükleniyor...</p>
        ) : filteredPhotos.length === 0 ? (
          <p className="text-center text-text-light py-12">Henüz fotoğraf yüklenmemiş.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                  selectedIds.includes(photo.id) ? 'border-primary shadow-lg scale-[1.02]' : 'border-transparent hover:border-border'
                }`}
                onClick={() => toggleSelect(photo.id)}
              >
                <img
                  src={supabase.storage.from('guest-photos').getPublicUrl(photo.photo_url).data.publicUrl}
                  alt={photo.uploader_name}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs truncate">{photo.uploader_name}</p>
                </div>
                {selectedIds.includes(photo.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

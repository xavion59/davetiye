import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [activeTab, setActiveTab] = useState('photos')

  const [photos, setPhotos] = useState([])
  const [photosLoading, setPhotosLoading] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [sortBy, setSortBy] = useState('newest')
  const [searchTerm, setSearchTerm] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const [rsvps, setRsvps] = useState([])
  const [rsvpsLoading, setRsvpsLoading] = useState(false)

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
    setRsvps([])
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

  const loadRsvps = async () => {
    setRsvpsLoading(true)
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setRsvps(data || [])
    } catch (err) {
      alert('Katılımcılar yüklenirken hata: ' + err.message)
    } finally {
      setRsvpsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadPhotos()
      loadRsvps()
    }
  }, [user, sortBy])

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => setSelectedIds(filteredPhotos.map((p) => p.id))
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

  const deleteRsvp = async (id) => {
    if (!confirm('Bu kaydı silmek istediğinize emin misiniz?')) return
    try {
      const { error } = await supabase.from('rsvps').delete().eq('id', id)
      if (error) throw error
      setRsvps((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      alert('Silme hatası: ' + err.message)
    }
  }

  const statusLabel = (s) => {
    const map = { 'katilacagim': 'Katılacağım', 'net-degil': 'Net Değil', 'katilamayacagim': 'Katılamayacak' }
    return map[s] || s
  }

  const statusColor = (s) => {
    const map = { 'katilacagim': '#6b8f71', 'net-degil': '#c9a96e', 'katilamayacagim': '#ef4444' }
    return map[s] || '#7a6b5d'
  }

  const totalGuests = rsvps.reduce((sum, r) => sum + (r.guests || 0), 0)
  const attending = rsvps.filter(r => r.status === 'katilacagim').length

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

  const filteredRsvps = rsvps.filter((r) =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="min-h-screen bg-cream px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-[family-name:var(--font-alex)] text-3xl text-primary">Yönetim Paneli</h2>
          <button onClick={handleLogout} className="text-sm text-text-light hover:text-red-500 transition-colors">
            Çıkış Yap
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'photos' ? 'bg-primary text-white shadow-md' : 'bg-white text-text border border-border hover:bg-cream'}`}
          >
            Fotoğraflar ({photos.length})
          </button>
          <button
            onClick={() => setActiveTab('rsvps')}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'rsvps' ? 'bg-primary text-white shadow-md' : 'bg-white text-text border border-border hover:bg-cream'}`}
          >
            Katılımcılar ({rsvps.length})
          </button>
        </div>

        {activeTab === 'photos' && (
          <>
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
          </>
        )}

        {activeTab === 'rsvps' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl border border-border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{rsvps.length}</p>
                <p className="text-xs text-text-light mt-1">Toplam Cevap</p>
              </div>
              <div className="bg-white rounded-2xl border border-border p-4 text-center">
                <p className="text-2xl font-bold" style={{ color: '#6b8f71' }}>{attending}</p>
                <p className="text-xs text-text-light mt-1">Katılacak</p>
              </div>
              <div className="bg-white rounded-2xl border border-border p-4 text-center">
                <p className="text-2xl font-bold" style={{ color: '#c9a96e' }}>{totalGuests}</p>
                <p className="text-xs text-text-light mt-1">Toplam Kişi</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-4 mb-6">
              <input
                type="text"
                placeholder="İsme göre ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-lg border border-border text-sm w-full"
              />
            </div>

            {rsvpsLoading ? (
              <p className="text-center text-text-light py-12">Yükleniyor...</p>
            ) : filteredRsvps.length === 0 ? (
              <p className="text-center text-text-light py-12">Henüz katılım cevabı yok.</p>
            ) : (
              <div className="space-y-3">
                {filteredRsvps.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-border p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-text truncate">{r.name}</p>
                        <span className="text-xs px-2.5 py-0.5 rounded-full text-white font-medium shrink-0" style={{ backgroundColor: statusColor(r.status) }}>
                          {statusLabel(r.status)}
                        </span>
                      </div>
                      <p className="text-sm text-text-light">
                        {r.guests} kişi
                        {r.note && <span className="text-text-light/60"> — "{r.note}"</span>}
                      </p>
                      <p className="text-xs text-text-light/50 mt-1">
                        {new Date(r.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteRsvp(r.id)}
                      className="shrink-0 w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

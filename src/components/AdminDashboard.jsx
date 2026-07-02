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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf8f4', padding: '16px' }}>
        <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e8e2d8', boxShadow: '0 25px 60px rgba(0,0,0,0.08)', padding: '48px 40px', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#6b8f71', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg style={{ width: '28px', height: '28px', color: '#fff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 style={{ fontFamily: 'var(--font-alex)', fontSize: '32px', color: '#6b8f71', marginBottom: '8px' }}>Yönetim Paneli</h2>
          <p style={{ color: '#9a8e80', fontSize: '14px', marginBottom: '32px' }}>Davetiye yönetim arayüzü</p>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#7a6b5d', marginBottom: '6px' }}>E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e8e2d8', backgroundColor: '#faf8f4', fontSize: '14px', color: '#3d3425', outline: 'none', boxSizing: 'border-box' }}
                placeholder="ornek@email.com"
                required
              />
            </div>
            <div style={{ marginBottom: '24px', textAlign: 'left' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#7a6b5d', marginBottom: '6px' }}>Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e8e2d8', backgroundColor: '#faf8f4', fontSize: '14px', color: '#3d3425', outline: 'none', boxSizing: 'border-box' }}
                placeholder="••••••••"
                required
              />
            </div>
            {loginError && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '10px 14px', marginBottom: '20px' }}>
                <p style={{ color: '#dc2626', fontSize: '13px', margin: 0 }}>{loginError}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6b8f71, #5a7d60)', color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer', opacity: loginLoading ? 0.5 : 1 }}
            >
              {loginLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const filteredPhotos = photos.filter((p) =>
    p.uploader_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredRsvps = rsvps.filter((r) =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#faf8f4' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e8e2d8', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#6b8f71', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg style={{ width: '20px', height: '20px', color: '#fff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-alex)', fontSize: '24px', color: '#6b8f71', margin: 0, lineHeight: 1 }}>Yönetim Paneli</h1>
              <p style={{ fontSize: '12px', color: '#9a8e80', margin: 0 }}>Hazal & Oğuz Davetiyesi</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid #e8e2d8', backgroundColor: '#fff', color: '#9a8e80', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <button
            onClick={() => { setActiveTab('photos'); setSearchTerm(''); }}
            style={{
              padding: '12px 24px', borderRadius: '14px', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
              backgroundColor: activeTab === 'photos' ? '#6b8f71' : '#fff',
              color: activeTab === 'photos' ? '#fff' : '#7a6b5d',
              boxShadow: activeTab === 'photos' ? '0 4px 12px rgba(107,143,113,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Fotoğraflar
            <span style={{ padding: '2px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', backgroundColor: activeTab === 'photos' ? 'rgba(255,255,255,0.2)' : '#f0ece4', color: activeTab === 'photos' ? '#fff' : '#9a8e80' }}>
              {photos.length}
            </span>
          </button>
          <button
            onClick={() => { setActiveTab('rsvps'); setSearchTerm(''); }}
            style={{
              padding: '12px 24px', borderRadius: '14px', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
              backgroundColor: activeTab === 'rsvps' ? '#6b8f71' : '#fff',
              color: activeTab === 'rsvps' ? '#fff' : '#7a6b5d',
              boxShadow: activeTab === 'rsvps' ? '0 4px 12px rgba(107,143,113,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Katılımcılar
            <span style={{ padding: '2px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', backgroundColor: activeTab === 'rsvps' ? 'rgba(255,255,255,0.2)' : '#f0ece4', color: activeTab === 'rsvps' ? '#fff' : '#9a8e80' }}>
              {rsvps.length}
            </span>
          </button>
        </div>

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e8e2d8', padding: '16px 20px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9a8e80' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="İsme göre ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '10px', border: '1px solid #e8e2d8', fontSize: '13px', color: '#3d3425', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #e8e2d8', fontSize: '13px', color: '#3d3425', backgroundColor: '#fff', outline: 'none' }}
              >
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
              </select>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button onClick={selectAll} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e8e2d8', backgroundColor: '#fff', color: '#6b8f71', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Tümünü Seç</button>
                <button onClick={deselectAll} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #e8e2d8', backgroundColor: '#faf8f4', color: '#9a8e80', fontSize: '12px', cursor: 'pointer' }}>Seçimi Kaldır</button>
                {selectedIds.length > 0 && (
                  <>
                    <button onClick={downloadSelected} disabled={actionLoading} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#6b8f71', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer', opacity: actionLoading ? 0.5 : 1 }}>
                      İndir ({selectedIds.length})
                    </button>
                    <button onClick={deleteSelected} disabled={actionLoading} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: '#fff', fontSize: '12px', fontWeight: '600', cursor: 'pointer', opacity: actionLoading ? 0.5 : 1 }}>
                      Sil ({selectedIds.length})
                    </button>
                  </>
                )}
              </div>
            </div>

            {photosLoading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#9a8e80' }}>Yükleniyor...</div>
            ) : filteredPhotos.length === 0 ? (
              <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #e8e2d8', padding: '60px 20px', textAlign: 'center' }}>
                <svg style={{ width: '48px', height: '48px', color: '#d4cfc6', margin: '0 auto 16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p style={{ color: '#9a8e80', fontSize: '15px', margin: 0 }}>Henüz fotoğraf yüklenmemiş.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => toggleSelect(photo.id)}
                    style={{
                      position: 'relative', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s',
                      border: selectedIds.includes(photo.id) ? '3px solid #6b8f71' : '3px solid transparent',
                      boxShadow: selectedIds.includes(photo.id) ? '0 8px 24px rgba(107,143,113,0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
                      transform: selectedIds.includes(photo.id) ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <img
                      src={supabase.storage.from('guest-photos').getPublicUrl(photo.photo_url).data.publicUrl}
                      alt={photo.uploader_name}
                      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '12px 10px 8px' }}>
                      <p style={{ color: '#fff', fontSize: '12px', fontWeight: '500', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{photo.uploader_name}</p>
                    </div>
                    {selectedIds.includes(photo.id) && (
                      <div style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#6b8f71', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                        <svg style={{ width: '16px', height: '16px', color: '#fff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* RSVPs Tab */}
        {activeTab === 'rsvps' && (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e8e2d8', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#f0f5f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg style={{ width: '22px', height: '22px', color: '#6b8f71' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#6b8f71', margin: 0 }}>{rsvps.length}</p>
                <p style={{ fontSize: '12px', color: '#9a8e80', margin: '4px 0 0', fontWeight: '500' }}>Toplam Cevap</p>
              </div>
              <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e8e2d8', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#f0f5f1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg style={{ width: '22px', height: '22px', color: '#6b8f71' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#6b8f71', margin: 0 }}>{attending}</p>
                <p style={{ fontSize: '12px', color: '#9a8e80', margin: '4px 0 0', fontWeight: '500' }}>Katılacak</p>
              </div>
              <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e8e2d8', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#faf3e6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg style={{ width: '22px', height: '22px', color: '#c9a96e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#c9a96e', margin: 0 }}>{totalGuests}</p>
                <p style={{ fontSize: '12px', color: '#9a8e80', margin: '4px 0 0', fontWeight: '500' }}>Toplam Kişi</p>
              </div>
            </div>

            {/* Search */}
            <div style={{ backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #e8e2d8', padding: '14px 18px', marginBottom: '16px', position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9a8e80' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Katılımcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '4px 0 4px 32px', border: 'none', fontSize: '14px', color: '#3d3425', outline: 'none', backgroundColor: 'transparent' }}
              />
            </div>

            {rsvpsLoading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#9a8e80' }}>Yükleniyor...</div>
            ) : filteredRsvps.length === 0 ? (
              <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #e8e2d8', padding: '60px 20px', textAlign: 'center' }}>
                <svg style={{ width: '48px', height: '48px', color: '#d4cfc6', margin: '0 auto 16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p style={{ color: '#9a8e80', fontSize: '15px', margin: 0 }}>Henüz katılım cevabı yok.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredRsvps.map((r) => (
                  <div key={r.id} style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e8e2d8', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: statusColor(r.status) + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', shrink: 0 }}>
                        <svg style={{ width: '20px', height: '20px', color: statusColor(r.status) }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                          <p style={{ fontWeight: '600', fontSize: '15px', color: '#3d3425', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</p>
                          <span style={{ padding: '2px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', backgroundColor: statusColor(r.status), color: '#fff', whiteSpace: 'nowrap' }}>
                            {statusLabel(r.status)}
                          </span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#9a8e80', margin: 0 }}>
                          {r.guests} kişi{r.note && <span> — "{r.note}"</span>}
                        </p>
                        <p style={{ fontSize: '11px', color: '#bfb8ae', margin: '2px 0 0' }}>
                          {new Date(r.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteRsvp(r.id)}
                      style={{ shrink: 0, width: '36px', height: '36px', borderRadius: '10px', border: '1px solid #fecaca', backgroundColor: '#fff', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  )
}

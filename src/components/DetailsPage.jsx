export default function DetailsPage() {
  return (
    <section style={{ width: '100%', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 16px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '600px', border: '5px solid #6b8f71', borderRadius: '24px', padding: '40px 20px', backgroundColor: 'rgba(255,255,255,0.6)', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', boxSizing: 'border-box' }}>
        <h2 style={{ fontFamily: 'var(--font-alex)', textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: '#6b8f71', marginBottom: '36px' }}>
          Düğün
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Date & Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 16px', borderRadius: '16px', border: '4px solid #6b8f71', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', boxSizing: 'border-box' }}>
            <div style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #6b8f71, #8fb996)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
              </svg>
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontWeight: '700', color: '#3d3228', fontSize: '15px', marginBottom: '4px', overflowWrap: 'break-word' }}>5 Eylül 2026, Cumartesi</p>
              <p style={{ color: '#7a6b5d', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', overflowWrap: 'break-word' }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                </svg>
                Saat 19:00
              </p>
            </div>
          </div>

          {/* Venue */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 16px', borderRadius: '16px', border: '4px solid #6b8f71', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', boxSizing: 'border-box' }}>
            <div style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #c9a96e, #d4bc8e)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" strokeWidth="2" />
              </svg>
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontWeight: '700', color: '#3d3228', fontSize: '15px', marginBottom: '4px', overflowWrap: 'break-word' }}>Gözde Düğün Salonu</p>
              <p style={{ color: '#7a6b5d', fontSize: '13px', overflowWrap: 'break-word' }}>Cumhuriyet, 22800 Yenimuhacir/Keşan/Edirne</p>
            </div>
          </div>

          {/* Map */}
          <div style={{ borderRadius: '16px', border: '4px solid #6b8f71', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', boxSizing: 'border-box' }}>
            <div style={{ height: '256px', position: 'relative' }}>
              <iframe
                title="Mekan Konumu"
                src="https://www.google.com/maps?q=G%C3%B6zde+D%C3%BC%C4%9Fn+Salonu+Cumhuriyet+Ke%C5%9Fan+Edirne+Turkey&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <a
              href="https://www.google.com/maps/search/G%C3%B6zde+D%C3%BC%C4%9Fn+Salonu+Cumhuriyet+Ke%C5%9Fan+Edirne"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '14px 16px', textAlign: 'center', color: 'white', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(135deg, #6b8f71, #5a7d60)' }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Google Haritalar'da Aç
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function DetailsPage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-8 sm:px-12 py-16 bg-cream">
      <div className="w-full max-w-3xl border-[5px] border-primary rounded-3xl p-8 sm:p-12 bg-white/60 shadow-xl">
        <h2 className="font-[family-name:var(--font-alex)] text-4xl sm:text-5xl text-primary text-center mb-10">
          Düğün Detayları
        </h2>

        <div className="max-w-xl mx-auto flex flex-col gap-4">
          <div className="rounded-2xl border-[4px] border-primary bg-white shadow-lg flex items-center gap-4 px-5 py-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shrink-0 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-text text-lg">5 Eylül 2026, Cumartesi</p>
              <p className="text-text-light text-sm flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                </svg>
                Saat 19:00
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-[4px] border-primary bg-white shadow-lg flex items-center gap-4 px-5 py-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shrink-0 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-text text-lg">Gözde Düğün Salonu</p>
              <p className="text-text-light text-sm">Cumhuriyet, 22800 Yenimuhacir/Keşan/Edirne</p>
            </div>
          </div>

          <div className="rounded-2xl border-[4px] border-primary bg-white shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 relative">
              <iframe
                title="Mekan Konumu"
                src="https://www.google.com/maps?q=G%C3%B6zde+D%C3%BC%C4%9Fn+Salonu+Cumhuriyet+Ke%C5%9Fan+Edirne+Turkey&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <a
              href="https://www.google.com/maps/search/G%C3%B6zde+D%C3%BC%C4%9Fn+Salonu+Cumhuriyet+Ke%C5%9Fan+Edirne"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-btn text-white py-3 px-4 text-center font-semibold text-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Google Haritalar'da Aç
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

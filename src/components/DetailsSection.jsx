export default function DetailsSection() {
  return (
    <section id="details" className="py-32 sm:py-40 px-6 sm:px-8 bg-cream relative overflow-hidden">
      <div className="absolute top-10 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob" style={{ borderRadius: '50% 50% 50% 50%/60% 60% 40% 40%' }} />
      <div className="absolute bottom-10 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

      <div className="w-full max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gold" />
              <svg className="w-6 h-6 text-gold animate-pulse-heart" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="w-12 h-px bg-gold" />
            </div>
          </div>
          <h2 className="font-[family-name:var(--font-alex)] text-5xl sm:text-6xl text-primary mb-4 reveal">
            Düğün Detayları
          </h2>
          <p className="text-text-light text-sm tracking-widest uppercase reveal delay-1">
            Sizi mutlu günümüzde aramızda görmek istiyoruz
          </p>
        </div>

        {/* Date & Time card */}
        <div className="glass rounded-3xl p-8 sm:p-10 border border-border shadow-xl mb-10 reveal-left hover:shadow-2xl transition-all duration-500">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shrink-0 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text text-lg mb-1">Tarih & Saat</h3>
              <p className="text-text-light">5 Eylül 2026, Cumartesi</p>
              <p className="text-text-light flex items-center gap-1 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                </svg>
                Saat 19:00
              </p>
            </div>
          </div>
        </div>

        {/* Venue card */}
        <div className="glass rounded-3xl p-8 sm:p-10 border border-border shadow-xl mb-10 reveal-right hover:shadow-2xl transition-all duration-500" style={{ transitionDelay: '0.15s' }}>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shrink-0 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2" />
                <circle cx="12" cy="10" r="3" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-text text-lg mb-1">Mekan</h3>
              <p className="text-text-light font-medium">Gözde Düğün Salonu</p>
              <p className="text-text-light text-sm mt-1">Cumhuriyet, 22800 Yenimuhacir/Keşan/Edirne</p>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="reveal delay-2">
          <div className="rounded-3xl overflow-hidden border border-border shadow-xl">
            <iframe
              title="Mekan Konumu"
              src="https://www.google.com/maps?q=G%C3%B6zde+D%C3%BC%C4%9Fn+Salonu+Cumhuriyet+Ke%C5%9Fan+Edirne+Turkey&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <a
            href="https://www.google.com/maps/search/G%C3%B6zde+D%C3%BC%C4%9Fn+Salonu+Cumhuriyet+Ke%C5%9Fan+Edirne"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full gradient-btn text-white py-4 px-6 rounded-2xl font-medium text-center shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Google Haritalar'da Aç
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

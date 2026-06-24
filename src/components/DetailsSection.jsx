export default function DetailsSection() {
  return (
    <section id="details" className="py-20 px-4 sm:px-6 bg-cream">
      {/* Decorative top */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-gold" />
          <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="w-12 h-px bg-gold" />
        </div>
      </div>

      <h2 className="text-center font-[family-name:var(--font-alex)] text-4xl sm:text-5xl text-primary mb-2">
        Nikah Detayları
      </h2>
      <p className="text-center text-text-light mb-12 text-sm tracking-widest uppercase">
        Sizi mutlu günümüzde aramızda görmek istiyoruz
      </p>

      <div className="max-w-2xl mx-auto">
        {/* Date & Time card */}
        <div className="glass rounded-2xl p-8 border border-border shadow-lg mb-6 animate-scale-in hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/15 to-gold/10 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                Saat 16:00
              </p>
            </div>
          </div>
        </div>

        {/* Venue card */}
        <div className="glass rounded-2xl p-8 border border-border shadow-lg mb-6 animate-scale-in hover:scale-[1.02] transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/15 to-primary/10 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <div className="rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
            <iframe
              title="Mekan Konumu"
              src="https://www.google.com/maps?q=G%C3%B6zde+D%C3%BC%C4%9Fn+Salonu+Cumhuriyet+Ke%C5%9Fan+Edirne+Turkey&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <a
            href="https://www.google.com/maps/search/G%C3%B6zde+D%C3%BC%C4%9Fn+Salonu+Cumhuriyet+Ke%C5%9Fan+Edirne"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full gradient-btn text-white py-3 px-6 rounded-xl font-medium text-center"
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

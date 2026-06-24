export default function Footer() {
  return (
    <footer className="py-16 px-4 bg-gradient-to-b from-cream to-cream-dark border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative heart */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-alex)] text-4xl text-primary mb-4">
          Hazal & Oğuz
        </h3>
        <p className="text-text-light text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Bu güzel yolculukta bizimle birlikte olmanız, hayatımızdaki en mutlu anları daha da özel kılıyor.
        </p>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
        <p className="text-text-light/50 text-xs tracking-wider">
          © 2026 Hazal & Oğuz Nikah Davetiyesi
        </p>
      </div>
    </footer>
  )
}

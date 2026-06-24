export default function ContactSection() {
  const contacts = [
    {
      name: 'Oğuz Uğur Başpınar',
      phone: '+90 544 371 03 17',
      phoneLink: 'tel:+905443710317',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-gold" />
            <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <div className="w-12 h-px bg-gold" />
          </div>
        </div>

        <h2 className="text-center font-[family-name:var(--font-alex)] text-4xl sm:text-5xl text-primary mb-2">
          İletişim
        </h2>
        <p className="text-center text-text-light mb-12 text-sm">
          Sorularınız için bize ulaşabilirsiniz
        </p>

        <div className="flex justify-center">
          {contacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.phoneLink}
              className="glass rounded-2xl p-8 border border-border shadow-lg flex items-center gap-5 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 w-full max-w-md"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/15 to-gold/10 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-text text-lg">{contact.name}</h3>
                <p className="text-text-light">{contact.phone}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

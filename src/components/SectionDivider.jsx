export default function SectionDivider() {
  return (
    <div className="flex justify-center py-2 bg-cream">
      <svg className="w-48 h-8 text-gold/30" viewBox="0 0 200 30" fill="none">
        <path d="M0 15 Q50 0 100 15 Q150 30 200 15" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="100" cy="15" r="3" fill="currentColor" />
        <circle cx="80" cy="12" r="1.5" fill="currentColor" />
        <circle cx="120" cy="18" r="1.5" fill="currentColor" />
      </svg>
    </div>
  )
}

import { useState, useEffect } from 'react'

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date()
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { label: 'Gün', value: timeLeft.days },
    { label: 'Saat', value: timeLeft.hours },
    { label: 'Dakika', value: timeLeft.minutes },
    { label: 'Saniye', value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="glass rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-border shadow-lg">
            <span className="text-2xl sm:text-3xl font-semibold text-primary font-[family-name:var(--font-inter)]">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs sm:text-sm mt-2 text-text-light font-medium">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}

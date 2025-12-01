import { useState, useEffect } from 'react'

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    progress: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const countDate = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const gap = countDate - now

      const second = 1000
      const minute = second * 60
      const hour = minute * 60
      const day = hour * 24

      const days = Math.floor(gap / day)
      const hours = Math.floor((gap % day) / hour)
      const minutes = Math.floor((gap % hour) / minute)
      const seconds = Math.floor((gap % minute) / second)

      // Calcular progreso (de Abril 2025 a Abril 2026)
      const startDate = new Date("April 1, 2025 00:00:00").getTime()
      const totalDuration = countDate - startDate
      const elapsed = now - startDate
      let progress = (elapsed / totalDuration) * 100
      progress = Math.min(100, Math.max(0, progress))

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        progress: Math.round(progress)
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

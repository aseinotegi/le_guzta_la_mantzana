import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

const TimeBox = ({ value, label, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "relative overflow-hidden rounded-xl p-4",
        "bg-black/90 backdrop-blur-sm",
        "border-2 border-blood-800/60",
        "shadow-[0_0_25px_rgba(139,0,0,0.5),inset_0_0_15px_rgba(0,0,0,0.8),0_0_50px_rgba(255,0,0,0.2)]",
        "transition-all duration-300",
        "hover:border-blood-600 hover:shadow-[0_0_50px_rgba(255,0,0,0.8),inset_0_0_25px_rgba(0,0,0,0.9),0_0_100px_rgba(255,0,0,0.4)]",
        "group"
      )}
    >
      {/* Efecto de brillo al hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-blood-500/20 to-transparent" />

      <div className="relative z-10">
        <motion.span
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "block text-3xl md:text-4xl font-black text-blood-500",
            "text-shadow-glow",
            "leading-none"
          )}
        >
          {value}
        </motion.span>
        <p className="mt-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-blood-700 text-shadow-red">
          {label}
        </p>
      </div>
    </motion.div>
  )
}

export function Countdown({ days, hours, minutes, seconds }) {
  const timeUnits = [
    { value: days, label: 'Días' },
    { value: hours, label: 'Horas' },
    { value: minutes, label: 'Minutos' },
    { value: seconds, label: 'Segundos' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl mx-auto">
      {timeUnits.map((unit, index) => (
        <TimeBox
          key={unit.label}
          value={unit.value}
          label={unit.label}
          index={index}
        />
      ))}
    </div>
  )
}

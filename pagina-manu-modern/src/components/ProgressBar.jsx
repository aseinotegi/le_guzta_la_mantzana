import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Home } from 'lucide-react'

const phrases = [
  "Abril",
  "Próximamente",
  "Se viene",
  "Desocupando",
  "Jejeje"
]

export function ProgressBar({ progress }) {
  const [loadingText, setLoadingText] = useState(phrases[0])
  const controls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * phrases.length)
      setLoadingText(phrases[randomIndex])
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    controls.start({ width: `${progress}%` })
  }, [progress, controls])

  return (
    <div className="w-full max-w-4xl mx-auto flex items-center gap-3 md:gap-4">
      {/* Cara feliz (inicio) */}
      <motion.img
        src="/cara_feliz.png"
        alt="Cara Feliz"
        className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full"
        style={{
          filter: 'sepia(50%) hue-rotate(60deg) saturate(1.5) brightness(1.2) drop-shadow(0 0 15px rgba(34, 197, 94, 0.6))'
        }}
        animate={{
          y: [0, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Barra de progreso */}
      <div className="flex-1 relative h-8 md:h-10 bg-black/90 border-2 border-blood-800/60 rounded-xl overflow-hidden shadow-[inset_0_3px_10px_rgba(0,0,0,0.8),0_0_25px_rgba(139,0,0,0.4)]">
        {/* Relleno de progreso */}
        <motion.div
          initial={{ width: '0%' }}
          animate={controls}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blood-500 via-blood-700 to-blood-900 relative overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.7),inset_0_2px_0_rgba(255,255,255,0.2)]"
        >
          {/* Efecto de brillo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ width: '50%' }}
          />
        </motion.div>

        {/* Texto de carga y porcentaje */}
        <div className="absolute inset-0 flex items-center justify-between px-3 md:px-4 z-10 pointer-events-none">
          <motion.span
            key={loadingText}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm font-bold text-yellow-600 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: 'monospace' }}
          >
            {loadingText}
          </motion.span>
          <span className="text-xs md:text-sm font-bold text-yellow-600 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'monospace' }}>
            {progress}%
          </span>
        </div>

        {/* Icono de casa móvil */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-blood-500/40 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.7)] p-1 z-20"
          animate={{
            left: `calc(${progress}% - 14px)`
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <Home className="w-full h-full text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]" />
        </motion.div>
      </div>

      {/* Cara triste (final) */}
      <motion.img
        src="/cara_triste.png"
        alt="Cara Triste"
        className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full"
        style={{
          filter: 'sepia(100%) hue-rotate(320deg) saturate(2) contrast(1.3) drop-shadow(0 0 20px rgba(139, 0, 0, 0.8))'
        }}
        animate={{
          y: [0, -3, -8, -3, 0],
          scale: [1, 0.98, 0.95, 0.98, 1],
          rotate: [0, -1, 0, 1, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

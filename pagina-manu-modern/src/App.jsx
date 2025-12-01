import { useState } from 'react'
import { motion } from 'framer-motion'
import { Countdown } from './components/Countdown'
import { ProgressBar } from './components/ProgressBar'
import { SubscriptionModal } from './components/SubscriptionModal'
import { VideoBackground } from './components/VideoBackground'
import { Button } from './components/ui/button'
import { useCountdown } from './hooks/useCountdown'
import { ToastProvider } from './components/ui/toast'
import { Bell } from 'lucide-react'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const { days, hours, minutes, seconds, progress } = useCountdown("April 1, 2026 00:00:00")

  return (
    <ToastProvider>
      {/* Video de fondo */}
      <VideoBackground />

      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl space-y-8 md:space-y-12"
        >
          {/* Container principal */}
          <div className="glass-morphism box-shadow-blood rounded-3xl p-6 md:p-12 space-y-8 md:space-y-12">
            {/* Título */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center space-y-4"
            >
              {/* Icono pequeño decorativo */}
              <motion.img
                src="/background.png"
                alt="Icono"
                className="w-12 h-12 md:w-14 md:h-14 mx-auto opacity-80"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-red-400 text-shadow-glow tracking-tight">
                Adios, Manuel :)
              </h1>

              {/* Botón de suscripción */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={() => setModalOpen(true)}
                  className="mt-4 group relative overflow-hidden"
                  size="lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Bell className="w-5 h-5 group-hover:animate-pulse" />
                    Suscríbete a las noticias
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-blood-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </motion.div>

            {/* Countdown */}
            <Countdown
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />

            {/* Barra de progreso */}
            <ProgressBar progress={progress} />

            {/* Texto Bixkor */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-sm md:text-base italic text-blood-600 text-shadow-red font-medium"
            >
              A bixxxkor le gusta la mantzana
            </motion.p>
          </div>

          {/* Footer minimalista */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs md:text-sm text-red-700/50"
          >
            <p>Construido con React + Vite + Tailwind + Framer Motion</p>
          </motion.div>
        </motion.div>

        {/* Modal de suscripción */}
        <SubscriptionModal
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </ToastProvider>
  )
}

export default App

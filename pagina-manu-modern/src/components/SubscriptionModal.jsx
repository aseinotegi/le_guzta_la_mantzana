import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Bell, Mail, User, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/toast'

const subscriptionSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
})

export function SubscriptionModal({ open, onOpenChange }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscriptionSchema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)

    try {
      // Use relative path for Netlify Functions (redirects handle /api -> /.netlify/functions)
      const apiUrl = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${apiUrl}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const text = await response.text()
      let result
      
      try {
        result = JSON.parse(text)
      } catch (e) {
        console.error('La respuesta del servidor no es un JSON válido:', text)
        throw new Error('Error técnico: El servidor devolvió una respuesta inválida. Revisa la consola para más detalles.')
      }

      if (!response.ok) {
        throw new Error(result.error || 'Error al suscribirse')
      }

      addToast('¡Suscripción exitosa! Revisa tu email de confirmación.', 'success')
      reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error:', error)
      addToast(error.message || 'Error al suscribirse. Intenta de nuevo.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto mb-4 w-16 h-16 bg-blood-600/20 rounded-full flex items-center justify-center"
          >
            <Bell className="w-8 h-8 text-blood-500" />
          </motion.div>
          <DialogTitle>Suscríbete a las Noticias</DialogTitle>
          <DialogDescription>
            Recibe actualizaciones sobre lo que está por venir. No te pierdas ninguna novedad.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Campo de Nombre */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-red-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Nombre
            </label>
            <Input
              id="name"
              placeholder="Tu nombre"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400"
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          {/* Campo de Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-red-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 relative"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Suscribiendo...
                </>
              ) : (
                'Suscribirme'
              )}
            </Button>
          </div>
        </form>

        {/* Nota de privacidad */}
        <p className="text-xs text-center text-red-400/60 mt-4">
          No compartiremos tu información con terceros
        </p>
      </DialogContent>
    </Dialog>
  )
}

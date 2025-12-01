import * as React from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          {children}
        </>
      )}
    </AnimatePresence>
  )
}

const DialogContent = React.forwardRef(({ className, children, onClose, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
    animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
    exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
    transition={{ type: "spring", damping: 25, stiffness: 300 }}
    style={{
      position: 'fixed',
      left: '50%',
      top: '50%',
    }}
    className={cn(
      "z-50",
      "w-[calc(100%-2rem)] max-w-lg max-h-[90vh] overflow-y-auto",
      "p-4 md:p-6",
      "glass-morphism box-shadow-blood rounded-2xl",
      "border-2 border-blood-700/50",
      className
    )}
    {...props}
  >
    {children}
    <button
      onClick={onClose}
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-black transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 disabled:pointer-events-none"
    >
      <X className="h-5 w-5 text-red-400" />
      <span className="sr-only">Close</span>
    </button>
  </motion.div>
))
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight text-shadow-glow text-red-400",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-red-300/80", className)}
    {...props}
  />
))
DialogDescription.displayName = "DialogDescription"

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription }

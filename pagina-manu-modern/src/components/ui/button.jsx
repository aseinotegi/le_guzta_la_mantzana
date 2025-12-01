import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-blood-600 text-white hover:bg-blood-700 shadow-lg shadow-blood-900/50",
    outline: "border-2 border-blood-600 text-blood-500 hover:bg-blood-600/10",
    ghost: "hover:bg-blood-600/10 text-blood-500",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-lg",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "ring-offset-black",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }

import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border-2 border-blood-800/50 bg-black/60 px-3 py-2 text-sm text-red-300",
        "ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-red-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-600 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

import * as React from "react"

export const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium 
        text-white shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring 
        focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    />
  )
})
Button.displayName = "Button"

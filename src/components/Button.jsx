import React from "react"

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-gray-900 text-gray-50 hover:bg-gray-900/90",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900"
  }

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
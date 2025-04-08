import * as React from "react"

export function Select({ value, onChange, children, className }) {
  return (
    <select
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  )
}

export function SelectTrigger({ children }) {
  return children
}

export function SelectValue({ children }) {
  return children
}

export function SelectContent({ children }) {
  return children
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>
}

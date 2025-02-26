import * as React from "react"

import { cn } from "../lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & {
  onValueInput?: (value: string, e: React.FormEvent<HTMLInputElement>) => void
  onEnter?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void
}>(
  ({ className, type, onInput, onValueInput, onEnter, onKeyDown, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
        onInput={(e) => {
          if (onValueInput) {
            onValueInput((e.target as HTMLInputElement).value, e)
          }
          onInput?.(e)
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            const target = e.target as HTMLInputElement
            onEnter?.(target.value, e)
            e.preventDefault()
          }
          onKeyDown?.(e)
        }}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

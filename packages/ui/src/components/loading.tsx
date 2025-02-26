"use client"

import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "../lib/utils"

export interface LoadingProps extends HTMLAttributes<HTMLElement> {
  loading?: boolean
  asChild?: boolean
  children?: ReactNode
  text?: string
  maskClass?: string
  spin?: ReactNode
}

export function Spin() {
  return <div className="loader" />
}

export function Loading({ loading, asChild, children, text, maskClass, spin, ...restProps }: LoadingProps) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      {...restProps}
      className={cn("relative size-full", restProps.className)}
    >
      {children}
      {loading && (
        <div
          className={cn(
            "absolute top-0 left-0 size-full bg-white dark:bg-black text z-50 flex justify-center items-center",
            maskClass
          )}
        >
          <div className="flex flex-col items-center gap-x-1">
            {spin || <Spin />}
            {!!text && <p>{text}</p>}
          </div>
        </div>
      )}
    </Comp>
  )
}

export function FullLoading() {
  return (
    <Loading
      loading
      className="w-screen h-screen"
    />
  )
}

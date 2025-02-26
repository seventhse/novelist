import { atom } from "jotai"
import type { ReactNode } from "react"

export interface MessageTipItem {
  type?: "info" | "warn" | "error"
  message: string | ReactNode
  durations?: number
}

export const messageTipAtom = atom<MessageTipItem[]>([])

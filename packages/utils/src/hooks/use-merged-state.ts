import { useState } from "react"

export interface useMergedStateProps<T = unknown> {
  value: T
}

export function useMergedState<T>({ value }: useMergedStateProps<T>) {
  const [state, setState] = useState(value)

  return [state]
}

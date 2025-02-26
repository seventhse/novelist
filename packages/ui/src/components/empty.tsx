import type { PropsWithChildren } from "react"

export interface EmptyProps {
  isEmpty?: boolean
  text?: string
}

export function Empty(props: PropsWithChildren<EmptyProps>) {
  const { isEmpty = false, children, text = "No data available..." } = props

  if (!isEmpty) {
    return children
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-gray-500 text-sm">{text}</div>
    </div>
  )
}

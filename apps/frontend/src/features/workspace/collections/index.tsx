import { GridContainer } from "@novelist/ui"
import type { PropsWithChildren } from "react"

function Block({ children }: PropsWithChildren) {
  return <div className="w-full h-72 box-border p-3 bg-muted/50 rounded-xl shadow-sm">{children}</div>
}

export function Collections() {
  return (
    <GridContainer>
      {Array.from({ length: 20 }).map((_, inx) => (
        <Block
          key={`block-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            inx
          }`}
        />
      ))}
    </GridContainer>
  )
}

export default Collections

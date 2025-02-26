import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { cn } from "../lib/utils"

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

const ContainerBaseClass = "container w-full p-1 mx-auto gap-3"

function Container({ children, asChild, ...restProps }: PropsWithChildren<ContainerProps>) {
  const Com = asChild ? Slot : "div"
  return <Com {...restProps}>{children}</Com>
}

export function GridContainer({ children, className, ...restProps }: PropsWithChildren<ContainerProps>) {
  return (
    <Container
      className={cn("grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4", ContainerBaseClass, className)}
      {...restProps}
    >
      {children}
    </Container>
  )
}

export function ListContainer({ children, className, ...restProps }: PropsWithChildren<ContainerProps>) {
  return (
    <Container
      className={cn("flex flex-col", ContainerBaseClass, className)}
      {...restProps}
    >
      {children}
    </Container>
  )
}

import type { DraggableAttributes, DraggableSyntheticListeners } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Icon, type IconProps, cn } from "@novelist/ui"
import type React from "react"
import { createContext, useContext, useMemo } from "react"
import type { CSSProperties, PropsWithChildren } from "react"
import type { BaseItem } from "./interface"

export interface SortableItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "style" | "id">, BaseItem {}

interface ISortableItemContext {
  attributes: DraggableAttributes
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = createContext<ISortableItemContext>({
  attributes: {
    role: "",
    tabIndex: 0,
    "aria-disabled": false,
    "aria-pressed": undefined,
    "aria-roledescription": "",
    "aria-describedby": ""
  },
  listeners: undefined,
  ref() {}
})

export function SortableItem({ children, id, className, ...restProps }: PropsWithChildren<SortableItemProps>) {
  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
    id
  })
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  )

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <SortableItemContext.Provider value={context}>
      <li
        ref={setNodeRef}
        style={style}
        {...restProps}
        className={cn("list-none", className)}
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  )
}

export function DragHandle(props: Omit<IconProps, "name">) {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <button
      className="opacity-30 hover:opacity-100"
      {...attributes}
      {...listeners}
      ref={ref}
      type="button"
      title="Drag"
    >
      <Icon
        name="grip-vertical"
        size={12}
        {...props}
      />
    </button>
  )
}

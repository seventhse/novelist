import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import type { Active, DropAnimation } from "@dnd-kit/core"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Fragment, type ReactNode, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import type { BaseItem } from "./interface"

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
}

export interface SortableListProps<T extends BaseItem> {
  items: T[]
  wrapperClass?: string
  onChange?(items: T[]): void
  onChangeIndex?(indexA: number, indexB: number): void
  renderItem(item: T, index: number, isActive?: boolean): ReactNode
}

export function SortableList<T extends BaseItem>(props: SortableListProps<T>) {
  const { items, wrapperClass, onChange, onChangeIndex, renderItem } = props

  const [active, setActive] = useState<Active | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      modifiers={[restrictToWindowEdges]}
      onDragStart={({ active }) => {
        const activeIndex = items.findIndex(({ id }) => id === active.id)
        setActive(active)
        setActiveIndex(activeIndex)
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id)
          const overIndex = items.findIndex(({ id }) => id === over.id)

          onChangeIndex?.(activeIndex, overIndex)
          onChange?.(arrayMove(items, activeIndex, overIndex))
        }
        setActive(null)
        setActiveIndex(null)
      }}
      onDragCancel={() => {
        setActive(null)
        setActiveIndex(null)
      }}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <ul
          className={wrapperClass}
          role="application"
        >
          {items.map((item, index) => (
            <Fragment key={item.id}>{renderItem(item, index)}</Fragment>
          ))}
        </ul>
        {createPortal(
          <DragOverlay dropAnimation={dropAnimationConfig}>
            {activeItem ? renderItem(activeItem, activeIndex as number, true) : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  )
}

export default SortableList

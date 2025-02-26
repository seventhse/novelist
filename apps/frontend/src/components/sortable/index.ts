import { DragHandle, SortableItem } from "./sortable-item"
import { SortableList as _SortableList } from "./sortable-list"

const SortableList = _SortableList as typeof _SortableList & {
  Item: typeof SortableItem
  DragHandle: typeof DragHandle
}

SortableList.Item = SortableItem
SortableList.DragHandle = DragHandle

export { SortableItem, DragHandle, SortableList }

export default SortableList

import type { ExtendField } from "@novelist/models"
import { Icon } from "@novelist/ui"
import { type MouseEvent, useMemo } from "react"
import { DynamicFormField, SimpleFormItem, convertConfigFieldToDynamicFormField } from "~/components/form"
import type { IDynamicFormField } from "~/components/form"
import { SortableList } from "~/components/sortable"

interface SortableFieldItemProps {
  name: string
  item: IDynamicFormField
  onRemove?: (e: MouseEvent) => void
}

function SortableFieldItem({ item, name, onRemove }: SortableFieldItemProps) {
  return (
    <SortableList.Item
      id={item.id}
      className="relative p-1 dark:shadow-neutral-200"
    >
      <SimpleFormItem
        name={name}
        label={item.label}
        description={item.description}
      >
        <DynamicFormField {...item.componentProps} />
      </SimpleFormItem>
      <div className="absolute right-1 top-3 flex items-center justify-end gap-x-3">
        {!item.fixed && <SortableList.DragHandle />}
        {!!item.closeable && (
          <span
            title="Remove Field"
            className="cursor-pointer"
            onClick={onRemove}
          >
            <Icon
              name="circle-x"
              size={12}
              className="opacity-30 hover:opacity-100"
            />
          </span>
        )}
      </div>
    </SortableList.Item>
  )
}

export interface DynamicSortableFieldsProps {
  fieldName?: string
  fields: ExtendField[]
  onSwap: (indexA: number, indexB: number) => void
  onRemove: (index: number) => void
}

export function DynamicSortableExtendFields({
  fieldName = "extendField",
  fields,
  onSwap,
  onRemove
}: DynamicSortableFieldsProps) {
  const dynamicFormFields = useMemo(() => {
    return convertConfigFieldToDynamicFormField(fields)
  }, [fields])

  return (
    <SortableList
      items={dynamicFormFields}
      wrapperClass="flex-1 flex flex-col gap-y-3"
      onChangeIndex={onSwap}
      renderItem={(item, index) => {
        const name = `${fieldName}.${index}.fieldValue` as const
        return (
          <SortableFieldItem
            name={name}
            item={item}
            onRemove={() => onRemove(index)}
          />
        )
      }}
    />
  )
}

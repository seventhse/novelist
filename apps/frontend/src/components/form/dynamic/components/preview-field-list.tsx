import type { ExtendField } from "@novelist/models"
import { IconButton, cn } from "@novelist/ui"
import { memo } from "react"
import { DynamicFormField, SimpleFormItem } from "../.."
import { convertSingleConfigFieldToDynamicFormField } from "../utils"

export interface PreviewFieldProps {
  name: string
  values: ExtendField
  isActive?: boolean
  onRemove?: () => void
  onClick?: () => void
}

export const PreviewField = memo(({ name, values, isActive, onClick, onRemove }: PreviewFieldProps) => {
  const dynamicFormFieldState = convertSingleConfigFieldToDynamicFormField(values)

  return (
    <li
      className={cn(
        "shadow-xl p-3 rounded-xl bg-background cursor-pointer border-2 border-transparent relative",
        isActive && "border-primary"
      )}
      onClick={onClick}
    >
      <SimpleFormItem
        label={dynamicFormFieldState.label}
        name={name}
      >
        <DynamicFormField {...dynamicFormFieldState.componentProps} />
      </SimpleFormItem>
      {
        <IconButton
          className="rounded-full absolute top-3 right-3 size-6 hover:text-primary"
          variant={"outline"}
          size={"icon"}
          iconName="x"
          type="button"
          title="Remove field"
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
        />
      }
    </li>
  )
})

export interface PreviewFieldListProps {
  fields: ExtendField[]
  name: (field: ExtendField, index: number) => string
  activeIndex: number
  onActive: (index: number) => void
  onRemove: (index: number) => void
  onAdd: () => void
}

export function PreviewFieldList({ fields, name, activeIndex, onActive, onRemove, onAdd }: PreviewFieldListProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-sidebar overflow-hidden py-3">
      <ul className="w-[320px] h-[400px] rounded-xl overflow-y-auto space-y-3 pr-2">
        {fields.map((item, index) => {
          return (
            <PreviewField
              key={item.fieldId}
              name={name(item, index)}
              values={item}
              isActive={index === activeIndex}
              onClick={() => {
                onActive(index)
              }}
              onRemove={() => {
                onRemove(index)
              }}
            />
          )
        })}
        <li
          className="text-center"
          title="Add field"
        >
          <IconButton
            size={"icon"}
            iconName="plus"
            type="button"
            icon={{ size: 12 }}
            onClick={() => {
              onAdd()
            }}
          />
        </li>
      </ul>
    </div>
  )
}

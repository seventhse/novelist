import { SimpleFormItem } from "../simple-field/simple-form-item"
import { DynamicFormField } from "./dynamic-form-field"
import type { IDynamicFormField } from "./utils"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export interface DynamicFormFieldsProps<T extends Record<string, any>> {
  fields: IDynamicFormField<T>[]
  name: (field: IDynamicFormField<T>, index: number) => string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function DynamicFormFields<T extends Record<string, any>>({ fields, name }: DynamicFormFieldsProps<T>) {
  return fields.map((field, index) => {
    return (
      <SimpleFormItem
        key={field.id}
        label={field.label}
        name={name(field, index)}
      >
        <DynamicFormField {...field.componentProps} />
      </SimpleFormItem>
    )
  })
}

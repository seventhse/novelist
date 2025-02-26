import type { ExtendField } from "@novelist/models"
import { safeArray } from "@novelist/utils"
import type { Arrayable } from "@novelist/utils"
import { nanoid } from "nanoid"

import type { SimpleFormItemProps } from "../simple-field"
import type { DynamicFormColumn } from "./dynamic-form-field"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type IDynamicFormField<T extends Record<string, any> = Record<string, any>> = {
  id: string
  closeable?: boolean
  fixed?: boolean
  value?: unknown
  show?: (values: T) => boolean
  fieldValue?: string
  componentProps: DynamicFormColumn
} & SimpleFormItemProps

export function newExtendFieldItem(): ExtendField {
  return {
    fieldId: `field-${nanoid()}`,
    fieldType: "input",
    fieldLabel: "New Field",
    fieldPlaceholder: "",
    fieldDefaultValue: "",
    fieldOptions: [],
    fieldValue: ""
  }
}

export function convertSingleConfigFieldToDynamicFormField(item: ExtendField): IDynamicFormField {
  const baseProps = {
    id: item.fieldId ?? `field-${nanoid()}`,
    name: `${item.fieldType}-${nanoid()}`,
    label: item.fieldLabel,
    fieldValue: item.fieldDefaultValue,
    closeable: true
  }

  if (item.fieldType === "select") {
    return {
      ...baseProps,
      componentProps: {
        type: "select",
        placeholder: item.fieldPlaceholder,
        options: item.fieldOptions.map((opt) => ({ label: opt, value: opt }))
      }
    }
  }

  if (item.fieldType === "option-create") {
    return {
      ...baseProps,
      componentProps: {
        type: "option-create",
        placeholder: item.fieldPlaceholder,
        value: item.fieldOptions
      }
    }
  }

  return {
    ...baseProps,
    componentProps: {
      type: item.fieldType,
      placeholder: item.fieldPlaceholder
    }
  }
}

export function convertConfigFieldToDynamicFormField(data: Arrayable<ExtendField>): IDynamicFormField[] {
  return safeArray(data).map(convertSingleConfigFieldToDynamicFormField)
}

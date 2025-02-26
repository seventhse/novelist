import type { ExtendField } from "@novelist/models"
import type { Option } from "../simple-field"
import type { IDynamicFormField } from "./utils"

export const DynamicFormFieldTypeOptions = [
  {
    label: "Input",
    value: "input"
  },
  {
    label: "Textarea",
    value: "textarea"
  },
  {
    label: "Select",
    value: "select"
  },
  {
    label: "Upload",
    value: "upload"
  },
  {
    label: "Select Group",
    value: "select-group",
    hidden: true
  },
  {
    label: "Option Create",
    value: "option-create",
    hidden: true
  }
] as const

export const DynamicFormFieldTypeArr = [...DynamicFormFieldTypeOptions.map((item) => item.value)] as const
export type DynamicFormFieldType = (typeof DynamicFormFieldTypeArr)[number]

export const FIELD_TYPE_OPTIONS = DynamicFormFieldTypeOptions.filter(
  (item) => !("hidden" in item)
) as unknown as Option[]

export const CONFIG_FIELDS: IDynamicFormField<ExtendField>[] = [
  {
    id: "fieldType",
    name: "fieldType",
    label: "Field Type",
    componentProps: {
      type: "select",
      options: FIELD_TYPE_OPTIONS,
      placeholder: "Please select your field type..."
    }
  },
  {
    id: "fieldLabel",
    name: "fieldLabel",
    label: "Field Label",
    componentProps: {
      type: "input",
      placeholder: "Please input your field label..."
    }
  },
  {
    id: "fieldPlaceholder",
    name: "fieldPlaceholder",
    label: "Field Placeholder",
    componentProps: {
      type: "input",
      placeholder: "Please input your field placeholder..."
    }
  },
  {
    id: "fieldOptions",
    name: "fieldOptions",
    label: "Field Options",
    show(values) {
      return ["select", "select-group"].includes(values?.fieldType)
    },
    componentProps: {
      type: "option-create",
      className: "max-h-[142px]",
      placeholder: "Please input your option desc and enter create..."
    }
  }
]

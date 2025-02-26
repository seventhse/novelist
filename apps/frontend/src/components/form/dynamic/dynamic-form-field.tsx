import { Input, Textarea } from "@novelist/ui"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import type { ControllerRenderProps } from "react-hook-form"
import { CustomOptionCreate, type CustomOptionCreateProps } from "../custom/custom-option-create"
import { SimpleSelect, SimpleSelectGroup } from "../simple-field/simple-select"
import type { SimpleSelectGroupProps, SimpleSelectProps } from "../simple-field/simple-select"
import { SimpleUpload, type SimpleUploadProps } from "../simple-field/simple-upload"
import type { DynamicFormFieldType } from "./constant"

type ControllerProps = Pick<ControllerRenderProps, "onChange" | "onBlur" | "value" | "name" | "ref">

interface BaseFieldProps extends Partial<ControllerProps> {}

type ComponentPropsMap = {
  input: ComponentPropsWithoutRef<typeof Input>
  textarea: ComponentPropsWithoutRef<typeof Textarea>
  select: SimpleSelectProps
  upload: SimpleUploadProps
  "select-group": SimpleSelectGroupProps
  "option-create": CustomOptionCreateProps
}

type FieldTypeIdentifier<T extends DynamicFormFieldType> = {
  type: T
  fieldId?: string
}

export type FieldPropsMap = {
  [K in DynamicFormFieldType]: ComponentPropsMap[K] & BaseFieldProps & FieldTypeIdentifier<K>
}

export type DynamicFormColumn = {
  [K in DynamicFormFieldType]: FieldPropsMap[K]
}[DynamicFormFieldType]

export function isFieldType<T extends DynamicFormFieldType>(
  props: DynamicFormColumn,
  type: T
): props is FieldPropsMap[T] {
  return props.type === type
}

type FieldComponents = {
  [K in DynamicFormFieldType]: (props: Omit<FieldPropsMap[K], "type">) => ReactNode
}

const fieldComponents: FieldComponents = {
  input: (props) => <Input {...props} />,
  textarea: (props) => <Textarea {...props} />,
  upload: (props) => <SimpleUpload {...props} />,
  select: (props) => (
    <SimpleSelect
      {...(props as unknown as SimpleSelectProps)}
      onValueChange={props?.onChange}
      defaultValue={props?.value}
    />
  ),
  "select-group": (props) => (
    <SimpleSelectGroup
      {...props}
      onValueChange={props.onChange}
      defaultValue={props.value}
    />
  ),
  "option-create": (props) => <CustomOptionCreate {...props} />
} as const

/**
 * @example base use
 * <DynamicFormField type="select" options={[{label: 'one',value: 'one'}]}>
 * @example array loop
 * const column: DynamicFormColumn[] = [
 *   {
 *    type: 'select',
 *    options: [
 *      {label: "one",value: "one"}
 *    ],
 *    placeholder: 'Select'
 *   }
 * ]
 * @param props {DynamicFormFieldProps}
 * @returns node {ReactNode}
 */
export function DynamicFormField<T extends DynamicFormFieldType>(props: FieldPropsMap[T]) {
  const { type, ...restProps } = props

  const Component = fieldComponents[type] as FieldComponents[T]

  if (!Component) {
    console.error(`No component found for field type: ${type}`)
    return null
  }

  return Component(restProps)
}

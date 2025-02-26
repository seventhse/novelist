import type { ExtendField } from "@novelist/models"
import { Form, IconButton } from "@novelist/ui"
import type { ReactNode } from "react"
import { PreviewFieldList } from "./components/preview-field-list"
import { DynamicFormFields } from "./dynamic-form-fields"
import { useDynamicFieldCreate } from "./hooks/use-dynamic-field-create"

export interface DynamicFormFieldCreateState {
  fieldList: ExtendField[]
  previewFieldList: Record<string, string>[]
}

export interface DynamicFormFieldCreateProps {
  buttonNode?: ReactNode
  onSubmit?: (values: ExtendField[]) => void
}

export function DynamicFormFieldCreate({ buttonNode, onSubmit }: DynamicFormFieldCreateProps) {
  const { form, fields, configFields, previewFieldIndex, setPreviewFieldIndex, handleAddField, handleRemoveField } =
    useDynamicFieldCreate()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          onSubmit?.(values.fieldList)
        })}
      >
        <section className="flex gap-x-3 max-h-[468px] overflow-hidden">
          <PreviewFieldList
            fields={fields}
            name={(_, index) => `fieldList.${index}.fieldValue`}
            activeIndex={previewFieldIndex}
            onActive={setPreviewFieldIndex}
            onRemove={handleRemoveField}
            onAdd={handleAddField}
          />
          <div className="space-y-1 flex-1 px-3 h-[400px]">
            {fields.length >= 1 ? (
              <DynamicFormFields
                key={previewFieldIndex}
                fields={configFields}
                name={(field) => `fieldList.${previewFieldIndex}.${field.name}`}
              />
            ) : (
              <div className="size-full flex items-center justify-center text-muted-foreground">
                Please click plus button or Close the Dialog.
              </div>
            )}
          </div>
        </section>
        <div className="mt-3 flex items-center justify-end gap-x-3">
          {buttonNode}
          <IconButton type="submit">Create</IconButton>
        </div>
      </form>
    </Form>
  )
}

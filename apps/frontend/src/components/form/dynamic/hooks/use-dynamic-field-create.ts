import type { ExtendField } from "@novelist/models"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { CONFIG_FIELDS } from "../constant"
import { newExtendFieldItem } from "../utils"

export interface DynamicFormFieldCreateState {
  fieldList: ExtendField[]
}

export function useDynamicFieldCreate() {
  const [previewFieldIndex, setPreviewFieldIndex] = useState<number>(0)

  const form = useForm<DynamicFormFieldCreateState>({
    defaultValues: {
      fieldList: [{ ...newExtendFieldItem() }]
    }
  })

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "fieldList"
  })

  const fieldValues = form.watch(`fieldList.${previewFieldIndex}`)
  const fields = form.watch("fieldList")

  const configFields = CONFIG_FIELDS.filter((item) => {
    if (!item.show) {
      return true
    }
    return item.show(fieldValues)
  })

  const handleAddField = () => {
    append(newExtendFieldItem())
  }

  const handleRemoveField = (index: number) => {
    if (index === previewFieldIndex) {
      setPreviewFieldIndex(0)
    }
    remove(index)
  }

  return {
    form,
    previewFieldIndex,
    setPreviewFieldIndex,
    fields,
    configFields,
    handleAddField,
    handleRemoveField
  }
}

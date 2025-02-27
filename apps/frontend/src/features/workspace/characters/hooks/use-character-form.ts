import type { ExtendField } from "@novelist/models"
import { useFieldArray, useForm } from "react-hook-form"

export function useCharacterForm() {
  const form = useForm<{
    name: string
    avatar: []
    extendField: ExtendField[]
  }>({
    defaultValues: {
      name: "Undefined",
      avatar: [],
      extendField: []
    }
  })

  const fieldArray = useFieldArray({
    control: form.control,
    name: "extendField"
  })

  const watchName = form.watch("name")
  const watchFieldArray = form.watch("extendField") ?? [] // 避免 undefined

  return {
    form,
    watchName,
    fieldArray,
    fields: watchFieldArray
  }
}

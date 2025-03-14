import type { UploadError } from "@novelist/ui"
import type { DynamicFormFieldType } from "./constant"

export function uploadErrorMessageHelper(errors: UploadError[]) {
  return errors
    .map((error) => {
      switch (error.type) {
        case "minSize":
          return `File "${error.file?.name}" is too small`
        case "maxSize":
          return `File "${error.file?.name}" exceeds the limit`
        case "accept":
          return `File "${error.file?.name}" has an unsupported format`
        case "custom":
          return error.message || `File "${error.file?.name}" failed validation`
        default:
          return `File "${error.file?.name}" upload failed`
      }
    })
    .join(". ")
}

export function errorHelper(type: DynamicFormFieldType, e: unknown) {
  switch (type) {
    case "upload":
      return uploadErrorMessageHelper(e as UploadError[])
    default:
      if (e instanceof Error) {
        return e.message
      }
      return e as string
  }
}

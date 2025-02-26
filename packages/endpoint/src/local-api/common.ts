import type { BaseModel } from "@novelist/models"
import dayjs from "dayjs"

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"

export function generateCurrentDateTime() {
  return dayjs().format(DEFAULT_DATE_FORMAT)
}

export function generatorCommon(): BaseModel {
  return {
    creator: "Local",
    createdAt: generateCurrentDateTime(),
    updatedAt: generateCurrentDateTime(),
    deletedAt: null,
    syncStatus: "Local"
  }
}

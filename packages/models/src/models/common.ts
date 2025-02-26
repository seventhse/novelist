/**
 * Represents the synchronization status of the data.
 *
 * - "Local": The data is stored locally and has not been synced with the remote system.
 * - "Remote": The data has been successfully synced with the remote system.
 * - "Syncing": The data is currently being synced with the remote system.
 * - "Failed": The sync process has failed.
 *
 * @typedef {("Local" | "Remote" | "Syncing" | "Failed")} SyncStatus
 */
export type SyncStatus = "Local" | "Remote" | "Syncing" | "Failed"

/**
 * Base model for all entities that stores common information shared across models.
 * This includes metadata for tracking and managing the entity's lifecycle, as well as sync status.
 *
 * @interface BaseModel
 * @property {string} creator - The ID or name of the creator of the entity.
 * @property {string} createdAt - The timestamp when the entity was created, typically in ISO 8601 format.
 * @property {string} updatedAt - The timestamp of the last update to the entity, in ISO 8601 format.
 * @property {string | null} deletedAt - The timestamp of when the entity was deleted. If not deleted, this field is `null`.
 * @property {SyncStatus} syncStatus - The synchronization status of the entity, indicating whether the entity is synced with the remote system or is in a syncing process.
 */
export interface BaseModel {
  creator: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  syncStatus: SyncStatus
}

/**
 * Represents an extended field for custom data associated with an entity.
 *
 * @interface ExtendField
 * @property {string} fieldId - The unique identifier of the extended field.
 * @property {'Text' | 'Date' | 'Image' | 'File'} fieldType - The type of data stored in the field. Can be:
 *   - "Text": A textual value.
 *   - "Date": A date value.
 *   - "Image": A binary image file.
 *   - "File": Any binary file.
 * @property {string} fieldName - The name of the extended field (e.g., "FavoriteColor", "BirthDate").
 * @property {string | Blob} fieldValue - The value of the extended field. It can be a string (for textual data) or a `Blob` (for binary data like images or files).
 */
export interface ExtendField {
  fieldId: string
  fieldType: "input" | "textarea" | "select" | "select-group" | "option-create" // Default Text
  fieldLabel: string
  fieldPlaceholder: string
  fieldDefaultValue: string
  fieldOptions: string[]
  fieldValue?: string | Blob | ArrayBuffer
}

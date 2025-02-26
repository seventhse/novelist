export type IdxErrorType = "databaseError" | "upgradeError" | "blockedError" | "connectionError"

export class IdxError extends Error {
  public type: IdxErrorType
  public code?: string
  public details?: Error

  constructor(type: IdxErrorType, message: string, code?: string, details?: Error) {
    super(message)
    this.name = "IdxError"
    this.type = type
    this.code = code
    this.details = details

    // Capturing the stack trace (optional)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, IdxError)
    }
  }

  // Helper method to get a user-friendly error message
  public getErrorMessage(): string {
    switch (this.type) {
      case "databaseError":
        return `Database Error: ${this.message}`
      case "upgradeError":
        return `Database Upgrade Error: ${this.message}`
      case "blockedError":
        return `Database Blocked: ${this.message}`
      case "connectionError":
        return `Database Connection Error: ${this.message}`
      default:
        return `Unknown Error: ${this.message}`
    }
  }
}

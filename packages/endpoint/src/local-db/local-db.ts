import { openDB } from "idb"
import { upgrade } from "./database-manage"
import { IdxError } from "./idx-error"
import type { NovelistDB } from "./type"

export const getLocalDb = async () => {
  try {
    // Attempting to open or create the database
    const db = await openDB<NovelistDB>("novelist", 1, {
      upgrade: upgrade,
      blocked() {
        throw new IdxError(
          "blockedError",
          "The database is blocked. Please close other tabs using the database.",
          "DB_BLOCKED"
        )
      },
      terminated() {
        // Handle case when the database connection is unexpectedly terminated
        throw new IdxError("connectionError", "The database connection was terminated unexpectedly.", "DB_TERMINATED")
      }
    })

    return db
  } catch (error) {
    // Catch any error and throw a more specific IdxError with the relevant type and message
    if (error instanceof IdxError) {
      throw error // Propagate the custom error
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      throw new IdxError(
        "databaseError",
        `An error occurred while opening the database: ${error.message}`,
        "DB_OPEN_FAILED",
        error
      )
    }
  }
}

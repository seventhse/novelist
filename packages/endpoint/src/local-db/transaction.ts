import type { IDBPDatabase, IDBPTransaction } from "idb"
import type { NovelistDB, StoreNames } from "."

type TransactionCallback<T> = (tx: IDBPTransaction<NovelistDB, StoreNames[], "readwrite">) => Promise<T>

/**
 * 事务处理工具函数
 */
export async function withTransaction<T>(
  db: IDBPDatabase<NovelistDB>,
  storeNames: StoreNames[],
  callback: TransactionCallback<T>
): Promise<T> {
  const tx = db.transaction(storeNames, "readwrite")
  try {
    const result = await callback(tx)
    await tx.done // 等待事务完成
    return result
  } catch (error) {
    // 事务会自动回滚
    console.error("Transaction failed:", error)
    throw error
  }
}

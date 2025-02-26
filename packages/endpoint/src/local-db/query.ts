import type { IPagination } from "@novelist/models"
import type { IDBPDatabase } from "idb"
import type { NovelistDB, StoreNames, StoreValue } from "."

type QueryCondition<T> = Partial<{
  [K in keyof T]: T[K] | ((value: T[K]) => boolean) | { $like: string } // 模糊匹配
}>

interface QueryOptions<T> {
  where?: QueryCondition<T> // 查询条件
  sortBy?: keyof T // 排序字段必须是索引字段
  sortOrder?: "asc" | "desc" // 排序顺序
  limit?: number // 限制结果数量
  offset?: number // 跳过的结果数量
}

interface PaginationOptions<T> {
  where?: QueryCondition<T> // 查询条件
  sortBy?: keyof T // 排序字段必须是索引字段
  sortOrder?: "asc" | "desc" // 排序顺序
  pageOn?: number // 当前页码
  pageSize?: number // 每页记录数
}

/**
 * 通用查询方法（支持排序、模糊匹配、分页）
 */
export async function queryIndexedDB<T extends StoreNames>(
  db: IDBPDatabase<NovelistDB>,
  storeName: T,
  options: QueryOptions<StoreValue<T>> = {}
): Promise<StoreValue<T>[]> {
  const { where, sortBy, sortOrder = "asc", limit, offset = 0 } = options
  let results: StoreValue<T>[] = []

  const tx = db.transaction(storeName, "readonly")
  const store = tx.store

  try {
    if (sortBy && typeof sortBy === "string" && (store.indexNames as DOMStringList).contains(sortBy)) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const index = store.index(sortBy as any)

      let cursor = await index.openCursor(undefined, sortOrder === "desc" ? "prev" : "next")

      while (cursor) {
        const record = cursor.value
        if (matchesConditions(record, where)) {
          results.push(record)
        }
        cursor = await cursor.continue()
      }
    } else {
      let cursor = await store.openCursor()

      while (cursor) {
        const record = cursor.value
        if (matchesConditions(record, where)) {
          results.push(record)
        }
        cursor = await cursor.continue()
      }
    }

    if (offset || limit) {
      results = results.slice(offset, limit ? offset + limit : undefined)
    }

    return results
  } catch (error) {
    console.error("Query error:", error)
    throw error
  } finally {
    tx.done.catch(console.error)
  }
}

/**
 * 分页方法
 */
export async function paginateIndexedDB<T extends StoreNames>(
  db: IDBPDatabase<NovelistDB>,
  storeName: T,
  options: PaginationOptions<StoreValue<T>> = {}
): Promise<IPagination<StoreValue<T>>> {
  const { pageOn = 1, pageSize = 10, ...queryOptions } = options
  const offset = (pageOn - 1) * pageSize

  try {
    const allRecords = await queryIndexedDB(db, storeName, queryOptions)
    const total = allRecords.length

    const records = await queryIndexedDB(db, storeName, {
      ...queryOptions,
      limit: pageSize,
      offset
    })

    return {
      records,
      total,
      pages: Math.ceil(total / pageSize),
      pageOn,
      pageSize
    }
  } catch (error) {
    console.error("Pagination error:", error)
    throw error
  }
}

/**
 * 条件匹配逻辑
 */
function matchesConditions<T>(record: T, conditions?: QueryCondition<T>): boolean {
  if (!conditions) return true

  return Object.entries(conditions).every(([key, condition]) => {
    const value = record[key as keyof T]

    if (condition === undefined || condition === null) {
      return value === condition
    }

    if (typeof condition === "function") {
      return condition(value)
    }

    if (typeof condition === "object" && "$like" in condition) {
      if (typeof value !== "string") return false
      return value.toLowerCase().includes((condition.$like as string).toLowerCase())
    }

    return value === condition
  })
}

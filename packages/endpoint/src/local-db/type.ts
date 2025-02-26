import type {
  Character,
  CharacterAvatar,
  CharacterHistory,
  Collection,
  Realm,
  RealmHistory,
  RealmTimePoint,
  RealmTimePointCharacter,
  RealmTimeline,
  RealmTimelineHistory
} from "@novelist/models"
import type { DBSchema, IDBPDatabase } from "idb"

// 明确定义所有可能的 store 名称
export const STORE_NAMES = [
  "characters",
  "characterAvatars",
  "characterHistory",
  "collection",
  "realm",
  "realmHistory",
  "realmTimeline",
  "realmTimelineHistory",
  "realmTimePoint",
  "realmTimePointCharacter"
] as const

// 从常量数组创建联合类型
export type StoreNames = (typeof STORE_NAMES)[number]

/**
 * Database schema definition for Novelist application
 */
export interface NovelistDB extends DBSchema {
  characters: {
    value: Character
    key: string
    indexes: {
      name: string // 名称索引
      syncStatus: string // 同步状态索引
    }
  }

  characterAvatars: {
    value: CharacterAvatar
    key: string
    indexes: {
      characterId: string
      version: number
    } // 无索引
  }

  characterHistory: {
    value: CharacterHistory
    key: string
    indexes: {
      characterId: string // 角色 ID 索引
      version: number // 版本号索引
    }
  }

  collection: {
    value: Collection
    key: string
    indexes: {
      name: string // 集合名称索引
    }
  }

  realm: {
    value: Realm
    key: string
    indexes: {
      name: string // 名称索引
      syncStatus: string // 同步状态索引
    }
  }

  realmHistory: {
    value: RealmHistory
    key: string
    indexes: {
      realmId: string // 关联领域 ID 索引
      version: number // 版本号索引
    }
  }

  realmTimeline: {
    value: RealmTimeline
    key: string
    indexes: {
      realmId: string // 领域 ID 索引
      name: string // 时间线名称索引
    }
  }

  realmTimelineHistory: {
    value: RealmTimelineHistory
    key: string
    indexes: {
      timelineId: string // 时间线 ID 索引
      version: number // 版本号索引
    }
  }

  realmTimePoint: {
    value: RealmTimePoint
    key: string
    indexes: {
      timelineId: string // 时间线 ID 索引
      date: string // 日期索引
    }
  }

  realmTimePointCharacter: {
    value: RealmTimePointCharacter
    key: string
    indexes: {
      realmTimePointCharacter: string // 自定义索引
      characterId: string // 角色 ID 索引
      realmTimePointId: string // 领域时间点 ID 索引
    }
  }
}

/**
 * Type definition for the database instance
 */
export type NovelistDatabase = IDBPDatabase<NovelistDB>

/**
 * 获取指定 Store 的值类型
 */
export type StoreValue<T extends StoreNames> = NovelistDB[T]["value"]

/**
 * 获取指定 Store 的键类型
 */
export type StoreKey<T extends StoreNames> = NovelistDB[T]["key"]

/**
 * 获取指定 Store 的索引类型
 */
export type StoreIndexes<T extends StoreNames> = NovelistDB[T] extends { indexes: infer I } ? I : never

/**
 * 获取指定 Store 的索引名称类型
 */
export type StoreIndexNames<T extends StoreNames> = keyof StoreIndexes<T>

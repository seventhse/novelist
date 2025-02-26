import type { BaseModel, ExtendField } from "./common"

/**
 * 角色类型接口
 */
export interface Character extends BaseModel {
  /** 角色唯一标识符 */
  characterId: string
  /** 角色名称 */
  name: string
  /** 可选的角色描述 */
  desc?: string
  /** 可选的扩展字段数组,用于存储自定义数据 */
  extendField?: ExtendField[]
  /** 角色版本号,默认为0 */
  version?: number
}

/**
 * 角色头像接口
 */
export interface CharacterAvatar extends BaseModel {
  /** 头像唯一标识符 */
  characterAvatarId: string
  /** 角色唯一标识 */
  characterId: string
  /** 可选的头像名称 */
  name?: string
  /** 可选的头像描述 */
  desc?: string
  /** 头像图片数据,存储为Blob或字符串 */
  url: Blob | ArrayBuffer | string
  /** 头像版本号,默认为0 */
  version: number
}

/**
 * 角色历史记录接口
 */
export interface CharacterHistory {
  /** 历史记录唯一标识符 */
  historyId: string
  /** 对应角色的唯一标识符 */
  characterId: string
  /** 变更时的角色版本号 */
  version: number
  /** 变更时的角色名称 */
  name: string
  /** 变更时的角色描述 */
  desc?: string
  /** 变更时的扩展字段 */
  extendField?: ExtendField[]
  /** 修改时间戳 */
  modifiedAt: string
  /** 进行修改的用户或系统标识 */
  modifiedBy: "User" | "System"
}

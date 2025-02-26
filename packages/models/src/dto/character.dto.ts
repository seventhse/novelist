import type { ExtendField } from "@novelist/models"
import type { PaginationDto } from "./common.dto"

export interface QueryCharacterDto {
  name?: string
  desc?: string
}

export interface QueryPageCharacterDto extends QueryCharacterDto, PaginationDto {}

export interface CreateCharacterDto {
  /** 角色名称 */
  name: string
  /** 可选的角色描述 */
  desc?: string
  /** 可选的扩展字段数组 */
  extendField?: ExtendField[]
}

export interface UpdateCharacterDto {
  characterId: string
  version?: number
  /** 角色名称 */
  name?: string
  /** 可选的角色描述 */
  desc?: string
  /** 可选的扩展字段数组 */
  extendField?: ExtendField[]
  changeDesc?: string
}

export interface CreateCharacterAvatarDto {
  /** 角色唯一标识 */
  characterId: string
  /** 可选的头像名称 */
  name?: string
  /** 可选的头像描述 */
  desc?: string
  /** 头像图片数据 */
  url: Blob | string
}

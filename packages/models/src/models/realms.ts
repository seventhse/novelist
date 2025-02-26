import type { BaseModel, ExtendField } from "./common"

/** 世界设定(领域)，定义了故事或事件发生的总体世界观
 * 包含名称、描述和用于自定义的其他属性
 */
export interface Realm extends BaseModel {
  /** 世界设定的唯一标识符 */
  realmId: string
  /** 世界设定的名称(如"中土世界") */
  name: string
  /** 可选的描述,提供背景、历史或文化细节 */
  desc?: string
  /** 可选的封面图片或文件,如世界地图或艺术作品 */
  cover?: Blob | string
  /** 可选的扩展字段,用于其他自定义属性 */
  extendField?: ExtendField[]
  /** 用于跟踪更改的版本号 */
  version: number
}

/** 特定领域内的时间线(或世界线),用于跟踪不同的事件或历史分支
 * 存储时间线名称、日期和是否为主时间线等信息
 */
export interface RealmTimeline extends BaseModel {
  /** 时间线的唯一标识符 */
  timelineId: string
  /** 此时间线所属的世界设定(领域)的标识符 */
  realmId: string
  /** 时间线名称(如"平行时间线") */
  name: string
  /** 可选的时间线描述,包括其意义或关键事件 */
  desc?: string
  /** ISO 8601格式的时间线开始日期 */
  startDate?: string
  /** ISO 8601格式的时间线结束日期 */
  endDate?: string
  /** 指示这是否是世界的主时间线 */
  isMainTimeline?: boolean
  /** 可选的扩展字段 */
  extendField?: ExtendField[]
  /** 版本号 */
  version: number
}

/** 时间线内的特定时间点,发生重大事件或变化的地方
 * 包含关于事件、日期和相关角色的信息
 */
export interface RealmTimePoint extends BaseModel {
  /** 时间点的唯一标识符 */
  timePointId: string
  /** 此时间点所属的时间线标识符 */
  timelineId: string
  /** 时间点名称(如"大战") */
  name: string
  /** 可选的描述,解释此时间点的重要性 */
  desc?: string
  /** ISO 8601格式的时间点日期 */
  date: string
  /** 可选的扩展字段 */
  extendField?: ExtendField[]
  /** 版本号 */
  version: number
}

/** 角色在特定时间点的参与情况,包括其角色和其他相关细节 */
export interface RealmTimePointCharacter {
  /** 此角色参与的唯一标识符 */
  realmTimePointCharacter: string
  /** 角色参与的时间点标识符 */
  realmTimePointId: string
  /** 参与此时间点的角色标识符 */
  characterId: string
  /** 可选的描述,说明角色在此时间点的角色或行动 */
  desc?: string
  /** 可选的扩展字段 */
  extendField?: ExtendField[]
  /** 版本号 */
  version: number
}

/** 世界设定(领域)的历史变更记录,允许追踪随时间推移的修订
 * 存储所做的修改信息,包括时间戳和负责的用户
 */
export interface RealmHistory {
  /** 历史记录的唯一标识符 */
  historyId: string
  /** 相关世界设定(领域)的标识符 */
  realmId: string
  /** 变更时的版本号 */
  version: number
  /** 总结所做更改的名称或标题(如"更新文化细节") */
  name: string
  /** 可选的更改描述 */
  desc?: string
  /** 可选的扩展字段 */
  extendField?: ExtendField[]
  /** ISO 8601格式的修改时间戳 */
  modifiedAt: string
  /** 进行修改的用户标识符 */
  modifiedBy: string
}

/** 时间线的历史变更记录,追踪随时间的修改
 * 记录编辑的详细信息,包括时间戳、版本和编辑者
 */
export interface RealmTimelineHistory {
  /** 历史记录的唯一标识符 */
  historyId: string
  /** 相关时间线的标识符 */
  timelineId: string
  /** 变更时的版本号 */
  version: number
  /** 总结所做更改的名称或标题(如"更新时间线日期") */
  name: string
  /** 可选的更改描述 */
  desc?: string
  /** ISO 8601格式的更新后时间线开始日期 */
  startDate?: string
  /** ISO 8601格式的更新后时间线结束日期 */
  endDate?: string
  /** 可选的扩展字段 */
  extendField?: ExtendField[]
  /** ISO 8601格式的修改时间戳 */
  modifiedAt: string
  /** 进行修改的用户标识符 */
  modifiedBy: string
}

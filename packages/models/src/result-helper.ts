import type { IPageResult, IPagination, IResult } from "./type"

function privateResult<T>(code: number, data?: T, message?: string): IResult<T> {
  return {
    code,
    message,
    data
  }
}

// 统一的响应结构
export const Response = {
  success<T>(data?: T, message = "操作成功"): IResult<T> {
    return privateResult<T>(200, data, message)
  },

  created<T>(data?: T, message = "创建成功"): IResult<T> {
    return privateResult<T>(201, data, message)
  },

  businessError<T>(message: string, data?: T): IResult<T> {
    return privateResult<T>(400, data, message)
  },

  notFound<T>(message: string, data?: T): IResult<T> {
    return privateResult<T>(404, data, message)
  },

  unauthorized<T>(message: string, data?: T): IResult<T> {
    return privateResult<T>(401, data, message)
  },

  forbidden<T>(message: string, data?: T): IResult<T> {
    return privateResult<T>(403, data, message)
  },

  validationError<T>(message: string, data?: T): IResult<T> {
    return privateResult<T>(422, data, message)
  },

  error<T>(message: string, data?: T): IResult<T> {
    return privateResult<T>(500, data, message)
  },

  // 分页响应
  page<T>(page: IPagination<T>): IPageResult<T> {
    return {
      code: 200,
      message: "",
      data: page
    }
  }
}

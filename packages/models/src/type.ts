export interface IResult<T> {
  code: number
  message?: string
  data?: T
}

export type IPagination<T> = {
  total: number
  pages: number
  pageOn: number
  pageSize: number
  records: T[]
}

export type IPageResult<T> = IResult<IPagination<T>>

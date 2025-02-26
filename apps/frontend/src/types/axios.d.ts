import "axios"

declare module "axios" {
  // 扩展 AxiosRequestConfig 类型
  interface AxiosRequestConfig {
    defaultValue?: unknown
  }
}

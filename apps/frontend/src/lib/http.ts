import { HttpClient } from "@novelist/utils"
import type { AxiosRequestConfig } from "axios"

export interface ExtendedRequestConfig extends AxiosRequestConfig {
  defaultValue?: unknown
}

export const http = HttpClient.getInstance(
  {
    baseURL: "/",
    timeout: 1000 * 10,
    withCredentials: true
  },
  {
    request(config) {
      return config
    },
    response(response) {
      if (response.status !== 200) {
      }

      return response.data || response.config.defaultValue || null
    }
  }
)

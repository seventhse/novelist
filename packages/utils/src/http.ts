import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from "axios"
import axios from "axios"

export type HttpClientOptions = CreateAxiosDefaults

export type Interceptors = {
  request?: (config: InternalAxiosRequestConfig) => Awaited<InternalAxiosRequestConfig>
  requestError?: (error: AxiosError) => unknown
  response?: (response: AxiosResponse) => Awaited<AxiosResponse>
  responseError?: (error: AxiosError) => unknown
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type MethodData<D = any> = AxiosRequestConfig<D>["data"]
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type MethodConfig<C = any> = Omit<AxiosRequestConfig<C>, "url" | "method" | "params">

const defaultAxiosConfig: CreateAxiosDefaults = {
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
}

export class HttpClient {
  private static instance: HttpClient
  #client: AxiosInstance

  public static getInstance(config?: HttpClientOptions, interceptors?: Interceptors): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(config, interceptors)
    }
    return HttpClient.instance
  }

  constructor(axiosOptions: HttpClientOptions = {}, interceptors?: Interceptors) {
    const client = axios.create({
      ...defaultAxiosConfig,
      ...axiosOptions
    })

    if (interceptors?.request) {
      client.interceptors.request.use(interceptors.request, interceptors.requestError)
    }
    if (interceptors?.response) {
      client.interceptors.response.use(interceptors.response, interceptors.responseError)
    }

    this.#client = client
  }

  async request<R = unknown>(config: AxiosRequestConfig): Promise<R> {
    const res = await this.#client.request(config)
    return res as R
  }

  public get<R = unknown>(url: string, params?: unknown, config?: MethodConfig): Promise<R> {
    return this.request<R>({
      method: "get",
      url,
      params,
      ...config
    })
  }

  public post<R = unknown>(url: string, data?: MethodData, config?: MethodConfig): Promise<R> {
    return this.request<R>({
      method: "post",
      url,
      data,
      ...config
    })
  }

  public put<R = unknown>(url: string, data?: MethodData, config?: MethodConfig): Promise<R> {
    return this.request<R>({
      method: "put",
      url,
      data,
      ...config
    })
  }

  public delete<R = unknown>(url: string, data?: MethodData, config?: MethodConfig): Promise<R> {
    return this.request<R>({
      method: "delete",
      url,
      data,
      ...config
    })
  }

  public patch<R = unknown>(url: string, data?: MethodData, config?: MethodConfig): Promise<R> {
    return this.request<R>({
      method: "patch",
      url,
      data,
      ...config
    })
  }

  get client() {
    return this.#client
  }
}

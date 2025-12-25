export type ApiMeta = Record<string, any>

export interface ApiResponse<TData = unknown, TMeta = ApiMeta> {
  message: string
  data: TData
  meta?: TMeta // opsional
  statusCode: number
}
import type { ApiResponse, ApiMeta } from '~/types/api'

// kalau user terlanjur passing ApiResponse<...>, kita unwrap jadi inner data-nya
type UnwrapData<T> = T extends ApiResponse<infer D, any> ? D : T
type UnwrapMeta<T, Fallback> = T extends ApiResponse<any, infer M> ? M : Fallback

export function useApiData<T = unknown, TMeta = ApiMeta>(
  url: string,
  options: Parameters<typeof useApi<any, any>>[1] = {}
) {
  type DataT = UnwrapData<T>
  type MetaT = UnwrapMeta<T, TMeta>

  const { data: res, pending, error, refresh, status } = useApi<DataT, MetaT>(
    url,
    options as any
  )

  const data = computed<DataT | null>(() => (res.value?.data ?? null) as DataT | null)
  const meta = computed<MetaT | undefined>(() => res.value?.meta as MetaT | undefined)
  const message = computed(() => res.value?.message ?? '')
  const statusCode = computed(() => res.value?.statusCode ?? 0)

  return { data, meta, message, statusCode, pending, error, refresh, status, res }
}

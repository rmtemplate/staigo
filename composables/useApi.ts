// ~/composables/useApi.ts
import type { ApiResponse, ApiMeta } from '~/types/api'

// helper: panggil hook yang bisa function / array
async function runHook<TCtx>(
  hook:
    | ((ctx: TCtx) => any)
    | Array<(ctx: TCtx) => any>
    | undefined,
  ctx: TCtx
) {
  if (!hook) return
  if (Array.isArray(hook)) {
    for (const h of hook) {
      await h(ctx)
    }
  } else {
    await hook(ctx)
  }
}

type UseApiOptions<T> = Parameters<typeof useFetch<T>>[1] & {
  auth?: boolean
  tokenCookieKey?: string
  authScheme?: string
}

export function useApi<TData = unknown, TMeta = ApiMeta>(
  url: string,
  options: UseApiOptions<ApiResponse<TData, TMeta>> = {}
) {
  const config = useRuntimeConfig()

  const {
    auth = true,
    tokenCookieKey = 'access_token',
    authScheme = 'Bearer',
    ...fetchOptions
  } = options

  // simpan hook user (bisa function/array)
  const userOnRequest = fetchOptions.onRequest
  const userOnResponseError = fetchOptions.onResponseError

  const token = useCookie<string | null>(tokenCookieKey)

  return useFetch<ApiResponse<TData, TMeta>>(url, {
    baseURL: config.public.apiBase,
    ...fetchOptions,

    // override hook dengan versi kita + tetap panggil hook user
    async onRequest(ctx) {
      const headers = new Headers((ctx.options.headers as HeadersInit) ?? {})

      if (auth && token.value && !headers.has('Authorization')) {
        headers.set('Authorization', `${authScheme} ${token.value}`)
      }

      ctx.options.headers = headers

      await runHook(userOnRequest as any, ctx as any)
    },

    async onResponseError(ctx) {
      await runHook(userOnResponseError as any, ctx as any)
    },
  })
}

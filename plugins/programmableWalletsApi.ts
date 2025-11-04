import programmableWalletsApi from '@/lib/programmableWalletsApi'
import { getIsInternal, getIsStaging } from '@/lib/apiTarget'

export default defineNuxtPlugin(() => {
  // Only load programmable wallets in sandbox and production environments
  // Skip in smokebox and staging environments
  if (getIsInternal() || getIsStaging()) {
    return
  }

  const { $pinia } = useNuxtApp()
  const store = useMainStore($pinia)

  const instance = programmableWalletsApi.getInstance()

  instance.interceptors.request.use(
    function (config) {
      store.clearRequestData()
      store.setRequestUrl(`${config.baseURL}${config.url}`)
      store.setRequestPayload(config.data)

      if (store.walletApiKey) {
        config.headers.Authorization = `Bearer ${store.walletApiKey}`
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    function (response) {
      store.setResponse(response)
      return response
    },
    function (error) {
      return Promise.reject(error)
    },
  )

  return {
    provide: {
      programmableWalletsApi,
    },
  }
})

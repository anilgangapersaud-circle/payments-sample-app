import axios, { type AxiosInstance } from 'axios'
import { getAPIHostname } from '@/lib/apiTarget'

class ProgrammableWalletsApi {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      timeout: 60000,
    })
    this.updateBaseUrl()
  }

  getInstance(): AxiosInstance {
    return this.instance
  }

  updateBaseUrl() {
    this.instance.defaults.baseURL = getAPIHostname()
  }
}

export default new ProgrammableWalletsApi()

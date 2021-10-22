export interface ServerResponseCurrency {
  data: {[k: string]: string}
  query: {
    base_currency: string
    timestamp: number
  }
}
export interface ServerResponseCurrency {
  data: {[k: string]: number}
  query: {
    base_currency: string
    timestamp: number
  }
}
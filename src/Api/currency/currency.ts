import { config } from "../../config";
import * as Types from './currency.types'

export const latesCurrencyDataUrl = (baseCurrency: string) => `${config.apiUrl}/latest?=${config.apiKey}&base_currency=${baseCurrency}`

export const getLatestCurrencyData = async (baseCurrency: string) => {
  const response = await fetch(latesCurrencyDataUrl(baseCurrency));
  const currency: Types.ServerResponseCurrency = await response.json();
  return currency;
}
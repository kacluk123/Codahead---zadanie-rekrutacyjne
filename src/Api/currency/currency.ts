import { config } from "../../config";
import * as Types from './currency.types'

export const LATES_CURRENCY_DATA = `${config.apiUrl}/latest?=${config.apiKey}`

export const getLatestCurrencyData = async () => {
  const response = await fetch(LATES_CURRENCY_DATA);
  const currency: Types.ServerResponseCurrency = await response.json();
  return currency;
}
import { ServerResponseCurrency } from "../Api/currency/currency.types";

export interface CurrencyState {
  data: ServerResponseCurrency | null
  currentCurrency: string
  isPending: boolean
  isError: boolean
}

export enum CurrencyActions {
  Succes = 'success',
  Pending = 'pending',
  Error = 'error'
}

export type CurrencyAction =
  | { type: CurrencyActions.Error }
  | { type: CurrencyActions.Succes , results: ServerResponseCurrency }
  | { type: CurrencyActions.Pending };

export interface CurrencyContextValue {
  state: CurrencyState,
  fetchCurrencyData: () => void
}
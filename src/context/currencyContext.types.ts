import { ServerResponseCurrency } from "../api/currency/currency.types";

export interface CurrencyState {
  currencyData: ServerResponseCurrency | null
  currentCurrency: string
  isPending: boolean
  isError: boolean
}

export enum CurrencyActions {
  Succes = 'success',
  Pending = 'pending',
  Error = 'error',
  ChangeBaseCurrency = 'change-base-currency'
}

export type CurrencyAction =
  | { type: CurrencyActions.Error }
  | { type: CurrencyActions.Succes , results: ServerResponseCurrency }
  | { type: CurrencyActions.Pending }
  | { type: CurrencyActions.ChangeBaseCurrency, results: string };

export type currenciesList = {
  currencyName: string,
  value: number
}[]
export interface CurrencyContextValue {
  state: CurrencyState,
  fetchCurrencyData: () => void
  currenciesList: currenciesList
  dispatch: React.Dispatch<CurrencyAction>
}

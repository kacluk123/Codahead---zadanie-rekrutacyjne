import * as React from 'react'
import { api } from '../Api'
import { ServerResponseCurrency } from '../Api/currency/currency.types'
import { CurrencyAction, CurrencyState, CurrencyActions, CurrencyContextValue } from './currency-context.types'

function currencyReducer(state: CurrencyState, action: CurrencyAction): CurrencyState {
  switch (action.type) {
    case CurrencyActions.Succes: {
      return {
        ...state,
        data: action.results,
        isPending: true,
      }
    }
    case CurrencyActions.Pending : {
      return {
        ...state,
        isPending: true,
      }
    }
    case CurrencyActions.Error : {
      return {
        ...state,
        isPending: false,
        isError: true,
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const CurrencyContext = React.createContext<CurrencyContextValue>({} as CurrencyContextValue)

const CurrencyProvider = ({ children }: { children: React.ReactNode}) => {
  const [state, dispatch] = React.useReducer(currencyReducer, {
    data: null,
    isPending: false,
    currentCurrency: 'USD',
    isError: true,
  })
  

  const fetchCurrencyData = async () => {
    try {
      dispatch({ type: CurrencyActions.Pending })
      const data = await api.currency.getLatestCurrencyData(state.currentCurrency)
      dispatch({ type: CurrencyActions.Succes, results: data })
    } catch {
      dispatch({ type: CurrencyActions.Error })
    }
  }
  
  const value = {
    state, 
    fetchCurrencyData
  }
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

function useCurrency() {
  const context = React.useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

export {CurrencyProvider, useCurrency}
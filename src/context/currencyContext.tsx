import * as React from 'react'
import { api } from '../api'
import { ServerResponseCurrency } from '../api/currency/currency.types'
import { CurrencyAction, CurrencyState, CurrencyActions, CurrencyContextValue } from './currencyContext.types'

function currencyReducer(state: CurrencyState, action: CurrencyAction): CurrencyState {
  switch (action.type) {
    case CurrencyActions.Succes: {
      return {
        ...state,
        currencyData: action.results,
        isPending: false,
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
    case CurrencyActions.ChangeBaseCurrency : {
      return {
        ...state,
        currentCurrency: action.results
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
    currencyData: null,
    isPending: false,
    currentCurrency: 'USD',
    isError: true,
  })
  
  const fetchCurrencyData = async () => {
    try {
      dispatch({ type: CurrencyActions.Pending })
      const data = await api.currency.getLatestCurrencyData(state.currentCurrency)
      data.data[state.currentCurrency] = 1
      dispatch({ type: CurrencyActions.Succes, results: data })
    } catch {
      dispatch({ type: CurrencyActions.Error })
    }
  }

  React.useEffect(() => {
    fetchCurrencyData()
  }, [state.currentCurrency])

  const currenciesList = state?.currencyData ? Object.entries(state.currencyData.data).map(([currencyName, value]) => ({
    currencyName,
    value
  })) : []
  
  const value = {
    state, 
    fetchCurrencyData,
    currenciesList,
    dispatch
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

export {CurrencyProvider, useCurrency, CurrencyContext}
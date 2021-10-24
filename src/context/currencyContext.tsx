import * as React from 'react'
import { api } from '../api'
import { ServerResponseCurrency } from '../api/currency/currency.types'
import { ErrorComponent } from '../components/ErrorComponent'
import { currencyMock } from '../testUtils/currencyMock'
import { CurrencyAction, CurrencyState, CurrencyActions, CurrencyContextValue } from './currencyContext.types'

export const createArrayFromCurrencyObject = (data: {[k: string]: number}) => Object.entries(data).map(([currencyName, value]) => ({
  currencyName,
  value
}))

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
      localStorage.setItem('baseCurrency', action.results);
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
    currentCurrency: localStorage.getItem('baseCurrency') || 'USD',
    isError: false,
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

  const currenciesList = state?.currencyData ? createArrayFromCurrencyObject(state?.currencyData.data) : []
  
  const value = {
    state, 
    fetchCurrencyData,
    currenciesList,
    dispatch
  }

  const getContent = () => {
    if (state.isError) {
      return <ErrorComponent />
    }
    return children
  }
  
  return (
    <CurrencyContext.Provider value={value}>
      {getContent()}
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
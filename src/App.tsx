import * as React from 'react'

import { Navigation } from './components/Navigation'
import { useCurrency } from './context/currencyContext'
import { MainPagesRouting } from './routing/mainPagesRouting'

export const App = () => {
  const { fetchCurrencyData } = useCurrency()

  React.useEffect(() => {
    fetchCurrencyData()
  }, [])

  return (
    <div>
      <Navigation />
      <MainPagesRouting />
    </div>
  )
}
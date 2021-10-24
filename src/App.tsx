import * as React from 'react'

import * as Styled from './App.styles'
import { Navigation } from './components/Navigation'
import { useCurrency } from './context/currencyContext'
import { MainPagesRouting } from './routing/mainPagesRouting'
import { Spin } from 'antd'

export const App = () => {
  return (
    <Styled.App>
      <Navigation />
      <MainPagesRouting />
    </Styled.App>
  )
}
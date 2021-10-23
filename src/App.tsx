import * as React from 'react'

import * as Styled from './App.styles'
import { Navigation } from './components/Navigation'
import { useCurrency } from './context/currencyContext'
import { MainPagesRouting } from './routing/mainPagesRouting'
import { Spin } from 'antd'

export const App = () => {
  const { state: { isPending } } = useCurrency()

  return (
    <Styled.App>
      <Navigation />
      {isPending ? (
        <Styled.SpinnerContainer data-testid='spinner'>
          <Spin size="large" />
        </Styled.SpinnerContainer>
      ) : <MainPagesRouting />}
    </Styled.App>
  )
}
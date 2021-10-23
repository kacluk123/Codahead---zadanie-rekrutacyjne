import styled from 'styled-components'

export const App = styled.div.attrs({
  className: 'App'
})`
  display: grid;
  height: 100vh;
  grid-template-rows: max-content 1fr;
`

export const SpinnerContainer = styled.div.attrs({
  className: 'SpinnerContainer'
})`
  display: flex;
  justify-content: center;
  align-items: center;
`
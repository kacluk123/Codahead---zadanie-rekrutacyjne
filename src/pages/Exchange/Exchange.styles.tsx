import styled from 'styled-components'

export const Exchange = styled.div.attrs({
  className: 'Exchange'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const ExchangeFormContainer = styled.div.attrs({
  className: 'ExchangeFormContainer'
})`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  @media (min-width: 991px) {
    flex-direction: row;
  }
`

export const ExchangeText = styled.div.attrs({
  className: 'ExchangeText'
})`
  font-weight: 400;
  font-size: 18px;
`

export const ExchangeResult = styled.div.attrs({
  className: 'ExchangeResult'
})`
  font-weight: bold;
  font-size: 24px;
`
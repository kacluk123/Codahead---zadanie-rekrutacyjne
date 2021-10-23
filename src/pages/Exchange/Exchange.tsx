import * as React from 'react'
import { Form, Select, InputNumber, Card } from 'antd'

import { useCurrency } from '../../context/currencyContext'
import * as Styled from './Exchange.styles'

const { Option } = Select

const calculateCurrency = (from: number, to: number, amount: number) => {
  return ((1 / from) / (1 / to) * amount).toFixed(2)
}

const Exchange = () => {
  const { currenciesList, state: { currentCurrency, currencyData }} = useCurrency()

  const [from, setFrom] = React.useState<string>(currentCurrency)
  const [to, setTo] = React.useState<string>('EUR')
  const [amount, setAmount] = React.useState<number>()

  const fromAmount = currencyData?.data[from]
  const toAmount = currencyData?.data[to]

  return (
    <Styled.Exchange>
      <Card>
        <Styled.ExchangeFormContainer>
          <Form.Item label='Amount'>
            <InputNumber value={amount} onChange={(value) => { setAmount(value) }}/>
          </Form.Item>
          <Form.Item label='From'>
            <Select
              showSearch
              placeholder="Select currency"
              style={{ width: 200 }}
              onChange={(value) => {
                setFrom(value)
              }}
              optionFilterProp="children"
              value={from}
            >
              {currenciesList.map(currency => <Option value={currency.currencyName}>{currency.currencyName}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label='To'>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select currency"
              onChange={(value) => {
                setTo(value)
              }}
              optionFilterProp="children"
              value={to}
            >
              {currenciesList.map(currency => <Option value={currency.currencyName}>{currency.currencyName}</Option>)}
            </Select>
          </Form.Item>
        </Styled.ExchangeFormContainer>
        {fromAmount && toAmount && amount ? (
          <>
            <Styled.ExchangeText>
              {(fromAmount * amount).toFixed(2)} {from} =
            </Styled.ExchangeText>
            <Styled.ExchangeResult>
              {calculateCurrency(fromAmount, toAmount, amount)} {to}
            </Styled.ExchangeResult>
          </>
        ) : null}
      </Card>
    </Styled.Exchange>
  )
} 

export default Exchange
import * as React from 'react'
import { Form, Select, InputNumber, Card } from 'antd'

import { useCurrency } from '../../context/currencyContext'
import * as Styled from './Exchange.styles'

const { Option } = Select

export const calculateCurrency = (from: number, to: number, amount: number) => {
  return ((1 / from) / (1 / to) * amount).toFixed(2)
}

export const Exchange = () => {
  const { currenciesList, state: { currentCurrency, currencyData }} = useCurrency()

  const [from, setFrom] = React.useState<string>(currentCurrency)
  const [to, setTo] = React.useState<string>('EUR')
  const [amount, setAmount] = React.useState<number>()

  const fromAmount = currencyData?.data[from]
  const toAmount = currencyData?.data[to]

  const currencyOptions = currenciesList.map(currency => <Option value={currency.currencyName}>{currency.currencyName}</Option>)
  return (
    <Styled.Exchange>
      <Card>
        <Styled.ExchangeFormContainer>
          <Form.Item label='Amount'>
            <InputNumber role='currency-input' placeholder="Amount" value={amount} onChange={(value) => { setAmount(value) }}/>
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
              {currencyOptions}
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
              {currencyOptions}
            </Select>
          </Form.Item>
        </Styled.ExchangeFormContainer>
        {fromAmount && toAmount && amount ? (
          <>
            <Styled.ExchangeText data-testid='elo'>
              {amount} {from} =
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
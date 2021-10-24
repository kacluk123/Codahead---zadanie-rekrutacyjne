import { Select, Form, Card, Spin } from 'antd'

import { CurrenciesList } from '../../components/CurrenciesList'
import { useCurrency } from '../../context/currencyContext'
import * as Styled from './Currencies.styles'
import { CurrencyActions } from '../../context/currencyContext.types'

const { Option } = Select;

export const Currencies = () => {
  const { currenciesList, state: { currentCurrency, isPending }, dispatch } = useCurrency()
  
  return (
    <Styled.Currencies>
      {isPending ? (
        <Spin size="large" data-testid='spinner' />
      ) : (
        <Card>
          <Form.Item label='Base currency'>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select base currency"
              onChange={(value) => {
                dispatch({ type: CurrencyActions.ChangeBaseCurrency, results: value})
              }}
              optionFilterProp="children"
              value={currentCurrency}
            >
              {currenciesList.map(currency => <Option value={currency.currencyName}>{currency.currencyName}</Option>)}
            </Select>
          </Form.Item>
          <CurrenciesList currenciesList={currenciesList} />
        </Card>
      )}
    </Styled.Currencies>
  )
} 
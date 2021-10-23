import * as React from 'react'
import { Table } from 'antd'

import { currenciesList } from '../../context/currencyContext.types'
import * as Styled from './CurrenciesList.styles'

interface ICurrenciesList {
  currenciesList: currenciesList
}

const columns = [
  {
    title: 'Currency',
    dataIndex: 'currencyName',
    key: 'currencyName',
  },
  {
    title: 'Rate',
    dataIndex: 'value',
    key: 'value',
  },
];

export const CurrenciesList = ({ currenciesList }: ICurrenciesList) => {
  return (
    <Styled.CurrenciesList>
      <Table columns={columns} dataSource={currenciesList} />
    </Styled.CurrenciesList>
  )
} 
import { setupServer } from 'msw/node'
import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw'
import { currencyMock } from '../testUtils/currencyMock';
import { CurrencyProvider, useCurrency, createArrayFromCurrencyObject } from './currencyContext';

global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

test('Should create array from currency object', () => {
  expect(Array.isArray(createArrayFromCurrencyObject(currencyMock.data))).toBeTruthy()
  expect(createArrayFromCurrencyObject(currencyMock.data).length).toBe(6)
  expect(createArrayFromCurrencyObject(currencyMock.data)[0]).toStrictEqual({
    currencyName: 'USD',
    value: 1
  })
});

export const CurrencyContextTestComponent = () => {
  const { state: { isPending, isError }, currenciesList} = useCurrency()

  if (isPending) {
    return <div>loading</div>
  } 

  return (
    <div>
      currency - {currenciesList.length}
    </div>
  )
}

const server = setupServer(
  rest.get('https://freecurrencyapi.net/api/v2/latest', (req, res, ctx) => {
    return res(ctx.json(currencyMock))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Currencies pcontext test', () => {
  test('Should make request and return proper data from api', async () => {
    const { queryByText } = render(
      <CurrencyProvider>
        <CurrencyContextTestComponent />
      </CurrencyProvider>
    );
  
    await waitFor(() => {
      expect(queryByText('loading')).not.toBeInTheDocument()
    })
  
    await waitFor(() => {
      expect(queryByText('currency - 6')).toBeInTheDocument()
    })
  })

  test('Should return error page in case of API error', async () => {
    server.use(
      rest.get('https://freecurrencyapi.net/api/v2/latest', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    const { queryByText } = render(
      <CurrencyProvider>
        <CurrencyContextTestComponent />
      </CurrencyProvider>
    );
  
    await waitFor(() => {
      expect(queryByText('loading')).not.toBeInTheDocument()
    })
  
    expect(document.querySelector('.ant-alert')).toBeInTheDocument()
  })
})
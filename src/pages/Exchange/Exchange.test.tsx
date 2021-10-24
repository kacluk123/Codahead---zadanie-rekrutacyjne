import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw'

import { calculateCurrency } from './Exchange'
import { CurrencyProvider } from '../../context/currencyContext';
import { Exchange } from './Exchange'
import { currencyMock } from '../../testUtils/currencyMock';
import { config } from '../../config';

global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

test('Currency calculation function work properly', () => {
  expect(calculateCurrency(1.3233, 1.2323, 3)).toBe("2.79")
  expect(calculateCurrency(0.9, 1.44, 2)).toBe("3.20")
});


const server = setupServer(
  rest.get(`${config.apiUrl}/latest`, (req, res, ctx) => {
    return res(ctx.json(currencyMock))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Exchange component test', () => {
  test('Check if shows right exchange result', async() => {
    const { getByText, getByRole, queryByTestId } = render(
      <CurrencyProvider>
        <Exchange />
      </CurrencyProvider>
    );
    
    await waitFor(() => {
      expect(queryByTestId('spinner')).not.toBeInTheDocument()
    })
    
    const input = getByRole('currency-input')

    fireEvent.change(input, {
      target: {
        value: "3"
      }
    })
    
    expect(getByText('3 USD =')).toBeInTheDocument()
    expect(getByText('2.58 EUR')).toBeInTheDocument()

    const from = queryByTestId('to-select')

    if (from?.firstElementChild) {

      fireEvent.mouseDown(from.firstElementChild)

      await waitFor(() => {
        expect(document.querySelector('.ant-select-dropdown')).toBeInTheDocument()
      })

      fireEvent.click(document.querySelectorAll('.ant-select-item-option-content')[1])
      
      expect(getByText('11.85 PLN')).toBeInTheDocument()
    }
  });
})
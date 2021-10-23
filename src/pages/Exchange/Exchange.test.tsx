import { setupServer } from 'msw/node'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw'

import { calculateCurrency } from './Exchange'
import { CurrencyProvider } from '../../context/currencyContext';
import { Exchange } from './Exchange'
import { currencyMock } from '../../testUtils/currencyMock';
import { act } from 'react-dom/test-utils';
import { App } from '../../App';
import AppWrapper from '../../AppWrapper';

const server = setupServer(
  rest.get('https://freecurrencyapi.net/api/v2/latest', (req, res, ctx) => {
    return res(ctx.json(currencyMock))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Currency calculation function work properly', () => {
  expect(calculateCurrency(1.3233, 1.2323, 3)).toBe("2.79")
  expect(calculateCurrency(0.9, 1.44, 2)).toBe("3.20")
});

global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};


describe('Exchange component test', () => {
  test('renders learn react link', async() => {
    const { getByRole, queryByText, queryByTestId } = render(
      <AppWrapper />
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

    expect(queryByTestId('elo')).toBeInTheDocument()
  });
  
})
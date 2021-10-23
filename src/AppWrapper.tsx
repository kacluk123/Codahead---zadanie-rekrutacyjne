import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {App} from './App'
import { CurrencyProvider } from './context/currencyContext';

function AppWrapper() {
  return (
    <Router>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </Router>
  );
}

export default AppWrapper;

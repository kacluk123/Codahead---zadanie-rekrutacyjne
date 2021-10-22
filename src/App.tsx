import React from 'react';
import logo from './logo.svg';
import './App.css';
import { api } from './Api';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  React.useEffect(() => {
    (async () => {
      const data = await api.currency.getLatestCurrencyData()
      console.log(data)
    })()
  }, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            {/* <About /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

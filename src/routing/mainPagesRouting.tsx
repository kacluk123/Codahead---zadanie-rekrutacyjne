import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Currencies } from "../pages/Currencies";
import { Exchange } from "../pages/Exchange";

export const MainPagesRouting = () => {
  return (
    <Switch>
      <Route path="/exchange">
        <Exchange />
      </Route>
      <Route path="/currencies">
        <Currencies />
      </Route>
      <Redirect to='/currencies' />
    </Switch>
  )
}
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export const MainPagesRouting = () => {
  return (
    <Switch>
      <Route path="/exchange">
        <div>
          dasdasdas
        </div>
      </Route>
      <Route path="/currencies">
        <div>
          bcvbcvbvbc
        </div>
      </Route>
      <Redirect to='/currencies' />
    </Switch>
  )
}
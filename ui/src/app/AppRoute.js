import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import App from "./App";
import CreateProduct from "./CreateProduct";
import Login from "./Login";
import SignIn from "./SignIn";

export default function AppRoute() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/app" component={App} />
          <Route path="/signin" component={SignIn} />
          <Route path="/create" component={CreateProduct} />
          <Route path="/" component={Login} />
          <Redirect path="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}

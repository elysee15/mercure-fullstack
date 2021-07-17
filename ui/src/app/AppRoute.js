import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import App from "./App";
import Login from "./Login";
import SignIn from "./SignIn";

export default function AppRoute() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/app" component={App} />
          <Route path="/signin" component={SignIn} />
          <Route path="/" component={Login} />
          <Redirect path="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}

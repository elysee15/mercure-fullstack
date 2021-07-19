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
import React from "react";

export default function AppRoute() {
  const [userInfo] = React.useState(() => {
    return JSON.parse(window.localStorage.getItem("__USER__"));
  });

  const userId = userInfo._id || "";

  React.useEffect(() => {
    const url = new URL("http://localhost:8001/.well-known/mercure");
    url.searchParams.append("topic", `ping/${userId}`);

    const eventSource = new EventSource(url);

    eventSource.onmessage = (e) => {
      console.log(
        `%c [EventSource] New message!: ${e.data}`,
        "background: #493593; color: #bada55"
      );
    };

    eventSource.onerror = (error) => {
      console.error("[EventSource] ", error);
    };
    eventSource.onopen = (ev) => {
      console.log("[EventSource]", "Une connexion a été ouverte");
    };

    return () => {
      // eventSource.close();
      console.log("[EventSource]", "La connecxion est fermée");
    };
  }, []);

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

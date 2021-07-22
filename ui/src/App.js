import "./App.css";
import AppRoute from "./app/AppRoute";
import { AuthProvider } from "./context/auth";
import { NotificationProvider } from "./context/notification";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <NotificationProvider>
            <AppRoute />
          </NotificationProvider>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;

import "./App.css";
import AppRoute from "./app/AppRoute";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </div>
  );
}

export default App;

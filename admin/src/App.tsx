import { BrowserRouter } from "react-router-dom";
import "./assets/login.css";
import "./assets/dashboard.css";
import AppComponent from "./components/AppComponent";
import { AuthProvider } from "./components/context/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

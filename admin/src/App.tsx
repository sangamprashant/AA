import { BrowserRouter } from "react-router-dom";
import "./assets/login.css";
import "./assets/dashboard.css";
import "./assets/booking.css";
import "./App.css";
import AppComponent from "./components/AppComponent";
import { AuthProvider } from "./components/context/AuthProvider";
import { LeadsProvider } from "./components/context/LeadsProvider";

const App = () => {
  return (
    <AuthProvider>
      <LeadsProvider>
        <BrowserRouter>
          <AppComponent />
        </BrowserRouter>
      </LeadsProvider>
    </AuthProvider>
  );
};

export default App;

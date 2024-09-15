import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.min.js";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppProvider } from "./AppProvider.tsx";
import { AuthProvider } from "./components/Admin/Auth/AuthProvider.tsx";
// Add all solid icons to the library
library.add(fas);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AppProvider>
);

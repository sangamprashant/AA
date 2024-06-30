import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import App from "./App.tsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "antd/dist/reset.css";
import { AuthProvider } from "./components/Admin/Auth/AuthProvider.tsx";
// Add all solid icons to the library
library.add(fas);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

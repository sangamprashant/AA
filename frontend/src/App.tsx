import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AboutUs,
  Class,
  Contact,
  Home,
  Navbar,
  PageNotFound,
} from "./components";
import { AuthContext } from "./components/Admin/Auth/AuthProvider";
import FloatButtonComponent from "./components/Reuse/FloatButton";
import { Admin404, AdminBooking, AdminFormReceiveContact, AdminLogin, AdminPanel, Dashboard } from "./components/Admin";

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <LoadingUI />;
  }
  const { loading, isLoggedIn } = authContext;
  if (loading) {
    return <LoadingUI />;
  }

  return (
    <div className="main">
      <BrowserRouter>
        {isLoggedIn ? (
          <React.Fragment>
            {/* admin pannel codes */}
            <AdminPanel>
              <Routes>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/contact" element={<AdminFormReceiveContact />} />
                <Route path="/admin/booking" element={<AdminBooking />} />
                <Route path="*" element={<Admin404 />} />
              </Routes>
            </AdminPanel>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* public codes */}
            <Navbar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/class" element={<Class />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
            <FloatButtonComponent />
          </React.Fragment>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

export const LoadingUI = () => {
  return (
    <div className="loading-container">
      <img src="welcome.gif?cache-control=max-age=31536000" alt="" />
      <p className="rainbow-text text-center">Welcome to A to Z Classes</p>
    </div>
  );
};

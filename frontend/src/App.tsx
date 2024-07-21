import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppContext } from "./AppProvider";
import {
  AboutUs,
  Class,
  Contact,
  Home,
  Login,
  Navbar,
  PageNotFound,
  Payment,
  ViewPayment,
} from "./components";
import {
  Admin404,
  AdminBooking,
  AdminFormReceiveContact,
  AdminLogin,
  AdminPanel,
  AdminPayment,
  Dashboard,
} from "./components/Admin";
import { AuthContext } from "./components/Admin/Auth/AuthProvider";
import {
  ACCEPTABLEUSE,
  COOKIESPOLICY,
  DISCLAIMER,
  PRIVACYPOLICY,
  RETURNPOLICY,
  TERMSANDCONDITIONS,
} from "./components/pages";
import FloatButtonComponent from "./components/Reuse/FloatButton";

function App() {
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);

  if (!authContext || !appContext) {
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
                <Route
                  path="/admin/contact"
                  element={<AdminFormReceiveContact />}
                />
                <Route path="/admin/booking" element={<AdminBooking />} />
                <Route path="/admin/payment" element={<AdminPayment />} />
                <Route path="/admin/payment-open" element={<ViewPayment />} />
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
                {/* delete it later */}
                <Route path="/login" element={<Login />} />
                {/* delete it later */}
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/payment" element={<ViewPayment />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/privacy-policy" element={<PRIVACYPOLICY />} />
                <Route path="/cookie-policy" element={<COOKIESPOLICY />} />
                <Route path="/terms" element={<TERMSANDCONDITIONS />} />
                <Route path="/return-policy" element={<RETURNPOLICY />} />
                <Route path="/disclaimer" element={<DISCLAIMER />} />
                <Route path="/acceptable-use" element={<ACCEPTABLEUSE />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
            <Payment />
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

import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppContext } from "./AppProvider";
import {
  AboutUs,
  Class,
  Contact,
  ContentOpen,
  Home,
  Navbar,
  PageNotFound,
  Payment,
  StudyMaterialP,
  ViewPayment,
} from "./components";
import {
  AccessContent,
  Admin404,
  AdminBooking,
  AdminFormReceiveContact,
  AdminLogin,
  AdminPanel,
  AdminPayment,
  AdminSetting,
  Dashboard,
  StudyMaterial,
  StudyMaterialOpen,
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
                <Route path="/admin/s-m" element={<StudyMaterial />} />
                <Route path="/admin/s-m/:id" element={<StudyMaterialOpen />} />
                <Route path="/admin/a-c" element={<AccessContent />} />
                <Route path="/admin/setting" element={<AdminSetting />} />
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
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/payment" element={<ViewPayment />} />
                <Route path="/pay" element={<Payment />} />
                <Route path="/study-material" element={<StudyMaterialP />} />
                <Route path="/study-material/:id" element={<ContentOpen />} />
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
      <img
        src="./welcome.gif?cache-control=max-age=31536000"
        alt=""
        loading="lazy"
      />
      <p className="rainbow-text text-center">Welcome to A to Z Classes</p>
    </div>
  );
};

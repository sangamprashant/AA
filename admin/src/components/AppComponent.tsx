import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./auth";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { Dashboard404, DashboardSetting, Frame } from "./Dashboard";
import {  CreateBooking, EmpBOpen, EmployeeDashboard,  } from "./Dashboard/Employee";
import {
  AdminAddEmployee,
  AdminBookings,
  AdminContacts,
  AdminDashboard,
  AdminPayments,
  AdminStudyM,
} from "./Dashboard/Admin";
import {
  ManagerBookings,
  ManagerContact,
  ManagerContentA,
  ManagerDashboard,
  ManagerPayments,
  ManagerStudyM,
  MEmployees,
} from "./Dashboard/Manager";
import { AMLeadsOpen, Bookings, Payment } from "./Dashboard/common";

const AppComponent = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { isLoggedIn } = authContext;

  return (
    <>
      {isLoggedIn ? (
        <Frame>
          <Routes>
            {/* -------------- Admnin -------------- */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/leads-bucket" element={<AdminBookings />} />
            <Route path="/admin/leads-bucket/:id" element={<AMLeadsOpen />} />
            <Route path="/admin/contact" element={<AdminContacts />} />
            <Route path="/admin/s-m" element={<AdminStudyM />} />
            <Route path="/admin/employee" element={<AdminAddEmployee />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            {/* -------------- manager -------------- */}
            <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            <Route path="/manager/leads-bucket" element={<ManagerBookings />} />
            <Route path="/manager/leads-bucket/:id" element={<AMLeadsOpen />} />
            <Route path="/manager/contact" element={<ManagerContact />} />
            <Route path="/manager/s-m" element={<ManagerStudyM />} />
            <Route path="/manager/c-a" element={<ManagerContentA />} />
            <Route path="/manager/payments" element={<ManagerPayments />} />
            <Route path="/manager/employee" element={<MEmployees />} />
            {/* -------------- employee -------------- */}
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/leads-bucket" element={<Bookings />} />
            <Route path="/employee/leads-bucket/create" element={<CreateBooking />} />
            <Route path="/employee/leads-bucket/:id" element={<EmpBOpen />} />
            {/* ---------------- all ------------------ */}
            <Route path="/dashboard/payment-open" element={<Payment />} />
            <Route path="/dashboard/setting" element={<DashboardSetting />} />
            <Route path="*" element={<Dashboard404 />} />
          </Routes>
        </Frame>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:role" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default AppComponent;

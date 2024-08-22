import { useContext, useLayoutEffect } from "react";
import AdminWrapper from "../AdminWrapper";
import { AuthContext } from "../../../context/AuthProvider";
import Header from "../../common/Dashboard/Header";
import EmployeeCount from "./Dashboard/EmployeeCount";
import { ProfileCard } from "../../common";
import AdminDailyAttendance from "./Dashboard/AdminDailyAttendance";
import PaymentChart from "./Dashboard/AdminPayments";

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setDashboardTitle } = authContext;
  useLayoutEffect(() => {
    setDashboardTitle("Admin Dashboard");
  }, []);

  return (
    <AdminWrapper>
      <Header>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 mb-3">
                <AdminDailyAttendance />
              </div>
              <div className="col-md-6 mb-3">
                <PaymentChart />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <ProfileCard />
            <div className="card shadow">
              <EmployeeCount />
            </div>
          </div>
        </div>
      </Header>
    </AdminWrapper>
  );
};

export default AdminDashboard;

import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { AttendanceCalendar } from "../../../common";
import EmployeeWrapper from "../../EmployeeWrapper";
import Header from "../../../common/Dashboard/Header";

const EmployeeDashboard = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setDashboardTitle } = authContext;
  useLayoutEffect(() => {
    setDashboardTitle("Employee Dashboard");
  }, []);
  return (
    <EmployeeWrapper>
      <Header>
        <div className="row">
          <div className="col-md-8">
            <div className="card">employee data herer</div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <AttendanceCalendar />
            </div>
          </div>
        </div>
      </Header>
    </EmployeeWrapper>
  );
};

export default EmployeeDashboard;

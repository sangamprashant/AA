import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import {
  AttendanceCalendar,
  LeadsCountChart
} from "../../../common";
import Header from "../../../common/Dashboard/Header";
import DailyActivityGraph from "../../../common/Graph";
import EmployeeWrapper from "../../EmployeeWrapper";

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
            <div className="card mb-3 shadow">
              <LeadsCountChart />
            </div>
            <div className="card mb-3 shadow">
              <DailyActivityGraph />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <AttendanceCalendar />
            </div>
          </div>
        </div>
      </Header>
    </EmployeeWrapper>
  );
};

export default EmployeeDashboard;

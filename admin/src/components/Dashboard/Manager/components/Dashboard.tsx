import { useContext, useLayoutEffect } from "react";
import Header from "../../common/Dashboard/Header";
import ManagerWrapper from "../ManagerWrapper";
import { AuthContext } from "../../../context/AuthProvider";
import { AttendanceCalendar, Notifications } from "../../common";
import DailyActivityGraph from "../../common/Graph";

const ManagerDashboard = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setDashboardTitle } = authContext;
  useLayoutEffect(() => {
    setDashboardTitle("Manager Dashboard");
  }, []);
  return (
    <ManagerWrapper>
      <Header>
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3">
              <DailyActivityGraph />
            </div>
            <div className="card">
              <Notifications />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <AttendanceCalendar />
            </div>
          </div>
        </div>
      </Header>
    </ManagerWrapper>
  );
};

export default ManagerDashboard;

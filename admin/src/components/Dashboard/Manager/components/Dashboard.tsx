import { useContext, useLayoutEffect } from "react";
import Header from "../../common/Dashboard/Header";
import ManagerWrapper from "../ManagerWrapper";
import { AuthContext } from "../../../context/AuthProvider";
import {
  AttendanceCalendar,
  LeadsCountChart,
  // LeadsStatus,
  ProfileCard,
} from "../../common";
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
            {/* <LeadsStatus /> */}
            <div className="card mb-3 shadow">
              <LeadsCountChart />
            </div>
            <div className="card mb-3 shadow">
              <DailyActivityGraph />
            </div>
          </div>
          <div className="col-md-4">
            <ProfileCard />
            <div className="card shadow">
              <AttendanceCalendar />
            </div>
          </div>
        </div>
      </Header>
    </ManagerWrapper>
  );
};

export default ManagerDashboard;

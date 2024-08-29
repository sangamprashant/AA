import React, { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { AttendanceCalendar } from "../../common";
import Header from "../../common/Dashboard/Header";
import DailyActivityGraph from "../../common/Graph";
import TeacherWrapper from "../TeacherWrapper";
import TeachingNotesRender from "./SavedNotes";

const TeacherDashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setDashboardTitle } = authContext;
  useLayoutEffect(() => {
    setDashboardTitle("Teacher Dashboard");
  }, []);
  return (
    <TeacherWrapper>
      <Header>
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3 shadow">
              <DailyActivityGraph />
            </div>
            <div className="card mb-3 shadow">
              <TeachingNotesRender />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow">
              <AttendanceCalendar />
            </div>
          </div>
        </div>
      </Header>
    </TeacherWrapper>
  );
};

export default TeacherDashboard;

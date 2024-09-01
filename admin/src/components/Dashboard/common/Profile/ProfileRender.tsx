import { Tabs } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { config } from "../../../../config";
import {
  formatDateYYYYMMDD,
  getFirstDayOfMonth,
  getMonthDays,
  getMonthName,
  statusColors,
} from "../../../../functions";
import { AttendanceRecord } from "../../../../types/attendance";
import { SessionDates } from "../../../../types/profile";
import { AuthContext } from "../../../context/AuthProvider";
import Spinner from "../Spinner";
import CalendarCircle from "./Calender";

const ProfileRender = () => {
  return (
    <div className="px-1">
      <div className="row m-0">
        <div className="col-md-8">
          <Tabs defaultActiveKey="1" className="ps-1">
            <Tabs.TabPane tab="Monthly Attandance" key="Notes">
              <MonthlyAttandance />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Daily Activity Chart" key="saved">
              <DailyActivityChart />
            </Tabs.TabPane>
          </Tabs>
        </div>
        <div className="col-md-4">xfg</div>
      </div>
    </div>
  );
};

export default ProfileRender;

const MonthlyAttandance = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;

  const { sessionDates } = globles;
  return (
    <div className="row m-0">
      {sessionDates.map((session) => (
        <div className="col-md-6">
          <div className="card p-4">
            <MonthlyAttandanceData {...session} />
          </div>
        </div>
      ))}
    </div>
  );
};

const DailyActivityChart = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { sessionDates } = globles;
  return (
    <>
      <div className="row m-0 ">
        {sessionDates.map((session) => (
          <div className="col-md-6">
            <div className="card p-4">
              <DailyActivityChartData {...session} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// yaha hoga tandav
const MonthlyAttandanceData = ({ year, month }: SessionDates) => {
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token } = globals;

  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const daysInMonth = getMonthDays(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  useEffect(() => {
    fetchAttendanceForMonth(year, month);
  }, [year, month]);

  const fetchAttendanceForMonth = async (year: number, month: number) => {
    try {
      setLoading(true);
      setAttendanceData([]);
      const response = await axios.get(`${config.SERVER}/attendance/monthly`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          year,
          month: month,
        },
      });
      console.log(response.data.attendanceRecords);
      const normalizedRecords = response.data.attendanceRecords.map(
        (record: AttendanceRecord) => ({
          ...record,
          date: formatDateYYYYMMDD(record.date),
        })
      );
      setAttendanceData(normalizedRecords);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const attendanceRecord = attendanceData.find(
        (record) => record.date === dateStr
      );
      const status = attendanceRecord?.status ?? "unknown";
      const backgroundColor = statusColors[status] || "#f8f9fa";

      days.push(
        <div
          className={`day`}
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const statusCounts: Record<string, number> = {};

  attendanceData.forEach((record) => {
    statusCounts[record.status] = (statusCounts[record.status] || 0) + 1;
  });

  return (
    <div className="-container">
      {loading ? (
        <div
          style={{
            height: "500px",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <h3 className="font-weight-bold text-center">
            {getMonthName(month)}, {year}
          </h3>
          <CalendarCircle
            statusCounts={statusCounts}
            daysInMonth={daysInMonth}
          />
          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="calendar-day-name">
                {day}
              </div>
            ))}
            {renderDays()}
          </div>
        </>
      )}
    </div>
  );
};
const DailyActivityChartData = ({ year, month }: SessionDates) => {
  return (
    <div>
      <h5 className="text-center">
        {getMonthName(month)}, {year}
      </h5>
    </div>
  );
};

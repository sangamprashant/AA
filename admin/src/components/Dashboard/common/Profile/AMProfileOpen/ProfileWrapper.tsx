import { Tabs } from "antd";
import ProfileCard from "./ProfileCard";
import Spinner from "../../Spinner";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  formatDateYYYYMMDD,
  getFirstDayOfMonth,
  getMonthDays,
  getMonthName,
  statusColors,
} from "../../../../../functions";
import { config } from "../../../../../config";
import axios from "axios";
import { SessionDates } from "../../../../../types/profile";
import { useContext, useEffect, useState } from "react";
import { GraphData } from "../../../../../types/activity";
import { AuthContext } from "../../../../context/AuthProvider";
import CalendarCircle from "../Calender";
import { AttendanceRecord } from "../../../../../types/attendance";
import { ProfileContext } from "../AMProfile";

const ProfileWrapper = () => {
  return (
    <>
      <div className="px-1">
        <div className="row m-0">
          <div className="col-md-8">
            <Tabs defaultActiveKey="Notes" className="ps-1">
              <Tabs.TabPane tab="Monthly Attandance" key="Notes">
                <MonthlyAttandance />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Daily Activity Chart" key="saved">
                <DailyActivityChart />
              </Tabs.TabPane>
            </Tabs>
          </div>
          <div className="col-md-4 mt-2">
            <ProfileCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileWrapper;

const MonthlyAttandance = () => {
  const globles = useContext(ProfileContext);
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
  const globles = useContext(ProfileContext);
  if (!globles) return null;

  const { sessionDates } = globles;
  return (
    <>
      {" "}
      <div className="row m-0 ">
        {sessionDates.map((session) => (
          <div className="col-md-12 mb-2">
            <div className="card p-4">
              <DailyActivityChartData {...session} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const MonthlyAttandanceData = ({ year, month }: SessionDates) => {
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token } = globals;

  const profileContext = useContext(ProfileContext);
  if (!profileContext) return null;

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
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token } = globals;

  const profileContext = useContext(ProfileContext);
  if (!profileContext) return null;

  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data from the server
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.SERVER}/attendance/active-time-for-month?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setGraphData(response.data.graphData);
      } else {
        console.error("Failed to fetch data:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, month, year]);

  return (
    <>
      {loading ? (
        <div
          style={{
            height: 350,
          }}
        >
          <Spinner />
        </div>
      ) : (
        <AreaChart
          width={800}
          height={400}
          data={graphData}
          style={{ width: "100%", height: "auto" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="activeHours"
            stroke="#8884d8"
            fill="#8884d8"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      )}
      <h5 className="text-center">
        {getMonthName(month)}, {year}
      </h5>
    </>
  );
};

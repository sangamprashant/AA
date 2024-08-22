import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Dashboard404 from "../../FrameComponents/404";
import EMCalendar from "./EMCalendar";
import { AuthContext } from "../../../context/AuthProvider";
import { AttendanceRecord } from "../../../../types/attendance";
import { config } from "../../../../config";
import Spinner from "../Spinner";
import ApplyForLeave from "./ApplyForLeave";
import { formatDateYYYYMMDD, getMonthDays } from "../../../../functions";
import CalendarCircle from "./CalendarCircle";
import LeaveApplications from "./LeaveApplications";

const EMAttendance: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  if (role !== "employee" && role !== "manager")
    return <Dashboard404 auth={true} />;

  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token } = globals;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getMonthDays(year, month);

  useEffect(() => {
    if (token) {
      fetchAttendanceForMonth(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
    }
  }, [token, currentDate]);

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
          month: month + 1,
        },
      });

      const normalizedRecords = response.data.attendanceRecords.map(
        (record: AttendanceRecord) => ({
          ...record,
          date: formatDateYYYYMMDD(record.date),
        })
      );
      setAttendanceData(normalizedRecords);
    } catch (error) {
      console.error("Failed to fetch attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getEventsForDate = (date: Date) => {
    return attendanceData.filter(
      (record) => new Date(record.date).toDateString() === date.toDateString()
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const statusCounts: Record<string, number> = {};

  attendanceData.forEach((record) => {
    statusCounts[record.status] = (statusCounts[record.status] || 0) + 1;
  });

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-capitalize">ATTENDANCE</h5>
        <div className="d-flex gap-2">
          <div className="d-flex justify-content-between ">
            <Button
              loading={loading}
              onClick={handlePrevMonth}
              icon={<ArrowLeftIcon />}
              type="primary"
            />
            <h3
              style={{
                width: "300px",
              }}
              className=" text-center"
            >
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <Button
              loading={loading}
              onClick={handleNextMonth}
              icon={<ArrowRightIcon />}
              type="primary"
            />
          </div>
        </div>
      </div>
      <div className="p-1 ms-2">
        <div className="row m-0">
          <div className="col-md-6 ">
            <div className="shadow-sm card border-0">
              <CalendarCircle
                statusCounts={statusCounts}
                daysInMonth={daysInMonth}
              />
              <EMCalendar
                attendanceData={attendanceData}
                currentDate={currentDate}
                handleDateClick={handleDateClick}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card p-3 mb-3 shadow-sm border-0"
              style={{
                minHeight: "140px",
              }}
            >
              <h2 className="card-title">
                {selectedDate
                  ? `Events for ${selectedDate.toDateString()}`
                  : "Select a Date"}
              </h2>
              <ul className=" list-unstyled">
                {loading ? (
                  <Spinner />
                ) : selectedDate ? (
                  getEventsForDate(selectedDate).map((event, i) => (
                    <li key={i} className="border p-2 rounded border-1">
                      <h5 className="mb-1 text-capitalize">{event.status}</h5>
                      <p className="mb-0">
                        {event.details || "No additional details"}
                      </p>
                    </li>
                  ))
                ) : (
                  <>
                    <li key="initial" className="border p-2 rounded border-1">
                      <h5 className="mb-1">Not Selected</h5>
                      <p className="mb-0">
                        Select a date fron the calender to view its details
                      </p>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <ApplyForLeave />
          </div>
          <div className="col-md-12 mb-3">
            <LeaveApplications />
          </div>
        </div>
      </div>
    </>
  );
};

export default EMAttendance;

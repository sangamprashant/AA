import { Button, Tooltip } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./Calendar.css";
import { formatDateYYYYMMDD, getMonthDays } from "../../../../functions";
import CalendarCircle from "./CalendarCircle";

interface AttendanceRecord {
  date: string; // ISO date string with time component
  status:
    | "early"
    | "present"
    | "absent"
    | "late"
    | "half-day-leave"
    | "off"
    | "holiday"
    | "training"
    | "remote-work"
    | "meeting"
    | "unpaid-leave";
  details?: string;
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const statusColors: Record<string, string> = {
  early: "#FFD700",
  present: "#28a745",
  absent: "#dc3545",
  late: "#ffc107",
  "half-day-leave": "#17a2b8",
  off: "#6c757d",
  holiday: "#ff5722",
  training: "#8e44ad",
  "remote-work": "#3498db",
  meeting: "#2ecc71",
  "unpaid-leave": "#9b59b6",
};

const ManualCalendar: React.FC = () => {
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token } = globals;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getMonthDays(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const attendanceRecord = attendanceData.find(
        (record) => record.date === dateStr
      );

      let className = "day";
      let tooltipTitle = "";
      if (attendanceRecord) {
        if (
          attendanceRecord.status !== "off" &&
          attendanceRecord.status !== "holiday"
        ) {
          className += ` ${attendanceRecord.status}`;
          tooltipTitle = `${attendanceRecord.status}: ${
            attendanceRecord.details || "No details available"
          }`;
        }
      }

      days.push(
        <Tooltip key={dateStr} title={tooltipTitle}>
          <div className={className}>{day}</div>
        </Tooltip>
      );
    }
    return days;
  };

  const statusCounts: Record<string, number> = {};

  attendanceData.forEach((record) => {
    statusCounts[record.status] = (statusCounts[record.status] || 0) + 1;
  });

  const getCount = (status: string) => {
    // Ensure the status is valid and is one of the keys in statusColors
    if (!statusColors.hasOwnProperty(status)) {
      return 0;
    }
    return attendanceData.filter((record) => record.status === status).length;
  };

  return (
    <div className="-container p-2">
      <CalendarCircle statusCounts={statusCounts} daysInMonth={daysInMonth} />
      <div className="calendar-header">
        <Button
          loading={loading}
          onClick={handlePrevMonth}
          icon={<ArrowLeftIcon />}
        />
        <h3>
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <Button
          loading={loading}
          onClick={handleNextMonth}
          icon={<ArrowRightIcon />}
        />
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
      <div className="status-legend">
        <h5>Status Legend</h5>
        {Object.keys(statusColors).map((status) => (
          <div key={status} className="legend-item">
            <div
              className="status"
              style={{ backgroundColor: statusColors[status] }}
            >
              {getCount(status)}
            </div>
            {status.replace(/-/g, " ").toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualCalendar;

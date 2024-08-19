import { Button, Tooltip } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import "./Calendar.css";

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

const getMonthDays = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

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
      console.log(response.data.data.attendanceRecords);
      const normalizedRecords = response.data.data.attendanceRecords.map(
        (record: AttendanceRecord) => ({
          ...record,
          date: new Date(record.date).toISOString().split("T")[0],
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

  const totalDays = daysInMonth;
  const statusCounts: Record<string, number> = {};

  attendanceData.forEach((record) => {
    statusCounts[record.status] = (statusCounts[record.status] || 0) + 1;
  });

  const radius = 50;
  const strokeWidth = 15;

  const getSvgPaths = () => {
    let offset = 0;
    return Object.keys(statusCounts).map((status, index) => {
      const count = statusCounts[status];
      const percentage = (count / totalDays) * 100;
      const angle = (percentage / 100) * 360;
      const path = `
        M ${radius} ${radius}
        L ${radius + radius * Math.sin((offset * Math.PI) / 180)} ${
        radius - radius * Math.cos((offset * Math.PI) / 180)
      }
        A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${
        radius + radius * Math.sin(((offset + angle) * Math.PI) / 180)
      } ${radius - radius * Math.cos(((offset + angle) * Math.PI) / 180)}
        Z
      `;
      offset += angle;
      return <path key={index} d={path} fill={statusColors[status]} />;
    });
  };

  const getCount = (status: string) => {
    // Ensure the status is valid and is one of the keys in statusColors
    if (!statusColors.hasOwnProperty(status)) {
      return 0;
    }

    // Count occurrences of the given status in attendanceData
    return attendanceData.filter((record) => record.status === status).length;
  };

  return (
    <div className="calendar-container p-2">
      <div className="d-flex justify-content-center align-items-center my-2 flex-column">
        <h4 className=" bold-text">Attendance Summary</h4>
        <div className="progress-circle">
          <svg width={2 * radius} height={2 * radius}>
            <circle
              cx={radius}
              cy={radius}
              r={radius}
              stroke="#e5e5e5"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {getSvgPaths()}
          </svg>
        </div>
      </div>
      <div className="calendar-header">
        <Button loading={loading} onClick={handlePrevMonth} icon={<ArrowLeftIcon/>}/>
        <h3>
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <Button loading={loading} onClick={handleNextMonth} icon={<ArrowRightIcon/>}/>
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

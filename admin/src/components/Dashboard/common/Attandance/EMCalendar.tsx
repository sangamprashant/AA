import React from "react";

import { getFirstDayOfMonth, getMonthDays } from "../../../../functions";
import { AttendanceRecord } from "../../../../types/attendance";
import "./Calendar.css";

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

interface EMCalendarProps {
  currentDate: Date;
  attendanceData: AttendanceRecord[];
  handleDateClick: (date: Date) => void;
}

const EMCalendar: React.FC<EMCalendarProps> = ({
  currentDate,
  attendanceData,
  handleDateClick,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getMonthDays(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

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
      if (attendanceRecord) {
        if (
          attendanceRecord.status !== "off" &&
          attendanceRecord.status !== "holiday"
        ) {
          className += ` ${attendanceRecord.status}`;
        }
      }

      days.push(
        <div
          className={className}
          onClick={() => handleDateClick(new Date(dateStr))}
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

  const getCount = (status: string) => {
    // Ensure the status is valid and is one of the keys in statusColors
    if (!statusColors.hasOwnProperty(status)) {
      return 0;
    }

    // Count occurrences of the given status in attendanceData
    return attendanceData.filter((record) => record.status === status).length;
  };

  return (
    <div className="calendar-container p-2 w-100">
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

export default EMCalendar;

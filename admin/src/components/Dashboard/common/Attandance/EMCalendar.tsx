import React from "react";
import {
  formatDateYYYYMMDD,
  getFirstDayOfMonth,
  getMonthDays,
  statusColors,
} from "../../../../functions";
import { AttendanceRecord } from "../../../../types/attendance";
import "./Calendar.css";

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
        (record) => formatDateYYYYMMDD(record.date) === dateStr
      );

      const status = attendanceRecord?.status ?? "unknown";
      const backgroundColor = statusColors[status] || "#f8f9fa";

      days.push(
        <div
          className={`day`}
          onClick={() => handleDateClick(new Date(dateStr))}
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
    <div className="calendar-container p-2 w-100">
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default EMCalendar;

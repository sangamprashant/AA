import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface CalendarCircleProps {
  statusCounts: Record<string, number>;
  daysInMonth: number;
}

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

const CalendarCircle: React.FC<CalendarCircleProps> = ({ statusCounts }) => {
  // Convert statusCounts to data format for recharts
  const data = Object.keys(statusCounts).map((status) => ({
    name: status.replace(/-/g, " ").toUpperCase(),
    value: statusCounts[status],
    color: statusColors[status],
  }));

  return (
    <div className="d-flex flex-column align-items-center my-2">
      <h3 className="font-weight-bold text-start">Attendance Summary</h3>
      {Object.keys(statusCounts).length === 0 ? (
        <div className="text-center text-muted">
          <p>No data available for this month.</p>
        </div>
      ) : (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CalendarCircle;

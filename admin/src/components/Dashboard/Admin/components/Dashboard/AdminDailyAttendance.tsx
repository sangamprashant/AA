import { useContext, useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { config } from "../../../../../config";
import { AuthContext } from "../../../../context/AuthProvider";

interface Attendance {
  totalEmployees: number;
  presentEmployees: number;
  lateEmployees: number;
  earlyEmployees: number;
  absentEmployees: number;
  halfDayLeaveEmployees: number;
  remoteWorkEmployees: number;
  offEmployees: number;
  holidayEmployees: number;
  trainingEmployees: number;
  unpaidLeaveEmployees: number;
  meetingEmployees: number;
}

const AdminDailyAttendance = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { token } = globles;
  const [attendance, setAttendance] = useState<Attendance>({
    totalEmployees: 0,
    presentEmployees: 0,
    lateEmployees: 0,
    earlyEmployees: 0,
    absentEmployees: 0,
    halfDayLeaveEmployees: 0,
    remoteWorkEmployees: 0,
    offEmployees: 0,
    holidayEmployees: 0,
    trainingEmployees: 0,
    unpaidLeaveEmployees: 0,
    meetingEmployees: 0,
  });

  useEffect(() => {
    // Fetch attendance data from the backend
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`${config.SERVER}/attendance/daily`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }); // Adjust the endpoint as needed
        const data = await response.json();
        console.log(data);
        setAttendance(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendance();
  }, []);

  // Prepare data for the pie chart
  const data = [
    { name: "Present", value: attendance.presentEmployees },
    { name: "Late", value: attendance.lateEmployees },
    { name: "Early", value: attendance.earlyEmployees },
    { name: "Absent", value: attendance.absentEmployees },
    { name: "Off", value: attendance.offEmployees },
    { name: "Remote Work", value: attendance.remoteWorkEmployees },
    { name: "Holiday", value: attendance.holidayEmployees },
    { name: "Training", value: attendance.trainingEmployees },
    { name: "Meeting", value: attendance.meetingEmployees },
    { name: "Unpaid Leave", value: attendance.unpaidLeaveEmployees },
    { name: "Half-Day Leave", value: attendance.halfDayLeaveEmployees },
  ];

  const COLORS = [
    "#4caf50", // Present
    "#ff9800", // Late
    "#2196f3", // Early
    "#f44336", // Absent
    "#ffeb3b", // Half-Day Leave
    "#009688", // Remote Work
    "#795548", // Off
    "#9e9e9e", // Holiday
    "#673ab7", // Training
    "#e91e63", // Unpaid Leave
    "#3f51b5", // Meeting
  ];

  return (
    <div
      className="card border-0 shadow-sm py-4"
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <h4 className="px-4">Today's Attendance</h4>
      <PieChart width={400} height={300} style={{ width: "100%" }}>
        <Pie
          data={data}
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default AdminDailyAttendance;

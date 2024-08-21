import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardProps {}

interface DashboardData {
  managerCount: number;
  employeeCount: number;
  teacherCount: number;
}

const EmployeeCount: React.FC<DashboardProps> = () => {
  // Data for LineChart
  // Data for PieChart
  const [data, setData] = useState<DashboardData>({
    managerCount: 0,
    employeeCount: 0,
    teacherCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      // Replace with actual API call
      const response = await new Promise<DashboardData>((resolve) => {
        setTimeout(() => {
          resolve({
            managerCount: 2,
            employeeCount: 4,
            teacherCount: 1,
          });
        }, 1000);
      });
      setData(response);
    };
    fetchData();
  }, []);

  const pieData = [
    { name: "Manager", value: data.managerCount, color: "#4CAF50" },
    { name: "Employee", value: data.employeeCount, color: "#03A9F4" },
    { name: "Teacher", value: data.teacherCount, color: "#FF9800" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold">Employee Distribution</h2>
      <div className="row">
        <div className="col-md-8">
          <LineChart
            width={800}
            height={400}
            data={pieData}
            style={{ width: "100%", height: "100%" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="col-md-4">
          <PieChart
            width={400}
            height={400}
            style={{ width: "100%", height: "auto" }}
          >
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="flex justify-center">
            {pieData.map((entry, index) => (
              <div key={`legend-${index}`} className="mr-4 flex items-center">
                <span
                  className={`inline-block w-4 h-4 rounded-full mr-2 px-1`}
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCount;

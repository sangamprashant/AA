import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { config } from "../../../../../config";
import { AuthContext } from "../../../../context/AuthProvider";

interface Employee {
  name: string;
  count: number;
}

const EmployeeCount = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { token } = globles;
  const [employees, setEmployees] = useState<Employee[]>([
    { name: "Manager", count: 0 },
    { name: "Employee", count: 0 },
    { name: "Teacher", count: 0 },
  ]);

  useEffect(() => {
    fetchCount();
  }, [token]);

  const fetchCount = async () => {
    try {
      const response = await axios.get(`${config.SERVER}/admin/user-count`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setEmployees([
        { name: "Manager", count: response.data.manager },
        { name: "Employee", count: response.data.employee },
        { name: "Teacher", count: response.data.teacher },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  // Define colors for each employee type
  const colors = ["#8884d8", "#82ca9d", "#FFC107"];

  // Prepare data for the chart
  const data = employees.map((employee, index) => ({
    name: employee.name,
    count: employee.count,
    fill: colors[index], // Assign color based on index
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h5 className="text-lg font-bold mb-4">Employee Dashboard</h5>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className="mb-4">
        {employees.map((employee, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="fw-bold">{employee.name}</span>
            <span>{employee.count}</span>
          </li>
        ))}
      </ul>
      <div className="text-lg font-weight-bold mb-2">
        Total Employees:{" "}
        {employees.reduce((acc, employee) => acc + employee.count, 0)}
      </div>
    </div>
  );
};

export default EmployeeCount;

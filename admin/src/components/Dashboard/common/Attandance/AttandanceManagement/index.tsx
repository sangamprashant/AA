import { Table, Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useParams } from "react-router-dom";
import Dashboard404 from "../../../FrameComponents/404";
import { AuthContext } from "../../../../context/AuthProvider";
import { getMonthDays } from "../../../../../functions";
import { config } from "../../../../../config";

const { TabPane } = Tabs;

const AttendanceManagement: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  if (role !== "employee" && role !== "manager") {
    return <Dashboard404 auth={true} />;
  }

  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getMonthDays(year, month);

  // Function to handle navigation to the previous month
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Function to handle navigation to the next month
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">Attendance Management</h5>
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
      <Tabs defaultActiveKey="1" className="mx-1">
        <TabPane tab="Leave Requests" key="1">
          <TableRender currentDate={currentDate} type="pending" />
        </TabPane>
        <TabPane tab="Approved Leaves" key="2">
          <TableRender currentDate={currentDate} type="approved" />
        </TabPane>
      </Tabs>
    </>
  );
};

export default AttendanceManagement;

const TableRender: React.FC<{
  currentDate: Date;
  type: "pending" | "approved";
}> = ({ currentDate, type }) => {
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token, user } = globals;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) {
  
      
      const fetchData = async () => {
        try {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1; // Convert to 1-based month

          const response = await axios.get(
            `${config.SERVER}/leave/monthly/requests`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                status: type,
                year,
                month,
              },
            }
          );
          console.log(response);
          console.log({
            status: type,
            year,
            month,
          });
          setData(response.data.leaves);
        } catch (error) {
          console.error("Error fetching leave data:", error);
        }
      };

      fetchData();
    }
  }, [token, currentDate, type]);

  // Columns definition for the tables
  const columns = [
    { title: "Employee", dataIndex: "employee", key: "employee" },
    { title: "Leave Period", dataIndex: "leavePeriod", key: "leavePeriod" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

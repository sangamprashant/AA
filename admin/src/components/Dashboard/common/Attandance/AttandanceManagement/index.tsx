import { Table, Tabs } from "antd";
import React from "react";

const { TabPane } = Tabs;

const AttendanceManagement: React.FC = () => {
  // Dummy data for tables
  const leaveRequestsData = [
    {
      id: 1,
      employee: "John Doe",
      leavePeriod: "2024-08-01 to 2024-08-05",
      reason: "Vacation",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Jane Smith",
      leavePeriod: "2024-08-10 to 2024-08-12",
      reason: "Sick Leave",
      status: "Approved",
    },
  ];

  const approvedLeavesData = [
    {
      id: 1,
      employee: "Alice Johnson",
      leavePeriod: "2024-07-20 to 2024-07-22",
      reason: "Family Event",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Bob Brown",
      leavePeriod: "2024-08-05 to 2024-08-07",
      reason: "Personal Leave",
      status: "Approved",
    },
  ];

  // Columns definition for the tables
  const leaveRequestsColumns = [
    { title: "Employee", dataIndex: "employee", key: "employee" },
    { title: "Leave Period", dataIndex: "leavePeriod", key: "leavePeriod" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  // Function to handle form submission

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">Attendance Management</h5>
      </div>
      <Tabs defaultActiveKey="1" className="mx-1">
        <TabPane tab="Leave Requests" key="1">
          <Table
            columns={leaveRequestsColumns}
            dataSource={leaveRequestsData}
            rowKey="id"
          />
        </TabPane>
        <TabPane tab="Approved Leaves" key="2">
          <Table
            columns={leaveRequestsColumns}
            dataSource={approvedLeavesData}
            rowKey="id"
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default AttendanceManagement;

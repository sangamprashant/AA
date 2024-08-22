import { Alert, Table, Tag, Typography } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";

const { Title } = Typography;

interface LeaveRequest {
  startDate: string; // Changed to string to match API response
  endDate: string; // Changed to string to match API response
  reason: string;
  status: "pending" | "approved" | "rejected";
  approver: string;
  approverRole: "manager" | "admin";
}

const LeaveApplications = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { token } = globles;

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `${config.SERVER}/attendance/leave-requests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeaveRequests(response.data.leaveRequests);
      } catch (err) {
        setError("Failed to fetch leave requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const columns = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: string) => new Date(text).toDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text: string) => new Date(text).toDateString(),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: "pending" | "approved" | "rejected") => {
        let color = "";
        switch (status) {
          case "approved":
            color = "green";
            break;
          case "rejected":
            color = "red";
            break;
          case "pending":
            color = "orange";
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    // {
    //   title: "Approver",
    //   dataIndex: "approver",
    //   key: "approver",
    // },
    // {
    //   title: "Approver Role",
    //   dataIndex: "approverRole",
    //   key: "approverRole",
    // },
  ];
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div className="card border-0 p-4 shadow-sm mt-3 table-responsive">
      <Title level={2}>Leave Applications</Title>
      <Table
        dataSource={leaveRequests}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.startDate}
      />
    </div>
  );
};

export default LeaveApplications;

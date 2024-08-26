import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Alert, Table, Tag, Typography } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";

const { Title } = Typography;

interface LeaveRequest {
  startDate: string;
  endDate: string;
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
          `${config.SERVER}/leave/applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeaveRequests(response.data.applications);
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
      render: (_: any, data: LeaveRequest) => {
        return (
          <>
            {data.status === "pending" ? (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Pending
              </Tag>
            ) : data.status === "approved" ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Success
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Rejected
              </Tag>
            )}
          </>
        );
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

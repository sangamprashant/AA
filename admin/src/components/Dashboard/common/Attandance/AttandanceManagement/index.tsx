import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Table, Tabs, Tag } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../../../../config";
import { AuthContext } from "../../../../context/AuthProvider";
import Dashboard404 from "../../../FrameComponents/404";

const { TabPane } = Tabs;

interface RequesterProps {
  _id: string;
  name: string;
}

interface AttandanceProps {
  _id: string;
  endDate: Date;
  startDate: Date;
  reason: string;
  status: string;
  type: string;
  requester: RequesterProps;
  approver: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceManagement: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  if (role !== "admin" && role !== "manager") {
    return <Dashboard404 auth={true} />;
  }

  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
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
          <Button
            loading={loading}
            onClick={handleRefresh}
            icon={<RefreshIcon />}
            type="primary"
          />
        </div>
      </div>
      <Tabs defaultActiveKey="1" className="mx-1">
        <TabPane tab="Leave Requests" key="1">
          <TableRender
            currentDate={currentDate}
            type="pending"
            loading={loading}
          />
        </TabPane>
        <TabPane tab="Approved Leaves" key="2">
          <TableRender
            currentDate={currentDate}
            type="approved"
            loading={loading}
          />
        </TabPane>
        <TabPane tab="Rejected Leaves" key="3">
          <TableRender
            currentDate={currentDate}
            type="rejected"
            loading={loading}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default AttendanceManagement;

const TableRender: React.FC<{
  currentDate: Date;
  type: "pending" | "approved" | "rejected";
  loading: boolean;
}> = ({ currentDate, type, loading }) => {
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token, user } = globals;
  const [data, setData] = useState<AttandanceProps[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, currentDate, type, loading]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

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
      setData(response.data.leaves);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleApprove = async (id: string, status: "approved" | "rejected") => {
    try {
      await axios.get(`${config.SERVER}/leave/${user?.role}/approves`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          leaveId: id,
          status,
        },
      });
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  const columns = [
    {
      title: "Employee",
      dataIndex: ["requester", "name"],
      key: "name",
    },
    {
      title: "Leave Period",
      key: "leavePeriod",
      render: (record: AttandanceProps) =>
        `${new Date(record.startDate).toLocaleDateString()} - ${new Date(
          record.endDate
        ).toLocaleDateString()}`,
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
      render: (_: any, data: AttandanceProps) => {
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
    ...(type === "pending"
      ? [
          {
            title: "Action",
            key: "action",
            render: (record: AttandanceProps) => (
              <div className="d-flex gap-2">
                <Button
                  type="primary"
                  onClick={() => handleApprove(record._id, "approved")}
                >
                  Approve
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleApprove(record._id, "rejected")}
                >
                  Rejected
                </Button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="table-responsive">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loadingData || loading}
      />
    </div>
  );
};

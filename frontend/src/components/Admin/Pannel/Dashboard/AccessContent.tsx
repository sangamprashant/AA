import React, { useContext, useEffect, useState } from "react";
import { Table, Tabs, Button, notification } from "antd";
import {
  VerifiedOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../Auth/AuthProvider";
import { LoadingUI } from "../../../../App";
import { config } from "../../../../config";

interface AccessContentContainerProps {
  category: "v" | "r" | "v-r" | "v-nr" | "nv-r" | "nv-nr";
}

interface User {
  key: string;
  email: string;
  phone: string;
  verified: boolean;
  reached: boolean;
}

const AccessContentContainer: React.FC<AccessContentContainerProps> = ({
  category,
}) => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <LoadingUI />;
  }
  const { token } = authContext;

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.SERVER}/access-content/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const formattedData = result.users.map((user: any, index: number) => ({
        key: index.toString(),
        ...user,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      notification.error({
        message: 'Data Fetch Error',
        description: 'Failed to fetch data. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (verified: boolean) => (verified ? "Yes" : "No"),
    },
    {
      title: "Reached",
      dataIndex: "reached",
      key: "reached",
      render: (reached: boolean) => (reached ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <>
          {!record.reached && (
            <Button type="primary" onClick={() => handleReach(record)}>
              Reach
            </Button>
          )}
        </>
      ),
    },
  ];

  const handleReach = async (user: User) => {
    try {
      const response = await fetch(
        `${config.SERVER}/access-content/update-reached`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: user.email,
            phone: user.phone,
            reached: true,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        notification.success({
          message: 'Success',
          description: 'User reached status updated successfully.',
        });
        // Refresh data after successful update
        fetchData();
      } else {
        notification.error({
          message: 'Update Error',
          description: result.message || 'Failed to update reached status. Please try again later.',
        });
      }
    } catch (error) {
      console.error("Error updating reached status:", error);
      notification.error({
        message: 'Server Error',
        description: 'An error occurred while updating the reached status. Please try again later.',
      });
    }
  };

  return <Table columns={columns} dataSource={data} loading={loading} />;
};

const AccessContent: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <LoadingUI />;
  }

  const { setHeader } = authContext;

  useEffect(() => {
    setHeader("Access Locked Content");
  }, [setHeader]);

  const items = [
    {
      key: "1",
      label: (
        <>
          <VerifiedOutlined /> Verified
        </>
      ),
      children: <AccessContentContainer category="v" />,
    },
    {
      key: "2",
      label: (
        <>
          <CheckCircleOutlined /> Reached
        </>
      ),
      children: <AccessContentContainer category="r" />,
    },
    {
      key: "3",
      label: (
        <>
          <VerifiedOutlined />
          <CheckCircleOutlined /> Verified and Reached
        </>
      ),
      children: <AccessContentContainer category="v-r" />,
    },
    {
      key: "4",
      label: (
        <>
          <VerifiedOutlined />
          <CloseCircleOutlined /> Verified and Not-Reached
        </>
      ),
      children: <AccessContentContainer category="v-nr" />,
    },
    {
      key: "5",
      label: (
        <>
          <CloseCircleOutlined />
          <CheckCircleOutlined /> Not-Verified and Reached
        </>
      ),
      children: <AccessContentContainer category="nv-r" />,
    },
    {
      key: "6",
      label: (
        <>
          <CloseCircleOutlined />
          <QuestionCircleOutlined /> Not-Verified and Not-Reached
        </>
      ),
      children: <AccessContentContainer category="nv-nr" />,
    },
  ];

  return (
    <div className="card p-3 border-0 shadow">
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default AccessContent;

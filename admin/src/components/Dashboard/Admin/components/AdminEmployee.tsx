import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Tabs, Table } from "antd";
import AdminWrapper from "../AdminWrapper";
import axios from "axios";
import { ColumnType } from "antd/es/table";
import { config } from "../../../../config";
import { Form, Input, Button, Select, Typography, notification } from "antd";
import { AuthContext } from "../../../context/AuthProvider";

const { Title } = Typography;
const { Option } = Select;

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const AdminAddEmployee: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState("");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setDashboardTitle } = authContext;
  useLayoutEffect(() => {
    setDashboardTitle("Admin - Employee");
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.SERVER}/admin/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
      });
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Data received is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue)
  );

  const columns: ColumnType<User>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <div className="d-flex gap-2">
          <Button
            type="primary"
            onClick={() => {
              // Handle view logic here
              console.log("View details of", record.name);
            }}
          >
            View
          </Button>
          <Button
            // type="danger"
            danger
            // onClick={() => deleteEmployee(record._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "All",
      children: (
        <Table
          columns={columns}
          dataSource={filteredUsers}
          loading={loading}
          rowKey="_id"
        />
      ),
    },
    {
      key: "2",
      label: "All Managers",
      children: (
        <Table
          columns={columns}
          dataSource={filteredUsers.filter((user) => user.role === "manager")}
          loading={loading}
          rowKey="_id"
        />
      ),
    },
    {
      key: "3",
      label: "All Employees",
      children: (
        <Table
          columns={columns}
          dataSource={filteredUsers.filter((user) => user.role === "employee")}
          loading={loading}
          rowKey="_id"
        />
      ),
    },
    {
      key: "4",
      label: "Add Employees",
      children: <AddEmployee onSuccess={fetchUsers} />,
    },
  ];

  return (
    <AdminWrapper className="card p-4">
      <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
        <Input.Search
          placeholder="Search by name"
          value={searchValue}
          onChange={handleSearch}
          width="100%"
        />
      </div>
      <div className=" table-responsive">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </AdminWrapper>
  );
};

export default AdminAddEmployee;

interface AddEmployeeProps {
  onSuccess: () => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create Form instance
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post(`${config.SERVER}/admin/user`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
      });

      if (response.data.success) {
        notification.success({
          message: "Success",
          description: "Employee added successfully!",
        });
        form.resetFields();
        onSuccess();
      } else {
        notification.error({
          message: "Error",
          description: response.data.message || "Failed to add employee.",
        });
      }
    } catch (error: any) {
      console.error("Error adding employee:", error);
      notification.error({
        message: "Error",
        description:
          error.response.data.message ||
          "An error occurred while adding the employee.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Title level={2}>Add Employee</Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: "" }}
        form={form} // Assign Form instance
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the employee name!" },
          ]}
        >
          <Input placeholder="Enter employee name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input placeholder="Enter employee email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter a password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select role">
            <Option value="">Select a role!</Option>
            <Option value="manager">Manager</Option>
            <Option value="employee">Employee</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Employee
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  Typography,
  notification,
} from "antd";
import { ColumnType } from "antd/es/table";
import TabPane from "antd/es/tabs/TabPane";
import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { config } from "../../../../config";
import { openNotification } from "../../../../functions";
import { Subject } from "../../../../types/subject";
import { AuthContext } from "../../../context/AuthProvider";
import AdminWrapper from "../AdminWrapper";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

interface Manager {
  _id: string;
  name: string;
  email: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  manager?: Manager;
}

interface modalProps {
  isOpen: boolean;
  data: User | null;
}

const AdminAddEmployee: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
  };
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [model, setModal] = useState<modalProps>({
    isOpen: false,
    data: null,
  });
  const [modalDeleteLoading, setModalDeleteLoading] = useState(false);
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
      setLoading(true);
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

  const loadDeleteData = (d: User) => {
    setModal({
      isOpen: true,
      data: d,
    });
  };

  const handelDelete = async () => {
    try {
      setModalDeleteLoading(true);
      const res = await axios.delete(
        `${config.SERVER}/admin/user/${model.data?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      );

      if (res.data.success) {
        notification.success({
          message: "Success",
          description: "User has been deleted successfully.",
        });
        fetchUsers();
      }
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:
          error?.response?.data?.message ||
          "There was an error deleting the user. Please try again later.",
      });
      console.error("Error deleting user:", error);
    } finally {
      handelCancelDelete();
      setModalDeleteLoading(false);
    }
  };

  const handelCancelDelete = () => {
    setModal({
      isOpen: false,
      data: null,
    });
  };

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>EMPLOYEES</h5>
        <div className="d-flex gap-2">
          <Input.Search
            placeholder="Search by name"
            value={searchValue}
            onChange={handleSearch}
            width="100%"
          />
        </div>
      </div>
      <AdminWrapper>
        <Tabs defaultActiveKey="1" className="ps-1">
          <TabPane tab="All" key="1">
            <EmployeeShow
              loading={loading}
              users={users}
              loadDeleteData={loadDeleteData}
              type="all"
              searchValue={searchValue}
            />
          </TabPane>
          <TabPane tab="Managers" key="2">
            <EmployeeShow
              loading={loading}
              users={users.filter((user) => user.role === "manager")}
              loadDeleteData={loadDeleteData}
              type="manager"
              searchValue={searchValue}
            />
          </TabPane>
          <TabPane tab="Employees" key="3">
            <EmployeeShow
              loading={loading}
              users={users.filter((user) => user.role === "employee")}
              loadDeleteData={loadDeleteData}
              type="employee"
              searchValue={searchValue}
            />
          </TabPane>
          <TabPane tab="Teacher" key="teacher">
            <EmployeeShow
              loading={loading}
              users={users.filter((user) => user.role === "teacher")}
              loadDeleteData={loadDeleteData}
              type="teacher"
              searchValue={searchValue}
            />
          </TabPane>
          <TabPane tab="Add" key="4">
            <AddEmployee
              onSuccess={fetchUsers}
              managers={users.filter((user) => user.role === "manager")}
            />
          </TabPane>
        </Tabs>
      </AdminWrapper>
      <Modal
        title="Delete Employee/User"
        open={model.isOpen}
        onCancel={handelCancelDelete}
        onClose={handelCancelDelete}
        centered
        footer={
          <div>
            <Button
              type="primary"
              danger
              onClick={handelDelete}
              loading={modalDeleteLoading}
            >
              Delete
            </Button>
          </div>
        }
      >
        {model.data && (
          <div>
            <p className="m-0">
              <strong>Name:</strong> {model.data.name}
            </p>
            <p className="m-0">
              <strong>Email:</strong> {model.data.email}
            </p>
            <p className="m-0">
              <strong>Role:</strong> {model.data.role}
            </p>
            <p className="m-0">
              <strong>Created At:</strong>{" "}
              {new Date(model.data.createdAt).toLocaleString()}
            </p>
            <p className="m-0">
              <strong>Updated At:</strong>{" "}
              {new Date(model.data.updatedAt).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AdminAddEmployee;

interface AddEmployeeProps {
  onSuccess: () => void;
  managers: User[];
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ onSuccess, managers }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create Form instance
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }

  const { token } = authContext;

  useEffect(() => {
    fetchSubjects();
  }, [token]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get<Subject[]>(`${config.SERVER}/subject`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubjects(response.data);
    } catch (error) {
      openNotification("Error", "Failed to fetch subjects", "error");
    }
  };

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
    <div className="p-2">
      <Title level={2} className="text-center text-uppercase">
        Add Employee
      </Title>
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: "" }}
        form={form} // Assign Form instance
      >
        <Row
          gutter={16}
          style={{
            width: "100%",
          }}
        >
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the employee name!" },
              ]}
            >
              <Input placeholder="Enter employee name" />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter a password!" }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select placeholder="Select role">
                <Option value="">Select a role!</Option>
                <Option value="teacher">Teacher</Option>
                <Option value="employee">Employee</Option>
                <Option value="manager">Manager</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.role !== currentValues.role
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("role") === "employee" ? (
                  <Form.Item
                    label="Select Manager"
                    name="manager"
                    rules={[
                      { required: true, message: "Please select a manager!" },
                    ]}
                  >
                    <Select placeholder="Select manager">
                      <Option value="">Select a manager!</Option>
                      {managers.map((manager, index) => {
                        return (
                          <Option value={manager._id} key={index}>
                            {manager.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.role !== currentValues.role
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("role") === "teacher" ? (
                  <Form.Item
                    label="Select Subject"
                    name="subject"
                    rules={[
                      { required: true, message: "Please select a subject!" },
                    ]}
                  >
                    <Select placeholder="Select subject">
                      <Option value="">Select a subject!</Option>
                      {subjects.map((subject, index) => {
                        return (
                          <Option value={subject._id} key={index}>
                            {subject.title}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item className="text-end">
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Employee
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

interface EmployeeShow {
  loading: boolean;
  users: User[];
  loadDeleteData: (d: User) => void;
  type: "teacher" | "employee" | "manager" | "all";
  searchValue: string;
}
const EmployeeShow = ({
  loading,
  users,
  loadDeleteData,
  type,
  searchValue,
}: EmployeeShow) => {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue)
  );
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }

  const { user } = authContext;
  const navigate = useNavigate()

  const column1: ColumnType<User>[] = [
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
  ];
  const column2: ColumnType<User>[] = [
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
              navigate(`/${user?.role}/profile/${record._id}`)
            }}
          >
            View
          </Button>
          <Button danger onClick={() => loadDeleteData(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const columnAll: ColumnType<User>[] = [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  const columnEmployee: ColumnType<User>[] = [
    {
      title: "Manager",
      dataIndex: "",
      render: (_: any, record: User) => (
        <div>
          <p className="m-0">{record.manager?.name}</p>
          <p className="m-0">{record.manager?.email}</p>
        </div>
      ),
    },
  ];

  const finalColumns = [
    ...column1,
    ...(type === "all" ? columnAll : type === "employee" ? columnEmployee : []),
    ...column2,
  ];

  return (
    <>
      <div className="table-responsive ">
        <Table
          columns={finalColumns}
          dataSource={filteredUsers}
          loading={loading}
          rowKey="_id"
        />
      </div>
    </>
  );
};

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Input, Table } from "antd";
import axios from "axios";
import { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../../../config";
import { AuthContext } from "../../../../context/AuthProvider";
import ManagerWrapper from "../../ManagerWrapper";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const MEmployees = () => {
  const globals = useContext(AuthContext);
  if (!globals) return null;

  const [searchValue, setSearchValue] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    fetchEmployees();
  }, [globals.token]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.SERVER}/manager/employees`, {
        headers: {
          Authorization: `Bearer ${globals.token}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Failed to fetch employees", error);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Date Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => new Date(updatedAt).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, user: User) => (
        <div>
          <Button
            type="primary"
            icon={<VisibilityIcon />}
            onClick={() =>
              navigate(`/${globals.user?.role}/profile/${user._id}`)
            }
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ManagerWrapper>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>MY EMPLOYEES</h5>
        <div className="d-flex gap-2">
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <Input.Search
              placeholder="Search by name"
              value={searchValue}
              onChange={handleSearch}
              width="100%"
            />
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
    </ManagerWrapper>
  );
};

export default MEmployees;

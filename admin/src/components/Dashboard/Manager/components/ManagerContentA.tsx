import SyncIcon from "@mui/icons-material/Sync";
import { Button, notification, Pagination, Table, Tabs } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";
import ManagerWrapper from "../ManagerWrapper";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
interface User {
  _id: string;
  email: string;
  phone: string;
  otp?: string;
  attempts: {
    count: number;
    time: Date;
  };
  Class: number[];
  verified: boolean;
  reached: boolean;
  createdAt: string;
  updatedAt: string;
}

const ManagerContentA: React.FC = () => {
  const [reload, setReload] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('v');

  const handleReload = () => {
    setReload(prev => !prev);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <ManagerWrapper>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">Study Material Accessed</h5>
        <div className="d-flex gap-2">
          <Button
            type="primary"
            icon={<SyncIcon />}
            onClick={handleReload}
          >
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultActiveKey="v" activeKey={activeTab} onChange={handleTabChange} className="px-1">
        <Tabs.TabPane tab="Verified" key="v">
          <ShowData reload={reload} category="v" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Reached" key="r">
          <ShowData reload={reload} category="r" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Verified & Reached" key="v-r">
          <ShowData reload={reload} category="v-r" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Verified & Not Reached" key="v-nr">
          <ShowData reload={reload} category="v-nr" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Not Verified & Reached" key="nv-r">
          <ShowData reload={reload} category="nv-r" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Not Verified & Not Reached" key="nv-nr">
          <ShowData reload={reload} category="nv-nr" />
        </Tabs.TabPane>
      </Tabs>
    </ManagerWrapper>
  );
};

interface ShowDataProps {
  reload: boolean;
  category: string;
}

const ShowData: React.FC<ShowDataProps> = ({ reload, category }) => {
  const context = useContext(AuthContext);
  if (!context) return null;

  const { token } = context;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const pageSize = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.SERVER}/access-content/view`,
        { category, page: currentPage, limit: pageSize },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(response.data.users);
      setTotalUsers(response.data.totalUsers);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload, category, currentPage]);

  const handleReached = async (id: string) => {
    try {
      const response = await axios.get(`${config.SERVER}/access-content/update-reached`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: { id }
      })

      if (response.data.success) {
        fetchData();
        notification.success({
          message: 'Success',
          description: 'User has been marked as reached.',
        })
      }

    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to mark user as reached.',
      });
    }
  }

  const columns = [
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Classes', dataIndex: 'Class', key: 'Class', render: (text: number[]) => text.join(', ') },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: 'Action', dataIndex: 'updatedAt', key: 'updatedAt', render: (_: any, data: User) => <>
        {!data.reached && <Button onClick={() => handleReached(data._id)} icon={<ConnectWithoutContactIcon />} type="primary" />}
      </>
    },]

  return (
    <div className="table-responsive">
      <>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="email"
          pagination={false}
          loading={loading}
        />
        <div className="d-flex justify-content-center mt-2">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalUsers}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </>
    </div>
  );
};

export default ManagerContentA;

import {
  CalendarOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Typography, theme } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingUI } from "../../../App";
import { AuthContext } from "../Auth/AuthProvider";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface AdminPanelProps {
  children: React.ReactNode;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ children }) => {
  const navigate = useNavigate();

  const initCollapsed = localStorage.getItem("collapsed");

  const [collapsed, setCollapsed] = useState(
    initCollapsed ? (initCollapsed === "1" ? true : false) : true
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <LoadingUI />;
  }
  const { loading, logout } = authContext;
  if (loading) {
    return <LoadingUI />;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          overflow: "hidden",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" style={{ padding: "16px", textAlign: "center" }}>
          <img src="/logo.png" alt="Logo" height={40} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
              title: "Go to Dashboard",
              onClick: () => navigate("/admin/dashboard"),
            },
            {
              key: "2",
              icon: <PhoneOutlined />,
              label: "Contact",
              onClick: () => navigate("/admin/contact"),
            },
            {
              key: "3",
              icon: <CalendarOutlined />,
              label: "Booking",
              onClick: () => navigate("/admin/booking"),
            },
            {
              key: "4",
              icon: <CalendarOutlined />,
              label: "Payment",
              onClick: () => navigate("/admin/payment"),
            },
            {
              key: "5",
              icon: <LogoutOutlined />,
              label: "Logout",
              title: "Logout from admin panel",
              onClick: () => {
                logout();
              },
            },
          ]}
        />
      </Sider>
      <Layout style={{ height: "100vh" }}>
        <Header
          className="p-2"
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 1000,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              localStorage.setItem("collapsed", !collapsed ? "1" : "0");
              setCollapsed(!collapsed);
            }}
            className="m-0"
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Title level={3} style={{ margin: 0 }}>
            Admin Panel
          </Title>
        </Header>
        <Content
          className="admin-panel-content-main"
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "auto",
            height: "calc(100vh - 112px)",
          }}
        >
          <header className="admin-dashboard-header shadow">
            <div className="container p-5">
              <h1 className="display-3 p-0 m-0">Welcome to Dashboard</h1>
              <p className="p-0 m-0">
                We are on a mission to help developers like you build successful
                projects for FREE.
              </p>
            </div>
          </header>
          <main className="p-3 mb-2 admin-dashboard-main ">{children}</main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Layout, Typography, theme } from "antd";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import MenuOptions from "./FrameComponents/MenuOptions";
import { UserOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface AdminPanelProps {
  children: React.ReactNode;
}

const Frame = ({ children }: AdminPanelProps) => {
  const initCollapsed = localStorage.getItem("collapsed");
  const [collapsed, setCollapsed] = useState(
    initCollapsed ? (initCollapsed === "1" ? true : false) : true
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }
  const { user, dashboardTitle } = authContext;

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
        <MenuOptions />
      </Sider>
      <Layout style={{ height: "100vh" }}>
        <Header
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
            <Badge count={1}>
              {user?.name} <Avatar icon={<UserOutlined />} />
            </Badge>
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
          <header
            className="admin-dashboard-header shadow"
            style={{
              background:
                user?.role === "admin"
                  ? "linear-gradient(90deg, rgba(64,58,180,1) 0%, rgba(29,168,253,1) 50%, rgba(118,69,252,1) 100%)"
                  : user?.role === "manager"
                  ? "linear-gradient(90deg, rgba(0,96,18,1) 0%, rgba(0,166,84,1) 50%, rgba(0,139,44,1) 100%)"
                  : "linear-gradient(90deg, rgba(54,54,54,1) 0%, rgba(102,102,102,1) 50%, rgba(89,89,89,1) 100%)",
            }}
          >
            <div className="container p-5">
              <h1 className="display-4 p-0 m-0">{dashboardTitle}</h1>
            </div>
          </header>
          <main className="p-3 mb-2 admin-dashboard-main ">{children}</main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Frame;

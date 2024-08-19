import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Layout, theme } from "antd";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import MenuOptions from "./FrameComponents/MenuOptions";

const { Header, Sider, Content } = Layout;

interface AdminPanelProps {
  children: React.ReactNode;
}

const Frame = ({ children }: AdminPanelProps) => {
  const initCollapsed = localStorage.getItem("collapsed");
  const [collapsed, setCollapsed] = useState(
    initCollapsed ? (initCollapsed === "1" ? true : false) : false
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }
  const { user, activeTime } = authContext;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          // borderRight: "1px solid #e8e8e8",
        }}
      >
        <div
          className="logo"
          style={{
            padding: collapsed ? "16px 8px" : "16px",
            textAlign: "center",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              transition: "all 0.3s",
              maxWidth: "100%",
            }}
          />
        </div>
        <MenuOptions />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
            borderBottom: "1px solid #e8e8e8",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              localStorage.setItem("collapsed", !collapsed ? "1" : "0");
              setCollapsed(!collapsed);
            }}
            style={{
              fontSize: "20px",
              width: "50px",
              height: "50px",
            }}
          />
          <div className="d-flex gap-2">
            <div className="text-muted">
              <>Active Time:</> <b className="text-success">{activeTime}</b>
            </div>
            |
            <div>
              <span >{user?.name} </span>
              <Badge count={1}>
                <Avatar icon={<UserOutlined />} />
              </Badge>
            </div>
          </div>
        </Header>
        <Content
          style={{
            height: "calc(100vh - 112px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <main
            className="card-my"
            style={{
              height: "100%",
              overflow: "auto",
              // margin :"0 10px"
            }}
          >
            {children}
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Frame;

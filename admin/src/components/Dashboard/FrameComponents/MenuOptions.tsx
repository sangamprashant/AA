import {
  CalendarOutlined,
  DashboardOutlined,
  LogoutOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { Menu, Modal, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";

const { Title } = Typography;

const MenuOptions = () => {
  const authContext = useContext(AuthContext);
  const [isLogOutOpen, setIslogOutOpen] = useState<boolean>(false);

  if (!authContext) {
    return null;
  }
  const { logout, user } = authContext;
  const navigate = useNavigate();
  const adminOptions = [
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Contact",
      onClick: () => navigate("/admin/contact"),
    },
    {
      key: "s-m",
      icon: <LibraryBooksIcon />,
      label: "Study Materials",
      onClick: () => navigate("/admin/s-m"),
    },
    {
      key: "employess",
      icon: <PeopleIcon />,
      label: "Employee",
      title: "Employee",
      onClick: () => navigate("/admin/employee"),
    },

    {
      key: "4",
      icon: <PaymentIcon />,
      label: "Payments",
      onClick: () => navigate("/admin/payments"),
    },
  ];
  const managerOptions = [
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Contact",
      onClick: () => navigate("/manager/contact"),
    },
    {
      key: "s-m",
      icon: <LibraryBooksIcon />,
      label: "Study Materials",
      onClick: () => navigate("/manager/s-m"),
    },
    {
      key: "access-content",
      icon: <PeopleAltIcon />,
      label: "Content Access",
      onClick: () => navigate("/manager/c-a"),
    },
    {
      key: "payments",
      icon: <PaymentIcon />,
      label: "Payments",
      onClick: () => navigate("/manager/payments"),
    },
  ];
  const employeeOptions = [

  ];

  const commonOptions = [
    {
      key: "Dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      title: "Go to Dashboard",
      onClick: () => navigate(`/${user?.role}/dashboard`),
    },
    {
      key: "Leads Bucket",
      icon: <CalendarOutlined />,
      label: "Leads Bucket",
      onClick: () => navigate(`/${user?.role}/leads-bucket`),
    },
  ];

  const commonBottom = [
    {
      key: "Setting",
      icon: <SettingsIcon />,
      label: "Setting",
      onClick: () => navigate("/dashboard/setting"),
    },
    {
      key: "Logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      title: "Logout from admin panel",
      onClick: () => {
        setIslogOutOpen(true);
      },
    },
  ];

  // Combine common options with role-specific options
  const items = [
    ...commonOptions,
    ...(user?.role === "admin"
      ? adminOptions
      : user?.role === "manager"
      ? managerOptions
      : user?.role === "employee"
      ? employeeOptions
      : []),
    ...commonBottom,
  ];

  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
      <Modal
        open={isLogOutOpen}
        onClose={() => setIslogOutOpen(false)}
        onCancel={() => setIslogOutOpen(false)}
        onOk={logout}
        centered
      >
        <Title level={4}>Logout Confirmation</Title>
        <p>Are you sure you want to logout from the dashboard?</p>
      </Modal>
    </>
  );
};

export default MenuOptions;

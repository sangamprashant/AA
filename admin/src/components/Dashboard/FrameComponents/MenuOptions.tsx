import {
  CalendarOutlined,
  DashboardOutlined,
  LogoutOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LockResetIcon from "@mui/icons-material/LockReset";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleIcon from "@mui/icons-material/People";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Menu, Modal, Typography } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const { Title } = Typography;

const MenuOptions = () => {
  const authContext = useContext(AuthContext);
  const [isLogOutOpen, setIslogOutOpen] = useState<boolean>(false);

  if (!authContext) {
    return null;
  }

  const { logout, user } = authContext;
  const navigate = useNavigate();

  // Define options for each role
  const adminOptions = [
    {
      key: "leads-bucket",
      icon: <CalendarOutlined />,
      label: "Leads Bucket",
      onClick: () => navigate(`/${user?.role}/leads-bucket`),
    },
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Contact",
      onClick: () => navigate("/admin/contact"),
    },
    {
      key: "study-materials",
      icon: <LibraryBooksIcon />,
      label: "Study Materials",
      onClick: () => navigate("/admin/s-m"),
    },
    {
      key: "employees",
      icon: <PeopleIcon />,
      label: "Employees",
      onClick: () => navigate("/admin/employees"),
    },
    {
      key: "subjects",
      icon: <MenuBookIcon />,
      label: "Subjects",
      onClick: () => navigate("/admin/subjects"),
    },
    {
      key: "teaching-notes",
      icon: <AutoStoriesIcon />,
      label: "Teaching Notes",
      onClick: () => navigate("/admin/teaching-notes"),
    },
    {
      key: "payments",
      icon: <PaymentIcon />,
      label: "Payments",
      onClick: () => navigate("/admin/payments"),
    },
    {
      key: "leave",
      icon: <DateRangeIcon />,
      label: "Leave Management",
      onClick: () => navigate("/admin/leave-management"),
    },
  ];

  const managerOptions = [
    {
      key: "leads-bucket",
      icon: <CalendarOutlined />,
      label: "Leads Bucket",
      onClick: () => navigate(`/${user?.role}/leads-bucket`),
    },
    {
      key: "contact",
      icon: <PhoneOutlined />,
      label: "Contact",
      onClick: () => navigate("/manager/contact"),
    },
    {
      key: "study-materials",
      icon: <LibraryBooksIcon />,
      label: "Study Materials",
      onClick: () => navigate("/manager/s-m"),
    },
    {
      key: "my-employees",
      icon: <PeopleIcon />,
      label: "My Employees",
      onClick: () => navigate("/manager/employees"),
    },
    {
      key: "content-access",
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
    {
      key: "my-attendance",
      icon: <CalendarMonthIcon />,
      label: "My Attendance",
      onClick: () => navigate("/manager/attendance"),
    },
    {
      key: "leave",
      icon: <DateRangeIcon />,
      label: "Leave Management",
      onClick: () => navigate("/manager/leave-management"),
    },
  ];

  const employeeOptions = [
    {
      key: "leads-bucket",
      icon: <CalendarOutlined />,
      label: "Leads Bucket",
      onClick: () => navigate(`/${user?.role}/leads-bucket`),
    },
    {
      key: "my-attendance",
      icon: <CalendarMonthIcon />,
      label: "My Attendance",
      onClick: () => navigate("/employee/attendance"),
    },
  ];

  const teachersOptions = [
    {
      key: "teaching-notes",
      icon: <AutoStoriesIcon />,
      label: "Teaching Notes",
      onClick: () => navigate("/teacher/teaching-notes"),
    },
    {
      key: "my-attendance",
      icon: <CalendarMonthIcon />,
      label: "My Attendance",
      onClick: () => navigate("/employee/attendance"),
    },
  ];

  // Common options available for all users
  const commonOptions = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate(`/${user?.role}/dashboard`),
    },
    {
      key: "profile",
      icon: <AccountCircleIcon />,
      label: "Profile",
      onClick: () => navigate(`/${user?.role}/profile`),
    },
  ];

  // Options at the bottom of the menu
  const commonBottom = [
    {
      key: "Calender",
      icon: user?.role === "admin" ? <EditCalendarIcon /> : <EventNoteIcon />,
      label: user?.role === "admin" ? "Calendar Management" : "Annual Calendar",
      onClick: () => navigate(`/${user?.role}/annual-calendar`),
    },
    {
      key: "Password",
      icon: <LockResetIcon />,
      label: "Password",
      onClick: () => navigate(`/${user?.role}/password`),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => setIslogOutOpen(true),
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
      : user?.role === "teacher"
      ? teachersOptions
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

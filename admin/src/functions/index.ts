import { notification } from "antd";

const getButtonColor = (role: string | undefined) => {
  switch (role) {
    case "admin":
      return "primary";
    case "employee":
      return "secondary";
    case "manager":
      return "success";
    default:
      return "primary"; 
  }
};

const openNotification = (message: string, description: string, type: "success" | "error") => {
  notification[type]({
    message,
    description,
    duration: 5,
  });
};

export { getButtonColor,openNotification };

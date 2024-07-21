import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { LoadingUI } from "../../../../App";
import { Tabs } from "antd";
import ChangeEmail from "./AdminReuse/ChangeEmail";
import ChangePassword from "./AdminReuse/ChangePassword";

const AdminSetting = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <LoadingUI />;
  }
  const { setHeader } = authContext;
  useEffect(() => {
    setHeader("Account Settings");
  }, [authContext]);

  const items = [
    {
      key: "1",
      label: "Change Email",
      children: <ChangeEmail />,
    },
    {
      key: "2",
      label: "Change Password",
      children: <ChangePassword />,
    },
  ];

  return (
    <div className="card p-3 border-0 shadow">
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default AdminSetting;

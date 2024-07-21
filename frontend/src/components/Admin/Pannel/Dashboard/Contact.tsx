import { Tabs } from "antd";
import ContactTable from "./AdminReuse/ContactTable";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { LoadingUI } from "../../../../App";

const AdminFormReceiveContact = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <LoadingUI />;
  }

  const {setHeader}=authContext

  useEffect(()=>{
    setHeader("Contact Form Responses")
  },[authContext])

  const items = [
    {
      label: `Received`,
      key: "1",
      children: <ContactTable type="received" />,
    },
    {
      label: `Responded`,
      key: "2",
      children: <ContactTable type="responded"/>,
    },
  ];
  return (
    <div className="card p-3 border-0 shadow">
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default AdminFormReceiveContact;

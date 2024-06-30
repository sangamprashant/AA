import { Tabs } from "antd";
import ContactTable from "./AdminReuse/ContactTable";

const AdminFormReceiveContact = () => {
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
      <h3 className="display-6 theme-color">Contact Form Responses</h3>
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default AdminFormReceiveContact;

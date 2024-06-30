import { Tabs } from "antd";
import BookingTable from "./AdminReuse/BookingTable";

const AdminBooking = () => {
  const items = [
    {
      label: `Unverified`,
      key: "1",
      children: <BookingTable type="unverified" />,
    },
    {
      label: `Verified`,
      key: "2",
      children: <BookingTable type="verified" />,
    },
  ];

  return (
    <div className="card p-3 border-0 shadow">
      <h3 className="display-6 theme-color">Bookings</h3>
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default AdminBooking;

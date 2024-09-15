import { Tabs } from "antd";
import BookingTable from "./AdminReuse/BookingTable";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { LoadingUI } from "../../../../App";

const AdminBooking = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <LoadingUI />;
  }
  const { setHeader } = authContext;
  useEffect(() => {
    setHeader("Booking Form Responses");
  }, [authContext]);

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
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default AdminBooking;

import type { TabsProps } from "antd";
import BookingTable from "./reuse/LeadsShow";
import { colors } from "../exports";
import TopBar from "../../Employee/components/Bookings/TopBar";

const Bookings = () => {
  const items: TabsProps["items"] = [
    {
      key: "New leads",
      label: "New leads",
      children: <BookingTable type="New leads" />,
    },
    {
      key: "Attempt to contacted (1)",
      label: "Attempt to contacted (1)",
      children: <BookingTable type="Attempt to contacted (1)" />,
    },
    {
      key: "Attempt to contacted (2)",
      label: "Attempt to contacted (2)",
      children: <BookingTable type="Attempt to contacted (2)" />,
    },
    {
      key: "Connected",
      label: "Connected",
      children: <BookingTable type="Connected" />,
    },
    {
      key: "Prospect",
      label: "Prospect",
      children: <BookingTable type="Prospect" />,
    },
    {
      key: "Hot leads",
      label: "Hot leads",
      children: <BookingTable type="Hot leads" />,
    },
    {
      key: "Payment Received",
      label: "Payment Received",
      children: <BookingTable type="Payment Received" />,
    },
    {
      key: "Not Interested",
      label: "Not Interested",
      children: <BookingTable type="Not Interested" />,
    },
  ];

  return (
    <>
      <TopBar />
      <div className="leads">
        {items.map((data, index) => {
          return (
            <div key={index} className="leads-container">
              <div
                className="top mb-2 text-white-50"
                style={{ backgroundColor: colors[index] }}
              >
                <b>{data.label}</b>
              </div>
              <div className="bottom">{data.children}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Bookings;

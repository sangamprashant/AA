import { useState } from "react";
import TopBar from "../../Employee/components/Bookings/TopBar";
import { colors } from "../exports";
import BookingTable from "./reuse/LeadsShow";

const Bookings = () => {
  const items = [
    { label: "New leads" },
    { label: "Attempt to contacted (1)" },
    { label: "Attempt to contacted (2)" },
    { label: "Connected" },
    { label: "Prospect" },
    { label: "Hot leads" },
    { label: "Payment Received" },
    { label: "Not Interested" },
  ];

  return (
    <>
      <TopBar />
      <div className="leads">
        {items.map((data, index) => (
          <LeadsContainer key={index} label={data.label} index={index} />
        ))}
      </div>
    </>
  );
};

export default Bookings;

interface LeadsContainerProps {
  label: string;
  index: number;
}

const LeadsContainer: React.FC<LeadsContainerProps> = ({ label, index }) => {
  const [totalData, setTotalData] = useState<number>(0);

  return (
    <div className="leads-container">
      <div
        className="top mb-2 text-white-50 d-flex justify-content-between"
        style={{ backgroundColor: colors[index % colors.length] }}
      >
        <b>{label}</b>
        <div
          className="fw-bolder"
          style={{
            color: colors[index % colors.length],
            backgroundColor: "#ffffff80",
          }}
        >
          <span className="p-2">{totalData}</span>
        </div>
      </div>
      <div className="bottom">
        <BookingTable type={label} setTotalData={setTotalData} />
      </div>
    </div>
  );
};

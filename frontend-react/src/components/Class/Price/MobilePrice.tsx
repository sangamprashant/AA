import { useState } from "react";
import { useClassContext } from "../ClassContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const MobilePrice = ({ index, tbodyRows, pricePlans }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { classId } = useClassContext();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const getClassSpecificPrice = (
    classId: string,
    prices: Record<string, string>
  ) => prices[classId] || "N.A";

  const priceChat = {
    label: "Total Price",
    data: [
      `₹ ${getClassSpecificPrice(classId, {
        "1-4": "32,200",
        "5": "37,200",
        "6": "37,200",
        "7": "37,200",
        "8": "37,200",
        "9": "42,200",
        "10": "42,200",
        "11": "47,200",
        "12": "47,200",
      })} `,
      `₹ ${getClassSpecificPrice(classId, {
        "1-4": "1,04,200",
        "5": "1,09,200",
        "6": "1,09,200",
        "7": "1,09,200",
        "8": "1,09,200",
        "9": "1,14,200",
        "10": "1,14,200",
        "11": "1,19,200",
        "12": "1,19,200",
      })} `,
    ],
  };

  return (
    <div className="card col-md-5 p-0 mt-5 w-100 ">
      <div className="py-2 px-3">
        <h5>{pricePlans[index].title}</h5>
        <div className="d-flex justify-content-between">
          <p className="m-0 p-0">12 Months</p>
          <p className="m-0 p-0">{priceChat.data[index]}</p>
        </div>
      </div>
      <div
        className="bg-mobile-offering d-flex justify-content-between py-2 px-4"
        onClick={handleToggle}
      >
        <p className="m-0 p-0">View all offerings</p>
        <p className="m-0 p-0">
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </p>
      </div>
      <div className={`price-offerings ${isOpen ? "open" : ""}`}>
        {tbodyRows.map((data: any, i: number) => (
          <div className="d-flex justify-content-between py-2 px-4" key={i}>
            <p className="m-0 p-0">{data.label}</p>
            <p
              className="m-0 p-0 text-end"
              dangerouslySetInnerHTML={{ __html: data.data[index] }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobilePrice;

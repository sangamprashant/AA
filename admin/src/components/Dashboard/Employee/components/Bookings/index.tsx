import type { TabsProps } from "antd";
import { Spin } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../../../config";
import { Booking } from "../../../../../types/booking";
import { AuthContext } from "../../../../context/AuthProvider";
import { colors } from "../../../common/exports";
import CachedIcon from "@mui/icons-material/Cached";

const Bookings = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { token } = authContext;
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setData([]);

    try {
      const response = await axios.get(`${config.SERVER}/employee/bookings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "New leads",
      label: "New leads",
      children: <BookingTable type="New leads" data={data} loading={loading} />,
    },
    {
      key: "Attempt to contacted (1)",
      label: "Attempt to contacted (1)",
      children: (
        <BookingTable
          type="Attempt to contacted (1)"
          data={data}
          loading={loading}
        />
      ),
    },
    {
      key: "Attempt to contacted (2)",
      label: "Attempt to contacted (2)",
      children: (
        <BookingTable
          type="Attempt to contacted (2)"
          data={data}
          loading={loading}
        />
      ),
    },
    {
      key: "Connected",
      label: "Connected",
      children: <BookingTable type="Connected" data={data} loading={loading} />,
    },
    {
      key: "Prospect",
      label: "Prospect",
      children: <BookingTable type="Prospect" data={data} loading={loading} />,
    },
    {
      key: "Hot leads",
      label: "Hot leads",
      children: <BookingTable type="Hot leads" data={data} loading={loading} />,
    },
    {
      key: "Payment Received",
      label: "Payment Received",
      children: (
        <BookingTable type="Payment Received" data={data} loading={loading} />
      ),
    },
    {
      key: "Not Interested",
      label: "Not Interested",
      children: (
        <BookingTable type="Not Interested" data={data} loading={loading} />
      ),
    },
  ];

  return (
    <>
      <div className="nav-bar mb-2">
        <div></div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary">Create Lead</button>
          <button className="btn btn-outline-secondary btn-sm rounded-circle py-1">
            <CachedIcon fontSize="small" />
          </button>
        </div>
      </div>

      <div className="leads">
        {items.map((data, index) => {
          const topBackgroundColor = colors[index];

          return (
            <div key={index} className="leads-container">
              <div
                className="top mb-2"
                style={{ backgroundColor: topBackgroundColor }}
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

interface BookingTableProps {
  type: string;
  data: Booking[];
  loading: boolean;
}

const BookingTable = ({ type, data, loading }: BookingTableProps) => {
  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center h-50 bg-null">
          <Spin tip="Loading bookings..." />
        </div>
      </>
    );
  }
  const filteredData = data.filter((item) => item.state === type);
  return (
    <div className="d-flex flex-column gap-2">
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <Link
            key={item._id}
            className="card border-0 p-2 shadow-sm"
            to={`./${item._id}`}
          >
            <h5 className="card-title">
              {item.firstName} {item.lastName}
            </h5>
            <p className="card-text">
              <strong>Email:</strong> {item.email}
              <br />
              <strong>Phone:</strong> {item.phoneNumber}
              <br />
              <strong>Class:</strong> {item.selectedClass}
              <br />
              <strong>Country:</strong> {item.country}
              <br />
              <strong>Date of Class:</strong>{" "}
              {new Date(item.doc).toLocaleDateString()}
              <br />
              <strong>Allocation Date:</strong>{" "}
              {new Date(item.allocationDate).toLocaleDateString()}
              <br />
              <strong>Created At:</strong>{" "}
              {new Date(item.createdAt).toLocaleString()}
              <br />
              <strong>Updated At:</strong>{" "}
              {new Date(item.updatedAt).toLocaleString()}
            </p>
          </Link>
        ))
      ) : (
        <div
          className="d-flex justify-content-center align-items-center bg-null"
          style={{ height: "65vh" }}
        >
          <b>No Leads found.</b>
        </div>
      )}
    </div>
  );
};

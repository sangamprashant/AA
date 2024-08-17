import { Spin } from "antd";
import { Booking } from "../../../../../types/booking";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import axios from "axios";
import { config } from "../../../../../config";

interface BookingTableProps {
  type: string;
}

const BookingTable = ({ type }: BookingTableProps) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { token, user } = authContext;
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [type, token]);

  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center h-50 bg-null">
          <Spin tip="Loading bookings..." />
        </div>
      </>
    );
  }
  return (
    <div className="d-flex flex-column gap-2">
      {data.length > 0 ? (
        data.map((item) => (
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
              {user?.role !== "employee" && (
                <>
                  <strong>Allocated to:</strong>{" "}
                  {item?.assignedEmployee?.name}
                  <br />
                </>
              )}
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

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${config.SERVER}/auth/bookings`,
        { type: type },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setData(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
};

export default BookingTable;

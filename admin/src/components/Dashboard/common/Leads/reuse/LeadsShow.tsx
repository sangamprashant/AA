import { Pagination, Spin } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../../../config";
import { Booking } from "../../../../../types/booking";
import { AuthContext } from "../../../../context/AuthProvider";
import { useLeads } from "../../../../context/LeadsProvider";

interface BookingTableProps {
  type: string;
  setTotalData: (val: number) => void;
}

const BookingTable = ({ type, setTotalData }: BookingTableProps) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { token, user } = authContext;
  const { sort, reload, dateFilter, customDateRange } = useLeads();
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, [type, token, page, sort, reload, dateFilter, customDateRange]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${config.SERVER}/auth/bookings`,
        {
          type: type,
          page: page,
          limit: limit,
          sort,
          dateFilter,
          customDateRange,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.bookings);
      setTotal(response.data.total);
      setTotalData(response.data.total);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center bg-null"
        style={{ height: "60vh" }}
      >
        <Spin tip="Loading bookings..." />
      </div>
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
                  <strong>Allocated to:</strong> {item?.assignedEmployee?.name}
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
          style={{ height: "60vh" }}
        >
          <b>No Leads found.</b>
        </div>
      )}
      {data.length > 0 && (
        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          onChange={handlePageChange}
          className="mt-3 align-self-center"
        />
      )}
    </div>
  );
};

export default BookingTable;

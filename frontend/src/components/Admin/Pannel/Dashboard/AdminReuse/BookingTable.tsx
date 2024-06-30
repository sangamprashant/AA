import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../../../config";

interface BookingTableProps {
  type: "unverified" | "verified";
}

interface dataSourceProps {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  selectedClass: string;
  doc: Date;
  checked: boolean;
}

const BookingTable = ({ type }: BookingTableProps) => {
  const [dataSource, setDataSource] = useState<dataSourceProps[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchBookings(type);
  }, [type]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Second Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Country Code",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Selected Class",
      dataIndex: "selectedClass",
      key: "selectedClass",
    },
    {
      title: "Date of Class",
      dataIndex: "doc",
      key: "doc",
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (id: string) => (
        <Link
          className={`btn ${
            type === "unverified" ? "theme-btn" : "btn-danger p-2"
          }`}
          to={`/admin/contact/reply/${id}`}
        >
          {type === "unverified" ? "View" : "Delete"}
        </Link>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      className="table-responsive"
    />
  );

  async function fetchBookings(state: string) {
    try {
      const response = await axios.get(
        `${config.SERVER}/booking/by-status/${state}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setDataSource(response.data.bookings);
      }
    } catch (error) {
      console.log("failed to fetch the bookings:", error);
    }
  }
};

export default BookingTable;

import { Modal, Table, TimePicker, TimePickerProps } from "antd";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { config } from "../../../../../config";

interface BookingTableProps {
  type: "unverified" | "verified";
}

interface dataSourceProps {
  _id: string;
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
  const [dataSource, setDataSource] = useState<dataSourceProps[]>([]);
  const [selectedData, setSelectedData] = useState<dataSourceProps | undefined>(
    undefined
  );
  const [modal2Open, setModal2Open] = useState<boolean>(false);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchBookings(type);
  }, [type]);

  const verifiedHasExtra = [
    {
      title: "Time Alloted",
      dataIndex: "time",
      key: "time",
    },
  ];

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
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
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (data: dataSourceProps) => (
        <button
          className={`btn ${
            type === "unverified" ? "theme-btn" : "btn-danger p-2"
          }`}
          onClick={() => handleData(data)}
        >
          {type === "unverified" ? "View" : "Delete"}
        </button>
      ),
    },
  ];

  const timePickerChange: TimePickerProps["onChange"] = (time, timeString) => {
    console.log({ time });
    console.log({ timeString });
    if (typeof timeString === "string") {
      setTime(timeString);
    } else if (Array.isArray(timeString)) {
      setTime(timeString.join(", "));
    }
  };

  return (
    <>
      <Table
        columns={
          type === "unverified" ? columns : [...columns, ...verifiedHasExtra]
        }
        dataSource={dataSource}
        className="table-responsive"
      />
      <Modal
        title="Confirm/Update the booking"
        centered
        open={modal2Open}
        onOk={bookingUpdated}
        onCancel={() => setModal2Open(false)}
      >
        {selectedData && (
          <Fragment>
            {type === "unverified" ? (
              <Fragment>
                <p className="p-0 m-0">
                  <strong>Name:</strong> {selectedData.firstName}{" "}
                  {selectedData.lastName}
                </p>
                <p className="p-0 m-0">
                  <strong>Email:</strong> {selectedData.email}
                </p>
                <p className="p-0 m-0">
                  <strong>Phone:</strong> {selectedData.country}{" "}
                  {selectedData.phoneNumber}
                </p>
                <p className="p-0 m-0">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedData.doc).toLocaleDateString()}
                </p>
                <form className="mt-2">
                  <div className="form-group">
                    <label htmlFor="updateDoc">
                      <strong>Update the Date if required.</strong>
                    </label>
                    <input
                      type="date"
                      value={date || ""}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="updateTime">
                      <strong>Select a Time for the class</strong>
                    </label>
                    <TimePicker
                      className="form-control"
                      use12Hours
                      format="h:mm a"
                      onChange={timePickerChange}
                    />
                  </div>
                </form>
              </Fragment>
            ) : (
              <Fragment>Delete</Fragment>
            )}
          </Fragment>
        )}
      </Modal>
    </>
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
      console.log("Failed to fetch the bookings:", error);
    }
  }

  function handleData(data: dataSourceProps) {
    setSelectedData(data);
    setDate(new Date(data.doc).toISOString().split("T")[0]);
    setTime(undefined);
    setModal2Open(true);
  }

  async function bookingUpdated() {
    try {
      const reqBody = {
        time,
        doc: date,
      };

      const response = await axios.put(
        `${config.SERVER}/booking/update/${selectedData?._id}`,
        reqBody,
        {
          withCredentials: true,
        }
      );

      console.log({ response });
    } catch (error) {
      console.warn({ error });
    } finally {
      setModal2Open(false);
    }
    // console.log({ time });
    // console.log({ date });
  }
};

export default BookingTable;

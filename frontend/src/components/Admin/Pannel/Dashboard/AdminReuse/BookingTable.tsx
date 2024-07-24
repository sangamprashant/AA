import {
  Alert,
  Modal,
  NotificationArgsProps,
  Table,
  TimePicker,
  TimePickerProps,
  notification,
} from "antd";
import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { config } from "../../../../../config";
import { AuthContext } from "../../../Auth/AuthProvider";
import { LoadingUI } from "../../../../../App";

type NotificationPlacement = NotificationArgsProps["placement"];

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
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <LoadingUI />;
  }
  const { token } = authContext;
  const [dataSource, setDataSource] = useState<dataSourceProps[]>([]);
  const [selectedData, setSelectedData] = useState<dataSourceProps | undefined>(
    undefined
  );
  const [modal2Open, setModal2Open] = useState<boolean>(false);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [api, contextHolder] = notification.useNotification();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
    if (typeof timeString === "string") {
      setTime(timeString);
    } else if (Array.isArray(timeString)) {
      setTime(timeString.join(", "));
    }
  };

  return (
    <>
      {contextHolder}
      <Table
        columns={
          type === "unverified" ? columns : [...columns, ...verifiedHasExtra]
        }
        dataSource={dataSource}
        className="table-responsive"
      />
      <Modal
        title={`${
          type === "unverified" ? "Confirm/Update" : "Delete"
        } the booking`}
        centered
        open={modal2Open}
        onOk={type === "unverified" ? bookingUpdated : handleDelete}
        onCancel={() => setModal2Open(false)}
      >
        {selectedData && (
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
            {type === "unverified" ? (
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
                  <Alert
                    type="warning"
                    message={errorMsg}
                    className={`mt-2 opacity-${errorMsg ? "100" : "0"}`}
                  />
                </div>
              </form>
            ) : (
              <p className="text-danger">Do you want to delete the booking?</p>
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    if (!time) {
      setErrorMsg("Time is required.");
      return;
    }
    try {
      const reqBody = {
        time,
        doc: date,
      };

      const response = await axios.put(
        `${config.SERVER}/booking/update/${selectedData?._id}`,
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setDataSource((prev) =>
          prev.filter((item) => item._id !== selectedData?._id)
        );
        setSelectedData(undefined);
        openNotification("Booking confirmed");
      }
    } catch (error) {
      console.warn({ error });
      setErrorMsg("Something went wrong, please try later.");
    } finally {
      setModal2Open(false);
    }
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(
        `${config.SERVER}/booking/delete/${selectedData?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setDataSource((prev) =>
          prev.filter((item) => item._id !== selectedData?._id)
        );
        setSelectedData(undefined);
        openNotification("Booking deleted");
      }
    } catch (error) {
      console.warn({ error });
    } finally {
      setModal2Open(false);
    }
  }

  function openNotification(message: string) {
    api.success({
      message: "Operation Successful",
      description: message,
      placement: "bottomRight" as NotificationPlacement,
    });
  }
};

export default BookingTable;

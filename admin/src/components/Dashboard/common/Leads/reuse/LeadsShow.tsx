import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Badge, Button, Form, Input, Modal, Pagination, Spin, message, notification } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../../../config";
import { Booking } from "../../../../../types/booking";
import { AuthContext } from "../../../../context/AuthProvider";
import { useLeads } from "../../../../context/LeadsProvider";
import { colors } from "../../exports";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

interface BookingTableProps {
  type: string;
  setTotalData: (val: number) => void;
  index: number;
}

const BookingTable = ({ type, setTotalData, index }: BookingTableProps) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { token, user } = authContext;
  const { sort, reload, dateFilter, customDateRange } = useLeads();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<Booking | null>(null);
  const [lodingReminder, setLoadingReminder] = useState<boolean>(false)
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [reminder, setReminder] = useState<string>('');
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

  const handleModalClose = () => {
    setOpenModal(false);
    setModalContent(null);
  };

  const handleModalOpen = (data: Booking) => {
    setModalContent(data);
    setReminder(data.reminder || '');
    setOpenModal(true);
  };

  const handleReminderSubmit = async () => {
    try {
      if (!modalContent) return;
      setLoadingReminder(true)
      const response = await axios.put(
        `${config.SERVER}/auth/bookings/${modalContent._id}/reminder`,
        { reminder },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        notification.success({
          message: "Reminder updated successfully",
          description: response.data.message || "Your reminder has been updated",
        });
        setData((prevData) =>
          prevData.map((item) =>
            item._id === modalContent._id ? { ...item, reminder } : item
          )
        );
        handleModalClose();
      }
    } catch (error: any) {
      console.error("Error setting reminder:", error);
      message.error(error.response.data.message || "Failed to set reminder.");
    } finally {
      setLoadingReminder(false)
    }
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
    <>
      <div className="d-flex flex-column gap-2">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id}
              className="card border-0 p-2 shadow-sm position-relative card-hover-leads"
            >
              <h5 className="card-title">
                {item.firstName} {item.lastName}
              </h5>
              <p className="card-text m-0">
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
                {item.reminder && (
                  <span className='text-success'>
                    <br />
                    <strong><NotificationsActiveIcon fontSize='small'/> Reminder:</strong> {item.reminder}
                  </span>
                )}
              </p>
              {/* Icons in the top-right corner */}
              <span className="icon-wrapper-leads position-absolute top-0 end-0 p-2">
                <div className="d-flex justify-content-center flex-column gap-2">
                  <Link to={`./${item._id}`} className="btn btn-sm text-white px-0" style={{ backgroundColor: colors[index % colors.length] }}>
                    <VisibilityIcon />
                  </Link>
                  <Badge dot={item.reminder ? true : false}>
                    <span className="btn btn-sm text-white p-1" style={{ backgroundColor: colors[index % colors.length] }} onClick={() => handleModalOpen(item)}>
                      <NotificationImportantIcon />
                    </span>
                  </Badge>
                </div>
              </span>
            </div>
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

      {/* Modal for setting reminder */}
      <Modal
        open={openModal}
        onCancel={handleModalClose}
        onOk={handleReminderSubmit}
        centered
        title="Set Reminder"
        footer={[
          <Button key="set" type="primary" onClick={handleReminderSubmit} loading={lodingReminder}>
            Set Reminder
          </Button>,
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        <Form.Item label="Enter Reminder" layout='vertical'>
          <Input
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            placeholder="Set a reminder"
          />
        </Form.Item>
      </Modal>
    </>
  );
};

export default BookingTable;

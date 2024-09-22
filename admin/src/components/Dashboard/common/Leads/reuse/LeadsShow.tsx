import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Badge, Button, Form, Input, Modal, Pagination, Select, Spin, message, notification } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../../../config";
import { Booking } from "../../../../../types/booking";
import { AuthContext } from "../../../../context/AuthProvider";
import { useLeads } from "../../../../context/LeadsProvider";
import { colors } from "../../exports";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

interface BookingTableProps {
  type: string;
  setTotalData: (val: number) => void;
  index: number;
}

interface employeesProps {
  _id: string;
  name: string;
  email: string
}

const BookingTable = ({ type, setTotalData, index }: BookingTableProps) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { token, user } = authContext;
  const { sort, reload, dateFilter, customDateRange, radioOptionsLeads } = useLeads();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<Booking | null>(null);
  const [lodingReminder, setLoadingReminder] = useState<boolean>(false)
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [reminder, setReminder] = useState<string>('');
  const limit = 10;
  const [employees, setEmployees] = useState<employeesProps[]>([])
  const [openModalEmp, setOpenModalEmp] = useState<boolean>(false);
  const [selectedEmp, setSelectedEmp] = useState("")

  useEffect(() => {
    fetchData();
  }, [type, token, page, sort, reload, dateFilter, customDateRange, radioOptionsLeads]);

  useEffect(() => {
    fetchUsers()
  }, [])

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
          createdOrUpdated: radioOptionsLeads
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

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.SERVER}/auth/admin-manager-get-employees`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      // Check if the request was successful
      if (response.data.success) {
        setEmployees(response.data.employees)
      } else {
        // Handle the scenario when the response is not successful
        console.error('Error fetching employees:', response.data.error);
        // Display error to the user or handle it appropriately
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error('An error occurred while fetching employees:', error);
      // Optionally display an error message to the user or log it for debugging
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
                    <strong><NotificationsActiveIcon fontSize='small' /> Reminder:</strong> {item.reminder}
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
                  {(user?.role === "admin" || user?.role === "manager") && <span className='btn btn-sm text-white px-0' style={{ backgroundColor: colors[index % colors.length] }} onClick={() => handleEmpModalOpen(item)}><TransferWithinAStationIcon /></span>}
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

      <Modal
        centered
        title="Change emplyee of the lead."
        open={openModalEmp}
        onCancel={handleEmpModalClose}
        onClose={handleEmpModalClose}
        footer={[
          <Button key="close" type='primary' danger onClick={handleEmpModalClose}>Close</Button>,
          <Button key="Ok" type='primary' onClick={updateLeadsEmployee}>Update</Button>
        ]}
      >
        <Form.Item label="Select an employee" required layout='vertical'>
          <Select value={selectedEmp} onChange={(e) => setSelectedEmp(e)}>
            {employees.map((emp, ind) => (<Select.Option value={emp._id} key={ind}>{emp.name}{" | "}{emp.email} </Select.Option>))}
          </Select>
        </Form.Item>

      </Modal>

    </>
  );

  function handleEmpModalOpen(data: Booking) {
    setOpenModalEmp(true)
    setModalContent(data);
    setSelectedEmp(data.assignedEmployee._id)
  }

  function handleEmpModalClose() {
    setOpenModalEmp(false)
    setModalContent(null);
  }

  async function updateLeadsEmployee() {
    if (!modalContent) {
      notification.error({
        message: 'Missing Information',
        description: 'Please select a booking before assigning an employee.'
      });
      return;
    }

    if (!selectedEmp) {
      notification.error({
        message: 'Missing Information',
        description: 'Please select an employee to assign.'
      });
      return;
    }

    if (modalContent?.assignedEmployee._id === selectedEmp) {
      notification.warning({
        message: 'Employee is already assigned',
        description: ""
      });
      return;
    }

    try {
      const response = await axios.put(`${config.SERVER}/auth/update-employee-leads`, {
        bookingId: modalContent._id,
        newEmployeeId: selectedEmp
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setData(prevData =>
          prevData.map(item =>
            item._id === modalContent._id
              ? { ...item, assignedEmployee: { _id: selectedEmp, name: modalContent.assignedEmployee.name, email: modalContent.assignedEmployee.email } }
              : item
          )
        );

        notification.success({
          message: 'Employee updated successfully',
          description: response.data.message || "The employee has been updated."
        });

        // Close the modal
        handleEmpModalClose();
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to update employee assignment.");
    }
  }

};

export default BookingTable;

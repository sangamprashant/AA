import { Button, DatePicker, Input, Modal, notification, Table, Tabs, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useContext, useEffect, useState } from "react";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";
import ReloadIcon from "@mui/icons-material/Refresh";

// Extend dayjs with isBetween
dayjs.extend(isBetween);

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const Contact = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [reload, setReload] = useState<boolean>(false);

  const handleReload = () => setReload((prev) => !prev);

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>CONTACTS</h5>
        <div className="d-flex gap-2">
          <Input
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "200px" }}
          />
          <RangePicker
            placeholder={["Start Date", "End Date"]}
            value={dateRange}
            onChange={(dates) => setDateRange(dates?.length === 2 ? dates : [null, null])}
          />
          <Button type="primary" icon={<ReloadIcon />} onClick={handleReload} />
        </div>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Contacts Received" key="1">
          <ContactTable type="received" searchTerm={searchTerm} dateRange={dateRange} reload={reload} />
        </TabPane>
        <TabPane tab="Contacts Responded" key="2">
          <ContactTable type="responded" searchTerm={searchTerm} dateRange={dateRange} reload={reload} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Contact;

type Contact = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  responseMessage?: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
};

type ModalState = {
  isOpen: boolean;
  content: Contact | null;
  type: "delete" | "respond";
};

type ContactTableProps = {
  type: "received" | "responded";
  searchTerm: string;
  dateRange: [Dayjs | null, Dayjs | null];
  reload: boolean;
};

const ContactTable = ({ type, searchTerm, dateRange, reload }: ContactTableProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [modal, setModal] = useState<ModalState>({ isOpen: false, content: null, type: "respond" });
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [responseLoading, setResponseLoading] = useState<boolean>(false);
  const [reloadAction, setReloadAction] = useState<boolean>(false)

  const { token, user } = useContext(AuthContext) || {};
  const role = user?.role;

  const fetchContacts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.SERVER}/auth/contacts`, {
        params: { type, page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedContacts = response.data;
      if (fetchedContacts.length < pageSize) setHasMore(false);
      setContacts((prev) => [...prev, ...fetchedContacts]);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setContacts([]);
    setFilteredContacts([]);
    fetchContacts(1);
  }, [type, reload, token, reloadAction]);

  useEffect(() => {
    let filteredData = contacts;
    if (searchTerm) {
      filteredData = filteredData.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (dateRange[0] && dateRange[1]) {
      filteredData = filteredData.filter((contact) =>
        dayjs(contact.createdAt).isBetween(dateRange[0], dateRange[1], "day", "[]")
      );
    }
    setFilteredContacts(filteredData);
  }, [searchTerm, dateRange, contacts]);

  const columns: ColumnsType<Contact> = [
    {
      title: "Name",
      dataIndex: "",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      render: (record) => `${record.firstName} ${record.lastName}`,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Message", dataIndex: "message", key: "message" },
    {
      title: type === "responded" ? "Response Message" : "Received At",
      key: type === "responded" ? "responseMessage" : "createdAt",
      render: (record) =>
        type === "responded" ? record?.responseMessage : dayjs(record?.createdAt).format("YYYY-MM-DD HH:mm"),
    },
  ];

  if (role === "admin" || role === "manager") {
    columns.push({
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="d-flex gap-2">
          {type === "received" && (
            <Tooltip title="Mark as Responded">
              <Button type="primary" onClick={() => openModal(record)}>Respond</Button>
            </Tooltip>
          )}
          {role === "admin" && (
            <Tooltip title="Delete Contact">
              <Button type="primary" danger onClick={() => openModal(record, "delete")}>Delete</Button>
            </Tooltip>
          )}
        </div>
      ),
    });
  }

  const handleRespond = async (id: string | undefined) => {
    if (!responseMessage.trim()) {
      notification.warning({ message: "Response Required", description: "Response message is required." });
      return;
    }

    try {
      setResponseLoading(true)
      const response = await axios.post(
        `${config.SERVER}/auth/contact/reply/${id}`,
        { responseMessage: responseMessage.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        notification.success({ message: "Response Sent", description: "Response sent successfully." });
        setResponseMessage("");
        closeModal();
        setReloadAction((prev) => !prev);
      }
    } catch (error: any) {
      console.error(error);
      notification.error({ message: "Error", description: error.response?.data?.message || "Server error." });
    } finally {
      setResponseLoading(false)
    }
  };


  const handleDelete = async (id: string | undefined) => {
    try {
      const response = await axios.delete(`${config.SERVER}/auth/contact/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        notification.success({
          message: "Contact Deleted",
          description: "Contact deleted successfully."
        })
        setReloadAction((prev) => !prev);
        closeModal();
      }
    }
    catch (error: any) {
      console.error(error);
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Server error."
      });
    };
  }

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchContacts(page + 1);
  };

  const openModal = (content: Contact, type: "respond" | "delete" = "respond") => {
    setModal({ isOpen: true, content, type });
  };

  const closeModal = () => setModal({ isOpen: false, content: null, type: "respond" });

  return (
    <div>
      <Table dataSource={filteredContacts} columns={columns} rowKey={(record) => record._id} pagination={false} loading={loading} />
      <div className="d-flex justify-content-center mt-3">
        {hasMore ? (
          <Button onClick={loadMore} loading={loading}>Load More</Button>
        ) : (
          <p className="text-center">No more content available</p>
        )}
      </div>

      <Modal open={modal.isOpen} onCancel={closeModal} centered title={modal.type === "delete" ? "Delete the message" : "Reply to message"} footer={modal.type === "delete" ? (
        <Button type="primary" danger onClick={() => handleDelete(modal.content?._id)} loading={responseLoading}>Delete</Button>
      ) : (
        <Button type="primary" onClick={() => handleRespond(modal.content?._id)} loading={responseLoading}>Send Response</Button>
      )}>
        {modal.type === "respond" ? (
          <>
            <p className="fw-bold mb-1">User Message:</p>
            <p>{modal.content?.message}</p>
            <Input.TextArea
              rows={4}
              placeholder="Enter your response here"
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
            />
          </>
        ) : (
          <p>Are you sure you want to delete this message? This action cannot be undone.</p>
        )}
      </Modal>
    </div>
  );
};

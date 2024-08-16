import { Button, DatePicker, Input, Modal, Table, Tabs, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useContext, useEffect, useState } from "react";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";

// Extend dayjs with isBetween
dayjs.extend(isBetween);

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const Contact = () => {
  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>CONTACTS</h5>
        <div className="d-flex gap-2">
          {/* Add any additional buttons or links if needed */}
        </div>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Contacts Received" key="1">
          <ContactTable type="received" />
        </TabPane>
        <TabPane tab="Contacts Responded" key="2">
          <ContactTable type="responded" />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Contact;

type ContactTableProps = {
  type: "received" | "responded";
};

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
  content: Contact | null; // This allows any valid React node (e.g., elements, strings, etc.)
  type: "delete" | "respond";
};

const ContactTable = ({ type }: ContactTableProps) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    content: null, // Initialize content to null or any default value
    type: "respond",
  });

  const global = useContext(AuthContext);

  if (!global) return null;

  const { token, user } = global;
  const role = user?.role;

  const fetchContacts = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.SERVER}/auth/contacts`, {
        params: {
          type,
          page,
          pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedContacts = response.data;
      if (fetchedContacts.length < pageSize) {
        setHasMore(false);
      }
      setContacts((prev) => [...prev, ...fetchedContacts]);
      // setFilteredContacts(prev => [...prev, ...fetchedContacts]);
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
  }, [type, token]);

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
        dayjs(contact.createdAt).isBetween(
          dateRange[0],
          dateRange[1],
          "day",
          "[]"
        )
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
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: type === "responded" ? "Response Message" : "Received At",
      key: type === "responded" ? "responseMessage" : "createdAt",
      render: (record) =>
        type === "responded"
          ? record?.responseMessage
          : dayjs(record?.createdAt).format("YYYY-MM-DD HH:mm"),
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
              <Button type="primary" onClick={() => openModal(record)}>
                Respond
              </Button>
            </Tooltip>
          )}
          {role === "admin" && (
            <Tooltip title="Delete Contact">
              <Button type="primary" danger onClick={() => adminDelete(record)}>
                Delete
              </Button>
            </Tooltip>
          )}
        </div>
      ),
    });
  }

  const handleRespond = (id: string | undefined) => {
    // Implement respond logic here
    console.log(`Respond to contact with id: ${id}`);
  };

  const handleDelete = (id: string | undefined) => {
    // Implement delete logic here
    console.log(`Delete contact with id: ${id}`);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchContacts(page + 1);
  };

  const loadAll = () => {
    setPage(1);
    setHasMore(false);
    setContacts([]);
    fetchContacts(1);
  };

  const adminDelete = (content: Contact) => {
    setModal({
      isOpen: true,
      content,
      type: "delete",
    });
  };

  const openModal = (content: Contact) => {
    setModal({
      isOpen: true,
      content,
      type: "respond",
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      content: null,
      type: "respond",
    });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center mb-3 gap-2">
        <Input
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "200px" }}
        />
        <RangePicker
          placeholder={["Start Date", "End Date"]}
          value={dateRange}
          onChange={(dates) => {
            if (dates && dates.length === 2) {
              setDateRange(dates as [Dayjs, Dayjs]);
            } else {
              setDateRange([null, null]);
            }
          }}
        />
      </div>
      <Table
        dataSource={filteredContacts}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={false}
        loading={loading}
      />
      <div className="d-flex justify-content-center mt-3">
        {hasMore && (
          <Button onClick={loadMore} loading={loading}>
            Load More
          </Button>
        )}
        {!hasMore && (
          <Button onClick={loadAll} disabled={loading}>
            Load All
          </Button>
        )}
      </div>
      <Modal
        open={modal.isOpen}
        onCancel={closeModal}
        centered
        title={
          modal.type === 'delete' ? 'Delete the message' : 'Reply to message'
        }
        footer={
          <>
            {modal.type === 'delete' ? (
              <Button
                type="primary"
                danger
                onClick={() => modal.content && handleDelete(modal.content._id)}
              >
                Delete
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => modal.content && handleRespond(modal.content._id)}
              >
                Submit
              </Button>
            )}
            <Button type="default" onClick={closeModal}>
              Cancel
            </Button>
          </>
        }
      >
        {modal.content ? (
          <div>
            <p><strong>Name:</strong> {modal.content.firstName} {modal.content.lastName}</p>
            <p><strong>Email:</strong> {modal.content.email}</p>
            <p><strong>Phone Number:</strong> {modal.content.phoneNumber}</p>
            <p><strong>Message:</strong> {modal.content.message}</p>
            {modal.content.responseMessage ? (
              <p><strong>Response Message:</strong> {modal.content.responseMessage}</p> 
            ):<><p><strong>Response Message:</strong></p> 
            <textarea name="" id="" className="form-control" placeholder="write a reply.."></textarea>
            </>}
          </div>
        ) : (
          <p>No content available</p>
        )}
      </Modal>
    </div>
  );
};

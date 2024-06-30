import { Table } from "antd";
import { Link } from "react-router-dom";

interface ContactTableProps {
  type: "received" | "responded";
}

const ContactTable = ({ type }: ContactTableProps) => {

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Second Name",
      dataIndex: "secondName",
      key: "secondName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Message",
      dataIndex: "message",

      key: "message",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: (id: string) => (
        <Link
          className={`btn ${
            type === "received" ? "theme-btn" : "btn-danger p-2"
          }`}
          to={`/admin/contact/reply/${id}`}
        >
          {type === "received" ? "View" : "Delete"}
        </Link>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      firstName: "John",
      secondName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      message: "Hello, this is a test message.",
    },
    {
      key: "2",
      firstName: "Jane",
      secondName: "Smith",
      email: "jane.smith@example.com",
      phone: "098-765-4321",
      message: "Another test message.",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      // bordered
      className="table-responsive"
    />
  );
};

export default ContactTable;

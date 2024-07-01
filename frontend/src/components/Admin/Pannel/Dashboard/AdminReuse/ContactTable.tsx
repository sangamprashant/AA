import { Alert, Modal, NotificationArgsProps, Table, notification } from "antd";
import axios from "axios";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { config } from "../../../../../config";

type NotificationPlacement = NotificationArgsProps["placement"];

interface ContactTableProps {
  type: "received" | "responded";
}

interface dataSourceProps {
  _id?: string;
  firstName: string;
  email: string;
  lastName: string;
  message: string;
  phoneNumber: string;
  checked?: boolean;
  responseMessage?: string;
}

const ContactTable = ({ type }: ContactTableProps) => {
  const [dataSource, setdataSource] = useState<dataSourceProps[]>([]);
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [selectData, setSelectedData] = useState<dataSourceProps | null>(null);
  const [responseMsg, setResponseMsg] = useState<string | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    fetchData(type);
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
      key: "secondName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
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
      dataIndex: "",
      render: (data: dataSourceProps) => (
        <button
          className={`btn ${
            type === "received" ? "theme-btn" : "btn-danger p-2"
          }`}
          onClick={() => handelDataSelection(data)}
        >
          {type === "received" ? "View" : "Delete"}
        </button>
      ),
    },
  ];

  return (
    <Fragment>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={dataSource}
        className="table-responsive"
      />
      <Modal
        open={modelOpen}
        onOk={type === "received" ? handleResponseSend : handleResponseDelete}
        onCancel={() => setModelOpen(false)}
        centered
        title="Contact Form details."
      >
        <p>
          <b>Name: </b>
          {selectData?.firstName} {selectData?.lastName}
        </p>
        <p>
          <b>Email: </b>
          {selectData?.email}
        </p>
        <p>
          <b>Phone: </b>
          {selectData?.phoneNumber}
        </p>
        <p>
          <b>Message: </b>
          {selectData?.message}
        </p>
        {type === "received" ? (
          <Fragment>
            <form>
              <div>
                <label htmlFor="response-user">
                  <b>Reply to message</b>
                </label>
                <textarea
                  rows={3}
                  className="form-control"
                  placeholder="Write the response here.."
                  value={responseMsg}
                  onChange={(e) => setResponseMsg(e.target.value)}
                ></textarea>
              </div>
            </form>
          </Fragment>
        ) : (
          <Fragment>
            <p className="text-danger">Do you want to delete the response?</p>
          </Fragment>
        )}
        <Alert
          type="warning"
          message={errorMsg}
          className={`my-2 opacity-${errorMsg ? "100" : "0"}`}
        />
      </Modal>
    </Fragment>
  );

  async function fetchData(status: string) {
    try {
      const response = await axios.get(`${config.SERVER}/contact/${status}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setdataSource(response.data.contacts);
      }
    } catch (error) {
      console.log("failed to fetch contact:", error);
    }
  }

  async function handelDataSelection(data: dataSourceProps) {
    setSelectedData(data);
    setModelOpen(true);
    setErrorMsg("");
    setResponseMsg("");
  }

  async function handleResponseSend(e: FormEvent) {
    e.preventDefault();
    if (!responseMsg?.trim()) {
      return setErrorMsg("Response message is needed.");
    }
    const responseBody = {
      responseMessage: responseMsg.trim(),
    };
    try {
      const response = await axios.post(
        `${config.SERVER}/contact/${selectData?._id}`,
        responseBody,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setModelOpen(false);
        fetchData(type);
        setResponseMsg("");
        setdataSource((prev) =>
          prev.filter((item) => item._id !== selectData?._id)
        );
        openNotification("Response sent!");
      }
    } catch (error) {
      console.log("Failed to send response:", error);
      setErrorMsg("Something went wrong, please try again later!");
    }
  }

  async function handleResponseDelete() {
    if (!selectData?._id) {
      return setErrorMsg("No contact selected for deletion.");
    }

    try {
      const response = await axios.delete(
        `${config.SERVER}/contact/${selectData._id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setModelOpen(false);
        fetchData(type);
        openNotification("Contact deleted.");
      }
    } catch (error) {
      console.log("Failed to delete response:", error);
      setErrorMsg("Something went wrong, please try again later!");
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

export default ContactTable;

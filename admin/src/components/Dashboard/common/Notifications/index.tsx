import { Button, Modal, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useContext, useEffect, useState } from "react";
import type { NotificationProps, NotificationPropsData } from "../../../../types/notifications";
import { AuthContext } from "../../../context/AuthProvider";

const Notifications = () => {
  const globlas = useContext(AuthContext);
  if (!globlas) return null;

  // Extract notificationsData and ensure it's typed correctly
  const { notificationsData } = globlas as { notificationsData: NotificationPropsData };
  
  // Provide a default empty array if notificationsData.notifications is undefined
  const notifications: NotificationProps[] = notificationsData?.notifications || [];
  const [selectedNotification, setSelectedNotification] = useState<NotificationProps | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleNotificationClick = (notification: NotificationProps) => {
    setSelectedNotification(notification);
  };

  const handleModalClose = () => {
    setSelectedNotification(null);
  };

  const columns: ColumnsType<NotificationProps> = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Seen",
      dataIndex: "seen",
      key: "seen",
      render: (text: boolean) => (text ? "Yes" : "No"),
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text: Date) => {
        // Ensure text is a Date object
        const date = new Date(text);
        return date.toLocaleString();
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: NotificationProps) => (
        <Button type="primary" onClick={() => handleNotificationClick(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Notifications</h2>
      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={notifications}
          columns={columns}
          rowKey={(record) => new Date(record.timestamp).toISOString()} // Ensure timestamp is a Date object
        />
      )}
      <Modal
        title="Notification Details"
        open={!!selectedNotification}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedNotification && (
          <div>
            <p>
              <strong>Message:</strong> {selectedNotification.message}
            </p>
            <p>
              <strong>Seen:</strong> {selectedNotification.seen ? "Yes" : "No"}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(selectedNotification.timestamp).toISOString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Notifications;

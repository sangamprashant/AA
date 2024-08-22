import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Button, Typography } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import type { MenuProps } from "antd";

const { Text } = Typography;

export interface NotificationProps {
  message: string;
  seen: boolean;
  timestamp: Date;
}

export interface NotificationPropsData {
  notifications: NotificationProps[];
  unseenCount: number;
}

const NotificationComponent = () => {
  const authContext = useContext(AuthContext);
  const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);
  const [lodingMarkAll, setLoadingMarkAll] = useState<boolean>(false);
  const [lodingClearAll, setLoadingClearAll] = useState<boolean>(false);

  if (!authContext) {
    return null;
  }

  const {
    user,
    notificationsData,
    markNotificationAsSeen,
    markAllAsSeen,
    clearAllNotifications,
  } = authContext;

  const handleMarkAsSeen = async (index: number) => {
    setLoadingIndexes((prev) => [...prev, index]);
    await markNotificationAsSeen(index);
    setLoadingIndexes((prev) => prev.filter((i) => i !== index));
  };

  const handleMarkAllSeen = async () => {
    setLoadingMarkAll(true);
    await markAllAsSeen();
    setLoadingMarkAll(false);
  };

  const handleClearAll = async () => {
    setLoadingClearAll(true);
    await clearAllNotifications();
    setLoadingClearAll(false);
  };

  const items: MenuProps["items"] = notificationsData?.notifications?.length
    ? [
        ...notificationsData.notifications.map((notification, index) => ({
          key: index.toString(),
          label: (
            <div
              style={{
                maxWidth: "500px",
                whiteSpace: "normal",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                width: "100%",
                maxHeight: "50vh",
                overflowY: "auto",
              }}
            >
              <Text strong={!notification.seen}>{notification.message}</Text>
              <br />
              <div className="d-flex justify-content-between">
                <Text type="secondary">
                  {new Date(notification.timestamp).toLocaleString()}
                </Text>
                {!notification.seen && (
                  <Button
                    type="link"
                    loading={loadingIndexes.includes(index)}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent dropdown from closing
                      handleMarkAsSeen(index);
                    }}
                    style={{ padding: 0 }}
                  >
                    Mark as Seen
                  </Button>
                )}
              </div>
            </div>
          ),
        })),
        { type: "divider" as const },
        {
          key: "mark-all-seen",
          label: (
            <Button
              type="link"
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAllSeen();
              }}
              loading={lodingMarkAll}
            >
              Mark All as Seen
            </Button>
          ),
        },
        {
          key: "clear-all",
          label: (
            <Button
              type="link"
              danger
              loading={lodingClearAll}
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
            >
              Clear All Notifications
            </Button>
          ),
        },
      ]
    : [
        {
          key: "no-notifications",
          label: (
            <div
              style={{
                maxWidth: "500px",
                whiteSpace: "normal",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                width: "100%",
              }}
            >
              <Text style={{ width: "100%" }}>No notifications</Text>
            </div>
          ),
          disabled: true,
        },
      ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div style={{ cursor: "pointer" }}>
        <span>{user?.name}</span>
        <Badge count={notificationsData?.unseenCount}>
          <Avatar icon={<UserOutlined />} />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationComponent;

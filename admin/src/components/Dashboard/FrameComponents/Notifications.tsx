import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import type { MenuProps } from "antd";
import { Avatar, Badge, Button, Dropdown, Typography } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const { Text } = Typography;

const NotificationComponent = () => {
  const authContext = useContext(AuthContext);
  const [loadingIndexes, setLoadingIndexes] = useState<number[]>([]);
  const [lodingMarkAll, setLoadingMarkAll] = useState<boolean>(false);
  const [lodingClearAll, setLoadingClearAll] = useState<boolean>(false);

  if (!authContext) {
    return null;
  }

  const {
    notificationsData,
    markNotificationAsSeen,
    markAllAsSeen,
    clearAllNotifications,
  } = authContext;

  const handleMarkAsSeen = async (notificationId: string, index: number) => {
    setLoadingIndexes((prev) => [...prev, index]);
    await markNotificationAsSeen(notificationId, index);
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
                    handleMarkAsSeen(notification._id, index);
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
            <Text style={{ width: "100%" }}>No notificationFs</Text>
          </div>
        ),
        disabled: true,
      },
    ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}
      overlayStyle={{ maxHeight: "50vh", overflowY: "auto" }}
    >
      <div style={{ cursor: "pointer" }}>
        <Badge count={notificationsData?.unseenCount}>
          <Avatar icon={<NotificationsNoneIcon />} />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationComponent;

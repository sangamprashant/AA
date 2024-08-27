import { notification } from "antd";
import axios from "axios";
import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { config } from "../../config";
import { NotificationPropsData } from "../../types/notifications";

interface User {
  _id: string;
  role: "admin" | "manager" | "employee" | "teacher";
  name: string | null;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  dashboardTitle: string;
  setDashboardTitle: (title: string) => void;
  logout: () => Promise<void>;
  token: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  activeTime: string;
  notificationsData: NotificationPropsData | null;
  markNotificationAsSeen: (notificationId: string, index: number) => void;
  markAllAsSeen: () => void;
  clearAllNotifications: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardTitle, setDashboardTitle] = useState<string>("Dashboard");
  const [token, setToken] = useState<string>(
    sessionStorage.getItem("token") || ""
  );
  const [activeTime, setActiveTime] = useState<string>("");
  const [notificationsData, setNotificationsData] =
    useState<NotificationPropsData | null>(null);

  useLayoutEffect(() => {
    setToken(token);
    if (token) {
      Promise.all([handleFetchProtectedData(), fetchNotifications()]);
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${config.SERVER}/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setNotificationsData({
          notifications: data.notifications,
          unseenCount: data.unseenCount,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchProtectedData = async (): Promise<void> => {
    try {
      const response = await axios.get(`${config.SERVER}/auth/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setIsLoggedIn(true);
        setUser(response.data.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching protected data:", error);
      setIsLoggedIn(false);
      logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Retrieve the userId from sessionStorage
      if (!token) {
        throw new Error("User ID not found in session.");
      }

      // Make an API call to log out and record active time
      const response = await axios.get(`${config.SERVER}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Show success notification
        notification.success({
          message: "Logout Successful",
          description:
            "You have been logged out successfully. Your active time has been recorded.",
        });
        setUser(null);
        setToken("");
        sessionStorage.clear();
        window.location.href = "/";
      }
    } catch (error: any) {
      console.error("Logout error:", error);

      // Show error notification
      notification.error({
        message: "Logout Failed",
        description:
          error?.response?.data?.message ||
          "There was an error logging out. Please try again.",
      });
    }
  };

  const setHeader = (title: string) => {
    setDashboardTitle(title);
  };

  const markNotificationAsSeen = async (
    notificationId: string,
    index: number
  ) => {
    try {
      const response = await axios.get(
        `${config.SERVER}/notifications/mark-as-seen`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { notificationId },
        }
      );

      if (response.data.success) {
        setNotificationsData((prev) => {
          const notifications = prev?.notifications ?? [];
          const newNotifications = [...notifications];

          if (newNotifications[index]) {
            newNotifications[index].seen = true;
          }

          return {
            notifications: newNotifications,
            unseenCount: newNotifications.filter((n) => !n.seen).length,
          };
        });
      }
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  const markAllAsSeen = async () => {
    try {
      const response = await axios.get(
        `${config.SERVER}/notifications/mark-all-as-seen`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNotificationsData((prev) => {
          const notifications =
            prev?.notifications?.map((n) => ({ ...n, seen: true })) ?? [];
          return {
            notifications,
            unseenCount: 0,
          };
        });
      }
    } catch (error) {
      console.error("Error marking all notifications as seen:", error);
    } finally {
    }
  };

  const clearAllNotifications = async () => {
    try {
      const response = await axios.get(
        `${config.SERVER}/notifications/clear-all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNotificationsData({
          notifications: [],
          unseenCount: 0,
        });
      }
    } catch (error) {
      console.error("Error clearing all notifications:", error);
    } finally {
    }
  };

  useEffect(() => {
    const calculateActiveTime = () => {
      const loginTimeStr = localStorage.getItem("loginTime");
      if (loginTimeStr) {
        const loginTime = new Date(loginTimeStr);
        const now = new Date();
        const diffMs = now.getTime() - loginTime.getTime();

        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);

        const seconds = diffSeconds % 60;
        const minutes = diffMinutes % 60;
        const hours = diffHours;

        setActiveTime(`${hours} : ${minutes} : ${seconds}`);
      }
    };

    const intervalId = setInterval(calculateActiveTime, 1000);
    calculateActiveTime();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn,
        setIsLoggedIn,
        dashboardTitle,
        setDashboardTitle: setHeader,
        logout,
        token,
        setUser,
        setToken,
        activeTime,
        notificationsData,
        markNotificationAsSeen,
        markAllAsSeen,
        clearAllNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

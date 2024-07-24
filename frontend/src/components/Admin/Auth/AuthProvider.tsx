import axios from "axios";
import Cookies from "js-cookie";
import React, {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { config } from "../../../config";

interface User {
  userId: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  forButtonLoading: boolean;
  loginError: string | null;
  dashboardTitle: string;
  setHeader: (h: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [forButtonLoading, setForButtonLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>("");
  const [dashboardTitle, setDashboardTitle] = React.useState<string>("");

  useEffect(() => {
    handleFetchProtectedData();
  }, []);

  const handleFetchProtectedData = async (): Promise<void> => {
    try {
      const response = await axios.get(`${config.SERVER}/protected`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setIsLoggedIn(true);
        setUser(response.data.user);
      }
      // console.log("Protected data:", response.data);
    } catch (error) {
      // console.error("Error fetching protected data:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setForButtonLoading(true);
      const response = await axios.post(
        `${config.SERVER}/user/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setIsLoggedIn(true);
        handleFetchProtectedData();
        window.location.href = "/admin/dashboard";
      } else {
        setLoginError(
          response?.data?.message || "Something went wrong, please try later"
        );
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(
        error?.response?.data?.message ||
          "Something went wrong, please try later"
      );
    } finally {
      setForButtonLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await axios.post(
        `${config.SERVER}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      Cookies.remove("token");
      window.location.href = "/";
    }
  };

  const setHeader = async (h: string) => {
    setDashboardTitle(h);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isLoggedIn,
        forButtonLoading,
        loginError,
        dashboardTitle,
        setHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

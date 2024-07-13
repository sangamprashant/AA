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
  dummyLogin: (email: string, password: string, name?: string) => Promise<void>;
  isDummyLogin: boolean;
  dummyLogout: () => void;
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
  const [isDummyLogin, setIsDummyLogin] = React.useState<boolean>(false);

  useEffect(() => {
    handleFetchProtectedData();

    const ftechDummyData = () => {
      if (localStorage.getItem("email")) {
        setIsDummyLogin(true);
      }
    };

    ftechDummyData();
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
      console.log("Protected data:", response.data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
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

  const dummyLogin = async (
    email: string,
    password: string,
    name?: string
  ): Promise<void> => {
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    if (name) {
      localStorage.setItem("name", name);
    }
    setIsDummyLogin(true);
  };

  const dummyLogout = async (): Promise<void> => {
    localStorage.clear();
    setIsDummyLogin(false);
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
        dummyLogin,
        isDummyLogin,
        dummyLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

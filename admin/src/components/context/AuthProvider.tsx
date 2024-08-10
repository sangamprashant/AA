import axios from "axios";
import React, {
    FC,
    ReactNode,
    createContext,
    useLayoutEffect,
    useState
} from "react";
import { config } from "../../config";

interface User {
  _id: string;
  role: "admin" | "manager" | "employee";
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

  useLayoutEffect(() => {
    setToken(token);
    if (token) {
      handleFetchProtectedData();
    } else {
      setLoading(false);
    }
  }, [token]);

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
      logout()
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    setIsLoggedIn(false);
    setToken("");
    sessionStorage.clear();
    window.location.href = "/";
  };

  const setHeader = (title: string) => {
    setDashboardTitle(title);
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };


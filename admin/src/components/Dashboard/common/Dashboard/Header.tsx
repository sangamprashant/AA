import { ReactNode, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import "./Header.css";

interface Wrapper {
  children: ReactNode;
}

const Header = ({ children }: Wrapper) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { dashboardTitle, user } = authContext;
  return (
    <>
      <header
        className={`${user?.role}-dashboard-header shadow rounded-bottom-2`}
      >
        <div className="container p-5">
          <h1 className="display-4 p-0 m-0 text-white bold-text">
            {dashboardTitle}
          </h1>
        </div>
      </header>
      <main className="p-3 mb-2 dashboard-main ">{children}</main>
    </>
  );
};

export default Header;

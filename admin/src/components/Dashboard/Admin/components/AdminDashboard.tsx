import { useContext, useLayoutEffect } from "react";
import AdminWrapper from "../AdminWrapper";
import { AuthContext } from "../../../context/AuthProvider";
import Header from "../../common/Dashboard/Header";

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setDashboardTitle } = authContext;
  useLayoutEffect(() => {
    setDashboardTitle("Admin Dashboard");
  }, []);

  return (
    <AdminWrapper>
      <Header>
        <div className="card">admin data herer</div>
      </Header>
    </AdminWrapper>
  );
};

export default AdminDashboard;

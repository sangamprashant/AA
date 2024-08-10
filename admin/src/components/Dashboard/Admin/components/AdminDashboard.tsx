import { useContext, useLayoutEffect } from "react";
import AdminWrapper from "../AdminWrapper";
import { AuthContext } from "../../../context/AuthProvider";

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
      Admin Dashboard
      <code>at last after all models</code>
    </AdminWrapper>
  );
};

export default AdminDashboard;

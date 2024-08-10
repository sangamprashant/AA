import { useContext, useLayoutEffect } from "react";
import EmployeeWrapper from "../../EmployeeWrapper";
import { AuthContext } from "../../../../context/AuthProvider";

const EmployeeDashboard = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
      return null;
    }
    const { setDashboardTitle } = authContext;
    useLayoutEffect(() => {
      setDashboardTitle("Employee Dashboard");
    }, []);
  return <EmployeeWrapper>EmployeeDashboard</EmployeeWrapper>;
};

export default EmployeeDashboard;

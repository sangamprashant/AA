import { Tabs } from "antd";
import Setting from "../common/Setting";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
const { TabPane } = Tabs;

const DashboardSetting: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { user } = authContext;
  return (
    <>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Change Password" key="1">
          <Setting />
        </TabPane>
        {user?.role === "admin" && (
          <>
            <TabPane tab="Other Settings" key="2">
              <h1>Other Seting if required</h1>
            </TabPane>
            <TabPane tab="General Settings" key="3">
              <h1>general seating </h1>
            </TabPane>
          </>
        )}
      </Tabs>
    </>
  );
};

export default DashboardSetting;

import { Tabs } from "antd";
import StudyMaterialView from "./AdminReuse/StudyMaterialView";
import { useContext, useEffect } from "react";
import { LoadingUI } from "../../../../App";
import { AuthContext } from "../../Auth/AuthProvider";
import StudyMaterialAdd from "./AdminReuse/StudyMaterialAdd";

const StudyMaterial = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <LoadingUI />;
  }
  const { setHeader } = authContext;
  useEffect(() => {
    setHeader("Study Materials");
  }, [setHeader]);

  const items = [
    {
      key: "1",
      label: "View",
      children: <StudyMaterialView />,
    },
    {
      key: "2",
      label: "Add",
      children: <StudyMaterialAdd />,
    },
  ];

  return (
    <div className="card p-3 border-0 shadow">
      <Tabs defaultActiveKey="1" centered items={items} />
    </div>
  );
};

export default StudyMaterial;

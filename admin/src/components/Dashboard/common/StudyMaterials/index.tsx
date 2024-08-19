import { Tabs } from "antd";
import StudyMaterialAdd from "./StudyMaterialAdd";
import StudyMaterialView from "./StudyMaterialView";
import "./styles.css";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const StudyMaterials = () => {
  const globals = useContext(AuthContext);
  if (!globals) return null;

  const { user } = globals;

  const commonItems = [
    {
      key: "1",
      label: "All",
      children: <StudyMaterialView />,
    },
  ];

  const managersItems = [
    {
      key: "2",
      label: "Add",
      children: <StudyMaterialAdd />,
    },
  ];

  // Combine common items with manager items conditionally
  const items = [
    ...commonItems,
    ...(user?.role === "manager" ? managersItems : []),
  ];

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">Study Materials</h5>
        <div className="d-flex gap-2"></div>
      </div>
      <Tabs defaultActiveKey="1" items={items} className="ps-1" />
    </>
  );
};

export default StudyMaterials;

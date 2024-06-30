import React from "react";
import { useNavigate } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import "./class.css";
import { ClassProvider, useClassContext } from "./ClassContext";
import ClassRendering from "./ClassRndering";

const ClassContent: React.FC = () => {
  const { receiveClassId, isValidClassId } = useClassContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    receiveClassId(getClassIdFromParams());
  }, [navigate]);

  const getClassIdFromParams = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("code") || "";
  };
  const classId = getClassIdFromParams();

  if (!isValidClassId(classId)) {
    return <PageNotFound />;
  }

  return <ClassRendering />;
};

const Class: React.FC = () => {
  return (
    <ClassProvider>
      <ClassContent />
    </ClassProvider>
  );
};

export default Class;

"use client";
import React, { useEffect, useState } from "react";
import PageNotFound from "../PageNotFound";
import { ClassProvider, useClassContext } from "./ClassContext";
import ClassRendering from "./ClassRndering";

const ClassContent: React.FC = () => {
  const { receiveClassId, isValidClassId } = useClassContext();
  const [classId, setClassId] = useState<string>("");

  useEffect(() => {
    const classIdFromParams = getClassIdFromParams();
    setClassId(classIdFromParams);
    receiveClassId(classIdFromParams);
  }, []);

  const getClassIdFromParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) return code
    else return ""
  };

  if (!classId) {
    return <p>Loading...</p>;
  }

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

"use client";
import React, { useEffect, useState } from "react";
import PageNotFound from "../PageNotFound";
import { ClassProvider, useClassContext } from "./ClassContext";
import ClassRendering from "./ClassRndering";

const ClassContent: React.FC = () => {
  const { receiveClassId, isValidClassId } = useClassContext();
  const [classId, setClassId] = useState<string>("");

  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0)
    }
    const classIdFromParams = getClassIdFromParams();
    setClassId(classIdFromParams);
    receiveClassId(classIdFromParams);
  }, [receiveClassId]);

  const getClassIdFromParams = () => {
    let code = "";
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      code = queryParams.get("code") || "";
    }
    return code;
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

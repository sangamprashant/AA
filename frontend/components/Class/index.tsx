"use client";

import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Classes from "../Home/Classes";
import PageNotFound from "../PageNotFound";
import { ClassProvider, useClassContext } from "./ClassContext";
import ClassRendering from "./ClassRndering";

const ClassContent: React.FC = () => {
  const { receiveClassId, isValidClassId } = useClassContext();
  const [classId, setClassId] = useState<string>("");
  const [view, setView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    const classIdFromParams = getClassIdFromParams();
    setClassId(classIdFromParams);
    receiveClassId(classIdFromParams);

    if (classIdFromParams) {
      const isValid = isValidClassId(classIdFromParams);
      setView(isValid);
    }

    setLoading(false);
  }, [receiveClassId, isValidClassId]);

  const getClassIdFromParams = () => {
    let code = "";
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      code = queryParams.get("code") || "";
    }
    return code;
  };

  if (loading) {
    return <>
      <div className="d-flex justify-content-center align-items-center pt-5" >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>;
  }

  if (!classId) {
    return <div style={{
      paddingTop: "100px"
    }}>
      <Classes />
      <Footer />
    </div>;
  }

  if (!view) {
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

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ClassContextType {
  classId: string;
  receiveClassId: (code: string) => void;
  isValidClassId: (code: string) => boolean;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const useClassContext = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error("useClassContext must be used within a ClassProvider");
  }
  return context;
};

interface ClassProviderProps {
  children: ReactNode; 
}

export const ClassProvider: React.FC<ClassProviderProps> = ({ children }) => {
  const [classId, setClassId] = useState<string>("");

  const receiveClassId = (code: string) => {
    setClassId(code);
  };

  const isValidClassId = (code: string) => {
    const validClassIds = ["1-4", "5", "6", "7", "8", "9", "10", "11", "12"];
    return validClassIds.includes(code);
  };

  const contextValue: ClassContextType = {
    classId,
    receiveClassId,
    isValidClassId,
  };

  return (
    <ClassContext.Provider value={contextValue}>{children}</ClassContext.Provider>
  );
};

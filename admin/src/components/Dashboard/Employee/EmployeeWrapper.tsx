import { ReactNode } from "react";

interface Wrapper {
  children: ReactNode;
}

const EmployeeWrapper = ({ children }: Wrapper) => {
  return <div className="card p-4">{children}</div>;
};

export default EmployeeWrapper;

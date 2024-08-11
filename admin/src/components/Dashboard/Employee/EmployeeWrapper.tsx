import { ReactNode } from "react";

interface Wrapper {
  children: ReactNode;
}

const EmployeeWrapper = ({ children }: Wrapper) => {
  return <div className="card px-4 card-my border-0">{children}</div>;
};

export default EmployeeWrapper;

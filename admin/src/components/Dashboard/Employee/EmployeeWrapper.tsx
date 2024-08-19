import { ReactNode } from "react";

interface Wrapper {
  children: ReactNode;
}

const EmployeeWrapper = ({ children }: Wrapper) => {
  return <div>{children}</div>;
};

export default EmployeeWrapper;

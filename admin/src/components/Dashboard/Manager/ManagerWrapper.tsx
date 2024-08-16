import { ReactNode } from "react";

interface Wrapper {
  children: ReactNode;
}

const ManagerWrapper = ({ children }: Wrapper) => {
  return <div>{children}</div>;
};

export default ManagerWrapper;

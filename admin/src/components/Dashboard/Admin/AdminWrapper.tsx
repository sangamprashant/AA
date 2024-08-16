import { ReactNode } from "react";

interface Wrapper {
  children: ReactNode;
  className?: string;
}

const AdminWrapper = ({ className, children }: Wrapper) => {
  return <div className={className}>{children}</div>;
};

export default AdminWrapper;

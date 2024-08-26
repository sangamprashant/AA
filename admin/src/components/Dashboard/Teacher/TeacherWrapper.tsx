import { ReactNode } from "react";

interface Wrapper {
  children: ReactNode;
}

const TeacherWrapper = ({ children }: Wrapper) => {
  return <div>{children}</div>;
};

export default TeacherWrapper;

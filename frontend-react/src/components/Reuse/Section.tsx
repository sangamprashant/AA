import React from "react";

type Props = {
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
};

const Section: React.FC<Props> = ({ children, ...props }) => {
  return (
    <section className=" " {...props}>
      <div className="container">{children}</div>
    </section>
  );
};

export default Section;

import Footer from "../../Footer";
import "./terms.css";

interface TermsProps {
  children: React.ReactNode;
}

function Terms({ children }: TermsProps) {
  return (
    <>
      <div className="term-main py-5">
        <div className="term-container">{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default Terms;

export const ListStyle = { listStyle: "inherit" };
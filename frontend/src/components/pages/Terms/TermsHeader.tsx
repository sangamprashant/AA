interface TermsHeaderProps {
  title: string;
  desc?: string;
}
const TermsHeader = ({ title, desc }: TermsHeaderProps) => {
  return (
    <div className="mb-5">
      <h1 className="p-0 m-0">{title}</h1>
      <p className="p-0 m-0 bold-text">{desc}</p>
    </div>
  );
};

export default TermsHeader;



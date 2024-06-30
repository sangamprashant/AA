
interface PageHeadersProps {
  title: string;
  description?: string;
}

const PageHeaders = ({ title, description }: PageHeadersProps) => {
  return (
    <section id="about-us">
      <img
        src="/aboutus/banner-left.png"
        alt=""
        className="about-us-left-image"
      />
      <img
        src="/aboutus/banner-right.png"
        alt=""
        className="about-us-right-image"
      />
      <header id="contact-header-navbar"></header>
      <header id="about-header-content">
        <h1 className="display-1">{title}</h1>
        {description && <h3 className="">{description}</h3>}
      </header>
    </section>
  );
};

export default PageHeaders;

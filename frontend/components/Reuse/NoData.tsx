import { pageNotFoundImg } from "@/assets/links";
import Link from "next/link";
interface NoDataProps {
  heading: string;
  content: string;
}

const NoData = ({ heading, content }: NoDataProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="mb-4">
          <img src={pageNotFoundImg["nodata"]} alt="No Data" className="img-fluid" loading="lazy"  />
        </div>
        <h2 className="mb-3">{heading}</h2>
        <p className="lead">{content}</p>
        <Link href="/" className="btn btn-primary mt-3">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NoData;

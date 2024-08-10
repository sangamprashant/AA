import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { getButtonColor } from "../../../functions";
const Dashboard404 = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { user } = authContext;
  return (
    <div
      className="p-3 d-flex justify-content-center align-items-center mt-5"
      style={{
        height: "50vh",
      }}
    >
      <div className="text-center">
        <h1
          className="display-1"
          style={{ fontSize: "5rem", fontWeight: "bold" }}
        >
          404
        </h1>
        <p className="lead" style={{ fontSize: "1.5rem", margin: "20px 0" }}>
          Page Not Found
        </p>
        <p style={{ marginBottom: "20px" }}>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/admin/dashboard">
          <button className={`btn btn-${getButtonColor(user?.role)}`}>
            Go Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard404;

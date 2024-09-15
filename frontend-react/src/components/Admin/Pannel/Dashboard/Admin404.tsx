import { Link } from "react-router-dom";
import { Button } from "antd";

const Admin404 = () => {
  return (
    <div
      className="p-3 d-flex justify-content-center align-items-center mt-5"
      style={{
        height: "50vh",
      }}
    >
      <div className="text-center">
        <h1 className="display-1" style={{ fontSize: "5rem", fontWeight: "bold" }}>404</h1>
        <p className="lead" style={{ fontSize: "1.5rem", margin: "20px 0" }}>Page Not Found</p>
        <p style={{ marginBottom: "20px" }}>Sorry, the page you are looking for does not exist.</p>
        <Link to="/admin/dashboard">
          <Button type="primary" size="large">Go Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Admin404;

import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authImage } from "../../assets/images";
const Home: React.FC = () => {
  const navigate = useNavigate();

  const navigateToLogin = (role: string) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Select Your Role</h1>
      <div className="row mt-3">
        <div className="col-md-6 d-flex flex-column align-items-center mt-4">
          <img
            src={authImage.teacherImage}
            alt="Teacher"
            style={{ width: "100px", height: "100px" }}
          />
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => navigateToLogin("teacher")}
          >
            Teacher Login
          </Button>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center mt-4">
          <img
            src={authImage.employeeImage}
            alt="Employee"
            style={{ width: "100px", height: "100px" }}
          />
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => navigateToLogin("employee")}
          >
            Employee Login
          </Button>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center mt-4">
          <img
            src={authImage.managerImage}
            alt="Manager"
            style={{ width: "100px", height: "100px" }}
          />
          <Button
            variant="success"
            className="mt-2"
            onClick={() => navigateToLogin("manager")}
          >
            Manager Login
          </Button>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center mt-4">
          <img
            src={authImage.adminImage}
            alt="Admin"
            style={{ width: "100px", height: "100px" }}
          />
          <Button
            variant="primary"
            className="mt-2"
            onClick={() => navigateToLogin("admin")}
          >
            Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

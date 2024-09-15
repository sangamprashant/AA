import React from "react";
import { useNavigate } from "react-router-dom";
import { authImage } from "../../assets/images";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    { role: "teacher", label: "Teacher Login", image: authImage.teacherImage, variant: "secondary" },
    { role: "employee", label: "Employee Login", image: authImage.employeeImage, variant: "secondary" },
    { role: "manager", label: "Manager Login", image: authImage.managerImage, variant: "success" },
    { role: "admin", label: "Admin Login", image: authImage.adminImage, variant: "primary" }
  ];

  const navigateToLogin = (role: string) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>Select Your Role</h1>
      <div className="mt-3 auth-grid">
        {roles.map(({ role, label, image }) => (
          <div key={role} className="">
            <div className="d-flex flex-column align-items-center p-2 m-1 shadow border border-1 rounded outh-container" onClick={() => navigateToLogin(role)}>
              <img src={image} alt={label} />
              <h5 className=" text-center text-uppercase">
                <b>{label}</b>
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

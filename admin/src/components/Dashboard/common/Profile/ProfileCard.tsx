import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const ProfileCard = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { user } = globles;
  return (
    <div className="card p-3 d-flex justify-content-between align-self-center">
      <div>
        <div className="mb-3">
          <label className="form-label fw-bold m-0">Name:</label>
          <p className="card-text m-0">{user?.name}</p>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold m-0">Email:</label>
          <p className="card-text m-0">{user?.email}</p>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold m-0">Role:</label>
          <p className="card-text m-0">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

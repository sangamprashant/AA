import { Button } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { ProfileContext } from "../AMProfile";

const ProfileCard = () => {
  const admin = useContext(AuthContext);
  if (!admin) return null;
  const globles = useContext(ProfileContext);
  if (!globles) return null;
  const { profileUser } = globles;

  return (
    <div>
      <div className="card p-3 d-flex justify-content-between align-self-center">
        <div>
          <div className="mb-3">
            <label className="form-label fw-bold m-0">Name:</label>
            <p className="card-text m-0">{profileUser?.name}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold m-0">Email:</label>
            <p className="card-text m-0">{profileUser?.email}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold m-0">Role:</label>
            <p className="card-text m-0">{profileUser?.role}</p>
          </div>
        </div>
        {admin.user?.role === "admin" && <Button type="primary">Edit</Button>}
      </div>
    </div>
  );
};

export default ProfileCard;

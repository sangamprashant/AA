import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";

interface ProfileCardProps {}

const ProfileCard: React.FC<ProfileCardProps> = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { user } = globles;
  return (
    <div className="card border-0 shadow-sm mb-3 px-4 py-2">
      <h5 className="card-title m-0">{user?.name}</h5>
      <p className="card-text m-0">{user?.email}</p>
      <p className="card-text m-0">10 years old</p>
    </div>
  );
};

export default ProfileCard;

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import ProfileRender from "./ProfileRender";

const AMETProfie = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  console.log(globles.user);
  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>MY PROFILE</h5>
        <div className="d-flex gap-2"></div>
      </div>
      <ProfileRender />
    </>
  );
};

export default AMETProfie;

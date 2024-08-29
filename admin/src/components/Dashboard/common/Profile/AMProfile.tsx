import ProfileRender from "./ProfileRender";

const AMProfile = () => {
  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>PROFILE</h5>
        <div className="d-flex gap-2"></div>
      </div>
      <ProfileRender />
    </>
  );
};

export default AMProfile;

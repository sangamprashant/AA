import React from "react";
import { Link } from "react-router-dom";

interface TopBarProps {
  // fetchData: () => void;
}

const TopBar: React.FC<TopBarProps> = ({}) => {
  return (
    <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
      <h5>LEADS</h5>
      <div className="d-flex gap-2">
        <Link to="/employee/leads-bucket/create" className="btn btn-primary">
          Create Lead
        </Link>
      </div>
    </div>
  );
};

export default TopBar;

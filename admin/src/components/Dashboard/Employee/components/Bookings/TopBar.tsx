import React from "react";
import { Tooltip } from "antd";
import CachedIcon from "@mui/icons-material/Cached";
import { Link } from "react-router-dom";

interface TopBarProps {
  fetchData: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ fetchData }) => {
  return (
    <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
      <h5>LEADS</h5>
      <div className="d-flex gap-2">
        <Link to="/employee/leads-bucket/create" className="btn btn-primary">Create Lead</Link>
        <Tooltip title="Reload data">
          <button
            className="btn btn-outline-secondary btn-sm rounded-circle py-1"
            onClick={fetchData}
          >
            <CachedIcon fontSize="small" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TopBar;

import React from "react";
import Counts from "./AdminReuse/Counts";
import Transctions from "./AdminReuse/Transctions";
import Visits from "./AdminReuse/Visits";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <React.Fragment>
      <article>
        <div className="row">
          <Counts title="Title" count={23} />
          <Counts title="Title" count={23} />
          <Counts title="Title" count={23} />
          <Counts title="Title" count={23} />
          <Counts title="Title" count={23} />
          <Counts title="Title" count={23} />
        </div>
        <div className="row mt-3">
          <Transctions />
          <Visits />
        </div>
      </article>
    </React.Fragment>
  );
};

export default Dashboard;

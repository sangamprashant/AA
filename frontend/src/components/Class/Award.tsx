
const Award = () => {
  return (
    <div id="class-award">
      <img src="/class/awards.png" alt="Award" className="class-award-image" />
      <div className="class-award-content">
        <h2 className="class-award-heading">Our Commitment to Quality</h2>
        <p className="class-award-description">
          We are obsessed with having only the highest quality teachers on our
          platform.
        </p>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="award-card">
              <img src="/class/award/selection.png" alt="Selection" />
              <h3 className="award-title">Rigorous Selection</h3>
              <p className="award-text">
                Only the top teachers from renowned institutions.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="award-card">
              <img src="/class/award/training.png" alt="Training" />
              <h3 className="award-title">Comprehensive Training</h3>
              <p className="award-text">
                Continuous professional development programs.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="award-card">
              <img src="/class/award/monitoring.png" alt="Monitoring" />
              <h3 className="award-title">Effective Monitoring</h3>
              <p className="award-text">
                Regular performance evaluations and feedback.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="award-card">
              <img src="/class/award/upskill.png" alt="Upskill" />
              <h3 className="award-title">Continuous Upskilling</h3>
              <p className="award-text">
                Encouraging teachers to stay updated with the latest teaching
                methods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Award;

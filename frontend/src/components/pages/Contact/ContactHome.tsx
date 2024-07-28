import { Link } from "react-router-dom";
import Section from "../../Reuse/Section";

const ContactHome = () => {
  return (
    <Section className="py-5">
      <div className="col-xs-12 col-sm-12 have-question bg-dark-subtle p-3 rounded-2 mt-3 w-100">
        <div className="row">
          <div className="col-md-5 d-flex justify-content-center">
            <img
              src="contactus/expert.webp?cache-control=max-age=31536000"
              alt=""
              width="100%"
            />
          </div>
          <div className="col-md-7 flex-1">
            <div className="d-flex flex-column  align-items-start h-100 justify-content-between">
              <div>
                <h3>Have Any Question?</h3>
                <p>
                  Get ready for an amazing journey with best mentors who turn
                  every challenge into chance to boost your career
                </p>
              </div>
              <div>
                <Link to="/contact-us" className="btn theme-btn">
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactHome;

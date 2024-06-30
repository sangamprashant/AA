import { Link } from "react-router-dom"
import Section from "../../Reuse/Section"


const ContactHome = () => {
  return (
    <Section className="py-5">
    <div className="col-xs-12 col-sm-12 have-question bg-dark-subtle p-3 rounded-2 mt-3 w-100">
      <div className="row">
        <div className="col-md-5 d-flex justify-content-center">
          <img
            src="contactus/expert.webp"
            alt=""
            width="100%"
          />
        </div>
        <div className="col-md-7 flex-1">
          <div className="d-flex flex-column  align-items-start h-100">
            <div>
              <h3>Have Any Question?</h3>
              <p>
                Various versions years, sometimes by accident, sometimes on
                purpose (injected humour and the like).
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
  )
}

export default ContactHome
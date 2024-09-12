import Terms from "..";
import Section from "../../../Reuse/Section";
import { email, phone } from "../../../Strings";
import TermsHeader from "../TermsHeader";

const RETURNPOLICY = () => {
  return (
    <Terms>
      <Section>
        <TermsHeader title="RETURN POLICY" desc="Last updated July 17, 2024" />
        <p>
          If, as a Student, you wish to cancel a confirmed enrolment made via
          the Site or the Application, after enrolment to the Course, the
          cancellation policy contained in the applicable Listing will apply to
          such cancellation provided that no refund will be made in respect of
          tuitions already provided. Our ability to refund the Course Fees and
          other amounts charged to you will depend upon the terms of the
          applicable cancellation policy and financial charges applicable in
          case of course payment through No Cost EMI options. Details regarding
          refunds and cancellation policies are available via the Site and
          Application. The atoz classes will initiate any refunds due pursuant
          to the Payments Terms. Please refer to the Refunds section of Love to
          solving doubts for latest updated terms and conditions for various
          categories of listings/courses.
        </p>

        <p>
          If We cancel a confirmed enrolment made via the Site, Services, and
          Application, (i) The atoz classes will refund the Course Fees paid by
          the Student for such enrolment to the applicable Student pursuant to
          the Payments Terms which shall not exceed the total amount paid by the
          Student.
        </p>

        <h3 className="mt-4">QUESTIONS</h3>
        <p>
          If you have any questions concerning our return policy, please contact
          us at:
        </p>
        <p>Phone: +91 {phone}</p>
        <p>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </Section>
    </Terms>
  );
};

export default RETURNPOLICY;

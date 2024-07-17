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
          Thank you for your purchase. We hope you are happy with your purchase.
          However, if you are not completely satisfied with your purchase for
          any reason, you may return it to us for a full refund only. Please see
          below for more information on our return policy.
        </p>

        <h3 className="mt-4">RETURNS</h3>
        <p>
          All returns must be postmarked within seven (7) days of the purchase
          date. All returned items must be in new and unused condition, with all
          original tags and labels attached.
        </p>

        <h3 className="mt-4">RETURN PROCESS</h3>
        <p>
          To return an item, place the item securely in its original packaging
          and the return form provided, then mail your return to the following
          address:
        </p>
        <address>
          The A to z Classes
          <br />
          Attn: Returns
          <br />
          HIG-A-373/ll rajajipuram,
          <br />
          Lucknow Uttar Pradesh -226017
          <br />
          India
        </address>
        <p>Return shipping charges will be paid or reimbursed by us.</p>

        <h3 className="mt-4">REFUNDS</h3>
        <p>
          After receiving your return and inspecting the condition of your item,
          we will process your return. Please allow at least seven (7) days from
          the receipt of your item to process your return. Refunds may take 1-2
          billing cycles to appear on your credit card statement, depending on
          your credit card company. We will notify you by email when your return
          has been processed.
        </p>

        <h3 className="mt-4">EXCEPTIONS</h3>
        <p>
          For defective or damaged products, please contact us at the contact
          details below to arrange a refund or exchange.
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

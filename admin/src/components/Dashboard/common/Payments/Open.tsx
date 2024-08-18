import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import "./payment.css";

import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { handlePrint } from "../../../../functions";
import { PaymentResponse } from "../../../../types/payment";
import Spinner from "../Spinner";

export interface Props {
  loading?: boolean;
  data: PaymentResponse | null;
}

const appName = "The A to Z Classes";

const address = "HIG-A-373/ll Rajajipuram, Lucknow, Uttar Pradesh -226017";

const phone = "9454509368";

// const webDomain = "https://a-to-z-classes.vercel.app";

const email = "connect@theatozclasses.com";

const socialLinks = {
  facebook:
    "https://www.facebook.com/people/Theatoz-Classes/61560106029558/?mibextid=ZbWKwL",
  twitter: "https://x.com/theatozclasses",
  instagram: "https://www.instagram.com/theatozclasses",
  linkedin: "https://www.linkedin.com/company/theatozclasses/",
  youtube: "https://www.youtube.com/@theatozclasses",
};
export const socialMediaLinks = [
  {
    platform: "Facebook",
    icon: faFacebook,
    className: "facebook",
    link: socialLinks.facebook,
  },
  {
    platform: "Instagram",
    icon: faInstagram,
    className: "instagram",
    link: socialLinks.instagram,
  },
  {
    platform: "Twitter",
    icon: faTwitter,
    className: "twitter",
    link: socialLinks.twitter,
  },
  {
    platform: "LinkedIn",
    icon: faLinkedin,
    className: "linkedin",
    link: socialLinks.linkedin,
  },
  {
    platform: "YouTube",
    icon: faYoutube,
    className: "youtube",
    link: socialLinks.youtube,
  },
];

const PaymentViewContainer = ({ data, loading }: Props) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        handlePrint("printable-container");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  if (!data) {
    return <>No Data</>;
  }

  const { payment_, paymentdb } = data;

  const renderPaymentInfo = () => {
    switch (payment_.method) {
      case "card":
        return (
          <>
            <b>Card Type:</b> {payment_.card.network}
            <br />
            <b>•••• •••• •••• {payment_.card.last4}</b>
          </>
        );
      case "netbanking":
        return (
          <>
            <b>Bank:</b> {payment_.bank}
          </>
        );
      case "wallet":
        return (
          <>
            <b>Wallet:</b> {payment_.wallet}
          </>
        );
      case "upi":
        return (
          <>
            <b>UPI ID:</b> {payment_.vpa}
          </>
        );
      default:
        return "Payment Method: Unknown";
    }
  };

  return (
    <div className="expanded px-2 mb-1">
      <main className="columns">
        <div className="card inner-container printable-container">
          <div id="printable-container">
            <div className="m-5">
              <section className="row">
                <div className="callout large invoice-container">
                  <table className="invoice table table-responsive table-borderless">
                    <thead>
                      <tr className="header">
                        <td>
                          <img src="/logo.png" alt="Company Name" height={40} />
                        </td>
                        <td className="align-right">
                          <h2>INVOICE</h2>
                        </td>
                      </tr>
                      <tr className="intro">
                        <td>
                          Hello, <b>{paymentdb.name}.</b>
                          <br />
                          Thank you for purchasing from {appName}.
                        </td>
                        <td className="text-right">
                          <span className="num">
                            Order{" "}
                            <b className="bold-text">
                              #{paymentdb.orderCreationId}
                            </b>
                          </span>
                          {payment_ && (
                            <>
                              <br />
                              {new Date(
                                payment_.created_at * 1000
                              ).toLocaleDateString()}
                            </>
                          )}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="details">
                        <td colSpan={2}>
                          <table className="table">
                            <thead>
                              <tr>
                                <th className="bold-text desc">
                                  Item Description
                                </th>
                                <th className="bold-text id">Item ID</th>
                                <th className="bold-text qty">
                                  Selected Class
                                </th>
                                <th className="bold-text amt">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="item">
                                <td className="desc">
                                  {paymentdb.purpose}
                                  <br />
                                </td>
                                <td className="id num">
                                  {paymentdb.razorpayPaymentId || "N.A"}
                                </td>
                                <td className="qty">{paymentdb.selectClass}</td>
                                <td className="amt">{paymentdb.amount} ₹</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className="totals">
                        <td></td>
                        <td>
                          <table className="table">
                            <tbody>
                              <tr className="subtotal">
                                <td className="num">Subtotal</td>
                                <td className="num">{paymentdb.amount} ₹</td>
                              </tr>
                              <tr className="fees">
                                <td className="num">Shipping & Handling</td>
                                <td className="num">0.00 ₹</td>
                              </tr>
                              {payment_ && (
                                <tr className="tax">
                                  <td className="num">Tax</td>
                                  <td className="num">
                                    {payment_.tax / 100} ₹
                                  </td>
                                </tr>
                              )}
                              {payment_ && (
                                <tr className="total">
                                  <td>Total</td>
                                  <td>{payment_.amount / 100} ₹</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <section className="additional-info mt-4">
                    <div className="info-columns only-print">
                      <table className="table">
                        <tr>
                          <td>
                            <div className="column">
                              <h5>Billing Information</h5>
                              <p className="bold-text">
                                {paymentdb.name}
                                <br />
                                {paymentdb.email}
                                <br />
                                {paymentdb.mobileNumber}
                              </p>
                              <h5>Billing To</h5>
                              <p className="bold-text">
                                {appName}
                                <br />
                                {email}
                                <br />
                                +91 {phone}
                                <br />
                                {address}
                              </p>
                            </div>
                          </td>
                          <td
                            style={{
                              verticalAlign: "baseline",
                            }}
                          >
                            <div className="column">
                              <h5>Payment Information</h5>
                              {payment_ && (
                                <p className="m-0">{renderPaymentInfo()}</p>
                              )}
                              <p className="m-0">
                                <b>Status:</b> {paymentdb?.status}
                              </p>
                              {payment_ && (
                                <>
                                  {payment_.order_id && (
                                    <p className="m-0">
                                      <b>Order ID:</b> {payment_.order_id}
                                    </p>
                                  )}
                                  {payment_.id && (
                                    <p className="m-0 text-wrap">
                                      <b>Payment ID:</b> {payment_.id}
                                    </p>
                                  )}
                                  {payment_.invoice_id && (
                                    <p className="m-0">
                                      <b>Invoice ID:</b> {payment_.invoice_id}
                                    </p>
                                  )}
                                  <p className="m-0">
                                    <b>Captured:</b>{" "}
                                    {payment_.captured ? "Yes" : "No"}
                                  </p>
                                  {payment_.refund_status && (
                                    <p className="m-0">
                                      <b>Refund Status:</b>{" "}
                                      {payment_.refund_status}
                                    </p>
                                  )}
                                  {payment_.error_code && (
                                    <p className="m-0">
                                      <b>Error Code:</b> {payment_.error_code}
                                    </p>
                                  )}
                                  {payment_.error_description && (
                                    <p className="m-0">
                                      <b>Error Description:</b>{" "}
                                      {payment_.error_description}
                                    </p>
                                  )}
                                  {payment_.acquirer_data?.rrn && (
                                    <p className="m-0">
                                      <b>Acquirer RRN:</b>{" "}
                                      {payment_.acquirer_data.rrn}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="info-columns no-print">
                      <>
                        <div className="column">
                          <h5>Billing Information</h5>
                          <p className="bold-text">
                            {paymentdb.name}
                            <br />
                            {paymentdb.email}
                            <br />
                            {paymentdb.mobileNumber}
                          </p>
                          <h5>Billing To</h5>
                          <p className="bold-text">
                            {appName}
                            <br />
                            {email}
                            <br />
                            +91 {phone}
                            <br />
                            {address}
                          </p>
                        </div>
                        <div className="column">
                          <h5>Payment Information</h5>
                          {payment_ && (
                            <p className="m-0">{renderPaymentInfo()}</p>
                          )}
                          <p className="m-0">
                            <b>Status:</b> {paymentdb?.status}
                          </p>
                          {payment_ && (
                            <>
                              {payment_.order_id && (
                                <p className="m-0">
                                  <b>Order ID:</b> {payment_.order_id}
                                </p>
                              )}
                              {payment_.id && (
                                <p className="m-0 text-wrap">
                                  <b>Payment ID:</b> {payment_.id}
                                </p>
                              )}
                              {payment_.invoice_id && (
                                <p className="m-0">
                                  <b>Invoice ID:</b> {payment_.invoice_id}
                                </p>
                              )}
                              <p className="m-0">
                                <b>Captured:</b>{" "}
                                {payment_.captured ? "Yes" : "No"}
                              </p>
                              {payment_.refund_status && (
                                <p className="m-0">
                                  <b>Refund Status:</b> {payment_.refund_status}
                                </p>
                              )}
                              {payment_.error_code && (
                                <p className="m-0">
                                  <b>Error Code:</b> {payment_.error_code}
                                </p>
                              )}
                              {payment_.error_description && (
                                <p className="m-0">
                                  <b>Error Description:</b>{" "}
                                  {payment_.error_description}
                                </p>
                              )}
                              {payment_.acquirer_data?.rrn && (
                                <p className="m-0">
                                  <b>Acquirer RRN:</b>{" "}
                                  {payment_.acquirer_data.rrn}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    </div>
                  </section>
                </div>
              </section>
            </div>
            <div className="d-flex list-unstyled justify-content-center gap-1">
              {socialMediaLinks.map((data, index) => (
                <li key={index}>
                  <a href={data.link} className="btn">
                    <FontAwesomeIcon icon={data.icon} />
                  </a>
                </li>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentViewContainer;

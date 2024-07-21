import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { socialMediaLinks } from "../Footer/SocialLinks";
import { address, appName, email, phone } from "../Strings";
import Loading from "./Loading";
import "./payment.css";

interface Props {
  payId?: string;
  orderId?: string;
}

interface PaymentNotes {
  name: string;
  mobileNumber: string;
  email: string;
  purpose: string;
  class: string;
}

interface AcquirerData {
  rrn: string;
  upi_transaction_id: string;
}

interface UpiDetails {
  vpa: string;
}

interface CardDetails {
  network: string;
  last4: string;
}

interface PaymentData {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  invoice_id: string | null;
  international: boolean;
  method: string;
  amount_refunded: number;
  refund_status: string | null;
  captured: boolean;
  description: string | null;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string;
  contact: string;
  notes: PaymentNotes;
  fee: number;
  tax: number;
  error_code: string | null;
  error_description: string | null;
  error_source: string | null;
  error_step: string | null;
  error_reason: string | null;
  acquirer_data: AcquirerData;
  created_at: number;
  upi: UpiDetails;
  card: CardDetails;
}

interface PaymentDB {
  _id: string;
  name: string;
  mobileNumber: string;
  email: string;
  purpose: string;
  amount: string;
  selectClass: string;
  orderCreationId: string;
  receipt: string;
  status: string;
  __v: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

interface PaymentResponse {
  success: boolean;
  payment_: PaymentData;
  paymentdb: PaymentDB;
}

const PaymentViewContainer = ({ payId, orderId }: Props) => {
  const [data, setData] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log({ payId, orderId });
    const fetchData = async () => {
      try {
        const response = await axios.post(`${config.SERVER}/payment/view-one`, {
          payment_id: payId,
          order_id: orderId,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [payId, orderId]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handlePrint = () => {
    const printContents = document?.getElementById(
      "printable-container"
    )?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="mb-4">
            <img src="/page/nodata.jpg" alt="No Data" className="img-fluid" />
          </div>
          <h2 className="mb-3">No Payment Found</h2>
          <p className="lead">
            We couldn’t find any payment details for the provided ID. Please
            check the ID and try again.
          </p>
          <a href="/" className="btn btn-primary mt-3">
            Go to Homepage
          </a>
        </div>
      </div>
    );
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
    <div className="expanded">
      <main className="columns">
        <header className="text-end no-print">
          <button className="btn theme-btn mb-2" onClick={handlePrint}>
            <i>
              <LocalPrintshopIcon />
            </i>
            Print Invoice
          </button>
        </header>
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
                          <table>
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
                          <table>
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
                    <div className="info-columns">
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
                            <p className="m-0">
                              <b>Order ID:</b> {payment_.order_id}
                            </p>
                            <p className="m-0 text-wrap">
                              <b>Payment ID:</b> {payment_.id}
                            </p>
                            <p className="m-0">
                              <b>Invoice ID:</b> {payment_.invoice_id || "N/A"}
                            </p>
                            <p className="m-0">
                              <b>Captured:</b>{" "}
                              {payment_.captured ? "Yes" : "No"}
                            </p>
                            <p className="m-0">
                              <b>Refund Status:</b>{" "}
                              {payment_.refund_status || "N/A"}
                            </p>
                            <p className="m-0">
                              <b>Error Code:</b> {payment_.error_code || "N/A"}
                            </p>
                            <p className="m-0">
                              <b>Error Description:</b>{" "}
                              {payment_.error_description || "N/A"}
                            </p>
                            <p className="m-0">
                              <b>Acquirer RRN:</b>{" "}
                              {payment_.acquirer_data.rrn || "N/A"}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </div>
            <hr />
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

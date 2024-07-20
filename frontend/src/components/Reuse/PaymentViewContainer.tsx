import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { config } from "../../config";
import "./payment.css";
import { address, appName, email, phone } from "../Strings";

interface Props {
  payId: string;
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

const PaymentViewContainer = ({ payId }: Props) => {
  const [data, setData] = useState<PaymentResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.SERVER}/payment/view-one/${payId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchData();
  }, [payId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { payment_, paymentdb } = data;

  const handlePrint = () => {
    const input = document.getElementById("printable-container");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${payId}.pdf`);
      });
    }
  };

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
        <header className="text-end">
          <button className="btn theme-btn" onClick={handlePrint}>
            <i>icon</i> Print Invoice
          </button>
        </header>
        <div className="card inner-container">
          <div id="printable-container">
            <div className="m-5">
              <section className="row">
                <div className="callout large invoice-container">
                  <table className="invoice table table-responsive">
                    <thead>
                      <tr className="header">
                        <td>
                          <img src="/logo.png" alt="Company Name" height={40} />
                        </td>
                        <td className="align-right">
                          <h2>Invoice</h2>
                        </td>
                      </tr>
                      <tr className="intro">
                        <td>
                          Hello, <b>{paymentdb.name}.</b>
                          <br />
                          Thank you for your order.
                        </td>
                        <td className="text-right">
                          <span className="num">
                            Order{" "}
                            <b className="bold-text">
                              #{paymentdb.orderCreationId}
                            </b>
                          </span>
                          <br />
                          {new Date(
                            payment_.created_at * 1000
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="details">
                        <td colSpan={2}>
                          <table>
                            <thead>
                              <tr>
                                <th className="desc">Item Description</th>
                                <th className="id">Item ID</th>
                                <th className="qty">Selected Class</th>
                                <th className="amt">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="item">
                                <td className="desc">
                                  {paymentdb.purpose}
                                  <br />
                                </td>
                                <td className="id num">{payId}</td>
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
                              <tr className="tax">
                                <td className="num">Tax</td>
                                <td className="num">{payment_.tax / 100} ₹</td>
                              </tr>
                              <tr className="total">
                                <td>Total</td>
                                <td>{payment_.amount / 100} ₹</td>
                              </tr>
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
                          {phone}
                          <br />
                          {address}
                        </p>
                      </div>
                      <div className="column">
                        <h5>Payment Information</h5>
                        <p className="m-0">{renderPaymentInfo()}</p>
                        <p className="m-0">
                          <b>Status:</b> {paymentdb.status}
                        </p>
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
                          <b>Captured:</b> {payment_.captured ? "Yes" : "No"}
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
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentViewContainer;

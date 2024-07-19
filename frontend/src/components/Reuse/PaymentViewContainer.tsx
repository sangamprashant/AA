import React, { useEffect, useState } from "react";
import "./payment.css";
import axios from "axios";
import { config } from "../../config";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  payId: string;
}

const PaymentViewContainer = ({ payId }: Props) => {
  const [data, setData] = useState<any>(null);

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

  return (
    <React.Fragment>
      <div className="expanded mt-2">
        <main className="columns">
          <header className="text-end">
            <button className="btn theme-btn" onClick={handlePrint}>
              <i className="ion ion-ios-printer-outline"></i> Print Invoice
            </button>
          </header>
          <div className="card inner-container">
            <div id="printable-container">
              <div className=" m-5">
                <section className="row">
                  <div className="callout large invoice-container">
                    <table className="invoice">
                      <thead>
                        <tr className="header">
                          <td>
                            <img
                              src="/logo.png"
                              alt="Company Name"
                              height={40}
                            />
                          </td>
                          <td className="align-right">
                            <h2>Invoice</h2>
                          </td>
                        </tr>
                        <tr className="intro">
                          <td>
                            Hello, {paymentdb.name}.
                            <br />
                            Thank you for your order.
                          </td>
                          <td className="text-right">
                            <span className="num">
                              Order #{paymentdb.receipt}
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
                                  <th className="qty">Quantity</th>
                                  <th className="amt">Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="item">
                                  <td className="desc">{paymentdb.purpose}</td>
                                  <td className="id num">
                                    {paymentdb.orderCreationId}
                                  </td>
                                  <td className="qty">1</td>
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
                                  <td className="num">
                                    {payment_.tax / 100} ₹
                                  </td>
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
                      <div className="d-flex justify-content-between">
                        <div className="columns">
                          <h5>Billing Information</h5>
                          <p>
                            {paymentdb.name}
                            <br />
                            134 Madison Ave.
                            <br />
                            New York NY 00102
                            <br />
                            United States
                          </p>
                        </div>
                        <div className="columns">
                          <h5>Payment Information</h5>
                          <p>
                            {payment_.method === "card" && (
                              <>
                                Card Type: {payment_.card.network}
                                <br />
                                •••• •••• •••• {payment_.card.last4}
                              </>
                            )}
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
    </React.Fragment>
  );
};

export default PaymentViewContainer;

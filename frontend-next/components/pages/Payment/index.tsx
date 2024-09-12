import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { notification } from "antd";
import axios from "axios";
import { FormEvent, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../config";
import Footer from "../../Footer";
import Section from "../../Reuse/Section";
import { appName } from "../../Strings";
import FerjiDetails from "./FerjiDetails";
import "./payment.css";

type NotificationType = "success" | "info" | "warning" | "error";

const Payment: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [selectClass, setSelectClass] = useState<string>("");
  const [state, setState] = useState<"success" | "error" | "">("");
  const [stateId, setStateId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
      placement: "bottomRight",
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !mobileNumber ||
      !email ||
      !purpose ||
      !amount ||
      !selectClass
    ) {
      openNotification(
        "error",
        "Form Incomplete",
        "Please fill out all fields before making the payment."
      );
      return;
    }

    const paymentReqBody = {
      name,
      mobileNumber,
      email,
      purpose,
      amount,
      selectClass,
    };
    setLoading(true);
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const payToDb = await axios.post(
        `${config.SERVER}/payment/make`,
        paymentReqBody
      );
      const {
        id: order_id,
        currency,
        amount,
        success: payToDbSuccess,
      } = payToDb.data;
      if (!payToDbSuccess) {
        openNotification(
          "error",
          "Payment Failed",
          "Payment failed. Please try again later."
        );
        return;
      }

      const options = {
        key: config.RAZORPAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: name,
        image: "/logo-crop.png",
        order_id: order_id,
        handler: async function (response: any) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          const result = await axios.post(
            `${config.SERVER}/payment/success`,
            data
          );
          if (result.data.success) {
            setStateId(data.razorpayPaymentId);
            setState("success");
            openNotification(
              "success",
              "Payment Successful",
              result.data.message || "Payment done."
            );
          } else {
            setStateId(data.razorpayOrderId);
            setState("error");
            openNotification(
              "error",
              "Payment Error",
              "There was an error processing your payment. Please try again later."
            );
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: mobileNumber,
        },
        notes: {
          name: name,
          mobileNumber: mobileNumber,
          email: email,
          purpose: purpose,
          class: selectClass,
        },
        theme: {
          color: "#000000",
        },
      };
      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error(error);
      openNotification(
        "error",
        "Error",
        "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="main mb-5">
        <div className="payment-screen">
          <div className="d-flex p-3 text-white gap-3">
            <div className="bg-white rounded-4 p-1">
              <img src="logo.png" alt="" height={70} />
            </div>
            <div className="app-header">
              <h2 className="m-0">{appName}</h2>
              <p className="m-0">Admission/Tuition Fee</p>
            </div>
          </div>
        </div>
        <Section className="mt-2">
          <div className="row row-reverse">
            <div className="col-md-6">
              <FerjiDetails />
            </div>
            <div className="col-md-6">
              <div className="payment-input">
                <div className="card shadow-lg p-3">
                  <form>
                    <div className="form-group mt-1">
                      <label htmlFor="name">Name of Student</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mt-1">
                      <label htmlFor="mobileNumber">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mt-1">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mt-1">
                      <label htmlFor="purpose">
                        Purpose (e.g., Admission Fees, Installment)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mt-1">
                      <label htmlFor="class">
                        Select a class to make payment
                      </label>
                      <select
                        name="class"
                        id="class"
                        className="form-control"
                        value={selectClass}
                        onChange={(e) => setSelectClass(e.target.value)}
                        required
                      >
                        <option value="">Select a class</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <div className="form-group mt-1 mb-5">
                      <label htmlFor="amount">Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                    <hr />

                    <button
                      onClick={handleFormSubmit}
                      className="mt-2 btn theme-btn w-100"
                      disabled={loading}
                    >
                      {loading ? "Loading.." : `Proceed to Pay`}{" "}
                      {loading ? (
                        <img src="/loading.svg" alt="" height={40} />
                      ) : (
                        <PaymentIcon fontSize="large" />
                      )}
                    </button>
                    {state === "success" && (
                      <Link
                        to={`/payment?payment_id=${stateId}`}
                        className="mt-2 btn btn-success w-100 mt-2"
                      >
                        View the Invoice <ReceiptIcon fontSize="large" />
                      </Link>
                    )}

                    {state === "error" && (
                      <Link
                        to={`/payment?order_id=${stateId}`}
                        className="mt-2 btn btn-warning w-100 mt-2"
                      >
                        View the Invoice <ReceiptIcon fontSize="large" />
                      </Link>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );

  //loading the payment script:
  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
};

export default Payment;

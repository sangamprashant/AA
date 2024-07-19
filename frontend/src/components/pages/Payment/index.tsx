import { Drawer, notification } from "antd";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { AppContext } from "../../../AppProvider";
import { config } from "../../../config";
import "./payment.css";

type NotificationType = "success" | "info" | "warning" | "error";

const Payment: React.FC = () => {
  const appContext = useContext(AppContext);

  if (!appContext) return null;
  const { paymentOpen, closePayment } = appContext;

  const [name, setName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [selectClass, setSelectClass] = useState<string>("");

  const [api, contextHolder] = notification.useNotification();

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
            openNotification(
              "success",
              "Payment Successful",
              result.data.message || "Payment done."
            );
          } else {
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
    }
  };

  return (
    <Drawer
      width={720}
      title="Payment Form"
      onClose={closePayment}
      open={paymentOpen}
    >
      {contextHolder}
      <div className="main">
        <div className="payment-screen"></div>
        <div className="payment-input">
          <div className="card shadow-lg p-3">
            <p>
              You can use this form to pay your admission fees and installments.
            </p>
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
                <label htmlFor="class">Select a class to make payment</label>
                <select
                  name="class"
                  id="class"
                  className="form-control"
                  value={selectClass}
                  onChange={(e) => {
                    setSelectClass(e.target.value);
                  }}
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
              <div className="form-group mt-1">
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
              <button onClick={handleFormSubmit} className="mt-2 btn theme-btn">
                Proceed to Pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </Drawer>
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

import { Button, Drawer, message } from "antd";
import { useState, useContext } from "react";
import { AppContext } from "../../../AppProvider";
import axios from "axios";

declare global {
  interface Window {
    google: any;
  }
}

const Payment: React.FC = () => {
  const appContext = useContext(AppContext);

  if (!appContext) return null;
  const { paymentOpen, closePayment } = appContext;

  const [name, setName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const loadGooglePay = () => {
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST",
    });

    const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["VISA", "RU"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example",
              gatewayMerchantId: "exampleGatewayMerchantId",
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "12345678901234567890",
        merchantName: "Demo Merchant",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: amount,
        currencyCode: "INR",
        countryCode: "IN",
      },
      shippingAddressParameters: {
        allowedCountryCodes: ["IN"],
        phoneNumberRequired: false,
      },
      shippingAddressRequired: false,
      shippingOptionRequired: false,
    };

    paymentsClient
      .isReadyToPay({ allowedPaymentMethods: ["CARD", "TOKENIZED_CARD"] })
      .then(function (response: any) {
        if (response.result) {
          paymentsClient
            .loadPaymentData(paymentRequest)
            .then(function (paymentData: any) {
              handlePaymentSuccess(paymentData);
            })
            .catch(function (err: any) {
              console.error("Error loading payment data", err);
            });
        } else {
          console.error("Google Pay is not available.");
        }
      })
      .catch(function (err: any) {
        console.error("Error checking readiness to pay", err);
      });
  };

  const handleFormSubmit = () => {
    if (!name || !mobileNumber || !email || !purpose || !amount) {
      message.error("Please fill out all fields before making the payment.");
      return;
    }

    loadGooglePay();
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    const userDetails = { name, mobileNumber, email, purpose, amount };

    try {
      const response = await axios.post(
        "https://your-server-endpoint/api/payment",
        { ...userDetails, paymentData }
      );
      console.log("Server Response:", response.data);
      if (response.status === 200) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error saving payment data:", error);
      setSubmissionStatus("error");
    }

    // Reset form
    setName("");
    setMobileNumber("");
    setEmail("");
    setPurpose("");
    setAmount("");
  };

  return (
    <Drawer
      width={720}
      title="Payment Form"
      onClose={closePayment}
      open={paymentOpen}
    >
      <div className="container mt-2">
        <code>
          <sub>Payment is currently down, waiting for verification.</sub>
        </code>
        <p>
          You can use this form to pay your admission fees and installments.
        </p>
        <form>
          <div className="form-group mt-1">
            <label htmlFor="name">Name</label>
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
            <sub>payment will be verified using mobile number</sub>
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
            <label htmlFor="email">Email</label>
            <sub>payment will be verified using email</sub>
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
            <select name="class" id="class" className="form-control">
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
          <Button type="primary" onClick={handleFormSubmit}>
            Proceed to Pay
          </Button>
        </form>
        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3" role="alert">
            Thank you for your submission! We will reach out to you shortly. An
            email will be sent with the payment details. Please follow the
            instructions in the email to complete the payment.
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="alert alert-danger mt-3" role="alert">
            There was an error processing your payment. Please try again later.
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default Payment;

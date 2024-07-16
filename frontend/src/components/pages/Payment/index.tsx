import { Drawer, message } from "antd";
import { FormEvent, useContext, useState } from "react";
import { AppContext } from "../../../AppProvider";
import "./payment.css";
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
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !mobileNumber ||
      !email ||
      !purpose ||
      !amount ||
      !selectClass
    ) {
      message.error("Please fill out all fields before making the payment.");
      return;
    }

    setSubmissionStatus("success");
    // loadGooglePay();
  };

  return (
    <Drawer
      width={720}
      title="Payment Form"
      onClose={closePayment}
      open={paymentOpen}
    >
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
            {submissionStatus === "success" && (
              <div className="alert alert-success mt-3" role="alert">
                Thank you for your submission! We will reach out to you shortly.
                An email will be sent with the payment details. Please follow
                the instructions in the email to complete the payment.
              </div>
            )}
            {submissionStatus === "error" && (
              <div className="alert alert-danger mt-3" role="alert">
                There was an error processing your payment. Please try again
                later.
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default Payment;

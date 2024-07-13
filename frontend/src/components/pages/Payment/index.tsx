import { Button, Drawer, Space } from "antd";
import { useState, FormEvent, useContext } from "react";
import { AppContext } from "../../../AppProvider";

const Payment = () => {
  const appContext = useContext(AppContext);

  if (!appContext) return null;
  const { paymentOpen, closePayment } = appContext;

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const paymentData = { name, mobileNumber, email, purpose, amount };
    console.log("Payment Data:", paymentData);

    setTimeout(() => {
      setSubmissionStatus("success");
    }, 1000);

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
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={closePayment}>Cancel</Button>
          <Button onClick={closePayment} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <div className="container mt-2">
        <code>
          <sub>Payment is currently down, waiting for verification.</sub>
        </code>
        <p>
          You can use this form to pay your admission fees and installments.
        </p>
        <form onSubmit={handleSubmit}>
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
            <sub>paymant will be verified using mobile number</sub>
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
            <label htmlFor="email">Email</label>{" "}
            <sub>paymant will be verified using email</sub>
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
            <label htmlFor="purpose">Select a class to make payment</label>
            <select name="" id="" className="form-control">
              <option value="">Select a class</option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
              <option value="">6</option>
              <option value="">7</option>
              <option value="">8</option>
              <option value="">9</option>
              <option value="">10</option>
              <option value="">11</option>
              <option value="">12</option>
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
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
        {submissionStatus === "success" && (
          <div className="alert alert-success mt-3" role="alert">
            Thank you for your submission! We will reach out to you shortly. An
            email will be sent with the payment details. Please follow the
            instructions in the email to complete the payment.
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default Payment;

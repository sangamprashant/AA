import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSearch = () => {
  const [type, setType] = useState<string>("payment_id");
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (type && inputValue) {
      navigate(`/admin/payment-open?${type}=${inputValue}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="my-4">
      <div className="row justify-content-center mb-3">
        <div className="col-md-4 d-flex justify-content-evenly">
          <label htmlFor="payment_id">
            <input
              type="radio"
              id="payment_id"
              name="searchType"
              checked={type === "payment_id"}
              onChange={() => setType("payment_id")}
            />
            Payment ID
          </label>
          <label htmlFor="order_id">
            <input
              type="radio"
              id="order_id"
              name="searchType"
              checked={type === "order_id"}
              onChange={() => setType("order_id")}
            />
            Order ID
          </label>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter ID..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn theme-btn">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default PaymentSearch;

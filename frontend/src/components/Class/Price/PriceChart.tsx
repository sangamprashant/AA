import React from "react";
import { useClassContext } from "../ClassContext";

const PriceChart = () => {
  const [pre, setPre] = React.useState<boolean>(false);
  const { classId } = useClassContext();

  // Define the type for the prices object
  type PriceType = {
    premium: string;
    personalized: string;
  };

  // Define the prices object with the correct type
  const prices: Record<string, PriceType> = {
    "1-4": { premium: "32,200", personalized: "1,04,200" },
    "5": { premium: "37,200", personalized: "1,09,200" },
    "6": { premium: "37,200", personalized: "1,09,200" },
    "7": { premium: "37,200", personalized: "1,09,200" },
    "8": { premium: "37,200", personalized: "1,09,200" },
    "9": { premium: "42,200", personalized: "1,14,200" },
    "10": { premium: "42,200", personalized: "1,14,200" },
    "11": { premium: "47,200", personalized: "1,19,200" },
    "12": { premium: "47,200", personalized: "1,19,200" },
  };

  const getPrice = (planType: keyof PriceType) => {
    return prices[classId]?.[planType] || "N.A";
  };

  const getInstallments = (planType: keyof PriceType) => {
    const total = parseInt(getPrice(planType).replace(/,/g, "")) || 0;
    const installments = planType === "premium" ? 2 : 4;
    return (total - 5000) / installments;
  };

  return (
    <div className="mt-5" id="price-plan">
      <p className="info-text p-0 m-0">Click on Plans to reveal the Plans</p>

      <table className="table price-table table-responsive p-0 m-0">
        <thead>
          <tr>
            <th
              className={`plan-header ${!pre ? "active" : "bg-white"}`}
              onClick={() => setPre(false)}
            >
              Premium Plan
            </th>
            <th
              className={`plan-header ${pre ? "active" : "bg-white"}`}
              onClick={() => setPre(true)}
            >
              Personalized Plan
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <p className="plan-detail">One Shot</p>
              <p className="plan-price">
                ₹ {getPrice(pre ? "personalized" : "premium")} Incl. of all
                taxes
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <p className="plan-detail">
                {pre ? "Four" : "Two"} Easy Installments
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="plan-detail">Total Fees</p>
              <p className="plan-price">
                ₹ {getPrice(pre ? "personalized" : "premium")}
              </p>
            </td>
            <td>
              <p className="plan-detail">Admission Fees</p>
              <p className="plan-price">₹ 5,000</p>
            </td>
          </tr>

          <tr>
            <td>
              <p className="plan-detail">Installment 1 Fees</p>
              <p className="plan-price">
                ₹ {getInstallments(pre ? "personalized" : "premium")}
              </p>
            </td>

            <td>
              <p className="plan-detail">Installment 2 Fees</p>
              <p className="plan-price">
                ₹ {getInstallments(pre ? "personalized" : "premium")}
              </p>
            </td>
          </tr>
          {pre && (
            <tr>
              <td>
                <p className="plan-detail">Installment 3 Fees</p>
                <p className="plan-price">
                  ₹ {getInstallments(pre ? "personalized" : "premium")}
                </p>
              </td>

              <td>
                <p className="plan-detail">Installment 4 Fees</p>
                <p className="plan-price">
                  ₹ {getInstallments(pre ? "personalized" : "premium")}
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PriceChart;

import React, { useEffect, useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { config } from "../../../../../config";

interface Payment {
  _id: string;
  name: string;
  mobileNumber: string;
  email: string;
  purpose: string;
  amount: string;
  selectClass: string;
  orderCreationId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  status: string;
  createdAt: string;
}

interface DailyChartData {
  date: string;
  amount: number;
}

const PaymentChart: React.FC = () => {
  const [chartData, setChartData] = useState<DailyChartData[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${config.SERVER}/payment/current-month`);
        const data = await response.json();
        setChartData(aggregateData(data));
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  const aggregateData = (payments: Payment[]): DailyChartData[] => {
    const chartData: DailyChartData[] = [];
    const currentYearMonth = new Date().toISOString().slice(0, 7); // Current year-month (YYYY-MM)

    const dailyPayments = payments.filter((payment) =>
      payment.createdAt.startsWith(currentYearMonth)
    );
    dailyPayments.forEach((payment) => {
      const date = payment.createdAt.split("T")[0];
      const amount = parseInt(payment.amount, 10);
      const existingData = chartData.find((data) => data.date === date);
      if (existingData) {
        existingData.amount += amount;
      } else {
        chartData.push({ date, amount });
      }
    });

    return chartData;
  };

  return (
    <div className="card border-0 shadow-sm p-4">
      <h4>Current Month's Revenue</h4>
      {chartData.length > 0 ? (
        <div className="d-flex justify-content-center">
          <LineChart
            width={350}
            height={300}
            data={chartData}
            style={{ width: "100%", height: "auto" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      ) : (
        <p className="text-center">No data available for the current month.</p>
      )}
    </div>
  );
};

export default PaymentChart;

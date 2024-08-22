import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AuthContext } from "../../../context/AuthProvider";
import { config } from "../../../../config";
import { Button } from "antd";

// Interface for graph data
interface GraphData {
  name: string; // Date in 'YYYY-MM-DD' format
  activeHours: number; // Total active hours for the day
}

const DailyActivityGraph = () => {
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const { token } = useContext(AuthContext) || {};
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize the current month and year
  useEffect(() => {
    const now = new Date();
    setMonth(String(now.getMonth() + 1).padStart(2, "0")); // Months are 0-based in JavaScript
    setYear(now.getFullYear());
  }, []);

  // Fetch data from the server
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.SERVER}/attendance/active-time-for-month?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setGraphData(response.data.graphData);
      } else {
        console.error("Failed to fetch data:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, month, year]);

  // Change month and year
  const changeMonth = (direction: "next" | "prev") => {
    const currentDate = new Date(year, parseInt(month) - 1);
    if (direction === "next") {
      currentDate.setMonth(currentDate.getMonth() + 1);
      if (currentDate.getMonth() === 0) {
        // If month becomes January, adjust year accordingly
        setYear(currentDate.getFullYear());
      }
    } else {
      currentDate.setMonth(currentDate.getMonth() - 1);
      if (currentDate.getMonth() === 11) {
        // If month becomes December, adjust year accordingly
        setYear(currentDate.getFullYear());
      }
    }
    setMonth(String(currentDate.getMonth() + 1).padStart(2, "0")); // Months are 0-based
  };

  const changeYear = (direction: "next" | "prev") => {
    setYear((prevYear) => {
      const newYear = direction === "next" ? prevYear + 1 : prevYear - 1;
      if (direction === "next" && month === "01") {
        // If moving to the next year and month is January, update month to January
        setMonth("01");
      } else if (direction === "prev" && month === "12") {
        // If moving to the previous year and month is December, update month to December
        setMonth("12");
      }
      return newYear;
    });
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <h5 className="text-3xl font-bold mb-4">Daily Activity Chart</h5>
      <AreaChart
        width={800}
        height={400}
        data={graphData}
        style={{ width: "100%", height: "auto" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="activeHours"
          stroke="#8884d8"
          fill="#8884d8"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
      <div className="d-flex align-items-center justify-content-center mb-4 ">
        <div>
          <Button
            onClick={() => changeYear("prev")}
            type="link"
            loading={loading}
          >
            Previous Year
          </Button>
          <Button
            onClick={() => changeMonth("prev")}
            type="link"
            loading={loading}
          >
            Previous Month
          </Button>
        </div>

        <span className="mx-4 text-xl font-semibold">
          {month}-{year}
        </span>

        <div>
          <Button
            onClick={() => changeMonth("next")}
            type="link"
            loading={loading}
          >
            Next Month
          </Button>
          <Button
            onClick={() => changeYear("next")}
            type="link"
            loading={loading}
          >
            Next Year
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyActivityGraph;

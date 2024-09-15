import { useContext, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AuthContext } from "../../../context/AuthProvider";
import { Button } from "antd";
import axios from "axios";
import { config } from "../../../../config";

interface LeadCount {
  state: string;
  count: number;
}

const LeadsCountChart = () => {
  const [leadsCount, setLeadsCount] = useState<LeadCount[]>([]);
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

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, month, year]);


  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.SERVER}/auth/bookings-count?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setLeadsCount(response.data.graphData);
      } else {
        console.error("Failed to fetch data:", response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

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
    <div className="bg-white p-4 rounded-md shadow-md w-full h-full flex flex-col rounded">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Leads Count</h2>
      <BarChart
        height={300}
        width={800}
        data={leadsCount}
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        style={{
          width: '100%', height: '100%'
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="state"
          tick={{ fontSize: 12 }}
          angle={-20}
          textAnchor="end"
          interval={0}
          height={60}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]} />
      </BarChart>
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

export default LeadsCountChart;

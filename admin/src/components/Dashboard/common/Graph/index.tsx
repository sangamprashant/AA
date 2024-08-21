import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Data {
  date: string;
  time: string; // Time in 'HH:mm' format
}

interface GraphData {
  name: string;
  activeHours: number; // Total active hours for the day
}

const notifi = [
  { date: "2024-08-01", time: "00:30" },
  { date: "2024-08-02", time: "00:43" },
  { date: "2024-08-03", time: "01:30" },
  { date: "2024-08-04", time: "02:15" },
  { date: "2024-08-05", time: "12:15" },
  { date: "2024-08-06", time: "10:15" },
  { date: "2024-08-07", time: "01:00" },
  { date: "2024-08-08", time: "03:45" },
  { date: "2024-08-09", time: "05:30" },
  { date: "2024-08-10", time: "07:00" },
  { date: "2024-08-11", time: "09:30" },
  { date: "2024-08-12", time: "11:15" },
  { date: "2024-08-13", time: "08:00" },
  { date: "2024-08-14", time: "02:30" },
  { date: "2024-08-15", time: "10:00" },
  { date: "2024-08-16", time: "04:45" },
  { date: "2024-08-17", time: "06:30" },
  { date: "2024-08-18", time: "12:00" },
  { date: "2024-08-19", time: "09:15" },
  { date: "2024-08-20", time: "11:45" },
  { date: "2024-08-21", time: "03:30" },
  { date: "2024-08-22", time: "07:15" },
  { date: "2024-08-23", time: "02:00" },
  { date: "2024-08-24", time: "05:30" },
  { date: "2024-08-25", time: "09:00" },
  { date: "2024-08-26", time: "11:00" },
  { date: "2024-08-27", time: "08:30" },
  { date: "2024-08-28", time: "06:45" },
  { date: "2024-08-29", time: "03:15" },
  { date: "2024-08-30", time: "04:00" },
  { date: "2024-08-31", time: "12:00" },
];

const DailyActivityGraph = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    setData(notifi);
  }, []);

  const [graphData, setGraphData] = useState<GraphData[]>([]);

  useEffect(() => {
    const dailyActivity: { [date: string]: number } = {};

    data.forEach((item) => {
      const { date, time } = item;
      const [hours, minutes] = time.split(":").map(Number);
      const totalHours = hours + minutes / 60;

      // Set the activity for the date
      dailyActivity[date] = totalHours;
    });

    const graphData: GraphData[] = Object.keys(dailyActivity).map((date) => ({
      name: date,
      activeHours: dailyActivity[date],
    }));

    setGraphData(graphData);
  }, [data]);

  return (
    <div className="max-w-full mx-auto p-4">
      <h5 className="text-3xl font-bold mb-4">Daily Activity Chart</h5>
      <LineChart
        width={800}
        height={400}
        data={graphData}
        style={{ width: "100%", height: "auto" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="activeHours"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default DailyActivityGraph;

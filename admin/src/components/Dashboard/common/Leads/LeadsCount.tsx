import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LeadCount {
  name: string;
  count: number;
}

const leads1 = [
  { name: "Jan", count: 100 },
  { name: "Feb", count: 120 },
  { name: "Mar", count: 140 },
  { name: "Apr", count: 160 },
  { name: "May", count: 180 },
  { name: "May", count: 180 },
  { name: "May", count: 180 },
  { name: "May", count: 180 },
  { name: "May", count: 180 },
  { name: "May", count: 0 },
  { name: "Nov", count: 180 },
  { name: "DEcember", count: 10 },
];

const leads2 = [
  { name: "New Leads", count: 100 },
  { name: "Qualified Leads", count: 50 },
  { name: "Converted Leads", count: 20 },
  { name: "Converted Leads", count: 20 },
  { name: "Converted Leads", count: 20 },
  { name: "Converted Leads", count: 20 },
  { name: "Converted Leads", count: 20 },
  { name: "Converted Leads", count: 20 },
  { name: "Converted Leads", count: 20 },
];

const LeadsCountChart = () => {
  const [leadsCount, setLeadsCount] = useState<LeadCount[]>([]);

  const [leadsCountLine, setLeadsCountLine] = useState<LeadCount[]>([]);

  useEffect(() => {
    setLeadsCount(leads2);
    setLeadsCountLine(leads1);
  }, []);

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Leads Count</h2>
      <div className="row">
        <div className="col-md-6">
          <BarChart
            width={400}
            height={200}
            data={leadsCount}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            style={{ width: "100%", height: "auto" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="col-md-6">
          <LineChart
            width={400}
            height={200}
            data={leadsCountLine}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            style={{ width: "100%", height: "auto" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default LeadsCountChart;

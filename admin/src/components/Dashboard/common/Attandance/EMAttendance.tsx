import { useParams } from "react-router-dom";
import Dashboard404 from "../../FrameComponents/404";
import EMCalendar from "./EMCalendar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { AttendanceRecord } from "../../../../types/attendance";
import axios from "axios";
import { config } from "../../../../config";
import { Button } from "antd";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const EMAttendance = () => {
  const { role } = useParams<{ role: string }>();
  if (role !== "employee" && role !== "manager") return <Dashboard404 />;
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token } = globals;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      fetchAttendanceForMonth(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
    }
  }, [token, currentDate]);

  const fetchAttendanceForMonth = async (year: number, month: number) => {
    try {
      setLoading(true);
      setAttendanceData([]);
      const response = await axios.get(`${config.SERVER}/attendance/monthly`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          year,
          month: month + 1,
        },
      });
      console.log(response.data.data.attendanceRecords);
      const normalizedRecords = response.data.data.attendanceRecords.map(
        (record: AttendanceRecord) => ({
          ...record,
          date: new Date(record.date).toISOString().split("T")[0],
        })
      );
      setAttendanceData(normalizedRecords);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-capitalize">ATTENDANCE</h5>
        <div className="d-flex gap-2">
          <div className="d-flex justify-content-between ">
            <Button
              loading={loading}
              onClick={handlePrevMonth}
              icon={<ArrowLeftIcon />}
              type="primary"
            />
            <h3 style={{
              width:"300px"
            }} className=" text-center">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <Button
              loading={loading}
              onClick={handleNextMonth}
              icon={<ArrowRightIcon />}
              type="primary"
            />
          </div>
        </div>
      </div>
      <div className="d-flex card p-4 ms-1">
        <EMCalendar attendanceData={attendanceData} currentDate={currentDate} />
        div.selected data
      </div>
    </>
  );
};

export default EMAttendance;

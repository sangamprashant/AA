import { Button } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../../config";
import { Booking } from "../../../../types/booking";
import { AuthContext } from "../../../context/AuthProvider";
import RenderData from "../../Employee/components/Bookings/Reuse/EmpOpenRenderData";
import Spinner from "../Spinner";

const AMLeadsOpen = () => {
  const [data, setData] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate()

  const appContext = useContext(AuthContext);
  if (!appContext) {
    return null;
  }

  const { token, user } = appContext;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.SERVER}/auth/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!data) return <div className="text-center mt-5">No data available</div>;

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>LEADS Details</h5>
        <div className="d-flex gap-2">
          <Button type="primary" danger onClick={() => navigate(`/${user?.role}/leads-bucket`)}>
            Go Back
          </Button>
        </div>
      </div>
      <div className="pb-2">
        <div className="card shadow-sm p-4">
          {data && <RenderData selectedData={data} />}
        </div>
      </div>
    </>
  );
};

export default AMLeadsOpen;

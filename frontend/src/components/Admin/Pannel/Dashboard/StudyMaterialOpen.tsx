import axios from "axios";
import { useContext, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingUI } from "../../../../App";
import { config } from "../../../../config";
import { AuthContext } from "../../Auth/AuthProvider";
import StudyMaterialForm from "./AdminReuse/StudyMaterialForm";

const StudyMaterialOpen = () => {
  const authContext = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState<{
    _id: string;
    title: string;
    pdfUrl: string;
    imageUrl: string;
    content: string;
    category: string;
  }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (!authContext) {
    return <LoadingUI />;
  }

  const { setHeader, token } = authContext;

  useLayoutEffect(() => {
    setHeader("Study Materials: Edit");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.SERVER}/study-materials/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.material);
      } catch (err) {
        setError("Failed to fetch study material data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingUI />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card p-3 border-0 shadow">
      <div className="container">
        <StudyMaterialForm data={data} />
      </div>
    </div>
  );
};

export default StudyMaterialOpen;

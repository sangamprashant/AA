import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Button, Image, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../../../config"; // Ensure this path is correct
import { AuthContext } from "../../../context/AuthProvider";
import Dashboard404 from "../../FrameComponents/404";
import Spinner from "../Spinner";
import StudyMaterialForm from "./StudyMaterialForm";
import EditOffIcon from "@mui/icons-material/EditOff";

interface StudyMaterial {
  _id: string;
  title: string;
  pdfUrl?: string;
  imageUrl: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  free: boolean;
  likes: number;
  unlikes: number;
}

const AMSMOpen: React.FC = () => {
  const { role, id } = useParams<{ role: string; id: string }>();
  const [material, setMaterial] = useState<StudyMaterial | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { user } = globals;

  // Check if the role is neither 'admin' nor 'manager'
  if (role !== "admin" && role !== "manager") {
    return <Dashboard404 />;
  }

  useEffect(() => {
    fetchMaterial();
  }, [id]);

  useEffect(() => {
    if (!isEdit) fetchMaterial();
  }, [isEdit]);

  const fetchMaterial = async () => {
    try {
      const response = await fetch(`${config.SERVER}/study-materials/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMaterial(data.material);
    } catch (error) {
      setError("Failed to fetch study material");
      console.error("Error fetching material:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEdit = () => {
    setIsEdit((pre) => !pre);
  };

  //   if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <>
        <div className="nav-bar mb-4 d-flex justify-content-between align-items-center">
          <h5 className="text-uppercase">Study Materials - Open</h5>
          <div className="d-flex gap-2">
            {!isEdit ? (
              <Tooltip
                title={`${
                  user?.role === "admin" ? "Edit" : "Only admin can edit"
                } the content`}
              >
                <Button
                  icon={<ModeEditIcon />}
                  disabled={user?.role !== "admin"}
                  type="primary"
                  onClick={handleToggleEdit}
                >
                  Edit
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title="Close Editing">
                <Button
                  icon={<EditOffIcon />}
                  danger
                  type="primary"
                  onClick={handleToggleEdit}
                >
                  Cancel
                </Button>
              </Tooltip>
            )}
          </div>
        </div>

        {loading && <Spinner />}

        {isEdit ? (
          <> {isEdit && material && <StudyMaterialForm data={material} />}</>
        ) : (
          <>
            {" "}
            {material ? (
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">{material.title}</h2>
                  <p className="card-subtitle">Category: {material.category}</p>
                </div>
                <div className="card-body">
                  <div className="row" style={{ margin: "0px" }}>
                    <div className="col-md-8 text-start">
                      <div className="mb-3 text-start">
                        <strong>Content:</strong>
                        <div
                          className=""
                          dangerouslySetInnerHTML={{ __html: material.content }}
                        />
                      </div>
                      {material.pdfUrl && (
                        <div className="mb-3">
                          <strong>PDF URL:</strong>{" "}
                          <a
                            href={material.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-link"
                          >
                            View PDF
                          </a>
                        </div>
                      )}
                      {material.imageUrl && (
                        <div className="mb-3 d-flex flex-column justify-content-start align-items-center">
                          <strong>Image:</strong>{" "}
                          <Image
                            src={material.imageUrl}
                            alt={material.title}
                            style={{ maxWidth: "100px" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <div className="list-group">
                        <div className="list-group-item">
                          <strong>Created At:</strong>{" "}
                          {new Date(material.createdAt).toLocaleDateString()}
                        </div>
                        <div className="list-group-item">
                          <strong>Updated At:</strong>{" "}
                          {new Date(material.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="list-group-item">
                          <strong>Free:</strong> {material.free ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {!loading && (
                  <div className="alert alert-warning mt-4">
                    No study material found
                  </div>
                )}
              </>
            )}
          </>
        )}
      </>
    </>
  );
};

export default AMSMOpen;

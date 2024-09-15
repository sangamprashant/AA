import React, { useContext, useEffect, useState } from "react";
import { Table, Modal, notification } from "antd";
import { config } from "../../../../../config";
import moment from "moment"; // Import moment
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthProvider";
import { LoadingUI } from "../../../../../App";
import { Button } from "react-bootstrap";

interface StudyMaterial {
  _id: string;
  title: string;
  pdfUrl: string;
  imageUrl: string;
  content: string;
  category: string;
  free: boolean;
  createdAt: string;
  updatedAt: string;
  likes: number;
  unlikes: number;
}

const StudyMaterialView: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <LoadingUI />;
  }
  const { token } = authContext;
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.SERVER}/study-materials`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMaterials(data.materials);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${config.SERVER}/study-materials/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result.success) {
        notification.success({
          message: "Success",
          description: result.message,
        });
        setMaterials(materials.filter((material) => material._id !== id));
      } else {
        notification.error({
          message: "Error",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error deleting material:", error);
      notification.error({
        message: "Error",
        description:
          "Failed to delete the study material. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this study material?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
      centered: true,
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => moment(text).format("YYYY-MM-DD HH:mm:ss"), // Format the date
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: StudyMaterial) => (
        <span className="d-flex gap-2">
          <Link to={`/admin/s-m/${record._id}`} className="btn btn-primary">
            View
          </Link>
          <Button
            type="button"
            variant="danger"
            onClick={() => showDeleteConfirm(record._id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={materials}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

export default StudyMaterialView;

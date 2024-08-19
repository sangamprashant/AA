import React, { useContext, useEffect, useState } from "react";
import { Table, Modal, notification, Button } from "antd";
import moment from "moment"; // Import moment
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { config } from "../../../../config";

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
  if (!authContext) return null;
  const { token, user } = authContext;
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchMaterials = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${config.SERVER}/study-materials?page=${page}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.materials.length < 10) {
        setHasMore(false);
      }
      setMaterials((prevMaterials) => [...prevMaterials, ...data.materials]);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials(page);
  }, [page]);

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
          <Link
            to={`/${user?.role}/s-m/${record._id}`}
            className="btn btn-primary"
          >
            View
          </Link>
          {user?.role === "admin" && (
            <Button
              type="default"
              danger
              onClick={() => showDeleteConfirm(record._id)}
            >
              Delete
            </Button>
          )}
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
        pagination={false}
      />
      <div className="d-flex justify-content-center mt-3">
        {loading ? (
          <Button type="primary" loading>
            Loading...
          </Button>
        ) : hasMore ? (
          <Button type="primary" onClick={() => setPage((prev) => prev + 1)}>
            Load More
          </Button>
        ) : (
          <span>No more data</span>
        )}
      </div>
    </div>
  );
};

export default StudyMaterialView;

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { config } from "../../../../../config";
import moment from "moment"; // Import moment
import { Link } from "react-router-dom";

// Define a type for the study material
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
        setMaterials(data.materials); // Assuming the response contains an array of materials
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

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
          <button className="btn btn-danger">Delete</button>
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

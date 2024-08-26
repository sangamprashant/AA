import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  List,
  Popconfirm,
  Typography,
  notification,
} from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { config } from "../../../../../config";
import { AuthContext } from "../../../../context/AuthProvider";
import AdminWrapper from "../../AdminWrapper";
import { Subject } from "../../../../../types/subject";

const { Title } = Typography;

interface FormValues {
  subjectName: string;
}

// Notification function
const openNotification = (
  message: string,
  description: string,
  type: "success" | "error"
) => {
  notification[type]({
    message,
    description,
    duration: 5,
  });
};

const AdminSubjects: React.FC = () => {
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token } = globals;
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [form] = Form.useForm();
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchSubjects();
  }, [token]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get<Subject[]>(`${config.SERVER}/subject`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubjects(response.data);
    } catch (error) {
      openNotification("Error", "Failed to fetch subjects", "error");
    }
  };

  const handleAddOrUpdateSubject = async (values: FormValues) => {
    try {
      setLoading(true);
      if (editingSubject) {
        // Update existing subject
        const response = await axios.put<Subject>(
          `${config.SERVER}/subject/${editingSubject._id}`,
          { title: values.subjectName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubjects(
          subjects.map((subject) =>
            subject._id === response.data._id ? response.data : subject
          )
        );
        openNotification("Success", "Subject updated successfully", "success");
      } else {
        // Add new subject
        const response = await axios.post<Subject>(
          `${config.SERVER}/subject`,
          { title: values.subjectName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubjects([response.data, ...subjects]);
        openNotification("Success", "Subject added successfully", "success");
      }
      form.resetFields();
      setEditingSubject(null);
    } catch (error) {
      openNotification("Error", "Failed to save subject", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    form.setFieldsValue({ subjectName: subject.title });
  };

  const handleDelete = async (subjectId: string) => {
    try {
      await axios.delete(`${config.SERVER}/subject/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubjects(subjects.filter((subject) => subject._id !== subjectId));
      openNotification("Success", "Subject deleted successfully", "success");
    } catch (error) {
      openNotification("Error", "Failed to delete subject", "error");
    }
  };

  return (
    <AdminWrapper>
      <div className="nav-bar mb-3 d-flex justify-content-between align-items-center">
        <Title level={5} className="text-uppercase">
          Subjects
        </Title>
      </div>

      <div className="mx-1 row card p-4">
        <div className="col-md-12 mb-2">
          <>
            <Form<FormValues>
              form={form}
              onFinish={handleAddOrUpdateSubject}
              layout="vertical"
            >
              <Form.Item
                name="subjectName"
                label="Subject Name"
                rules={[
                  { required: true, message: "Please enter a subject name" },
                ]}
              >
                <Input placeholder="Enter subject name" />
              </Form.Item>
              <Form.Item className="text-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-100"
                >
                  {editingSubject ? "Update Subject" : "Add Subject"}
                </Button>
              </Form.Item>
            </Form>
          </>
        </div>
        <div className="col-md-12 mb-2">
          <List
            header={<h3>Subjects List</h3>}
            bordered
            dataSource={subjects}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                actions={[
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(item)}
                    key="edit"
                  />,
                  <Popconfirm
                    title="Are you sure you want to delete this subject?"
                    onConfirm={() => handleDelete(item._id)}
                    okText="Yes"
                    cancelText="No"
                    key="delete"
                  >
                    <Button icon={<DeleteOutlined />} danger />
                  </Popconfirm>,
                ]}
              >
                {item.title}
              </List.Item>
            )}
          />
        </div>
      </div>
    </AdminWrapper>
  );
};

export default AdminSubjects;

import { UploadOutlined } from "@ant-design/icons";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import SyncIcon from "@mui/icons-material/Sync";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../../config";
import { uploadFileToFirebase } from "../../../../firebase";
import { Subject } from "../../../../types/subject";
import { AuthContext } from "../../../context/AuthProvider";

export interface TeachingNoteData {
  _id: string;
  title: string;
  pdfUrl: string;
  class: number;
  subject: {
    _id: string;
    title: string;
  };
}

const TeachingNotes: React.FC = () => {
  const { token, user } = useContext(AuthContext) || {};
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingL, setLoadingL] = useState<boolean>(false);
  const [teachingNotes, setTeachingNotes] = useState<TeachingNoteData[]>([]);
  const [teachingSavedNotes, setTeachingSavedNotes] = useState<
    TeachingNoteData[]
  >([]);
  const [savedNoteIds, setSavedNoteIds] = useState<Set<string>>(
    new Set<string>()
  );
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
    if (user?.role === "teacher") fetchSavedData();
  }, [token, user, loadingL]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.SERVER}/teaching-notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          role: user?.role,
        },
      });
      setTeachingNotes(response.data.notes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.SERVER}/teaching-notes/saved-notes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const savedNotes = response.data.notes;
      setTeachingSavedNotes(savedNotes);
      setSavedNoteIds(
        new Set<string>(savedNotes.map((note: TeachingNoteData) => note._id))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togggleSaved = async (id: string) => {
    try {
      const response = await axios.get(
        `${config.SERVER}/teaching-notes/toggle-save`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            noteId: id,
          },
        }
      );
      const updatedNoteIds = new Set<string>(
        response.data.notes.map((note: TeachingNoteData) => note._id)
      );
      setSavedNoteIds(updatedNoteIds);
    } catch (error) {
      console.error(error);
    } finally {
      handleLoading();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${config.SERVER}/teaching-notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id
        }
      });
      if (response.data.success) {
        setTeachingNotes((prevNotes) => prevNotes.filter((note) => note._id !== id))

      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLoading = () => {
    setLoadingL((prev) => !prev);
  };

  // Filter notes by the selected class
  const filteredNotes = selectedClass
    ? teachingNotes.filter((note) => note.class === selectedClass)
    : teachingNotes;

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">Teaching Notes</h5>
        <div className="d-flex gap-2">
          <Select
            placeholder="Select Class"
            onChange={(value: number) => setSelectedClass(value)}
            style={{ width: 200 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Select.Option value={i + 1} key={i + 1}>
                Class {i + 1}
              </Select.Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<SyncIcon />}
            onClick={fetchData}
            loading={loading}
          />
        </div>
      </div>

      <Tabs defaultActiveKey="1" className="ps-1">
        <Tabs.TabPane tab="Notes" key="Notes">
          <TeachingNotesRender
            teachingNotes={filteredNotes}
            loading={loading}
            togggleSaved={togggleSaved}
            savedNoteIds={savedNoteIds}
            handleDelete={handleDelete}
          />
        </Tabs.TabPane>
        {user?.role === "admin" ? (
          <Tabs.TabPane tab="Add" key="Add">
            <AddNotes />
          </Tabs.TabPane>
        ) : (
          <Tabs.TabPane tab="Saved" key="saved">
            <TeachingNotesRender
              teachingNotes={teachingSavedNotes}
              loading={loading}
              togggleSaved={togggleSaved}
              savedNoteIds={savedNoteIds}
              handleDelete={handleDelete}
            />
          </Tabs.TabPane>
        )}
      </Tabs>
    </>
  );
};

interface TeachingNoteRenderProps {
  teachingNotes: TeachingNoteData[];
  loading: boolean;
  togggleSaved: (id: string) => void;
  handleDelete: (id: string) => void;
  savedNoteIds: Set<string>;
}

const TeachingNotesRender: React.FC<TeachingNoteRenderProps> = ({
  teachingNotes,
  loading,
  togggleSaved,
  savedNoteIds,
  handleDelete
}) => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string>("")


  const confirmDelete = () => {
    if (deleteId) {
      handleDelete(deleteId)
      setDeleteId("");
    }
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (subject: { title: string }) => subject.title,
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <div className="d-flex gap-2">
          <Button
            type="text"
            icon={<VisibilityIcon />}
            onClick={() => navigate(`./${id}`)}
          />
          {user?.role === "admin" ? (
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirmDelete}
              // onCancel={ }
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" danger icon={<DeleteIcon />} onClick={() => setDeleteId(id)} />
            </Popconfirm>
          ) : (
            <Button
              type="text"
              icon={
                savedNoteIds.has(id) ? <BookmarkIcon /> : <BookmarkBorderIcon />
              }
              onClick={() => togggleSaved(id)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="table-responsive">
      <Table
        dataSource={teachingNotes}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

const AddNotes: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [subjectClass, setSubjectClass] = useState<number | null>(null);
  const { token } = useContext(AuthContext) || {};

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
      message.error("Failed to fetch subjects.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setFileUrl(fileURL);
    } else {
      message.error("Please upload a valid PDF file.");
      setSelectedFile(null);
      setFileUrl(null);
    }
  };

  const handleSubmit = async (values: any) => {
    if (!selectedFile) {
      message.error("Please select a PDF file to upload.");
      return;
    }

    setUploading(true);
    try {
      const downloadURL = await uploadFileToFirebase(
        selectedFile,
        `teaching-notes/${selectedFile.name}`
      );
      const noteData = {
        title: values.title,
        subject: values.subject,
        class: subjectClass,
        pdfUrl: downloadURL,
      };

      await axios.post(`${config.SERVER}/teaching-notes`, noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("Note added successfully!");
      setSelectedFile(null);
      setFileUrl(null);
    } catch (error) {
      message.error("Failed to upload PDF or save note.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form layout="vertical" className="card p-4 mx-1" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Note Title"
            name="title"
            rules={[{ required: true, message: "Please enter the note title" }]}
          >
            <Input placeholder="Enter note title" suffix={<UploadOutlined />} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Select Subject"
            name="subject"
            rules={[{ required: true, message: "Please select a subject!" }]}
          >
            <Select placeholder="Select subject">
              {subjects.map((subject) => (
                <Select.Option value={subject._id} key={subject._id}>
                  {subject.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Class"
            name="class"
            rules={[{ required: true, message: "Please select a class!" }]}
          >
            <Select
              placeholder="Select class"
              onChange={(value: number) => setSubjectClass(value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <Select.Option value={i + 1} key={i + 1}>
                  Class {i + 1}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Upload PDF">
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              suffix={<UploadOutlined />}
            />
          </Form.Item>
          {fileUrl && (
            <div>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="my-3"
              >
                Preview PDF
              </a>
            </div>
          )}
        </Col>
      </Row>
      <Button
        type="primary"
        htmlType="submit"
        loading={uploading}
        disabled={!selectedFile}
      >
        Submit
      </Button>
    </Form>
  );
};

export default TeachingNotes;

import { UploadOutlined } from "@ant-design/icons";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Table,
  Tabs,
} from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { config } from "../../../../config";
import { uploadFileToFirebase } from "../../../../firebase";
import { Subject } from "../../../../types/subject";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

interface TeachingNoteData {
  _id: string;
  title: string;
  pdfUrl: string;
  subject: {
    _id: string;
    title: string;
  };
}

const TeachingNotes: React.FC = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { token, user } = globles;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingL, setLoadingL] = useState<boolean>(false);
  const [teachingNotes, setTeachingNotes] = useState<TeachingNoteData[]>([]);
  const [teachingSavedNotes, setTeachingSavedNotes] = useState<
    TeachingNoteData[]
  >([]);
  const [savedNoteIds, setSavedNoteIds] = useState<Set<string>>(
    new Set<string>()
  );

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

  const handleLoading = () => {
    setLoadingL((pre) => !pre);
  };

  return (
    <div>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">Teaching Notes</h5>
      </div>
      <Tabs defaultActiveKey="1" className="ps-1">
        <Tabs.TabPane tab="Notes" key="Notes">
          <TeachingNotesRender
            teachingNotes={teachingNotes}
            loading={loading}
            togggleSaved={togggleSaved}
            savedNoteIds={savedNoteIds}
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
            />
          </Tabs.TabPane>
        )}
      </Tabs>
    </div>
  );
};

interface TeachingNoteRenderProps {
  teachingNotes: TeachingNoteData[];
  loading: boolean;
  togggleSaved: (id: string) => void;
  savedNoteIds: Set<string>;
}

const TeachingNotesRender: React.FC<TeachingNoteRenderProps> = ({
  teachingNotes,
  loading,
  togggleSaved,
  savedNoteIds,
}) => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { user } = globles;

  const navigate = useNavigate();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
            <Button type="text" danger icon={<DeleteIcon />} />
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
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { token } = authContext;

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
      </Row>

      <Form.Item
        label="Upload PDF"
        name="pdf"
        rules={[{ required: true, message: "Please upload a PDF file" }]}
      >
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="upload"
        />
        <label htmlFor="upload">
          <Button
            icon={<UploadOutlined />}
            loading={uploading}
            onClick={() => document.getElementById("upload")?.click()}
          >
            {selectedFile ? selectedFile.name : "Choose File"}
          </Button>
        </label>
        {fileUrl && (
          <embed
            src={fileUrl}
            type="application/pdf"
            width="100%"
            height="500px"
            className="mt-2"
          />
        )}
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={uploading}
          disabled={uploading}
        >
          Add Note
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeachingNotes;

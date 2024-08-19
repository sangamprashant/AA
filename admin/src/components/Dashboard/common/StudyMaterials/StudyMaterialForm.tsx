import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../../../firebase";
import { AuthContext } from "../../../context/AuthProvider";
import { config } from "../../../../config";
import StydyMaterialHelp from "./StydyMaterialHelp";
import { Col, Form, Row } from "antd";

interface StudyMaterialFormProps {
  data?: {
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
  };
}

const StudyMaterialForm: React.FC<StudyMaterialFormProps> = ({ data }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { token } = authContext;
  const [title, setTitle] = useState(data?.title || "");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState(data?.content || "");
  const [category, setCategory] = useState(data?.category || "LKG");
  const [pdfUrl, setPdfUrl] = useState<string | null>(data?.pdfUrl || null);
  const [free, setFree] = useState<boolean>(data?.free || true);
  const [imageUrl, setImageUrl] = useState<string | null>(
    data?.imageUrl || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?._id) {
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setPdfUrl(data?.pdfUrl|| "");
      setImageUrl(data.imageUrl);
      setFree(data?.free);
    }
  }, [data]);

  const handleFileUpload = async (
    file: File,
    path: string
  ): Promise<string> => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      let pdfUploadUrl = pdfUrl;
      let imageUploadUrl = imageUrl;

      if (pdfFile) {
        pdfUploadUrl = await handleFileUpload(pdfFile, `pdfs/${pdfFile.name}`);
      }

      if (imageFile) {
        imageUploadUrl = await handleFileUpload(
          imageFile,
          `images/${imageFile.name}`
        );
      }

      const payload = {
        title,
        pdf: pdfUploadUrl,
        image: imageUploadUrl,
        content,
        category,
        free,
      };

      if (data) {
        // Update existing material
        await axios.put(
          `${config.SERVER}/study-materials/${data._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Study material updated successfully");
      } else {
        // Add new material
        await axios.post(`${config.SERVER}/study-materials`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Study material added successfully");
      }
      setTitle("");
      setPdfFile(null);
      setImageFile(null);
      setContent("");
      setCategory("LKG");
      setPdfUrl(null);
      setImageUrl(null);
    } catch (error) {
      alert("Failed to upload files or submit data");
    } finally {
      setLoading(false);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
      setPdfUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-md-12">
          <form onSubmit={handleSubmit} className="p-1">
            <p>{data ? "Edit Study Material" : "Add Study Material"}</p>
            <hr />
            <Row
              gutter={16}
              style={{
                width: "100%",
              }}
            >
              <Col span={12}>
                <Form.Item required label="Title" layout="vertical">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                    required
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item required label="Select Class" layout="vertical">
                  <select
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    {[...Array(12)].map((_, index) => (
                      <option key={index + 1} value={`class ${index + 1}`}>
                        Class {index + 1}
                      </option>
                    ))}
                  </select>
                </Form.Item>
              </Col>
            </Row>

            <div className="form-group">
              <label htmlFor="pdf">
                <b>PDF</b>
              </label>
              <input
                type="file"
                className="form-control"
                id="pdf"
                accept=".pdf"
                onChange={handlePdfChange}
              />
              {pdfUrl && !pdfFile && (
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  Current PDF
                </a>
              )}
            </div>

            <Form.Item required label="Card Image" layout="vertical">
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!data} // Required if adding new material
                />
                {imageUrl && !imageFile && (
                  <img src={imageUrl} alt="Current" width="100" />
                )}
              </div>
            </Form.Item>

            <Form.Item required label="Material Content" layout="vertical">
              <code>
                here html can be pasted and uploaded (bootstrap-5-css included){" "}
              </code>
              <textarea
                className="form-control"
                id="content"
                rows={7}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter HTML content to display"
                required
              />
            </Form.Item>
            <div className="form-group">
              <div className="form-group my-2 d-flex gap-2">
                <label
                  htmlFor="free"
                  className="d-flex align-items-center gap-1"
                >
                  <b>Is content free</b>{" "}
                  <input
                    type="radio"
                    checked={free}
                    id="free"
                    onClick={() => {
                      setFree(true);
                    }}
                    required
                  />
                </label>
                <label
                  htmlFor="email"
                  className="d-flex align-items-center gap-1"
                >
                  <b>Needed email</b>{" "}
                  <input
                    type="radio"
                    checked={!free}
                    id="email"
                    onClick={() => {
                      setFree(false);
                    }}
                    required
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={loading}
            >
              {loading ? "Submitting..." : data ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <hr />

      <h5 className="text-danger">
        Preview: how it will look on the client side
      </h5>
      <div className="mt-3">
        <div className="card-content-explore">
          <img
            src={
              imageUrl
                ? imageUrl
                : data?.imageUrl
                ? data.imageUrl
                : "https://via.placeholder.com/150"
            }
            className="card-img-top-content-explore"
            alt=""
          />
          <div className="card-body">
            <p className="m-0">
              <strong>{title ? title : "{title here}"}</strong>
            </p>
          </div>
          <div className="content-explore-offer">
            <p className={`m-0 ${free ? "free" : "email"}`}>
              {free ? "Free" : "Email"}
            </p>
          </div>
        </div>
        <hr />

        <div className="py-5">
          <h5 className="text-danger">When card is clicked and opened:</h5>
          <h2>{title ? title : "Title here..."}</h2>
          <div
            className="my-3"
            dangerouslySetInnerHTML={{
              __html: content
                ? content
                : "Add content in the above form to see the changes",
            }}
          />
          {pdfUrl && (
            <iframe src={pdfUrl} width="100%" height="500" title="PDF Viewer" />
          )}
        </div>
        <hr />

        <details>
          <summary>Needed help to enter content?</summary>{" "}
          <div className="container mt-2">
            <h5 className="text-danger">
              Some common tags to make good content
            </h5>
            <StydyMaterialHelp />
          </div>
        </details>
      </div>
    </>
  );
};

export default StudyMaterialForm;

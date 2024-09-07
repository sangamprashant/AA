import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { config } from "../../../../../config";
import { uploadFileToFirebase } from "../../../../../firebase";
import { Booking } from "../../../../../types/booking";
import { AuthContext } from "../../../../context/AuthProvider";
import Spinner from "../../../common/Spinner";
import EmployeeWrapper from "../../EmployeeWrapper";
import AddDocuments from "./Reuse/AddDocuments";
import RenderData from "./Reuse/EmpOpenRenderData";

const { Title } = Typography;
const { Option } = Select;

const EmpBOpen = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { token, user } = authContext;
  const { id } = useParams();
  const [selectedData, setSelectedData] = useState<Booking | null>(null);
  const [form] = Form.useForm();
  const [newState, setNewState] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")
  const navigate = useNavigate();

  const [receipts, setReceipts] = useState<{ file: File | null; description: string }[]>([]);
  const [documents, setDocuments] = useState<{ file: File | null; description: string }[]>([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.SERVER}/auth/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedData(res.data.data);
      setNewState(res.data.data.state || "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Upload files to Firebase and collect download URLs
  const uploadFilesToFirebase = async () => {
    const uploadedDocuments = await Promise.all(
      documents.map(async (doc) => {
        if (doc.file) {
          const url = await uploadFileToFirebase(doc.file, `documents/${doc.file.name}`);
          return { description: doc.description, url };
        }
        return null;
      })
    );

    const uploadedReceipts = await Promise.all(
      receipts.map(async (rec) => {
        if (rec.file) {
          const url = await uploadFileToFirebase(rec.file, `receipts/${rec.file.name}`);
          return { description: rec.description, url };
        }
        return null;
      })
    );

    return {
      documents: uploadedDocuments.filter(Boolean), // Filter out null values
      receipts: uploadedReceipts.filter(Boolean),
    };
  };

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);

      // Upload files to Firebase and collect URLs
      const { documents: documentUrls, receipts: receiptUrls } = await uploadFilesToFirebase();

      // Send data to the server
      await axios.put(
        `${config.SERVER}/auth/booking/${id}`,
        {
          state: newState,
          comment: comment,
          documents: documentUrls,
          receipts: receiptUrls,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/${user?.role}/leads-bucket`);
    } catch (error) {
      console.error("Error updating booking:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <EmployeeWrapper>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">LEADS - Update</h5>
        <Button type="primary" danger onClick={() => navigate(`/${user?.role}/leads-bucket`)}>
          Go Back
        </Button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="card p-4">
          {selectedData ? (
            <>
              {selectedData && <RenderData selectedData={selectedData} />}
              <hr />
              <Title level={3}>Data Entry</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} className="my-2">
                  <Form form={form} layout="vertical">
                    <Form.Item
                      label="Update Status"
                      name="status"
                      initialValue={newState}
                      rules={[{ required: true, message: "Please select a status!" }]}
                    >
                      <Select value={newState} onChange={(value) => setNewState(value)}>
                        <Option value="New leads">New leads</Option>
                        <Option value="Attempt to contacted (1)">Attempt to contacted (1)</Option>
                        <Option value="Attempt to contacted (2)">Attempt to contacted (2)</Option>
                        <Option value="Connected">Connected</Option>
                        <Option value="Prospect">Prospect</Option>
                        <Option value="Hot leads">Hot leads</Option>
                        {selectedData?.state !== "Payment Received" && (
                          <Option value="Payment Received">Payment Received</Option>
                        )}
                        <Option value="Not Interested">Not Interested</Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>

                <Col xs={24} sm={24} md={12} className="my-2">
                  <Form.Item label={`Comment for ${newState}`} name="comment" layout="vertical" >
                    <Input placeholder={`Type your comment for ${newState}`} value={comment} onChange={(val) => setComment(val.target.value)} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} className="my-2">
                  <AddDocuments data={documents} setData={setDocuments} type="detail" />
                </Col>

                {newState === "Payment Received" && (
                  <Col xs={24} sm={24} md={12}>
                    <AddDocuments data={receipts} setData={setReceipts} type="receipt" />
                  </Col>
                )}
              </Row>

              <div className="text-end d-flex gap-2 justify-content-end">
                <Link to="/employee/leads-bucket" className="btn btn-outline-danger btn-sm">
                  Cancel
                </Link>
                <Button key="update" type="primary" onClick={handleUpdate} loading={updateLoading}>
                  Update
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center flex-column align-items-center">
              <img src="/no-data.png" width="100%" style={{ maxWidth: "500px" }} />
              <h1 className="display-6">No Data Found</h1>
            </div>
          )}
        </div>
      )}
    </EmployeeWrapper>
  );
};

export default EmpBOpen;

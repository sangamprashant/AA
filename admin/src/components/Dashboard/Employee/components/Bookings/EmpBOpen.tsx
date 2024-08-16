import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { config } from "../../../../../config";
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
  const { token } = authContext;
  const { id } = useParams();
  const [selectedData, setSelectedData] = useState<Booking | null>(null);
  const [form] = Form.useForm();
  const [newState, setNewState] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [receipts, setReceipts] = useState<
    { file: File | null; description: string }[]
  >([]);

  // Handling file selection and dynamic fields
  const [documents, setDocuments] = useState<
    { file: File | null; description: string }[]
  >([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleUpdate = () => {
    console.log({ receipts, documents });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.SERVER}/auth/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setSelectedData(res.data.data);
      setNewState(res.data.data.state || "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!selectedData) {
    return <>No Data </>;
  }

  return (
    <EmployeeWrapper>
      <div className="card p-4 my-4">
        <h1 className="">Leads Update</h1>
        <hr />
        {selectedData && <RenderData selectedData={selectedData} />}
        <hr />
        <Title level={3}>Data Entry</Title>
        <Row gutter={16}>
          <Col span={12} className="my-2">
            <Form form={form} layout="vertical">
              <Form.Item
                label="Update Status"
                name="status"
                initialValue={newState}
                rules={[{ required: true, message: "Please select a status!" }]}
              >
                <Select
                  value={newState}
                  onChange={(value) => setNewState(value)}
                >
                  <Option value="New leads">New leads</Option>
                  <Option value="Attempt to contacted (1)">
                    Attempt to contacted (1)
                  </Option>
                  <Option value="Attempt to contacted (2)">
                    Attempt to contacted (2)
                  </Option>
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
          <Col span={12} className="my-2">
            <Form layout="vertical">
              {/* Comment fields based on state */}
              {newState && (
                <Form.Item label={`Comment for ${newState}`} name="comment">
                  <Input placeholder={`Type your comment for ${newState}`} />
                </Form.Item>
              )}
            </Form>
          </Col>
          <Col span={12} className="my-2">
            <AddDocuments
              data={documents}
              setData={setDocuments}
              type="detail"
            />
          </Col>

          {newState === "Payment Received" && (
            <Col span={12}>
              <AddDocuments
                data={receipts}
                setData={setReceipts}
                type="recipt"
              />
            </Col>
          )}
        </Row>
        <div className="text-end d-flex gap-2 justify-content-end ">
          <Link
            to="/employee/leads-bucket"
            className="btn btn-outline-danger btn-sm"
          >
            Cancel
          </Link>
          <Button
            key="update"
            type="primary"
            // loading={loading}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </div>
    </EmployeeWrapper>
  );
};

export default EmpBOpen;

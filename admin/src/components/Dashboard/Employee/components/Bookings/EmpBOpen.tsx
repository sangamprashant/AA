import { Button, Col, Form, Image, Input, Row, Select, Typography } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { config } from "../../../../../config";
import { Booking } from "../../../../../types/booking";
import { AuthContext } from "../../../../context/AuthProvider";
import Spinner from "../../../common/Spinner";
import EmployeeWrapper from "../../EmployeeWrapper";

const { Title, Text } = Typography;
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
  // Handling file selection
  const [fileList, setFileList] = useState<File[]>([]);

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

  if (loading) {
    return <Spinner />;
  }

  if (!selectedData) {
    return <>No Data </>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileList(Array.from(e.target.files));
    }
  };

  // Image Preview
  const renderImagePreviews = () => {
    return fileList.map((file, index) => (
      <Image
        key={index}
        className="border border-1"
        src={URL.createObjectURL(file)}
        width={100}
        alt={`Selected image ${index + 1}`}
      />
    ));
  };

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
            <Form layout="vertical">
              <Form.Item label="Write a Comment" name="comment">
                <Input.TextArea placeholder="Type your comment here" />
              </Form.Item>
            </Form>
          </Col>

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
                  {selectedData?.state != "Payment Received" && (
                    <Option value="Payment Received">Payment Received</Option>
                  )}
                  <Option value="Not Interested">Not Interested</Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>

          <Col span={12}>
            {newState === "Payment Received" && (
              <Form layout="vertical">
                <Form.Item label="Select a payment receipt" name="file">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    // onChange={} tihure for payment recipt
                  />
                </Form.Item>
              </Form>
            )}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} className="my-2">
            <Form layout="vertical">
              <Form.Item label="Select a File" name="file">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Form.Item>
            </Form>
            {fileList.length > 0 && (
              <>
                <hr />
                <Title level={5}>Selected Image</Title>

                <div className="row gap-2">{renderImagePreviews()}</div>
              </>
            )}
          </Col>
        </Row>

        {/* <Modal open>drg</Modal> */}
        <div className="text-end d-flex gap-2 justify-content-end ">
          <Link
            to="/employee/leads-bucket"
            className="btn btn-outline-danger btn-sm"
            // onClick={() => setModalOpen(false)}
          >
            Cancel
          </Link>

          <Button
            key="update"
            type="primary"
            // loading
            // onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </div>
    </EmployeeWrapper>
  );
};

export default EmpBOpen;

interface BookingG {
  selectedData: Booking;
}

const RenderData = ({ selectedData }: BookingG) => {
  return (
    <>
      {selectedData && (
        <>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                First Name:
              </Title>
              <Text>{selectedData.firstName}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Last Name:
              </Title>
              <Text>{selectedData.lastName}</Text>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                Email:
              </Title>
              <Text>{selectedData?.email}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Selected Class:
              </Title>
              <Text>{selectedData?.selectedClass}</Text>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                Country:
              </Title>
              <Text>{selectedData?.country}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Phone Number:
              </Title>
              <Text>{selectedData?.phoneNumber}</Text>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                Date of Class:
              </Title>
              <Text>{new Date(selectedData?.doc).toLocaleDateString()}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Allocation Date:
              </Title>
              <Text>
                {new Date(selectedData?.allocationDate).toLocaleString()}
              </Text>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <Title level={5} className="m-0">
                Created At:
              </Title>
              <Text>{new Date(selectedData?.createdAt).toLocaleString()}</Text>
            </Col>
            <Col span={12}>
              <Title level={5} className="m-0">
                Updated At:
              </Title>
              <Text>{new Date(selectedData?.updatedAt).toLocaleString()}</Text>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

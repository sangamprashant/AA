import type { TabsProps } from "antd";
import { Button, Form, Modal, Select, Table, Tabs } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { config } from "../../../../../config";
import { Booking } from "../../../../../types/booking";
import { AuthContext } from "../../../../context/AuthProvider";
// import { BookingStatus } from "../../../common/exports";
import EmployeeWrapper from "../../EmployeeWrapper";
import { Row, Col, Typography } from "antd"; // Import Ant Design components
import { Link, useParams } from "react-router-dom";

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

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      console.log(values);
      // updateLead({ ...selectedData, state: newState });
      // setModalOpen(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.SERVER}/auth/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedData(res.data.data);
      setNewState(res.data.data.state || "");
    } catch (error) {
      console.error(error);
    }
  };

  console.log(id);
  return (
    <EmployeeWrapper>
      <div className="card p-4 my-4">
        <h5 className="display-6">Leads Update</h5>
        <hr />
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
                <Text>{selectedData.email}</Text>
              </Col>
              <Col span={12}>
                <Title level={5} className="m-0">
                  Selected Class:
                </Title>
                <Text>{selectedData.selectedClass}</Text>
              </Col>
            </Row>
            <Row gutter={16} className="mt-2">
              <Col span={12}>
                <Title level={5} className="m-0">
                  Country:
                </Title>
                <Text>{selectedData.country}</Text>
              </Col>
              <Col span={12}>
                <Title level={5} className="m-0">
                  Phone Number:
                </Title>
                <Text>{selectedData.phoneNumber}</Text>
              </Col>
            </Row>
            <Row gutter={16} className="mt-2">
              <Col span={12}>
                <Title level={5} className="m-0">
                  Date of Class:
                </Title>
                <Text>{new Date(selectedData.doc).toLocaleDateString()}</Text>
              </Col>
              <Col span={12}>
                <Title level={5} className="m-0">
                  Allocation Date:
                </Title>
                <Text>
                  {new Date(selectedData.allocationDate).toLocaleString()}
                </Text>
              </Col>
            </Row>
            <Row gutter={16} className="mt-2">
              <Col span={12}>
                <Title level={5} className="m-0">
                  Created At:
                </Title>
                <Text>{new Date(selectedData.createdAt).toLocaleString()}</Text>
              </Col>
              <Col span={12}>
                <Title level={5} className="m-0">
                  Updated At:
                </Title>
                <Text>{new Date(selectedData.updatedAt).toLocaleString()}</Text>
              </Col>
            </Row>
            <Row gutter={16} className="mt-2">
              <Col span={12}>
                <Title level={5} className="m-0">
                  Currect State:
                </Title>
                <Text className="text-danger bold-text">
                  <b>{selectedData.state}</b>
                </Text>
              </Col>
              <Col span={12}>
                <Form form={form} layout="vertical">
                  <Form.Item
                    label="Update Status"
                    name="status"
                    initialValue={newState}
                    rules={[
                      { required: true, message: "Please select a status!" },
                    ]}
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
                      {selectedData.state != "Payment Received" && (
                        <Option value="Payment Received">
                          Payment Received
                        </Option>
                      )}
                      <Option value="Not Interested">Not Interested</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </>
        )}

        {newState === "Payment Received" && (
          <>form for Payment Received details</>
        )}
        {newState === "Not Interested" && <>form for Not Interested details</>}

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
            loading
            // onClick={handleUpdate}
            disabled={selectedData?.state === newState}
          >
            Update
          </Button>
        </div>
      </div>
    </EmployeeWrapper>
  );
};

export default EmpBOpen;

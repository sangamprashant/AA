import { CalendarOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useContext, useState } from "react";
import { config } from "../../../../../config";
import { formatDateYYYYMMDD } from "../../../../../functions";
import { AuthContext } from "../../../../context/AuthProvider";
import { AnnualCalendar } from "../../../common";
import AdminWrapper from "../../AdminWrapper";

const { Option } = Select;

const statusColors: Record<string, string> = {
  off: "#6c757d",
  holiday: "#ff5722",
  training: "#8e44ad",
  meeting: "#2ecc71",
};

const AdminCalendarManage: React.FC = () => {
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token, user } = globals;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleAddEvent = async (values: {
    date: moment.Moment;
    description: string;
    status: string;
  }) => {
    const formattedValues = {
      ...values,
      date: formatDateYYYYMMDD(values.date.toISOString()),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${config.SERVER}/calendar/add-event`,
        { ...formattedValues },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      notification.success({
        message: "Event Added",
        description:
          response?.data?.message || "The event has been successfully added.",
      });

      form.resetFields();
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminWrapper>
      <div className="nav-bar mb-3 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">
          {user?.role === "admin" ? "Calendar Management" : "Annual Calendar"}
        </h5>
      </div>
      <div className="container">
        <div className="row">
          {user?.role === "admin" && (
            <div className="col-md-6">
              <Card className="shadow-sm">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleAddEvent}
                  className="p-3 bg-white rounded"
                >
                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                      { required: true, message: "Please select the date" },
                    ]}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      placeholder="Select date"
                      style={{ width: "100%" }}
                      suffixIcon={<CalendarOutlined />}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      { required: true, message: "Please enter a description" },
                    ]}
                  >
                    <Input
                      placeholder="Enter description"
                      suffix={<InfoCircleOutlined />}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                      { required: true, message: "Please select a status" },
                    ]}
                  >
                    <Select placeholder="Select status">
                      {Object.keys(statusColors).map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-100"
                      size="large"
                      loading={loading}
                    >
                      Add Event
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          )}
          <div className={`col-md-${user?.role === "admin" ? 6 : 12}`}>
            <AnnualCalendar />
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default AdminCalendarManage;

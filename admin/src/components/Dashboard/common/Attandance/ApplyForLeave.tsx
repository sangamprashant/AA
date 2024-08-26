import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useState } from "react";
import { config } from "../../../../config";
import { openNotification } from "../../../../functions";
import { AuthContext } from "../../../context/AuthProvider";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

interface LeaveFormValues {
  leavePeriod: [Dayjs, Dayjs];
  reason: string;
  leaveType: string;
}

const ApplyForLeave: React.FC = () => {
  const globals = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  if (!globals) return null;
  const { token } = globals;

  // Function to disable past dates using Dayjs
  const disabledDate = (current: Dayjs) => {
    return current.isBefore(dayjs().startOf("day"), "day");
  };

  const onFinish = async (values: LeaveFormValues) => {
    setLoading(true);
    const { leavePeriod, reason, leaveType } = values;
    const [startDate, endDate] = leavePeriod;

    const leaveRequestPayload = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      reason,
      type: leaveType, // Add leaveType to payload
      status: "pending",
      approver: null,
      approverRole: null,
    };

    try {
      const response = await axios.post(
        `${config.SERVER}/leave/apply`,
        leaveRequestPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Notify the user on success
      openNotification(
        "Leave Request Submitted",
        "Your leave request was submitted successfully.",
        "success"
      );

      // Clear form fields
      form.resetFields();
      console.log(response);
    } catch (error) {
      console.warn(error);

      // Notify the user on error
      openNotification(
        "Submission Failed",
        "There was an error submitting your leave request.",
        "error"
      );
    } finally {
      setLoading(false);
    }

    console.log("Submitting leave request:", leaveRequestPayload);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="card shadow-sm border-0 p-4">
          <h2 className="text-center mb-4">Apply for Leave</h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="leavePeriod"
              label="Leave Period"
              rules={[
                { required: true, message: "Please select the leave period" },
              ]}
            >
              <RangePicker
                style={{ width: "100%" }}
                disabledDate={disabledDate}
              />
            </Form.Item>

            <Form.Item
              name="reason"
              label="Reason for Leave"
              rules={[
                {
                  required: true,
                  message: "Please provide a reason for leave",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Describe your reason for leave" />
            </Form.Item>

            <Form.Item
              name="leaveType"
              label="Leave Type"
              rules={[
                { required: true, message: "Please select the type of leave" },
              ]}
            >
              <Select placeholder="Select leave type">
                <Option value="paid-leave">Paid leave</Option>
                <Option value="unpaid-leave">Unpaid leave</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Submit Leave Request
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ApplyForLeave;

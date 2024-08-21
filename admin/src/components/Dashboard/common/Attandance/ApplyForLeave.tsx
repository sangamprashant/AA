import React, { useContext } from "react";
import { Form, Input, DatePicker, Button } from "antd";
import moment from "moment";
import axios from "axios";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

// Define types for form values
interface LeaveFormValues {
  leavePeriod: [moment.Moment, moment.Moment];
  reason: string;
}

const ApplyForLeave: React.FC = () => {
  const globlas = useContext(AuthContext);

  if (!globlas) return null;
  const { token } = globlas;

  const onFinish = async (values: LeaveFormValues) => {
    const { leavePeriod, reason } = values;
    const [startDate, endDate] = leavePeriod;

    // Handle form submission logic here
    const leaveRequestPayload = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      reason,
      status: "pending", // Automatically set as pending
      approver: null, // Handled on the server
      approverRole: null, // Handled on the server
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

      console.log(response);
    } catch (error) {
      console.warn(error);
    }

    console.log("Submitting leave request:", leaveRequestPayload);

    // Submit leaveRequestPayload to the server
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <h2 className="text-center mb-4">Apply for Leave</h2>
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="p-4 border rounded shadow"
        >
          <Form.Item
            name="leavePeriod"
            label="Leave Period"
            rules={[
              { required: true, message: "Please select the leave period" },
            ]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="reason"
            label="Reason for Leave"
            rules={[
              { required: true, message: "Please provide a reason for leave" },
            ]}
          >
            <TextArea rows={4} placeholder="Describe your reason for leave" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Leave Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ApplyForLeave;

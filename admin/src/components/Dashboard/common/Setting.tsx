import { Button, Col, Form, Input, notification } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { config } from "../../../config";

const Setting: React.FC = () => {
  const globals = useContext(AuthContext);
  if (!globals) return null;
  const { token } = globals;
  const [form] = Form.useForm();

  const onFinish = async (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.confirmPassword !== values.newPassword) {
      notification.error({
        message: "Error",
        description: "Passwords do not match",
      });
      return;
    }
    try {
      await axios.post(
        `${config.SERVER}/auth/change-password`,
        {
          newPassword: values.newPassword,
          oldPassword: values.oldPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      notification.success({
        message: "Success",
        description: "Password changed successfully!",
      });

      form.resetFields();
    } catch (error) {
      console.error("Error changing password", error);
      notification.error({
        message: "Error",
        description: "Failed to change the password. Please try again.",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75 mt-5">
      <Col span={15} className="border p-4 shadow">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password placeholder="Enter your old password" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
          >
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your new password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-100">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default Setting;

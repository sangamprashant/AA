import React from "react";
import { Button, Col, Form, Input, Typography, message } from "antd";

const { Title } = Typography;

const Setting: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    // Here you would typically send the values to the server
    // For example: await updatePassword(values);

    console.log({ values });

    // Display success message
    message.success("Password changed successfully!");

    // Reset the form
    form.resetFields();
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 mt-5">
      <Col span={15} className=" border p-4 shadow">
        <Title level={3}>Change Password</Title>
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
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

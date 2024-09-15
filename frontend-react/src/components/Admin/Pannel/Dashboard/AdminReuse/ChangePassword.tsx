import { Form, Input, Typography, message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { LoadingUI } from "../../../../../App";
import { config } from "../../../../../config";
import { AuthContext } from "../../../Auth/AuthProvider";

const { Title } = Typography;

const ChangePassword = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <LoadingUI />;
  }
  const { token } = authContext;
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!currentPassword) {
      message.error("Please enter your current password.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      message.error("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Replace with your API endpoint
      const response = await axios.post(
        `${config.SERVER}/user/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success("Password changed successfully.");
        setCurrentPassword(""); // Clear input fields on success
        setNewPassword("");
        setConfirmPassword("");
      } else {
        message.error("Failed to change password.");
      }
    } catch (error: any) {
      console.log({ error });
      message.error(
        error.response.data.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="change-password-container"
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      <Title level={2}>Change Password</Title>
      <Form onSubmitCapture={handleSubmit}>
        <Form.Item label="Current Password" required>
          <Input.Password
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your current password"
          />
        </Form.Item>
        <Form.Item label="New Password" required>
          <Input.Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
          />
        </Form.Item>
        <Form.Item label="Confirm New Password" required>
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
          />
        </Form.Item>
        <Form.Item className="text-end">
          <button type="submit" className="btn theme-btn" disabled={loading}>
            {loading ? "Loading" : "Change Password"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;

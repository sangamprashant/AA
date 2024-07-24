import { Form, Input, Typography, message } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { LoadingUI } from "../../../../../App";
import { config } from "../../../../../config";
import { AuthContext } from "../../../Auth/AuthProvider";

const { Title } = Typography;

const ChangeEmail = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <LoadingUI />;
  }
  const { token } = authContext;
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [oldEmail, setOldEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!currentPassword) {
      message.error("Please enter your current password.");
      return;
    }

    if (!oldEmail || !/\S+@\S+\.\S+/.test(oldEmail)) {
      message.error("Please enter a valid old email address.");
      return;
    }

    if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
      message.error("Please enter a valid new email address.");
      return;
    }

    setLoading(true);

    try {
      // Replace with your API endpoint
      const response = await axios.post(
        `${config.SERVER}/user/change-email`,
        {
          currentPassword,
          oldEmail,
          newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success("Email changed successfully.");
        setCurrentPassword("");
        setOldEmail("");
        setNewEmail("");
      } else {
        message.error(response.data.message || "Failed to change email.");
      }
    } catch (error: any) {
      message.error(
        error.response.data.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="change-email-container"
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      <Title level={2}>Change Email</Title>
      <Form onSubmitCapture={handleSubmit}>
        <Form.Item
          label="Current Password"
          required
          validateStatus={!currentPassword ? "error" : ""}
          help={!currentPassword ? "Current password is required" : ""}
        >
          <Input.Password
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your current password"
          />
        </Form.Item>
        <Form.Item
          label="Old Email"
          required
          validateStatus={
            !/\S+@\S+\.\S+/.test(oldEmail) && oldEmail ? "error" : ""
          }
          help={
            !/\S+@\S+\.\S+/.test(oldEmail) && oldEmail
              ? "Invalid email address"
              : ""
          }
        >
          <Input
            type="email"
            value={oldEmail}
            onChange={(e) => setOldEmail(e.target.value)}
            placeholder="Enter your old email address"
          />
        </Form.Item>
        <Form.Item
          label="New Email"
          required
          validateStatus={
            !/\S+@\S+\.\S+/.test(newEmail) && newEmail ? "error" : ""
          }
          help={
            !/\S+@\S+\.\S+/.test(newEmail) && newEmail
              ? "Invalid email address"
              : ""
          }
        >
          <Input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter your new email address"
          />
        </Form.Item>
        <Form.Item className="text-end">
          <button type="submit" className="btn theme-btn" disabled={loading}>
            {loading ? "Loading.." : "Change Email"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangeEmail;

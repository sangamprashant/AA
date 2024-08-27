import EmailIcon from "@mui/icons-material/Email";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../config";
import { AuthContext } from "../context/AuthProvider";

// Ant Design notification helper function
const openNotification = (
  message: string,
  description: string,
  type: "success" | "error"
) => {
  notification[type]({
    message,
    description,
    placement: "topRight",
  });
};

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }

  const { setIsLoggedIn, setUser, setToken } = authContext;
  const { role } = useParams<{ role: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      setLoading(true);
      const response = await axios.post(`${config.SERVER}/auth/login`, {
        email,
        password,
        role,
      });
      setIsLoggedIn(true);
      setUser(response.data.user);
      sessionStorage.setItem("token", response.data.token);
      openNotification(
        "Login Successful",
        "You have successfully logged in.",
        "success"
      );
      localStorage.setItem("loginTime", new Date().toISOString());
      setToken(response.data.token);
      navigate(`/${response.data.user.role}/dashboard`);
    } catch (error: any) {
      console.error("Login Error:", error);
      openNotification(
        "Login Error",
        error?.response?.data?.message || "There was an issue with your login.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow border-0"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4 text-uppercase">{role} Login</h3>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" suffix={<EmailIcon fontSize="small" />} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={`w-100`}
              loading={loading}
            >
              {loading ? "Loading" : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

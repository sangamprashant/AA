import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../config";
import { getButtonColor, openNotification } from "../../functions";
import { AuthContext } from "../context/AuthProvider";

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }

  const { setIsLoggedIn, setUser, setToken } = authContext;
  const { role } = useParams<{ role: string }>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      localStorage.setItem('loginTime', new Date().toISOString());
      setToken(response.data.token);
      navigate(`/${response.data.user.role}/dashboard`);
    } catch (error: any) {
      console.error("Login Error:", error);
      openNotification(
        "Login Error",
        error?.response?.data?.message || "There was an issue with your login.",
        "error"
      );
      // Handle login errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4 text-uppercase">{role} Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`btn btn-${getButtonColor(role)} w-100`}
            disabled={loading}
          >
            {loading ? "Loading" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

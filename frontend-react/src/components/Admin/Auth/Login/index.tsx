import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap"; // Importing Form and Button components from Bootstrap
import Footer from "../../../Footer";
import Section from "../../../Reuse/Section";
import { AuthContext } from "../AuthProvider";
import "./login.css";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }

  const { login, forButtonLoading, loginError } = authContext;

  React.useEffect(() => {
    setError(loginError);
  }, [loginError]);

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return setError("All fields are required.");
    }
    login(email, password);
  };

  return (
    <>
      <Section
        id="login-container"
        className="d-flex align-items-center  "
        style={{ minHeight: "80vh" }}
      >
        <div className=" row justify-content-center">
          <div className="col-md-6 py-5 card p-3 rounded-3">
            <h2 className="mb-4 display-5 text-center">Admin Login</h2>

            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="p-0 m-0">Email address</Form.Label>
                <Form.Control
                  // type="email"
                  placeholder="Enter email"
                  autoComplete="false"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                  name="atozclasses-admin-email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-2">
                <Form.Label className="p-0 m-0">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  autoComplete="false"
                  onChange={(e) => setPassword(e.target.value)}
                  // required
                  name="atozclasses-admin-password"
                />
              </Form.Group>

              <button
                type="submit"
                className="w-100 mt-3 btn theme-btn"
                disabled={forButtonLoading}
              >
                {forButtonLoading ? "PLEASE WAIT.." : "LOGIN"}
              </button>
              <p
                className={`text-danger opacity-${error ? "100" : "0"} p-0 m-0`}
              >
                {error}
              </p>
            </Form>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default AdminLogin;

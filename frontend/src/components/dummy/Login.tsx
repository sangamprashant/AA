import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Admin/Auth/AuthProvider";
import { LoadingUI } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <LoadingUI />;
  }
  const { loading, dummyLogin, isDummyLogin } = authContext;
  if (loading) {
    return <LoadingUI />;
  }

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  useEffect(() => {
    if (isDummyLogin) {
      navigate("/");
    }
  }, [isDummyLogin]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", { email, password });
      dummyLogin(email, password);
    } else {
      dummyLogin(email, password, name);
      console.log("Registering with:", { email, password, name });
    }
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="card col-md-4">
          <div className="card-body">
            <h2 className="card-title text-center">
              {isLogin ? "Login" : "Register"}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
            <div className="text-center mt-3">
              <button className="btn btn-link" onClick={handleToggle}>
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

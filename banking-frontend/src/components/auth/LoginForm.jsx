                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AuthForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        {/* Logo goes to login */}
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ cursor: "pointer", width: "100px", marginBottom: "20px" }}
          />
        </Link>
        <img src="/photo.png" alt="Illustration" />
      </div>
      <div className="auth-form-section">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>LOGIN</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="auth-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="auth-button">
            SIGN IN
          </button>
          <p className="auth-footer">
            Not registered yet? <a href="/signup">Create an Account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { AuthContext } from "../../context/AuthContext";
import "./AuthForm.css";

const SignupForm = () => {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      setError("");
      navigate("/login"); 
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <img src="/photo.png" alt="Illustration" />
      </div>
      <div className="auth-form-section">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Sign Up</h2>
          {error && <p className="error">{error}</p>}
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

export default function LoginForm({ switchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("⚠ Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "⚠ Login failed");
        return;
      }

      // ✅ Store JWT token and user name locally
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);

      // ✅ Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("⚠ Server error, please try again later");
    }
  };

  return (
    <div className="login-card-wrap">
      <div className="login-card">
        <h2 className="login-title">LOGIN</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="email">email address</label>
          <input
            id="email"
            className="pill-input"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="input-label" htmlFor="password">password</label>
          <input
            id="password"
            className="pill-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}

          <div style={{ height: 22 }} />

          <button className="primary-btn" type="submit">LOGIN</button>
        </form>

        <p className="small-line">
          Don't have an account?{" "}
          <span
            onClick={switchToRegister}
            style={{ color: "#ffd95a", cursor: "pointer", fontWeight: 700 }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

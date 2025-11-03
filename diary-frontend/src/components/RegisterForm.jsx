import React, { useState } from "react";
import "../styles/LoginForm.css";

export default function RegisterForm({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("⚠ Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "⚠ Registration failed");
        return;
      }

      // ✅ Show success message and switch to login immediately
      setSuccess("✅ Registration successful! You can now log in.");
      setError("");

      // Switch to login form after a short delay
      setTimeout(() => {
        switchToLogin();
      }, 1000);
    } catch (err) {
      console.error("Register error:", err);
      setError("⚠ Server error, please try again later");
    }
  };

  return (
    <div className="login-card-wrap">
      <div className="login-card">
        <h2 className="login-title">REGISTER</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="name">full name</label>
          <input
            id="name"
            className="pill-input"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
          {success && <p className="success-text">{success}</p>}

          <div style={{ height: 22 }} />

          <button className="primary-btn" type="submit">REGISTER</button>
        </form>

        <p className="small-line">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            style={{ color: "#ffd95a", cursor: "pointer", fontWeight: 700 }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

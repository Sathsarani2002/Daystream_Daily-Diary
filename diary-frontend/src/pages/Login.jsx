import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import illustration from "../assets/login-image.png";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // For now, no backend — just redirect to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="page-root">
      {/* LEFT SIDE */}
      <div className="left-column">
        <div className="brand-space">
          <h1>Daystream</h1>
        </div>

        <div className="left-illustration">
          <img src={illustration} alt="Illustration" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-column">
        <div className="outer-panel">
          {isRegister ? (
            <RegisterForm switchToLogin={() => setIsRegister(false)} />
          ) : (
            <LoginForm
              switchToRegister={() => setIsRegister(true)}
              onLogin={handleLogin}
            />
          )}
        </div>
      </div>
    </div>
  );
}

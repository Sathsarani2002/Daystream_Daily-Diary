import React from "react";
import RegisterForm from "../components/RegisterForm"; 
import illustration from "../assets/login-image.png"; 
import "../styles/LoginForm.css"; 

export default function Register() {
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
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

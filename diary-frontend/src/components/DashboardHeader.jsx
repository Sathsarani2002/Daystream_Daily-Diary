import React, { useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardHeader.css";
import logo from "../assets/logo.png";

function DashboardHeader() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token → force logout
      navigate("/");
      return;
    }

    // Fetch user info from backend
    fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          // Invalid or expired token → logout
          localStorage.removeItem("token");
          navigate("/");
          return;
        }
        const data = await res.json();
        if (data.name) setUserName(data.name);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        navigate("/"); // fallback logout if request fails
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="dashboard-header">
      {/* Left side - Logo */}
      <div className="logo-section">
        <img src={logo} alt="Daystream Logo" className="logo" />
        <h1 className="title">Daystream</h1>
      </div>

      {/* Middle - Greeting */}
      <h2 className="greeting">
        Good Day, <span>{userName}!</span>
      </h2>

      {/* Right side - Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        <FaPowerOff className="logout-icon" />
        Logout
      </button>
    </header>
  );
}

export default DashboardHeader;

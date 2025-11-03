import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/AddNote.css";
import "../styles/DashboardHeader.css";

export default function AddNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState("😀");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title || !description || !mood) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token"); // ✅ stored during login
      const response = await fetch("http://localhost:5000/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, mood }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Note added successfully!");
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to add note");
      }
    } catch (err) {
      console.error("Error adding note:", err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <div className="white-box">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft />
        </button>

        <h2 className="add-note-title">Add New Note</h2>

        {error && <p className="error-text">{error}</p>}

        <div className="form-group">
          <label className="form-label">Add Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="Type Here ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            placeholder="Type Here ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group mood-select">
          <label>Select Mood:</label>
          <select
            className="mood-dropdown"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option>😀</option>
            <option>😐</option>
            <option>😢</option>
            <option>😡</option>
          </select>
        </div>

        <button
          className="save-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Note"}
        </button>
      </div>
    </div>
  );
}

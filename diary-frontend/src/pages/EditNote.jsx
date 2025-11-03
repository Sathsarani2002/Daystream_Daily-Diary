import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import "../styles/AddNote.css";
import "../styles/DashboardHeader.css";
import DashboardHeader from "../components/DashboardHeader";

export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [note, setNote] = useState({
    title: "",
    description: "",
    mood: "😀",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage

  // Fetch the diary entry by ID
  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/diary`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Find the diary with matching id
        const diary = response.data.find((d) => d._id === id);
        if (!diary) {
          setError("Diary not found");
        } else {
          setNote({
            title: diary.title,
            description: diary.description,
            mood: diary.mood,
          });
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch diary");
        setLoading(false);
      }
    };

    fetchDiary();
  }, [id, token]);

  // Update diary
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/diary/${id}`,
        note,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Diary updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update diary");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <div className="white-box">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft />
        </button>

        <h2 className="add-note-title">Edit Diary</h2>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          ></textarea>
        </div>

        <div className="form-group mood-select">
          <label>Select Mood:</label>
          <select
            className="mood-dropdown"
            value={note.mood}
            onChange={(e) => setNote({ ...note, mood: e.target.value })}
          >
            <option>😀</option>
            <option>😐</option>
            <option>😢</option>
            <option>😡</option>
          </select>
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

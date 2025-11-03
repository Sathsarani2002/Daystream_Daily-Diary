import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/NotesList.css";

function NotesList() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/diary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to load notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Unable to load notes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // ✅ Format date & time
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ✅ Edit note
  const handleEdit = (id) => navigate(`/edit-note/${id}`);

  // ✅ Delete note
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/diary/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        alert("Failed to delete note.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while deleting note.");
    }
  };

  // ✅ Navigate to Add Note page
  const handleAdd = () => navigate("/add-note");

  return (
    <div className="white-box">
      <h1 className="notes-title">Notes List</h1>

      {/* Loading / Error States */}
      {loading && <p>Loading notes...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Notes List */}
      <div className="notes-scroll">
        {!loading && notes.length === 0 ? (
          <p>No notes yet. Click + to add one!</p>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              description={note.description}
              mood={note.mood}
              date={formatDate(note.date)}
              onEdit={() => handleEdit(note._id)}
              onDelete={() => handleDelete(note._id)}
            />
          ))
        )}
      </div>

      {/* ✅ Floating Add Button */}
      <button className="add-btn" onClick={handleAdd}>
        <FaPlus />
      </button>
    </div>
  );
}

export default NotesList;

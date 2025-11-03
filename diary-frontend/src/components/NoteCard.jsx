import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/NoteCard.css";

// Helper function to format date
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

function NoteCard({ title, description, mood, date, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="note-card">
        <div className="note-content">
          <h3>{title}</h3>
          {mood && <span className="note-mood">{mood}</span>}
          <span className="note-datetime">{formatDate(date)}</span>
          <p className="truncated-text">{description}</p>
          <button className="show-more-btn" onClick={openModal}>
            Show More
          </button>
        </div>

        <div className="note-actions">
          <button className="icon-btn edit-btn" onClick={onEdit}>
            <FaEdit />
          </button>
          <button className="icon-btn delete-btn" onClick={onDelete}>
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Modal for full note */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{title}</h2>
            {mood && <span className="note-mood">{mood}</span>}
            <span className="note-datetime">{formatDate(date)}</span>
            <p>{description}</p>
            <button className="show-more-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteCard;

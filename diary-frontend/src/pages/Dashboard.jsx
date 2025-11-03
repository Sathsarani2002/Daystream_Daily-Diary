import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import NotesList from "../components/NotesList";
import "../styles/DashboardHeader.css";
import "../styles/NotesList.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <DashboardHeader />

      {/* White Box Section */}
      <div className="dashboard-body">
        <NotesList />
      </div>
    </div>
  );
}

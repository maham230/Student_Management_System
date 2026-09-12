import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteStudent() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const findStudent = async () => {
    if (!id.trim()) {
      setError("Please enter Student ID");
      return;
    }

    try {
      setError("");
      setMessage("");
      setStudent(null);
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/students/${id.trim()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Student not found"
        );
      }

      setStudent(data.student || data);

    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async () => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/students/${id.trim()}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete student"
        );
      }

      setMessage("✅ Student deleted successfully!");

      setStudent(null);
      setId("");

    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">

      <div className="form-container">

        <h2>🗑️ Delete Student</h2>

        <p className="page-description">
          Delete a particular student record from MongoDB.
        </p>

        <div className="search-section">

          <input
            type="text"
            placeholder="Enter MongoDB Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <button
            type="button"
            className="refresh-btn"
            onClick={findStudent}
            disabled={loading}
          >
            🔍 Find
          </button>

        </div>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {student && (
          <div className="found-student delete-card">

            <h3>⚠️ Student to Delete</h3>

            <p>
              <strong>ID:</strong>{" "}
              {student._id}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {student.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {student.email}
            </p>

            <p>
              <strong>Course:</strong>{" "}
              {student.course}
            </p>

            <p>
              <strong>Age:</strong>{" "}
              {student.age}
            </p>

            <button
              className="delete-main-btn"
              onClick={deleteStudent}
              disabled={loading}
            >
              {loading
                ? "Deleting..."
                : "🗑️ Delete Student"}
            </button>

          </div>
        )}

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default DeleteStudent;
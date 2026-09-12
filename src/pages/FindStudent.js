import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FindStudent() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findStudent = async (e) => {
    e.preventDefault();

    if (!id.trim()) {
      setError("Please enter MongoDB Student ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setStudent(null);

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

  return (
    <div className="dashboard-container">

      <div className="form-container">

        <h2>🔍 Find Student</h2>

        <p className="page-description">
          Retrieve a particular student record from MongoDB.
        </p>

        <form onSubmit={findStudent}>

          <input
            type="text"
            placeholder="Enter MongoDB Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Searching..." : "🔍 Find Student"}
          </button>

        </form>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {student && (
          <div className="found-student">

            <h3>✅ Student Found</h3>

            <p>
              <strong>MongoDB ID:</strong>{" "}
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

export default FindStudent;
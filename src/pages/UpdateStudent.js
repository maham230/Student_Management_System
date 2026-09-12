import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateStudent() {
  const navigate = useNavigate();

  const [id, setId] = useState("");

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    age: "",
  });

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

      const foundStudent = data.student || data;

      setStudent({
        name: foundStudent.name || "",
        email: foundStudent.email || "",
        course: foundStudent.course || "",
        age: foundStudent.age || "",
      });

      setMessage("Student found. You can now update the details.");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/students/${id.trim()}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: student.name,
            email: student.email,
            course: student.course,
            age: Number(student.age),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update student"
        );
      }

      setMessage("✅ Student updated successfully!");

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

        <h2>✏️ Update Student</h2>

        <p className="page-description">
          Update an existing MongoDB student record.
        </p>

        {/* Find Student */}

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

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {/* Update Form */}

        {student.name && (
          <form onSubmit={updateStudent}>

            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={student.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={student.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="course"
              placeholder="Course"
              value={student.course}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={student.age}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "💾 Update Student"}
            </button>

          </form>
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

export default UpdateStudent;
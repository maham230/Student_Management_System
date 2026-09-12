import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddManyStudents() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([
    {
      name: "",
      email: "",
      course: "",
      age: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (index, e) => {
    const updatedStudents = [...students];

    updatedStudents[index][e.target.name] = e.target.value;

    setStudents(updatedStudents);
  };

  // Add another student row
  const addStudentRow = () => {
    setStudents([
      ...students,
      {
        name: "",
        email: "",
        course: "",
        age: "",
      },
    ]);
  };

  // Remove student row
  const removeStudentRow = (index) => {
    if (students.length === 1) {
      return;
    }

    const updatedStudents = students.filter(
      (_, i) => i !== index
    );

    setStudents(updatedStudents);
  };

  // Insert many students
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/students/many",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            students.map((student) => ({
              name: student.name,
              email: student.email,
              course: student.course,
              age: Number(student.age),
              file: "",
            }))
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to insert students"
        );
      }

      alert(
        `${data.count} students inserted successfully!`
      );

      setStudents([
        {
          name: "",
          email: "",
          course: "",
          age: "",
        },
      ]);

    } catch (error) {
      console.error(error);

      alert(
        "Error inserting students: " + error.message
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">

      <div className="form-container">

        <h2>➕ Insert Many Students</h2>

        <p className="page-description">
          Add multiple student records to MongoDB at once.
        </p>

        <form onSubmit={handleSubmit}>

          {students.map((student, index) => (
            <div
              className="student-row"
              key={index}
            >

              <h3>
                Student {index + 1}
              </h3>

              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={student.name}
                onChange={(e) =>
                  handleChange(index, e)
                }
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={student.email}
                onChange={(e) =>
                  handleChange(index, e)
                }
                required
              />

              <input
                type="text"
                name="course"
                placeholder="Course"
                value={student.course}
                onChange={(e) =>
                  handleChange(index, e)
                }
                required
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={student.age}
                onChange={(e) =>
                  handleChange(index, e)
                }
                required
              />

              {students.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    removeStudentRow(index)
                  }
                >
                  🗑️ Remove
                </button>
              )}

            </div>
          ))}

          <div className="many-buttons">

            <button
              type="button"
              className="add-row-btn"
              onClick={addStudentRow}
            >
              ➕ Add Another Student
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "💾 Insert All Students"}
            </button>

          </div>

        </form>

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

export default AddManyStudents;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewStudent() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get all students from MongoDB
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/students"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch students"
        );
      }

      setStudents(data.students || []);

    } catch (error) {
      console.error(error);
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="dashboard-container">

      <div className="form-container view-container">

        <div className="view-header">
          <div>
            <h2>📋 All Students</h2>
            <p className="page-description">
              List of all records stored in MongoDB.
            </p>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchStudents}
          >
            🔄 Refresh
          </button>
        </div>

        {loading && (
          <div className="loading-message">
            Loading students...
          </div>
        )}

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {!loading && !error && students.length === 0 && (
          <div className="empty-message">
            <h3>📭 No Students Found</h3>
            <p>
              There are no student records in MongoDB.
            </p>
          </div>
        )}

        {!loading && students.length > 0 && (
          <>
            <div className="student-count">
              Total Records: <strong>{students.length}</strong>
            </div>

            <div className="students-table-container">

              <table className="students-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Age</th>
                    <th>MongoDB ID</th>
                  </tr>
                </thead>

                <tbody>

                  {students.map((student, index) => (
                    <tr key={student._id}>

                      <td>{index + 1}</td>

                      <td>
                        <strong>
                          {student.name}
                        </strong>
                      </td>

                      <td>{student.email}</td>

                      <td>{student.course}</td>

                      <td>{student.age}</td>

                      <td className="mongo-id">
                        {student._id}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </>
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

export default ViewStudent;
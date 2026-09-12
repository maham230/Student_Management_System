import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail") || "Student";

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <h1>🎓 Student Management System</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Welcome */}
      <div className="welcome-box">
        <h2>Welcome</h2>
        <p>{userEmail}</p>
      </div>

      {/* MongoDB Operations */}
      <div className="operations-grid">

        {/* 1. Insert One */}
        <div className="operation-card">
          <h2>➕ Add Student</h2>
          <p>Insert one student record.</p>

          <button onClick={() => navigate("/add-student")}>
            Open
          </button>
        </div>

        {/* 2. Insert Many */}
        <div className="operation-card">
          <h2>➕ Add Many</h2>
          <p>Insert multiple student records.</p>

          <button onClick={() => navigate("/add-many-students")}>
            Open
          </button>
        </div>

        {/* 3. List All */}
        <div className="operation-card">
          <h2>📋 View Students</h2>
          <p>List all student records.</p>

          <button onClick={() => navigate("/view-student")}>
            Open
          </button>
        </div>
    

        {/* 4. Particular Record */}
        <div className="operation-card">
          <h2>🔍 Find Student</h2>
          <p>View a particular student.</p>

          <button onClick={() => navigate("/find-student")}>
            Open
          </button>
        </div>

        {/* 5. Update */}
        <div className="operation-card">
          <h2>✏️ Update Student</h2>
          <p>Update an existing student.</p>

          <button onClick={() => navigate("/update-student")}>
            Open
          </button>
        </div>

        {/* 6. Delete */}
        <div className="operation-card">
          <h2>🗑️ Delete Student</h2>
          <p>Delete a student record.</p>

          <button onClick={() => navigate("/delete-student")}>
            Open
          </button>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
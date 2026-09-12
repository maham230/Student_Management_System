import React, { useState } from "react";

import { db } from "../firebase";
import dbx from "../dropbox";

import {
  collection,
  addDoc
} from "firebase/firestore";

import {
  useNavigate
} from "react-router-dom";

function StudentForm() {

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    age: ""
  });

  const [file, setFile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // Save student and upload file
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let fileLink = "";

      // Upload file to Dropbox
      if (file) {

        const response = await dbx.filesUpload({
          path: "/" + file.name,
          contents: file,
        });

        fileLink = response.result.path_display;
      }

      // Save data in Firestore
      await addDoc(collection(db, "students"), {

        name: student.name,
        email: student.email,
        course: student.course,
        age: student.age,
        file: fileLink

      });
      // Save data in MongoDB
const mongoResponse = await fetch("http://localhost:5000/api/students", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: student.name,
    email: student.email,
    course: student.course,
    age: Number(student.age),
    file: fileLink,
  }),
});

if (!mongoResponse.ok) {
  throw new Error("Failed to save student in MongoDB");
}

      alert("Student Added Successfully!");

      setStudent({
        name: "",
        email: "",
        course: "",
        age: ""
      });

      setFile(null);

    } catch (error) {

      console.log(error);
      alert("Error adding student");

    }
  };

  return (

    <div className="form-container">

      <h2>➕ Add Student</h2>

      <form onSubmit={handleSubmit}>

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

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">
          💾 Save Student
        </button>

      </form>

      <button onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>

    </div>

  );
}

export default StudentForm;
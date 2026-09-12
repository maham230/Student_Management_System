require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/studentRoutes");
const Student = require("./models/Student");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test backend
app.get("/", (req, res) => {
  res.send("Student Management Backend is running!");
});

// Find particular student
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(student);

  } catch (error) {
    console.error("Find student error:", error);

    res.status(500).json({
      message: "Error fetching student",
      error: error.message
    });
  }
});

// Student routes
app.use("/api/students", studentRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
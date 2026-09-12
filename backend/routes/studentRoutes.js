const express = require("express");
const Student = require("../models/Student");

const router = express.Router();


// =====================================================
// 1. INSERT ONE RECORD
// POST /api/students
// =====================================================
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);

    const savedStudent = await student.save();

    res.status(201).json({
      message: "Student inserted successfully",
      student: savedStudent
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error inserting student",
      error: error.message
    });
  }
});


// =====================================================
// 2. INSERT MANY RECORDS
// POST /api/students/many
// =====================================================
router.post("/many", async (req, res) => {
  try {

    const students = req.body;

    const insertedStudents = await Student.insertMany(students);

    res.status(201).json({
      message: "Students inserted successfully",
      count: insertedStudents.length,
      students: insertedStudents
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error inserting multiple students",
      error: error.message
    });
  }
});


// =====================================================
// 3. LIST ALL RECORDS
// GET /api/students
// =====================================================
router.get("/", async (req, res) => {
  try {

    const students = await Student.find();

    res.status(200).json({
      count: students.length,
      students: students
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching students",
      error: error.message
    });
  }
});


// =====================================================
// 4. LIST PARTICULAR RECORD
// GET /api/students/:id
// =====================================================
router.get("/:id", async (req, res) => {
  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching student",
      error: error.message
    });
  }
});


// =====================================================
// 5. UPDATE RECORD
// PUT /api/students/:id
// =====================================================
router.put("/:id", async (req, res) => {
  try {

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating student",
      error: error.message
    });
  }
});


// =====================================================
// 6. DELETE RECORD
// DELETE /api/students/:id
// =====================================================
router.delete("/:id", async (req, res) => {
  try {

    const deletedStudent = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting student",
      error: error.message
    });
  }
});


module.exports = router;
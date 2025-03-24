const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

// Register a new student
router.post('/students', async (req, res) => {
  const { studentId, name, age, grade, mentalIllnessSeverity, parentId, domains } = req.body;
  try {
    const student = new Student({ studentId, name, age, grade, mentalIllnessSeverity, parentId, domains });
    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new faculty
router.post('/faculty', async (req, res) => {
  const { facultyId, name, email, password, contact, address, education } = req.body;
  try {
    const faculty = new Faculty({ facultyId, name, email, password, contact, address, education });
    await faculty.save();
    res.status(201).json({ message: 'Faculty added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
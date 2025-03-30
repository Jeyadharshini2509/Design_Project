const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


// Get assigned students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});






// Update task status for a student
router.put('/students/:studentId/tasks', async (req, res) => {
  const { studentId } = req.params;
  const { domainName, taskName, status } = req.body;
  try {
    const student = await Student.findOne({ studentId });
    const domain = student.domains.find(d => d.domainName === domainName);
    const task = domain.tasks.find(t => t.taskName === taskName);
    task.status = status;
    await student.save();
    res.status(200).json({ message: 'Task status updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
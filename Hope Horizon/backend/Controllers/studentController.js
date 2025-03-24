const Student = require('../models/Student');

const registerStudent = async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      teacher: req.user.id
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: 'Student registration failed' });
  }
};

const updateProgress = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: { domains: req.body.domains } },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

module.exports = { registerStudent, updateProgress };
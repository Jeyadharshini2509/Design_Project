const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get child's progress
router.get('/children', async (req, res) => {
  const { parentId } = req.body;
  try {
    const children = await Student.find({ parentId });
    res.status(200).json(children);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
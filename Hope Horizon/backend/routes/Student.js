const express = require('express');
const router = express.Router();
const { auth, roleCheck } = require('../middleware/auth');
const Student = require('../models/Student');
const ExcelJS = require('exceljs');
const { Parser } = require('json2csv');

// Register a new student (Headmaster only)
router.post('/', auth, roleCheck(['headmaster']), async (req, res) => {
  try {
    const student = new Student({
      ...req.body,
      teacher: req.user.id // Assign the student to the logged-in teacher
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: 'Student registration failed' });
  }
});

// Update student progress (Teacher only)
router.patch('/:id/progress', auth, roleCheck(['teacher']), async (req, res) => {
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
});

// Export students as CSV (Teacher only)
router.get('/export/csv', auth, roleCheck(['teacher']), async (req, res) => {
  try {
    const students = await Student.find({ teacher: req.user.id })
      .populate('section', 'name')
      .select('personalInfo.name section.name growthPercentage');

    const parser = new Parser({
      fields: ['personalInfo.name', 'section.name', 'growthPercentage']
    });
    const csv = parser.parse(students);

    res.header('Content-Type', 'text/csv');
    res.attachment('students.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'CSV export failed' });
  }
});

// Export students as Excel (Teacher only)
router.get('/export/excel', auth, roleCheck(['teacher']), async (req, res) => {
  try {
    const students = await Student.find({ teacher: req.user.id })
      .populate('section', 'name')
      .select('personalInfo.name section.name growthPercentage');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    // Add headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Section', key: 'section', width: 20 },
      { header: 'Growth %', key: 'growth', width: 15 }
    ];

    // Add data
    students.forEach(student => {
      worksheet.addRow({
        name: student.personalInfo.name,
        section: student.section.name,
        growth: student.growthPercentage
      });
    });

    // Send response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.attachment('students.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ error: 'Excel export failed' });
  }
});

module.exports = router;
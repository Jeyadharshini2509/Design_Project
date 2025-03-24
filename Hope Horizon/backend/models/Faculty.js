const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true }, // ID ranging from MDPS001-MDPS999
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  education: { type: String, required: true },
  assignedStudents: [{ type: String }], // List of student IDs assigned to the faculty
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Faculty', facultySchema);
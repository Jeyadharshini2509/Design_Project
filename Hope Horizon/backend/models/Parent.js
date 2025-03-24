const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  parentId: { type: String, required: true, unique: true }, // Unique ID for parent
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  children: [{ type: String }], // List of student IDs (children)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Parent', parentSchema);
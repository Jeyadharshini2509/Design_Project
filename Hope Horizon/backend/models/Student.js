const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true }, // ID ranging from 20250000-20259999
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true },
  mentalIllnessSeverity: { type: String, enum: ['low', 'medium', 'high'], required: true },
  parentId: { type: String, required: true }, // Reference to parent
  domains: [
    {
      domainName: { type: String, required: true }, // MDPS domain name
      tasks: [
        {
          taskName: { type: String, required: true },
          status: { type: String, enum: ['red', 'blue'], default: 'red' }, // red = not completed, blue = completed
        },
      ],
      progressPercentage: { type: Number, default: 0 }, // Progress percentage for the domain
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);